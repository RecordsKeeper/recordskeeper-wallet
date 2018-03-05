<?php

include 'connection.php';

$curl = curl_init();

curl_setopt_array($curl, array(
   CURLOPT_PORT => $port,
  CURLOPT_URL => $url,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => "{\"method\":\"listwallettransactions\",\"params\":[10, 0, false, false],\"id\":1,\"chain_name\":\"chain1\"}",
  CURLOPT_HTTPHEADER => array(
    "Authorization: Basic bXVsdGljaGFpbnJwYzpFNldxV2hWVG9RWW5FdkRGTFRXS3hReUpCa0N5dEVKcG56TEpoc2Z6cndYeg==",
    "Cache-Control: no-cache",
    "Content-Type: application/json",
    "Postman-Token: e54afd96-09c3-9755-038c-c5c138529903"
  ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}