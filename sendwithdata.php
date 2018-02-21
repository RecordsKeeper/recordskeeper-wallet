<?php


  include 'connection.php'; 

  $curl = curl_init();
  $methodname = 'sendwithdata';
  $AuthorizationName = 'Basic bXVsdGljaGFpbnJwYzpFNldxV2hWVG9RWW5FdkRGTFRXS3hReUpCa0N5dEVKcG56TEpoc2Z6cndYeg==';

  curl_setopt_array($curl, array(
   CURLOPT_PORT => $port,
  CURLOPT_URL => $url,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => "{\"method\":\"$methodname\",\"params\":[\"1VA8WF4q5Bm8JS9s5KjCvzeRHtQmR1Gkb5iAFT\",0,\"736f6d6520737472696e67\"],\"id\":1,\"chain_name\":\"chain1\"}",
  CURLOPT_HTTPHEADER => array(
    "Authorization: $AuthorizationName",
    "Cache-Control: no-cache",
    "Content-Type: application/json",
    "Postman-Token: 382086f3-e395-1212-8150-096161a8446f"
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