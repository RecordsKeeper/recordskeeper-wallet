$(document).ready(function(){

			$("#myModal2").on("hidden.bs.modal", function () {   // this function is for when modal box closes what should be done.
		   
				 // $(".modal-body").empty();
			});

	 		checkRecAddressFilled();  //function to validate address

            checkAmountFilled();		//function to check Amount

            $("#transactid").click(function(){						
            		var xrkBalance = $('#liBalanceBTC').val();
            		CONSOLE_DEBUG && console.log( 'xrkBalance', xrkBalance);
			     
			       if(xrkBalance != '0 XRK'){

			       	 if($("#tableone").length > 0){
			       	 	$("#tableone").find("tr:gt(0)").remove();
			       	 	 getaddressbalances(net);
			       	 }

			       	 
			       	$('#tableone').css("display", "table");

			       	$('#notransaction').css("display", "none");
			       }

			          
			});


});

$("#sendpopup").click(function(){

	var sendamount = $('#sendBTC').val();
    if(Bal <  sendamount){


    	 $('#myModal2').modal('hide');
    		
         swal({
                   title:'Insufficient Funds ! ',
                   type: 'error',
                   confirmButtonClass: "btn-danger",
                    confirmButtonText: "OK!",
                   timer: 15000
             });


    }
    else{
    	checkBoth();
    }
	



});

var  pubaddr = localStorage.getItem("pubaddr");

var keyData = document.getElementById("keydata");

var hexData = document.getElementById("hexdata");

 var inputVal = document.getElementById("sendRecipientaddress");

 var inputVal1 = document.getElementById("sendBTC");

function checkRecAddressFilled() {
 
    if (inputVal.value == "") {
        
        $('#sendpopup').removeAttr('data-toggle');

    }
    else{
        $('#sendRecipientaddress').css('border', '1px solid green');
         // $("#sendpopup").attr("data-toggle", "modal");
       
    }
}

function checkAmountFilled() {
  
    if (inputVal1.value == "") {
        

         $('#sendpopup').removeAttr('data-toggle');
    }
    else{
        $('#sendBTC').css('border', '1px solid green');
        // $("#sendpopup").attr("data-toggle", "modal");
    }
}

function checkBoth(){

	

		if (inputVal.value == "") {

        		$('#sendRecipientaddress').css('border', '1px solid red');



   		 }

		if (inputVal1.value == "") {
         $('#sendBTC').css('border', '1px solid red');

         $('#sendpopup').removeAttr('data-toggle');
         return false;
    	} 
    	

		if (inputVal.value == "" && inputVal1.value == "" ) {
		 $('#sendRecipientaddress').css('border', '1px solid red');
		 $('#sendBTC').css('border', '1px solid red');
		 $("#sendpopup").removeAttr('data-toggle');
		
		}

		if (inputVal.value != "" && inputVal1.value == "" ) {
		 // $('#sendRecipientaddress').css('border', '1px solid red');
		 $('#sendBTC').css('border', '1px solid red');
		 $("#sendpopup").removeAttr('data-toggle');
		
		}
		if (inputVal.value == "" && inputVal1.value != "" ) {
		 $('#sendRecipientaddress').css('border', '1px solid red');
		 // $('#sendBTC').css('border', '1px solid red');
		 $("#sendpopup").removeAttr('data-toggle');
		
		}
		if (inputVal.value != "" && inputVal1.value != "" &&  keyData.value != ""  ) {
		 $('#hexdata').css('border', '1px solid red');
		 // $('#sendBTC').css('border', '1px solid red');
		 $("#sendpopup").removeAttr('data-toggle');
		
		}

		if (inputVal.value != "" && inputVal1.value != "" &&  keyData.value != ""  &&  hexData.value != "") {
			
				$('#hexdata').css('border', '1px solid green');
				$('#keydata').css('border', '1px solid green');

				var netw = net;

                var senderAddress = $('#sendRecipientaddress').val();

                   $('#sendpopup').removeAttr('data-toggle');

                    $.ajax({
                     type: "POST",
                     url: 'validateaddress.php',
                     data:{net:netw, senderAddress: senderAddress},
                     success:function(Response) {
                         var x = Response;
                         x = JSON.parse(x);

                          //  x = x.result;


                        CONSOLE_DEBUG && console.log('validate address result :', x);
                       
                        var  validateaddr =  x.result['isvalid'];
                         
                         CONSOLE_DEBUG && console.log('validate address result :', validateaddr);
                         
                          if( validateaddr == false){

                             CONSOLE_DEBUG && console.log('You Entered an Invalid Recipient Address');

                             $('#myModal2').modal('hide');

                              // $('#modalshowaddr').text('You Entered an invalid Recipient Address');
                              // $('#modalshowaddr').css("color", "#c13434");
                              // $('#sendUSD').css("display", "none");
                              // $('#sendt').css("display", "none");
                              //  $('h4.modal-title').css("color", "#c13434");
                              // $('h4.modal-title').text('ERROR !');

                              // $('#sendpopup').attr("data-target", "myModal3");

                           $('#myModal1').modal('show');



                          }else{

                          	  $('#myModal1').modal('hide');

                          	CONSOLE_DEBUG && console.log('You Entered valid Recipient Address');
                          	 // $('h4.modal-title').text('Authorize Transaction ');
                          	 // $('h4.modal-title').css("color", "#3f4453");
                          	 // $('#modalshowaddr').css("color", "#3f4453");
                          	 // $('#sendt').css("display", "block");
                          	 //  $('#sendUSD').css("display", "block");
                          	 // $('#modalshowaddr').text('Public Address : '+ pubaddr);
                          	 // document.getElementById('modalshowaddress').innerHTML = 'Public Address : '+ pubaddr;

                          	 $('#myModal2').modal('show');

                          }
                         
                       
                       

                               
                       }
                   });

			 $("#sendpopup").attr("data-toggle", "modal");
		
		}
		if (inputVal.value != "" && inputVal1.value != "" &&  keyData.value == ""  &&  hexData.value == "") {
				


				var netw = net;

                var senderAddress = $('#sendRecipientaddress').val();

                   $('#sendpopup').removeAttr('data-toggle');

                    $.ajax({
                     type: "POST",
                     url: 'validateaddress.php',
                     data:{net:netw, senderAddress: senderAddress},
                     success:function(Response) {
                         var x = Response;
                         x = JSON.parse(x);

                          //  x = x.result;


                        CONSOLE_DEBUG && console.log('validate address result :', x);
                       
                        var  validateaddr =  x.result['isvalid'];
                         
                         CONSOLE_DEBUG && console.log('validate address result :', validateaddr);
                         
                          if( validateaddr == false){

                             CONSOLE_DEBUG && console.log('You Entered an Invalid Recipient Address');

                             $('#myModal2').modal('hide');
                         	  $('#myModal1').modal('show');



                          }else{

                          	  $('#myModal1').modal('hide');

                          	CONSOLE_DEBUG && console.log('You Entered valid Recipient Address');
                         

                          	 $('#myModal2').modal('show');

                          }
                         
                       
                       

                               
                       }
                   });

			 $("#sendpopup").attr("data-toggle", "modal");
		
		}
		

		

	}	