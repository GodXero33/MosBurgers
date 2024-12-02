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

$name = $data["name"];
$price = $data["price"];

try {
	require_once "db_handle.inc.php";

	$query = "UPDATE food_item SET price = :price WHERE name = :name";
	$stmt = $pdo->prepare($query);
	$stmt->bindParam(":name", $name);
	$stmt->bindParam(":price", $price);

	$isUpdated = $stmt->execute();

	if ($isUpdated) {
		sendMessage(true, "Successfully updated the food price.");
	} else {
		sendMessage(false, "Failed to update food price. Please try again.");
	}

	$pdo = null;
	$stmt = null;
} catch (PDOException $e) {
	sendMessage(false, "Query failed: " . $e->getMessage());
}
