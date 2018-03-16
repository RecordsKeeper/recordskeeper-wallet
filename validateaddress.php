<?php

$net = $_POST['net'];

$senderAddress = $_POST['senderAddress'];

if ($net == 'TestNetwork'){
	$config = include('config-testnet.php');
}
else {
   $config = include('config-mainnet.php');
}

$chain = $config['chain'];

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
 CURLOPT_POSTFIELDS => "{\"method\":\"validateaddress\",\"params\":[\"$senderAddress\"],\"id\":\"curltext\",\"chain_name\":\"$chain\"}",
 CURLOPT_HTTPHEADER => array(
   
   "cache-control: no-cache",
   "content-type: application/json",
   "postman-token: 06d167c0-7880-8938-7816-ba97cee2affe"
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
