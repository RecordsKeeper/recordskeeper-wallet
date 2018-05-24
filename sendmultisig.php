<?php

$net = $_POST['net'];
if ($net == 'TestNetwork'){
$config = include('config-testnet.php');}
else {
  $config = include('config-mainnet.php');
}
$chain = $config['chain'];

$multisigsendhex  = $_POST['multisigsendhex'];


//$pubaddr = $_POST['pubaddr'];
$curl = curl_init();
curl_setopt_array($curl, array(
   CURLOPT_PORT => $config['rk_port'],
  CURLOPT_URL => $config['rk_host'],
  CURLOPT_USERPWD => $config['rk_user'].":".$config['rk_pass'],
 CURLOPT_RETURNTRANSFER => true,
 CURLOPT_ENCODING => "",
 CURLOPT_MAXREDIRS => 10,
 CURLOPT_TIMEOUT => 30,
 CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
 CURLOPT_CUSTOMREQUEST => "POST",
 CURLOPT_POSTFIELDS => "{\"method\":\"sendrawtransaction\",\"params\":[\"$multisigsendhex\"],\"id\":1,\"chain_name\":\"recordskeeper-test\"}",
 CURLOPT_HTTPHEADER => array(
   "Authorization: Basic cmtycGM6M1c0aHByUUx3c2h4N2RpamhTQlkzZjJvZk40Y2RqYmhlQ2VSMVZGN3p4Y3A=",
   "Cache-Control: no-cache",
   "Content-Type: application/json",
   "Postman-Token: 56ebfa2b-8a5b-172d-98bb-dc8e1ecb77cf"
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