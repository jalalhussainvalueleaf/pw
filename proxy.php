<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, User-Agent, Cookie");
header("Content-Type: application/json");

// Enable error reporting (for debugging; remove in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Handle CORS preflight request
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $url = "https://admin.buddyloan.in/location.php";

    // Ensure payload is not empty
    if (empty($_POST)) {
        echo json_encode(["error" => "No data received"]);
        exit;
    }

    $postData = http_build_query($_POST);

    // Add missing headers
    $headers = [
        "Content-Type: application/x-www-form-urlencoded",
        "Accept: */*",
        "Cache-Control: no-cache",
        "Pragma: no-cache",
        "Origin: https://admin.buddyloan.in",
        "Referer: https://admin.buddyloan.in/latitude.html",
        "User-Agent: Mozilla/5.0 (Linux; Android 8.0.0; SM-G955U Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Mobile Safari/537.36",
    ];

    // Initialize cURL session
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // If SSL verification causes issues

    // Execute request
    $response = curl_exec($ch);
    
    // Handle cURL errors
    if (curl_errno($ch)) {
        echo json_encode(["error" => curl_error($ch)]);
    } else {
        echo $response;
    }

    curl_close($ch);
} else {
    echo json_encode(["error" => "Invalid request method"]);
}
?>