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
		 <!-- Bootstrap core CSS -->
    	<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
    	<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.16/css/jquery.dataTables.min.css">
		<meta name="author" content="http://psdhtml.me">
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
	<style type="text/css">
			html {
  height: 100%;
}
body {
  min-height: 100% !important;
  display: grid !important;
  grid-template-rows: 1fr auto !important;
}
footer {
  grid-row-start: 2 !important;
  grid-row-end: 3 !important;
}
#signersend{
	display: block !important  !important; 
}
#content {
    position: relative;
    z-index: 2;
    min-height: 68vh;
}
		</style>
	<body>
		<div class="se-pre-con"></div>
		<div id="root">
			<header id="top">
				<p id="logo">
					<a href="./">
					<img src="images/logo.svg">
					</a>
				</p>
				<nav id="skip">
					<ul>
						<li><a href="#nav" accesskey="n">Skip to navigation (n)</a></li>
						<li><a href="#content" accesskey="c">Skip to content (c)</a></li>
						<li><a href="#footer" accesskey="f">Skip to footer (f)</a></li>
					</ul>
				</nav>
				<nav id="nav">
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
							<label id="togglecontlabel">Main Network</label>
						</span>
						 
					
				</ul>
				
			</nav>
		</header>
		
	
		<article id="content">
			<div class="container">
			  
			   <div class="row">
			   		<div class="col-md-12 col-sm-12"><span class="showaddr mtop34"></span><span><a href="./">
				   				<img src="images/wallet.png" class="walletpng" data-toggle="tooltip" title="Create / Import Wallet">
				   			</a></span> </div>
			   		<div class="col-md-1 col-sm-12">
			   			<p class="text-right walletpngcont"></p>
			   				
				   		<p class="text-right">
				   			
				   		</p>
			   		</div>
			   </div>
			  
			</div>
			<div class="tabs-a">
				<ul>
					<li><a href="./" id="transactid">Transactions</a></li>
					<li><a href="./">Receive</a></li>
					<li class="normalsend"><a href="./" class="normalsend">Send</a></li>
					<li class="multisend"><a href="./">Send</a></li>
				</ul>
				<div>
					<div>
						<ul class="list-charts">
							<li>
								<span id = "alpha">Balance</span>
								<ul>
									<li id="liBalanceBTC"></li>
<!--									<li id="liBalanceUSD"></li>-->
								</ul>
								
							</li>

						</ul>
		<header class="double">


			<h2>Transactions History</h2>
						<!-- <select class  ="form-control" name="state" id="maxRows">
							  <option value=" ">select rows</option>
							 <option value="5">5</option>
							 <option value="10">10</option>
							 <option value="15">15</option>
							 <option value="20">20</option>
							 
						</select> -->

			<ul class="list-inline">

				<li><a ><i class="icon-csv" id="export"></i> <span class="hidden">Download CSV</span></a></li>
				
			</ul>
		</header>
		<hr class="theme-color"></hr>
		<div class="theme-color" id="notransaction">
			<p class="errorcolor"> No Transaction yet.</p>
		 </div>
		<table class="table-a" id="tableone" data-paging="true">
			<tr>
				<th>Transaction ID</th>
				<th>Time</th>
				
				
				<th>Transaction Amount</th>
			</tr>
			
			
		</table>
		<ul class="pagination pull-right">
		    <li><a href="#">1</a></li>
		    
		</ul>
	</div>
	<div>
		<h2>Public Address </h2>
		<!-- <P class="pcolor">Address </P> -->
        <P class="pcolor">Use this address to receive payments.</P>
		<div class="cols-a">
			<div>
				<table class="table-b">
					<tr>
						
					</tr>
					
					
				</table>
				<p class="link-btn text-center"><a class="b" id="addChildAddress"><i class="icon-plus"></i> Add Fresh Address</a></p>
			</div>
			<aside>
				<figure>
				
					<div id="divQrCode">
						
					</div>
				</figure>
			</aside>
		</div>
	</div>
	<!-- <div  name="myForm" method="post" class="" id="pfform">
		<h2>Send Payments</h2>
		<div class="quadruple a">
			<p>
				<label for="faa">Enter Amount</label>
				<input type="number" id="sendBTC" name="sendBTC">
				<span class="suffix">XRK</span>
			</p>
			<p>
				<label for="fab">Enter the private key</label>
				<input type="text" id="sendUSD" name="fab">
				<span class="suffix">key</span>
			</p>
			<p>
				<label for="sendRecipientaddress">Enter Receipient Address after checking</label>
				<input type="text" id="sendRecipientaddress" name="sendRecipientaddress">
				<span class="suffix"><i class="icon-qr"></i></span>
			</p>
		</div>
		<p>
			<label for="fac">Enter the data to save</label>
			<input type="text" name="senddata" value="" placeholder="Send Data" id="hexdata">
		</p>
		<p>
			<label for="fad">Enter the key label for transaction</label>
			<input type="text" name="sendd" value="" placeholder="Send key" id="keydata">
		</p>
		<p class="formerrorpara">
			
		</p>
		<div id ="txid"></div>
		<div class="double">
			
			<p><button type="submit" id="sendTransactionBtn" ><i class="icon-check"></i> Send</button>
			
			<button id="sendt">SEND</button>

			
			</p>
		</div>
	</div> -->
	<div  name="myForm" method="post" class="sendform" id="pfform">
		<p class="showaddr fnone senderaddr">
				Sender's
		</p>
		<div class="">
			
			<p>
				<label for="sendRecipientaddress">Enter Recipient Address </label>
				<input type="text" id="sendRecipientaddress" name="sendRecipientaddress" placeholder="Recipient Address" onchange="checkRecAddressFilled();">
				<span class="suffix"><i class="icon-qr"></i></span>
		    </p>

		    <p>
				<label for="faa">Enter XRK Amount</label>
				<input type="number" id="sendBTC" name="sendBTC" placeholder="XRK Amount" onchange="checkAmountFilled();">
				<span class="suffix">XRK</span>
			</p>
			<p class="approxFee ">
				Approximate Fee : 
			</p>

		</div>
		<div class="row">
			<div class="col-md-4">
				<hr class="hrcolor">
			</div>
			<div class="col-md-4 text-center optionalrecdata">
				<p class="theme-color theme-color"> Optional Record Data </p>
			</div>
			<div class="col-md-4">
				<hr class="hrcolor">
			</div>
		</div>
		<div class="optionaldiv">
			
			<p>
				<label for="fad">Enter the key label for Transaction</label>
				<input type="text" name="sendd" value="" placeholder="Record Identifier Key" id="keydata">
			</p>

			<p>
			<label for="fac">Enter the Data to save</label>
			<input type="text" name="senddata" value="" placeholder="Optional Data" id="hexdata">
			</p>

		</div>
		<button id="sendpopup" data-toggle="modal"  id="sendTransSubmit">Send Transaction</button>
		
		<p class="formerrorpara"></p>
		<div id ="txid"></div>
		<div class="double">			
			<p>
			  <button type="submit" id="sendTransactionBtn" ><i class="icon-check"></i> Send</button>
			</p>
		</div>
	</div>
	<div  name="multiForm" method="post" class="sendform" id="multiForm">
		<p class="showaddr fnone senderaddr">
				Sender's
		</p>
		<div class="">
			
			<p>
				<label for="sendRecipientaddress">Enter Recipient Address </label>
				<input type="text" id="sendRecipientaddressmulti" name="sendRecipientaddressmulti" placeholder="Recipient Address" onchange="checkRecAddressFilled();">
				<span class="suffix"><i class="icon-qr"></i></span>
		    </p>

		    <p>
				<label for="faa">Enter XRK Amount</label>
				<input type="number" id="multisigAmount" name="multisigAmount" placeholder="XRK Amount" >
				<span class="suffix">XRK</span>
			</p>
			<p class="approxFee ">
				Approximate Fee : 
			</p>
			<div class="signtransUrl">

				
				<a href="" class="asignhref">
					
				<p class="sharethisUrl">Click here and then Share the url to other signers to complete the transaction</p>	
						
					</p>
				</a>
			</div>
		</div>
		
		<button id="sendmultitran"  data-toggle="modal" data-target="#multisigModal">Send Transaction</button>
		
		<p class="formerrorpara"></p>
		<div id ="txid"></div>
		
	</div>
	
</div>
</div>
</article>



<footer id="footer">
<ul>
		<li>&copy; RecordsKeeper @ 2016-2018. All rights reserved</li>
		<li><a href="./" target="_blank">Terms</a></li>
		<li><a href="./" target="_blank">Privacy Policy</a></li>
		<li><a href="http://explorer.recordskeeper.co/" target="_blank">Mainnet Explorer</a></li>
		<li><a href="http://test-explorer.recordskeeper.co/" target="_blank">Testnet Explorer</a></li>
	
		<li><a href="http://faucet.recordskeeper.co/" target="_blank">Faucet</a></li>
		<li><a href="http://stats.recordskeeper.co/" target="_blank">Blockchain Statistics</a></li>
		<li><a href="http://miner.recordskeeper.co/" target="_blank">Miner Statistics</a></li>
		<li><a href="http://airdrop.recordskeeper.co/" target="_blank">Airdrop</a></li>
		<li><a href="http://demo.recordskeeper.co/" target="_blank">Demo</a></li>
	    <li><a href="https://docs.recordskeeper.co/" target="_blank">Docs</a></li>


</ul>
</footer>
</div>
<div id="myModal2" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close " id="cancelBtn" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Authorize Transaction</h4>
      </div>
      <div class="modal-body standfont">
      		
        	<p class="privatemodalcontainer">
				<label for="fab" id="modalshowaddr">Enter the private key for XRK address : </label>
				<input type="password" id="sendUSD" name="fab">
				<span class="suffix">key</span>
			</p>
			<p class="approxFee themefee">
				
			</p>

      </div>
      <div class="modal-footer">
        <button id="sendt">SEND</button>
        <button type="button" class="close errorclose "  data-dismiss="modal">CANCEL</button>
      </div>
    </div>

  </div>
</div>     


<div id="myModal1" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title errorcolor">Error !</h4>
      </div>
      <div class="modal-body standfont">
      		
        	<p class="errorcolor">
				You Entered an invalid Recipient Address
			</p>

      </div>
      <div class="modal-footer">
        
        <button type="button" class="close errorclose" id="" data-dismiss="modal">CLOSE</button>
      </div>
    </div>

  </div>
</div>     

<div id="myModalmulti" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title ">Send Multisig Transaction !</h4>
      </div>
      <div class="modal-body standfont">
      		
        	<p class="privatemodalcontainer">
				<label for="fab" id="modalshowaddr">Enter the private key for XRK address : 12XknhsaS8BHSn2RWbKMHRKRRTyt8fr6Nyzudg</label>
				<input type="password" id="sendmulti" name="fab">
				<span class="suffix">key</span>
			</p>
			<p class="approxFee themefee">Approximate Fee : 0.0328 XRK</p>

      </div>
      <div class="modal-footer">
        
        <button type="button" class="close errorclose" id="" data-dismiss="modal">CLOSE</button>
      </div>
    </div>

  </div>
</div>


<div id="multisigModal" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title ">Send Multisig Transaction !</h4>
      </div>
      <div class="modal-body standfont">
      		
        	<p class="privatemodalcontainer">
				<label for="fab" id="modalshowaddr">Enter the private key :</label>
				<input type="password" id="sendmultisig" name="fab">
				<span class="suffix">key</span>
			</p>
			<p class="approxFee themefee">Approximate Fee : 0.0328 XRK</p>


			<button id="signmultitransaction" data-toggle="modal" data-target="#multisigModal" class="testnetColor">Sign Transaction</button>
      </div>
      <div class="modal-footer">
        
        <button type="button" class="close errorclose" id="" data-dismiss="modal">CLOSE</button>
      </div>
    </div>

  </div>
</div>
<!-- all the script here to make the page load faster -->



<script src = "javascript/jquery.js"></script>
<script src="javascript/scripts.js"></script>
<script src="javascript/custom.js"></script>
<script src="javascript/mobile.js"></script>

<script src="javascript/table2CSV.js"></script>
 <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

<script src="javascript/bitcore-lib/bitcore-lib.min.js"></script>
<script src="javascript/bitcore-mnemonic/bitcore-mnemonic.min.js"></script>
<script src="javascript/bitcore-explorers/bitcore-explorers.min.js"></script>
<script src="javascript/app.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.qrcode/1.0/jquery.qrcode.min.js"></script>
<script src="javascript/wallet.js"></script>
<script src="javascript/dashboard.js"></script>

    <script src="https://ajax.aspnetcdn.com/ajax/jquery.validate/1.11.1/jquery.validate.min.js"></script>

<script src="https://fastcdn.org/FileSaver.js/1.1.20151003/FileSaver.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/6.11.0/sweetalert2.all.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/TableExport/3.3.13/js/tableexport.js"></script>

<script type="text/javascript">

$(document).ready(function(){
	
});







</script>
</body>
</html>
