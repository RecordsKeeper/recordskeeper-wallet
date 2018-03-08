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
							<label id="togglecontlabel">TestNetwork</label>
						</span>
						 
					
				</ul>
				
			</nav>
		</header>
		
		
		<article id="content">
			<div > <p class="showaddr"></p> </div>
			<div class="tabs-a">
				<ul>
					<li><a href="./" id="transactid">Transactions</a></li>
					<li><a href="./">Receive</a></li>
					<li><a href="./">Send</a></li>
					<!-- <li><a href="./">Sign &amp; Verify</a></li> -->
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
<!--
							<li>
								<span>Income</span>
								<ul>
									<li id="liIncomeBTC">8.1966585 XRK</li>
									<li id="liIncomeUSD">$ 65,789.63</li>
								</ul>
								
							</li>
-->
<!--
							<li>
								<span>Expenses</span>
								<ul>
									<li id="liExpensesBTC">6.1966585 XRK</li>
									<li id="liExpensesUSD">$ 41396.11</li>
								</ul>
								
							</li>
-->
<!--
							<li>
								<span>Rate</span>
								<ul>
									<li>1.00 XRK</li>
									<li id="liCurrentBTCRate">$ 5,572.36</li>
								</ul>
								
							</li>
-->
						</ul>
		<header class="double">


			<h2>Transactions History</h2>

			<ul class="list-inline">
<!--
				<li class="a"><span id="currentdate"> </span><a href="./"><i class="icon-filter"></i> Filters</a></li>
				<li>
					<form action="./" method="post">
						<p>
							<label for="lia">Search</label>
							<input type="text" id="lia" name="lia" required  onkeyup="filterTable()">
							<button type="submit">Submit</button>
						</p>
					</form>
				</li>
-->
				<li><a ><i class="icon-csv" id="export"></i> <span class="hidden">Download CSV</span></a></li>
				
			</ul>
		</header>
		<hr class="theme-color"></hr>
		<div class="theme-color" id="notransaction">
			<p class="errorcolor"> No Transaction yet.</p>
		 </div>
		<table class="table-a" id="tableone">
			<tr>
				<th>Transaction ID</th>
				<th>Time</th>
				
				
				<th>Transaction Amount</th>
			</tr>
			
			
		</table>
	</div>
	<div>
		<h2>Public Address </h2>
		<!-- <P class="pcolor">Address </P> -->
        <P class="pcolor">Use this address to recieve payments.</P>
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
		<!-- <h2 class="showaddr">Send Payments</h2> -->
		<p class="showaddr fnone senderaddr">
				Sender's
		</p>
		<div class="">
			
<!-- 
			<p>
				<label for="fab">Enter the private key</label>
				<input type="text" id="sendUSD" name="fab">
				<span class="suffix">key</span>
			</p>
 -->
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
		<button id="sendpopup" data-toggle="modal"  id="sendTransSubmit">Submit</button>
		
		<p class="formerrorpara">
			
		</p>
		<div id ="txid"></div>
		<div class="double">
			
			<p><button type="submit" id="sendTransactionBtn" ><i class="icon-check"></i> Send</button>
			
			

			
			</p>
		</div>
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

<div id="myModal2" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Authorize Transaction</h4>
      </div>
      <div class="modal-body standfont">
      		
        	<p>
				<label for="fab" id="modalshowaddr">Enter the private key for XRK address : </label>
				<input type="password" id="sendUSD" name="fab">
				<span class="suffix">key</span>
			</p>

      </div>
      <div class="modal-footer">
        <button id="sendt">SEND</button>
        <button type="button" class="close errorclose" data-dismiss="modal">CLOSE</button>
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
        
        <button type="button" class="close errorclose" data-dismiss="modal">CLOSE</button>
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
<script src="https://code.jquery.com/jquery-2.2.4.min.js"
integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44="
crossorigin="anonymous"></script>
<script src="javascript/bitcore-lib/bitcore-lib.min.js"></script>
<script src="javascript/bitcore-mnemonic/bitcore-mnemonic.min.js"></script>
<script src="javascript/bitcore-explorers/bitcore-explorers.min.js"></script>
<!-- <script src="javascript/app.js"></script> -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.qrcode/1.0/jquery.qrcode.min.js"></script>
<script src="javascript/wallet.js"></script>
<script src="javascript/dashboard.js"></script>
<script src="https://fastcdn.org/FileSaver.js/1.1.20151003/FileSaver.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/6.11.0/sweetalert2.all.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/TableExport/3.3.13/js/tableexport.js"></script>

<script type="text/javascript">

//	do the work after everything was loaded (DOM, media elements) 
//	params : null 
// 	return : NULL

	window.onload = function () {
	getaddressbalances(); //load the first address on page load.

	}

 // on click of export button download all list transactions into csv format
 // table2csv js library is used here which has a function table2csv
 // Name of the file can be changed by going to the libray in the javascript folder
 // so let's put this code inside a function called convertTableToCSV


	


</script>
</body>
</html>