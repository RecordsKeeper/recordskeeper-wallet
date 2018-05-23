<?php

$net = $_POST['net'];
if ($net == 'TestNetwork'){
$config = include('config-testnet.php');}
else {
  $config = include('config-mainnet.php');
}
$chain = $config['chain'];
$multisigtransactionHex  = $_POST['multisigtransactionHex'];





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
  CURLOPT_POSTFIELDS => "{\"method\":\"decoderawtransaction\",\"params\":[\"$multisigtransactionHex\"],\"id\":1,\"chain_name\":\"$chain\"}\n",
  CURLOPT_HTTPHEADER => array(
    
    "Cache-Control: no-cache",
    "Content-Type: application/json",

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