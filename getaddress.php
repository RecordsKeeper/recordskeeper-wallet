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
  CURLOPT_POSTFIELDS => "{\"method\":\"$method\",\"params\":[],\"id\":1,\"chain_name\":\"$chain\"}",
  CURLOPT_HTTPHEADER => array(
    "Authorization: Basic bXVsdGljaGFpbnJwYzpFNldxV2hWVG9RWW5FdkRGTFRXS3hReUpCa0N5dEVKcG56TEpoc2Z6cndYeg==",
    "Cache-Control: no-cache",
    "Content-Type: application/json",

    "Postman-Token: a86186b7-785e-6ae0-9028-ea8798e97eeb"

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
