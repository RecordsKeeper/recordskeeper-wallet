<?php

?>
<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<title>RecordsKeeper</title>
		<meta name="description" content="">
		<meta name="keywords" content="">
		<meta name="theme-color" content="#212739">
		<meta name="MobileOptimized" content="320">
		<meta name="HandheldFriendly" content="true">
		<meta name="viewport" content="width=device-width, initial-scale=1, target-densitydpi=device-dpi">
		<meta name="author" content="http://psdhtml.me">
    <!-- Bootstrap core CSS -->
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">

   <link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet">

		<link rel="stylesheet" media="screen" href="styles/screen.css">
		<link rel="stylesheet" media="print" href="styles/print.css">
		<link rel="icon" type="image/x-icon" href="images/fav.png">
		<link rel="stylesheet" media="screen" href="styles/wallet.css">
		<!-- link for table to css cdn here  -->
		<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/TableExport/3.3.13/css/tableexport.css">
		<meta property="og:title" content="">
		<meta property="og:type" content="website">
		<meta property="og:description" content=".">
		<meta property="og:site_name" content="">
		<meta property="og:url" content="">
		<meta property="og:image" content="">
		<style type="text/css">



		</style>
		<script type='application/ld+json'>
			{
				"@context": "http://schema.org/",
				"@type": "Organization",
				"url": "",
				"name": "Vault0x",
				"legalName": "Vault0x",
				"description": "",
				"logo": "",
				"image": "",
				"author": "psdHTML.me",
				"contactPoint": {
					"@type": "ContactPoint",
					"contactType": "Customer service",
					"telephone": ""
				},
				"address": {
					"@type": "PostalAddress",
					"streetAddress": "",
					"addressLocality": "",
					"addressRegion": "",
					"postalCode": "",
					"addressCountry": ""
				}
			}
		</script>
	</head>
	<body>
		<div class="se-pre-con"></div>
		<div id="root">
			<header id="top">
				<p id="logo">
					<a href="./">
					<img src="images/logo.png">
					</a>
				</p>
				<nav id="skip">
					<ul>
						<li><a href="#nav" accesskey="n">Skip to navigation (n)</a></li>
						<li><a href="#content" accesskey="c">Skip to content (c)</a></li>
						<li><a href="#footer" accesskey="f">Skip to footer (f)</a></li>
					</ul>
				</nav>
       <div class="toggldiv">
          <ul>
            <!-- <li class="sub"><a accesskey="1" href="./">Tosh-2 <span>(Switch Device)</span></a> <em>(1)</em>
            <ul>
              <li><a href="./">Toshendra</a></li>
              <li class="active"><a href="./">Tosh-2</a></li>
              <li class="a"><a href="./">Add Device</a></li>
            </ul> -->
            <div id="togglecont">
              <input class="tgl tgl-light" id="cb1" type="checkbox"/>
                  <label class="tgl-btn" for="cb1"></label>
            </div>
            <span >
              <label id="togglecontlabel">TestNetwork</label>
            </span>
             
          
        </ul>
       </div>
				<nav id="nav">
					
				
			</nav>
		</header>
		
		
		<article id="content">
			<div class="row">
                <div class="loginContainer">
                    <div class="row">
                        <p>If you're a new user please click on the create XRK wallet button.</p>
                        <button type="submit" class="createwalletBtn margintop30" id="createkeypairsbtn" data-toggle="modal" data-target="#myModal">Create XRK Wallet</button>
                    </div>
                    <div class="row margintop30">
                        <p>If you already have XRK wallet, please enter your wallet address here. </p>
                        <input type = "text" class="registered_address logininputs" name="registered_adr" id="registered_adr" placeholder="Enter your XRK wallet address" value="">
                        <button type="submit" class="createwalletBtn margintop30" id="walletloginbtn">Submit</button>
                    </div>
                </div>
            </div>
        </article>



<footer id="footer">
<ul>
<li>Copyright RecordsKeeper @<span class="date">2018</span></li>
<li><a href="./" target="_blank">Terms</a></li>
<li><a href="./" target="_blank">Privacy Policy</a></li>
<li><a href="http://explorer.recordskeeper.co/" target="_blank">Mainnet Explorer</a></li>
<li><a href="http://test-explorer.recordskeeper.co/" target="_blank">Testnet Explorer</a></li>
<li><a href="http://faucet.recordskeeper.co/" target="_blank">Faucet</a></li>
<li><a href="http://stats.recordskeeper.co/" target="_blank">Stats</a></li>
<li><a href="http://demo.recordskeeper.co/" target="_blank">Demo</a></li>
</ul>
</footer>
</div>

<div id="myModal" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Recordskeeper Wallet</h4>
      </div>
      <div class="modal-body standfont">
        <p class="themecolor"><i class="fas fa-dot-circle themecolor maright10"></i>Your wallet has been created.<br>
          Please download your private key and save it at a safe place, you will need it for your trasactions.
          </p>
        <p id="modalshowaddress">
<!--          <input type="text" value="" name="modalshowaddress" id="modalshowaddress">-->
        </p>
        <p id ="modalshowkey">
          
        </p>
           <a download="Recordskeeper-wallet-key.json" id="downloadlink" download>Download</a>
<!--         <button id="create">Create file</button> <a download="Privkey.txt" id="downloadlink" >Download</a>-->
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>

  </div>
</div>     
<!-- all the script here to make the page load faster -->


<script src="javascript/jquery.js"></script>
<script src="javascript/scripts.js"></script>
<script src="javascript/custom.js"></script>
<script src="javascript/mobile.js"></script>
<script src="javascript/table2CSV.js"></script>
 <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/6.11.0/sweetalert2.all.min.js"></script>
<script src="https://code.jquery.com/jquery-2.2.4.min.js"
integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44="
crossorigin="anonymous"></script>
<script src="javascript/bitcore-lib/bitcore-lib.min.js"></script>
<script src="javascript/bitcore-mnemonic/bitcore-mnemonic.min.js"></script>
<script src="javascript/bitcore-explorers/bitcore-explorers.min.js"></script>
<!-- <script src="javascript/app.js"></script> -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.qrcode/1.0/jquery.qrcode.min.js"></script>
<script src="javascript/wallet.js"></script>

<script src="https://fastcdn.org/FileSaver.js/1.1.20151003/FileSaver.min.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/TableExport/3.3.13/js/tableexport.js"></script>

</body>
</html>

