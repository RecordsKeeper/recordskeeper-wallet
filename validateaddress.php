<?php
$net = $_POST['net'];
if ($net == 'TestNetwork'){
$config = include('config-testnet.php');}
else {
  $config = include('config-mainnet.php');
}
$chain = $config['chain'];
$curl = curl_init();
$sendraddr = $_POST['senderAddress'];
curl_setopt_array($curl, array(
  CURLOPT_PORT => $config['rk_port'],
  CURLOPT_URL => $config['rk_host'],
  CURLOPT_USERPWD => $config['rk_user'].":".$config['rk_pass'],
  CURLOPT_HTTPAUTH => CURLAUTH_BASIC,
 CURLOPT_RETURNTRANSFER => true,
 CURLOPT_ENCODING => "",
 CURLOPT_MAXREDIRS => 10,
 CURLOPT_TIMEOUT => 30,
 CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
 CURLOPT_CUSTOMREQUEST => "POST",
 CURLOPT_POSTFIELDS => "{\"method\":\"validateaddress\",\"params\":[\"$sendraddr\"],\"id\":\"curltext\",\"chain_name\":\"$chain\"}",
 CURLOPT_HTTPHEADER => array(
   "authorization: Basic cmtycGM6M1c0aHByUUx3c2h4N2RpamhTQlkzZjJvZk40Y2RqYmhlQ2VSMVZGN3p4Y3A=",
   "cache-control: no-cache",
   "content-type: application/json"
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