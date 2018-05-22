<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_PORT => "7344",
  CURLOPT_URL => "http://35.172.1.247:7344",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => "{\"method\":\"createmultisig\",\"params\": [3, [\"0280badd49864f958f5d7687425c790e19ed99ed420955a9e1e5bd6eb207474d16\", \"0309fe1d3c85158dc7677d899471193c0b5c3395b58d80fa2d0060f91e0673b392\", \"0332b5a8db801af18b09a69ca8a655f181641e7fa40d6689edff05e4ad3517ef24\", \"02d40c4d73cd1443e3fb86371dafd7c58f55973a1eedfe2c9cea031d6a3b1760f8\", \"026bb5f654aea84015faac29f6132522e6735773cf0c310457dcb6818a1250834d\"]],\"id\":\"curltext\",\"chain_name\":\"recordskeeper\"}",
  CURLOPT_HTTPHEADER => array(
    "Authorization: Basic cmtycGM6MlRSSkxXYWZNMXJES2hMRFpHV2I1c2JXNmNoTk1peVpOcDdBSk03YnRGNjM=",
    "Cache-Control: no-cache",
    "Content-Type: application/json",
    "Postman-Token: 499c986e-bde5-4039-8135-5c9ed8c6cfeb"
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