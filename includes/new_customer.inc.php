<?php

require_once "mg_handle.inc.php";
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["name"]) || $data["name"] == "") {
	sendMessage(false, "Invalid name.");
	die();
}

if (!isset($data["phone"])) {
	sendMessage(false, "Invalid phone.");
	die();
}

if (!isset($data["email"])) {
	sendMessage(false, "Invalid email.");
	die();
}

if (!isset($data["address"])) {
	sendMessage(false, "Invalid address.");
	die();
}

$name = $data["name"];
$phone = $data["phone"];
$email = $data["email"];
$address = $data["address"];

try {
	require_once "db_handle.inc.php";

	$query = "INSERT INTO customer (name, phone, email, address) VALUES (:name, :phone, :email, :address);";
	$stmt = $pdo->prepare($query);
	$stmt->bindParam(":name", $name);
	$stmt->bindParam(":phone", $phone);
	$stmt->bindParam(":email", $email);
	$stmt->bindParam(":address", $address);

	$isAdded = $stmt->execute();

	if ($isAdded) {
		sendMessage(true, "Successfully added new customer.");
	} else {
		sendMessage(false, "Failed to add customer. Please try again.");
	}
} catch (PDOException $e) {
	sendMessage(false, "Query failed: " . $e->getMessage());
}
