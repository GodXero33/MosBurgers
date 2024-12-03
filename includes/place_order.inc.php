<?php

require_once "mg_handle.inc.php";
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["customer"]) || $data["customer"] == "") {
	sendMessage(false, "Invalid customer.");
	die();
}

if (!isset($data["place_date"]) || $data["place_date"] == "") {
	sendMessage(false, "Invalid place date.");
	die();
}

if (!isset($data["total_amount"]) || !is_numeric($data["total_amount"])) {
	sendMessage(false, "Invalid total amount.");
	die();
}

if (!isset($data["discount"]) || !is_numeric($data["discount"])) {
	sendMessage(false, "Invalid discount.");
	die();
}

if (!isset($data["final_amount"]) || !is_numeric($data["final_amount"])) {
	sendMessage(false, "Invalid final amount.");
	die();
}

if (!isset($data["order_items"]) || !is_array($data["order_items"])) {
	sendMessage(false, "Invalid order items.");
	die();
}

function isValidItem ($item) {
	if (!isset($item["code"]) || $item["code"] == "") return "code";
	if (!isset($item["quantity"]) || !is_numeric($item["quantity"])) return "quantity";
	if (!isset($item["total_price"]) || !is_numeric($item["total_price"])) return "total_price";
	if (!isset($item["price_per_unit"]) || !is_numeric($item["price_per_unit"])) return "price_per_unit";
	return "ok";
}

$customer = $data["customer"];
$place_date = $data["place_date"];
$total_amount = $data["total_amount"];
$discount = $data["discount"];
$final_amount = $data["final_amount"];
$order_items = $data["order_items"];

for ($g = 0; $g < count($order_items); $g++) {
	$item = $order_items[$g];
	$ok = isValidItem($item);

	if ($ok == "code") {
		sendMessage(false, "Invalid item code. item -> " . $g);
		die();
	}

	if ($ok == "quantity") {
		sendMessage(false, "Invalid item quantity. item -> " . $g);
		die();
	}

	if ($ok == "total_price") {
		sendMessage(false, "Invalid item total price. item -> " . $g);
		die();
	}

	if ($ok == "price_per_unit") {
		sendMessage(false, "Invalid item price per unit. item -> " . $g);
		die();
	}
}

try {
	require_once "db_handle.inc.php";

	$query = "SELECT customer_id FROM customer WHERE phone = :customer;";
	$stmt = $pdo->prepare($query);
	$stmt->bindParam(":customer", $customer);
	$isOk = $stmt->execute();

	if (!$isOk) {
		sendMessage(false, "Failed to place the order. Please try again.");
		die();
	}

	$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

	if (empty($results)) {
		sendMessage(false, "Failed to place the order. Please try again.");
		die();
	}

	$customer_id = $results[0]["customer_id"];
	$query = "INSERT INTO mos_order (place_date, total_amount, discount, final_amount, customer_id) VALUES (:place_date, :total_amount, :discount, :final_amount, :customer_id);";
	$stmt = $pdo->prepare($query);
	$stmt->bindParam(":place_date", $place_date);
	$stmt->bindParam(":total_amount", $total_amount);
	$stmt->bindParam(":discount", $discount);
	$stmt->bindParam(":final_amount", $final_amount);
	$stmt->bindParam(":customer_id", $customer_id);
	$isOk = $stmt->execute();

	if (!$isOk) {
		sendMessage(false, "Failed to place the order. Please try again.");
		die();
	}

	$order_id = $pdo->lastInsertId();
	$query = "INSERT INTO order_item (item_id, order_id, quantity, total_price, price_per_unit) VALUES (:item_id, :order_id, :quantity, :total_price, :price_per_unit);";
	$stmt = $pdo->prepare($query);
	
	for ($g = 0; $g < count($order_items); $g++) {
		$item = $order_items[$g];
		$querySearchItemID = "SELECT item_id FROM food_item WHERE code = :code";
		$stmtSearchItemID = $pdo->prepare($querySearchItemID);
		$stmtSearchItemID->bindParam(":code", $item["code"]);
		$isOk = $stmtSearchItemID->execute();
		$results = $stmtSearchItemID->fetchAll(PDO::FETCH_ASSOC);

		if (!$isOk || empty($results)) {
			sendMessage(false, "Failed to find a item. Item code: " . $item["code"] . ". Please try again.");
			die();
		}

		$item_id = $results[0]["item_id"];
		$stmt->bindParam(":item_id", $item_id);
		$stmt->bindParam(":order_id", $order_id);
		$stmt->bindParam(":quantity", $item["quantity"]);
		$stmt->bindParam(":total_price", $item["total_price"]);
		$stmt->bindParam(":price_per_unit", $item["price_per_unit"]);
		$isOk = $stmt->execute();

		if (!$isOk || empty($results)) {
			sendMessage(false, "Failed to place a item into order. Item code: " . $item["code"] . ". Please try again.");
			die();
		}
	}

	sendMessage(true, "Order placed successfully.");
} catch (PDOException $e) {
	sendMessage(false, "Query failed: " . $e->getMessage());
}
