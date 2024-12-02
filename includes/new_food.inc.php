<?php

require_once "mg_handle.inc.php";
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["name"]) || $data["name"] == "") {
	sendMessage(false, "Invalid food name.");
	die();
}

if (!isset($data["price"]) || !is_numeric($data["price"])) {
	sendMessage(false, "Invalid food price.");
	die();
}

if (!isset($data["code"]) || $data["code"] == "") {
	sendMessage(false, "Invalid food code.");
	die();
}

if (!isset($data["discount"]) || !is_numeric($data["discount"])) {
	sendMessage(false, "Invalid food discount.");
	die();
}

if (!isset($data["expire_date"]) || $data["expire_date"] == "") {
	sendMessage(false, "Invalid expire date.");
	die();
}

if (!isset($data["category"]) || !in_array($data["category"], array("Burgers", "Submarines", "Beverages", "Other"))) {
	sendMessage(false, "Invalid food category.");
	die();
}

$name = $data["name"];
$price = $data["price"];
$code = $data["code"];
$discount = $data["discount"];
$expire_date = $data["expire_date"];
$category = $data["category"];

try {
	require_once "db_handle.inc.php";

	$query = "INSERT INTO food_item (name, price, code, discount, expire_date, category) VALUES (:name, :price, :code, :discount, :expire_date, :category);";
	$stmt = $pdo->prepare($query);
	$stmt->bindParam(":name", $name);
	$stmt->bindParam(":price", $price);
	$stmt->bindParam(":code", $code);
	$stmt->bindParam(":discount", $discount);
	$stmt->bindParam(":expire_date", $expire_date);
	$stmt->bindParam(":category", $category);

	$isAdded = $stmt->execute();

	if ($isAdded) {
		sendMessage(true, "Successfully added new food item.");
	} else {
		sendMessage(false, "Failed to add food. Please try again.");
	}

	$pdo = null;
	$stmt = null;
} catch (PDOException $e) {
	sendMessage(false, "Query failed: " . $e->getMessage());
}
