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
							<label id="togglecontlabel">MainNetwork</label>
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
		<button id="sendpopup" data-toggle="modal"  id="sendTransSubmit">Submit</button>
		
		<p class="formerrorpara"></p>
		<div id ="txid"></div>
		<div class="double">			
			<p>
			  <button type="submit" id="sendTransactionBtn" ><i class="icon-check"></i> Send</button>
			</p>
		</div>
	</div>
	
</div>
</div>
</article>



<footer id="footer">
<ul>
<li>&copy; RecordsKeeper @<span class="date">2018</span></li>
<li><a href="./" target="_blank">Terms</a></li>
<li><a href="./" target="_blank">Privacy Policy</a></li>
<li><a href="http://explorer.recordskeeper.co/" target="_blank">Mainnet Explorer</a></li>
<li><a href="http://test-explorer.recordskeeper.co/" target="_blank">Testnet Explorer</a></li>
<li><a href="http://faucet.recordskeeper.co/" target="_blank">Faucet</a></li>
<li><a href="http://stats.recordskeeper.co/" target="_blank">Stats</a></li>
<li><a href="http://demo.recordskeeper.co/" target="_blank">Demo</a></li>
<li><a href="http://airdrop.recordskeeper.co/" target="_blank">Airdrop</a></li>
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


<!-- all the script here to make the page load faster -->



<script src = "javascript/jquery.js"></script>
<script src="javascript/scripts.js"></script>
<script src="javascript/custom.js"></script>
<script src="javascript/mobile.js"></script>
<script src="http://tablesorter.com/addons/pager/jquery.tablesorter.pager.js"></script>
<script src="javascript/table2CSV.js"></script>
 <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

<script src="javascript/bitcore-lib/bitcore-lib.min.js"></script>
<script src="javascript/bitcore-mnemonic/bitcore-mnemonic.min.js"></script>
<script src="javascript/bitcore-explorers/bitcore-explorers.min.js"></script>
<script src="javascript/app.js"></script>
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

	
				
					//getPagination('.table-class');
					//getPagination('table');
		  /*					PAGINATION 
		  - on change max rows select options fade out all rows gt option value mx = 5
		  - append pagination list as per numbers of rows / max rows option (20row/5= 4pages )
		  - each pagination li on click -> fade out all tr gt max rows * li num and (5*pagenum 2 = 10 rows)
		  - fade out all tr lt max rows * li num - max rows ((5*pagenum 2 = 10) - 5)
		  - fade in all tr between (maxRows*PageNum) and (maxRows*pageNum)- MaxRows 
		  */
		 
	function getPagination (table){
		  
		  	jQuery('.pagination').html('');						// reset pagination 
		  	var trnum = 0 ;									// reset tr counter 
		  	var maxRows =  20 ;		// get Max Rows from select option
		  	var totalRows = jQuery(table+' tbody tr').length;		// numbers of rows 
			 jQuery(table+' tr:gt(0)').each(function(){			// each TR in  table and not the header
			 	trnum++;									// Start Counter 
			 	if (trnum > maxRows ){						// if tr number gt maxRows
			 		
			 		jQuery(this).hide();							// fade it out 
			 	}if (trnum <= maxRows ){jQuery(this).show();}// else fade in Important in case if it ..
			 });											//  was fade out to fade it in 
			 if (totalRows > maxRows){						// if tr total rows gt max rows option
			 	var pagenum = Math.ceil(totalRows/maxRows);	// ceil total(rows/maxrows) to get ..  
			 												//	numbers of pages 
			 	for (var i = 1; i <= pagenum ;){			// for each page append pagination li 
			 	jQuery('.pagination').append('<li data-page="'+i+'">\
								      <span>'+ i++ +'<span class="sr-only">(current)</span></span>\
								    </li>').show();
			 	}											// end for i 
			} 												// end if row count > max rows
			jQuery('.pagination li:first-child').addClass('active'); // add active class to the first li 
			jQuery('.pagination li').on('click',function(e){		// on click each page
     	 
     	    e.preventDefault();

				var pageNum = jQuery(this).attr('data-page');	// get it's number
				var trIndex = 0 ;							// reset tr counter
				jQuery('.pagination li').removeClass('active');	// remove active class from all li 
				jQuery(this).addClass('active');					// add active class to the clicked 
				 jQuery(table+' tr:gt(0)').each(function(){		// each tr in table not the header
				 	trIndex++;								// tr index counter 
				 	// if tr index gt maxRows*pageNum or lt maxRows*pageNum-maxRows fade if out
				 	if (trIndex > (maxRows*pageNum) || trIndex <= ((maxRows*pageNum)-maxRows)){
				 		jQuery(this).hide();		
				 	}else {jQuery(this).show();} 				//else fade in 
				 }); 										// end of for each tr in table
					});										// end of on click pagination list
		
												// end of on select change 
		 
								
								// END OF PAGINATION 
	}	






</script>
</body>
</html>