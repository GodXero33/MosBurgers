<?php

require_once "mg_handle.inc.php";
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["creation_date"]) || $data["creation_date"] == "") {
	sendMessage(false, "Invalid creation date.");
	die();
}

if (!isset($data["type"]) || $data["type"] == "") {
	sendMessage(false, "Invalid type.");
	die();
}

if (!isset($data["detail"]) || $data["detail"] == "") {
	sendMessage(false, "Invalid detail.");
	die();
}

$creation_date = $data["creation_date"];
$type = $data["type"];
$detail = $data["detail"];

try {
	require_once "db_handle.inc.php";

	$query = "INSERT INTO report (creation_date, type, detail) VALUES (:creation_date, :type, :detail);";
	$stmt = $pdo->prepare($query);
	$stmt->bindParam(":creation_date", $creation_date);
	$stmt->bindParam(":type", $type);
	$stmt->bindParam(":detail", $detail);
	$isAdded = $stmt->execute();

	if ($isAdded) {
		sendMessage(true, "Successfully added new report.");
	} else {
		sendMessage(false, "Failed to add report. Please try again.");
	}
} catch (PDOException $e) {
	sendMessage(false, "Query failed: " . $e->getMessage());
}
