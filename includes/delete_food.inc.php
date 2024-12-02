<?php

require_once "mg_handle.inc.php";
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["code"]) || $data["code"] == "") {
	sendMessage(false, "Invalid food code.");
	die();
}

$code = $data["code"];

try {
	require_once "db_handle.inc.php";

	$query = "SELECT * FROM food_item WHERE (code = :code);";
	$stmt = $pdo->prepare($query);
	$stmt->bindParam(":code", $code);
	$executed = $stmt->execute();

	if (!$executed) {
		sendMessage(false, "Failed to delete food. Please try again.");
		$pdo = null;
		$stmt = null;
		die();
	}

	$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

	if (empty($results)) {
		sendMessage(false, "Failed tofind the food item with the code '" . $code . "'.");
		$pdo = null;
		$stmt = null;
		die();
	}

	$query = "DELETE FROM food_item WHERE (code = :code);";
	$stmt = $pdo->prepare($query);
	$stmt->bindParam(":code", $code);
	$executed = $stmt->execute();

	if (!$executed) {
		sendMessage(false, "Failed to delete food. Please try again.");
		$pdo = null;
		$stmt = null;
		die();
	}

	sendMessage(true, "Successfully deleted the food item with the code '" . $code . "'.");

	$pdo = null;
	$stmt = null;
} catch (PDOException $e) {
	sendMessage(false, "Query failed: " . $e->getMessage());
}
