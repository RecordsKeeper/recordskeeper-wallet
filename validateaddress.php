<?php

$curl = curl_init();

curl_setopt_array($curl, array(
 CURLOPT_PORT => "8378",
 CURLOPT_URL => "http://35.170.155.89:8378/",
 CURLOPT_RETURNTRANSFER => true,
 CURLOPT_ENCODING => "",
 CURLOPT_MAXREDIRS => 10,
 CURLOPT_TIMEOUT => 30,
 CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
 CURLOPT_CUSTOMREQUEST => "POST",
 CURLOPT_POSTFIELDS => "{\"method\":\"validateaddress\",\"params\":[\"1KJFg5YLpvYNYZtCM6hhNYW8uBKtc3GHVboXco\"],\"id\":\"curltext\",\"chain_name\":\"recordskeeper-test\"}",
 CURLOPT_HTTPHEADER => array(
   "authorization: Basic cmtycGM6M1c0aHByUUx3c2h4N2RpamhTQlkzZjJvZk40Y2RqYmhlQ2VSMVZGN3p4Y3A=",
   "cache-control: no-cache",
   "content-type: application/json",
   "postman-token: fbe6b6c8-c259-050c-82a1-e700dd3cdf71"
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