<?php

function sendMessage ($ok, $message) {
	$sendData = new stdClass();
	$sendData->ok = $ok;
	$sendData->message = $message;

	echo json_encode($sendData);
}

if ($_SERVER["REQUEST_METHOD"] != "POST") {
	sendMessage(false, "Invalid request method.");
	return;
}
