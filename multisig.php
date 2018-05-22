<?php
$net = $_POST['net'];
if ($net == 'TestNetwork'){
$config = include('config-testnet.php');}
else {
  $config = include('config-mainnet.php');
}
$chain = $config['chain'];
$curl = curl_init();
$requiredSignatures  = $_POST['requiredSignatures'];
$net  = $_POST['net'];
$publicKeys  = $_POST['publicKeys'];
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
 CURLOPT_POSTFIELDS => "{\"method\":\"addmultisigaddress\",\"params\": [2, [\"0226fd80ab058f885792b1ce95253fbdc768a3551065fe3975c80887f1cb7efc47\",\"02939bed4c1b8234af738c4ef04f03897cba80d126513958841cd3e08f7a35f05e\", \"03490aabe5e766768b815387141e5a6fddab8eae3d84bcc175b557426946dfdb0c\"]] ,\"id\":1,\"chain_name\":\"$chain\"}",
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