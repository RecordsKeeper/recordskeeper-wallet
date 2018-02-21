
	/////////////////////////////
   // Recordskeeper Wallet JS //
  // Adarsha Jha			 //
 // Toshblocks innovations  //
/////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

$( document ).ready(function() { // document ready function starts here, so you can call all the function which you want to run after the DOM is ready
		  
		   // Animate loader off screen
		   $(".se-pre-con").fadeOut("slow");  // fadeout the preloader

		   var Newwalletflag = 1; // SET the Newwalletflag to 1
      	  
		   var newAddressCount = 1; // set the newAddressCounter to 1

		   listwallettransactions(); // call listwallettransactions() here which is mentioned down below

		   converTableToCSV(); // call converTableTOCSV function here when the DOM is ready.

		   onClickToCopy(); //click to copy ClipBoard and show a small tooltip notification

		   onClickEye();  // on click eye selects the address and generates the correct qrcode

		   	
		   sendTransaction(); // send Transaction function 
		   
			

		   networkToggle(); // Network Toggle function
		   

		   if(document.getElementById("currentdate") != null){
		   	 document.getElementById("currentdate").innerHTML = Date();
		   }

		 
		

		   if(document.getElementById("sendBTC") !=null){
		   	    document.getElementById("sendBTC").addEventListener("keyup", sendBTCFunction);
		   } 
		   if(document.getElementById("sendUSD") != null){
		   	   document.getElementById("sendUSD").addEventListener("keyup", sendUSDFunction);

		   }  
		 
}); //document ready function ends here 




/*
onClickEye : This function changes the qr code as per the corresponding addresses.
params : null 
*/

function onClickEye(){
    	   $(document).on("click", ".icon-eye", function(e){
    	   			 $('tr').css("background-color", "");
    	   			 $(this).parent().parent().parent().css( "background-color", "#ecf1f6" ).delay( 800 );
              		 var id = $(this).attr("id").substr(7).trim();
               		 var childAddressesValue = $('#childAddresses'+id).html();// get the value in #childAddresses

               		 console.log(childAddressesValue, "childAddressesValue");
					 jQuery("#divQrCode").empty();//empty the div first
					 jQuery("#divQrCode").qrcode({ 
					    width: 204,
					    height: 204,
					    text: childAddressesValue
					 }); 
			});    // icon-eye click function block ends here 		       
}
/*
onClickToCopy : This function copies the corresponding addresses when clicked on clickToCopy Btn.
params : null 
*/
function onClickToCopy(){
	$(document).on("click", ".clickToCopy", function(){
					$(this).parent().append("<div class='notify'>copied</div>").delay(3000);


					var id = $(this).attr("id").substr(11).trim();
					copyToClipBoard(id);
					


					
				});
}
/* 
copyToClipBoard : It Copies the html of element childAddresses
@param: id
@return: executes Copy command
*/
function copyToClipBoard(id) {
    var $temp = $("<input>");
    $("body").append($temp);
	$temp.val($('#childAddresses'+id).text()).select();
	document.execCommand("copy");
	$temp.remove();
}
/* 
getCurrentBTCRate : It uses get method to get the current rates of BTC.
@param: urlCoinDesk - This is the url for  api to get the current BTC rates.
@return: This returns the current Bitcoin rate
*/
 function getCurrentBTCRate(urlCoinDesk){
		    $.ajax({
	           type: 'GET', // type of method
	           url: urlCoinDesk, // get the url from the variable 
	           success: function(data) {
		               data;  
		               console.log(data);
		               var responseData = JSON.parse(data); // parse the json data
		               var  currentBTCRate = responseData.bpi.USD.rate; // currentBTCRate logic
		               
		               $('#liCurrentBTCRate').html("$"+ currentBTCRate); // add value to the li element #liCurrentBTCRate
		               currentBTCRate = currentBTCRate.replace(/,/g,""); // remove commas from the currentBTCRate value that is coming from the coindesk
		               glbCurrentBTCRate = currentBTCRate;// pass current rate to  glbCurrentBTCRate
		               currentBTCRate = parseFloat(currentBTCRate); // parse the currentBTCRate value into Float
		               var liExpensesBTC = $('#liExpensesBTC').html(); // add the value of liExpensesBTC to the id #liExpensesBTC
		               liExpensesBTC = parseFloat(liExpensesBTC); // parse the value of liExpensesBTC into float
		               var liExpensesUSD = liExpensesBTC * currentBTCRate; // liExpensesUSD equals to multiplication of liExpensesBTC and currentBTCRate
		               liExpensesUSD = liExpensesUSD.toFixed(2); // show decimal values only upto two digits using javascript function .tofixed(2)
		               $('#liExpensesUSD').html("$"+ liExpensesUSD);// add value to the li element #liExpensesUSD
		               var liIncomeBTC = $('#liIncomeBTC').html();// get the value of element #liIncomeBTC
		               liIncomeBTC = parseFloat(liIncomeBTC);// parse the value of liIncomeBTC into float
		               liIncomeUSD = liIncomeBTC * currentBTCRate; // liIncomeUSD value euqals to multiplication of liIncomeBTC and currentBTCRate		              
		               liIncomeUSD = liIncomeUSD.toFixed(2); // round the decimal value of liIncomeUSD to two digits
		               $('#liIncomeUSD').html("$" + liIncomeUSD);// add the value of liIncomeUSD to the element #liIncomeUSD
		               var liBalanceBTC = $('#liBalanceBTC').html(); // get the html value of element #liBalanceBTC
		               liBalanceBTC = parseFloat(liBalanceBTC); // parse the value into float 
		               liBalanceUSD = liBalanceBTC * currentBTCRate;// liBalanceUSD value equals to the multiplication of liBalanceBTC and currentBTCRate
		               liBalanceUSD = liBalanceUSD.toFixed(2);// round the liBalanceUSD to two digits
		               $('#liBalanceUSD').html("$" + liBalanceUSD);// attach the value of liBalanceUSD to the element #liBalanceUSD	              
	          		 }
      		});
 }
	


function sendBTCFunction() {
    var x = document.getElementById("sendBTC");
    x=  x.value ;
    x = parseFloat(x);   
    var sendUSD = document.getElementById('sendUSD').value;
    sendUSD = x * glbCurrentBTCRate ;
    sendUSD = sendUSD.toFixed(2);

    document.getElementById('sendUSD').value = sendUSD;      
}

/*
sendUSDFunction : Onkeyup function convert the value of input sendBTC.
@param: none
*/

function sendUSDFunction(){
 	var x = document.getElementById("sendUSD");
 	x = x.value;
 	x = parseFloat(x);
 	var sendBTC = document.getElementById("sendBTC").value;
 	sendBTC = x / glbCurrentBTCRate;
 	console.log(sendBTC);
 	document.getElementById('sendBTC').value = sendBTC;
}


// sendwithdata function here that makes a post request to sendwithdata.php
//params : NULL
// get_address
function sendwithdata() {
	$.ajax({
	type: "POST",
	url: 'sendwithdata.php',
	data:{action:'get_address'},
	success:function(html) {
	var x = JSON.parse(html);
	
	console.log('result in json format',x);
	x = x.result;
	}
	
	});
}



		// getaddress function here that makes a post request to getaddress.php
	   //  params : NULL
	  // get_address

		function getaddress() {
			$.ajax({
			type: "POST",
			url: 'getaddress.php',
			data:{action:'get_address'},
			success:function(html) {
			var x = JSON.parse(html);
				id ++;
				console.log('id', id);
			newAddressCount ++;
			// console.log('result in json format',x);
			x = x.result;
			

			// generateQRcode();
			$('.table-b').append("<tr> <td>"+ newAddressCount +"</td> <td id = 'childAddresses"+newAddressCount+"'>"+x +"</td> <td><a ><i class='icon-eye' id='btnShow"+newAddressCount+"'></i><span class='hidden'>Show</span></a></td><td class='link-btn a'><a class='a clickToCopy' id='clickToCopy"+newAddressCount+"'>Click To Copy</a></td><td class='qrcody'>"+generateQRcode()+"</td></tr>"); // add a table row here

			console.log(x);

			}
			});
		}


// listwallettransactions()
function listwallettransactions(){
	$.ajax({
		type:"POST",
		url:'listwallettransactions.php',
		data:{action:'wallet_Transactions'},
		success: function(body){
			var x = JSON.parse(body);

			var date = new Date();
			console.log(x, "x");
			for(var i= 0; i < x.result.length; i++) {

				$('.table-a').append("<tr> <td id='childAddresses'>"+x.result[i].myaddresses[0]+"</td><td>"+date+"</td><td>"+x.result[i].balance['amount']+ "</td></tr>");

			}
			 // add a table row here   

		}
	});
}





// code to generate qr code 
function generateQRcode(){
		id ++ ;
		qrgenerate = $('#childAddresses').html();

		jQuery("#divQrCode").qrcode({
			    //render:"table"
			    width: 204,
			    height: 204,
			    text: qrgenerate
		});

}

$('#addChildAddress').click(function(){

	if ($( "#divQrCode" ).has( "canvas" ))
		 { 
		 	$('canvas').remove();
		 }
		 	getaddress();
});




// 






// 

// toHex() function here that converts any string toHex
// Params : str 
// return : hex 

function toHex(str) {
	var hex = '';
	for(var i=0;i<str.length;i++) {
		hex += ''+str.charCodeAt(i).toString(16);
	}
	return hex;
}



// validateForm function that is on Send tab 
// Params : NULL
// Return : NULL


function validateForm(e) {
    var BTCvalue = document.forms["myForm"]["sendBTC"].value;
    var AddressRec = document.forms["myForm"]["sendRecipientaddress"].value;
    if (BTCvalue == "") {
        $('.formerrorpara').fadeIn('slow').text('Enter the amount !! ');

        return false;
    }
    if (AddressRec == "") {
         $('.formerrorpara').fadeIn('slow').text('Enter the Reciepient Address !! ');
        return false;
    }
    if(BTCvalue != 0 && AddressRec != 0) {



    	sendwithdata();

			
    	
    }


}

var  newAddressCount = 0;


// ToggleNetwork() function here to allow users to change the network on toggle
// params : 
// Return : NULL 
	
	function ToggleNetwork(){

		if($('#cb1').is(':checked'))
			{
			  // document.getElementById('togglecontlabel').innerHTML == 'Mainnetwork' ;
			 $('#togglecontlabel').text("Testnetwork").fadeIn('slow');
			 $('#togglecontlabel').append("<input type = 'Hidden' name = 'Port' id='Port' value = ''>");
			 $('#togglecontlabel').append("<input type = 'Hidden' name = 'Url' id='Url' value = ''>");
			 $('#togglecontlabel').append("<input type = 'Hidden' name = 'ChainName' id='ChainName'  value = ''>");
			 $('#togglecontlabel').append("<input type = 'Hidden' name = 'Authorization' id='Authorization' value = ''>");
			 $("#top").css("background", "#212739");
			 $('#Port').text = Port;
			 Port = 8348;
			 nodeUrl = "http://52.91.207.11:8348";
			 ChainName = 'chain1';
			 Authorization = 'Basic bXVsdGljaGFpbnJwYzpFNldxV2hWVG9RWW5FdkRGTFRXS3hReUpCa0N5dEVKcG56TEpoc2Z6cndYeg==';
			 console.log ('Testnetwork: ', 'Port', Port , 'URLnode' , nodeUrl, 'ChainName: ', ChainName, 'Authorization', Authorization);
			 nodeUrl;
			 ChainName;
			 Authorization;



			}
			else
			{
				// document.getElementById('togglecontlabel').innerHTML == 'Testnetwork';
				 $('#togglecontlabel').text("Mainnetwork").fadeIn('slow');
				 nodeUrl;
				 ChainName;
				 Authorization;
				 $('#top').css('background', "rgb(17, 63, 74)");

				 // unchecked
				 Port = 6798;
				 nodeUrl = "http://52.86.200.44:6798";
				 ChainName = 'recordskeeper';
				 Authorization = 'Basic bXVsdGljaGFpbnJwYzpFNldxV2hWVG9RWW5FdkRGTFRXS3hReUpCa0N5dEVKcG56TEpoc2Z6cndYeg==';

				 qrgenerate;
				  console.log ('Mainnetwork: ', 'Port', Port , 'URLnode' , nodeUrl, 'ChainName: ', ChainName, 'Authorization', Authorization);
			}

	}

function converTableToCSV(){
 	$("#export").click(function(){
		$("#table-a").table2csv('output', {appendTo: '#out'});
		$("#table-a").table2csv();
	}); 	
}

function CopyToClipboard(){
	$('#clickToCopy1').on("click", function(){
		alert('Click to copy!');
	});



}

function sendTransaction(){
	$('#sendTransactionBtn').click(function(){
		   		sendwithdata();
		   	});
}



function networkToggle(){
  $('.tgl-btn').click(function(){
		ToggleNetwork();
	});
}

function filterTable() {
  var input, filter, table, tr, td, i;
  input = document.getElementById("lia");
  filter = input.value.toUpperCase();
  table = document.getElementById("tableone");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}
// Globally declare values of port and url

var Port = 8348;
var nodeUrl = "http://52.91.207.11:8348";
var ChainName = 'chain1';
var Authorization = 'Basic bXVsdGljaGFpbnJwYzpFNldxV2hWVG9RWW5FdkRGTFRXS3hReUpCa0N5dEVKcG56TEpoc2Z6cndYeg==';

var qrgenerate;

var id = 0;


