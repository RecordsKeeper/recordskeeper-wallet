<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_PORT => "8378",
  CURLOPT_URL => "http://35.170.155.89:8378",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => "{\"method\":\"signrawtransaction\",\"params\":[\"01000000020390880da434d12710de433c0e263d44a284713c0385e564f9df07ab73c5fa8a0000000000ffffffff8c674da8b44b8b14b5a024f128dbfd968972d9ffd55d3261102bdfe2e51caeb40000000000ffffffff02005a6202000000001976a9149a1b857b1ab67bd2e120c4f66ed270e4a4fce21e88ac20f1ca000000000017a9146345ab5f57503675609a1128dcdc9fcf4ca9fc228700000000\", [{\"txid\":\"8afac573ab07dff964e585033c7184a2443d260e3c43de1027d134a40d889003\",\"vout\":0,\"scriptPubKey\":\"a9146345ab5f57503675609a1128dcdc9fcf4ca9fc2287\", \"redeemScript\": \"52210226fd80ab058f885792b1ce95253fbdc768a3551065fe3975c80887f1cb7efc472102939bed4c1b8234af738c4ef04f03897cba80d126513958841cd3e08f7a35f05e2103490aabe5e766768b815387141e5a6fddab8eae3d84bcc175b557426946dfdb0c53ae\"}], [\"cN788c94GKF87L2u3wVoqoamKDJZ4jmks7hC2bC1UbHdrbXGGj6A\"]],\"id\":1,\"chain_name\":\"recordskeeper-test\"}\n",
  CURLOPT_HTTPHEADER => array(
    "Authorization: Basic cmtycGM6M1c0aHByUUx3c2h4N2RpamhTQlkzZjJvZk40Y2RqYmhlQ2VSMVZGN3p4Y3A=",
    "Cache-Control: no-cache",
    "Content-Type: application/json",
    "Postman-Token: 7e19115f-dbf2-9844-ebf4-d80cd3152248"
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