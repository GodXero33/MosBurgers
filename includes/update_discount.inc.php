<?php

require_once "mg_handle.inc.php";
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["name"]) || $data["name"] == "") {
	sendMessage(false, "Invalid food name.");
	die();
}

if (!isset($data["discount"]) || !is_numeric($data["discount"])) {
	sendMessage(false, "Invalid food discount.");
	die();
}

$name = $data["name"];
$discount = $data["discount"];

try {
	require_once "db_handle.inc.php";

	$query = "UPDATE food_item SET discount = :discount WHERE name = :name";
	$stmt = $pdo->prepare($query);
	$stmt->bindParam(":name", $name);
	$stmt->bindParam(":discount", $discount);

	$isUpdated = $stmt->execute();

	if ($isUpdated) {
		sendMessage(true, "Successfully updated the food discount.");
	} else {
		sendMessage(false, "Failed to update food discount. Please try again.");
	}
} catch (PDOException $e) {
	sendMessage(false, "Query failed: " . $e->getMessage());
}
