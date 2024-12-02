<?php

$host = "localhost";
$port = 3307;
$dbName = "mos_burgers";
$dbusername = "root";
$dbpassword = "";

$dsn = "mysql:host=$host;port=$port;dbname=$dbName";
$pdo = null;

try {
	$pdo = new PDO($dsn, $dbusername, $dbpassword); // pdo for php data object
	$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
	echo "Connection failed: " . $e->getMessage();
}
