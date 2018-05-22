<?php

$net = $_POST['net'];
if ($net == 'TestNetwork'){
$config = include('config-testnet.php');}
else {
  $config = include('config-mainnet.php');
}
$chain = $config['chain'];
$curl = curl_init();
//$pubaddr = $_POST['pubaddr'];
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
  CURLOPT_POSTFIELDS => "{\"method\":\"decoderawtransaction\",\"params\":[\"01000000020390880da434d12710de433c0e263d44a284713c0385e564f9df07ab73c5fa8a0000000000ffffffff8c674da8b44b8b14b5a024f128dbfd968972d9ffd55d3261102bdfe2e51caeb40000000000ffffffff02005a6202000000001976a9149a1b857b1ab67bd2e120c4f66ed270e4a4fce21e88ac20f1ca000000000017a9146345ab5f57503675609a1128dcdc9fcf4ca9fc228700000000\"],\"id\":1,\"chain_name\":\"$chain\"}\n",
  CURLOPT_HTTPHEADER => array(
    
    "Cache-Control: no-cache",
    "Content-Type: application/json",
    "Postman-Token: 547a26e5-d997-84ee-97e4-d1ddbd728be8"
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