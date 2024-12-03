<?php

require_once "mg_handle.inc.php";
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["phone"]) || $data["phone"] == "") {
	sendMessage(false, "Invalid phone.");
	die();
}

$phone = $data["phone"];

try {
	require_once "db_handle.inc.php";

	$query = "SELECT customer_id FROM customer WHERE (phone = :phone);";
	$stmt = $pdo->prepare($query);
	$stmt->bindParam(":phone", $phone);
	$executed = $stmt->execute();

	if (!$executed) {
		sendMessage(false, "Failed to delete customer. Please try again.");
		$pdo = null;
		$stmt = null;
		die();
	}

	$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

	if (empty($results)) {
		sendMessage(false, "Failed tofind the customer with the phone '" . $phone . "'.");
		$pdo = null;
		$stmt = null;
		die();
	}

	$id = $results[0]["customer_id"];

	$query = "DELETE FROM order_item WHERE order_id IN (SELECT order_id FROM mos_order WHERE customer_id = :customer_id);\nDELETE FROM mos_order WHERE customer_id = :customer_id;\nDELETE FROM customer WHERE phone = :phone;";
	$stmt = $pdo->prepare($query);
	$stmt->bindParam(":customer_id", $id);
	$stmt->bindParam(":phone", $phone);
	$executed = $stmt->execute();

	if (!$executed) {
		sendMessage(false, "Failed to delete customer. Please try again.");
		$pdo = null;
		$stmt = null;
		die();
	}

	sendMessage(true, "Successfully deleted the customer with the phone '" . $phone . "'.");

	$pdo = null;
	$stmt = null;
} catch (PDOException $e) {
	sendMessage(false, "Query failed: " . $e->getMessage());
}
