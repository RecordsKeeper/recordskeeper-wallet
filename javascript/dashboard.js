// var net = localStorage.getItem("network");

var approxFee ;
var totalSize ; 
var fixedSize ;
var hexlength;
var keylength;


jQuery(document).ready(function(){




      			jQuery("#myModal2").on("hidden.bs.modal", function () {   // this function is for when modal box closes what should be done.
      		   
      				 // jQuery(".modal-body").empty();
      		   });

             // jQuery('#tableone').DataTable();

           CONSOLE_DEBUG && console.log("net", net);

	 		        checkRecAddressFilled();  //function to validate address

              checkAmountFilled();		//function to check Amount

            jQuery("#transactid").click(function(){						
            		var xrkBalance = jQuery('#liBalanceBTC').val();
            		CONSOLE_DEBUG && console.log( 'xrkBalance', xrkBalance);

			     
			       if(xrkBalance != '0 XRK'){

			       	 if(jQuery("#tableone").length > 0){
			       	 	jQuery("#tableone").find("tr:gt(0)").remove();
			       	 	 getaddressbalances(net);
			       	 }

			       	 
			       	jQuery('#tableone').css("display", "table");


			       	jQuery('#notransaction').css("display", "none");

              getPagination('#tableone');
			       }

			          
			});


});




jQuery("#sendpopup").click(function(){
 keylength = jQuery('#keydata').val();
  keylength = keylength.length;
  CONSOLE_DEBUG && console.log("keylength is :", keylength, " bytes");
  hexlength = jQuery('#hexdata').val();
  hexlength = hexlength.length;
  CONSOLE_DEBUG && console.log("hexlength is :", hexlength, " bytes");

	var sendamount = jQuery('#sendBTC').val();
    if(Bal <  sendamount){


    	 jQuery('#myModal2').modal('hide');
    		
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
        
        jQuery('#sendpopup').removeAttr('data-toggle');

    }
    else{
        jQuery('#sendRecipientaddress').css('border', '1px solid green');
         // jQuery("#sendpopup").attr("data-toggle", "modal");
       
    }
}

function checkAmountFilled() {
  
    if (inputVal1.value == "") {
        

         jQuery('#sendpopup').removeAttr('data-toggle');
    }
    else{
        jQuery('#sendBTC').css('border', '1px solid green');
        // jQuery("#sendpopup").attr("data-toggle", "modal");
    }
}

function checkBoth(){

	

		if (inputVal.value == "") {

        		jQuery('#sendRecipientaddress').css('border', '1px solid red');



   		 }

		if (inputVal1.value == "") {
         jQuery('#sendBTC').css('border', '1px solid red');

         jQuery('#sendpopup').removeAttr('data-toggle');
         return false;
    	} 
    	

		if (inputVal.value == "" && inputVal1.value == "" ) {
		 jQuery('#sendRecipientaddress').css('border', '1px solid red');
		 jQuery('#sendBTC').css('border', '1px solid red');
		 jQuery("#sendpopup").removeAttr('data-toggle');
		
		}

		if (inputVal.value != "" && inputVal1.value == "" ) {
		 // jQuery('#sendRecipientaddress').css('border', '1px solid red');
		 jQuery('#sendBTC').css('border', '1px solid red');
		 jQuery("#sendpopup").removeAttr('data-toggle');
		
		}
		if (inputVal.value == "" && inputVal1.value != "" ) {
		 jQuery('#sendRecipientaddress').css('border', '1px solid red');
		 // jQuery('#sendBTC').css('border', '1px solid red');
		 jQuery("#sendpopup").removeAttr('data-toggle');
		
		}
		if (inputVal.value != "" && inputVal1.value != "" &&  keyData.value != ""  ) {
		 jQuery('#hexdata').css('border', '1px solid red');
		 // jQuery('#sendBTC').css('border', '1px solid red');
		 jQuery("#sendpopup").removeAttr('data-toggle');
		
		}

		if (inputVal.value != "" && inputVal1.value != "" &&  keyData.value != ""  &&  hexData.value != "") {





			
				jQuery('#hexdata').css('border', '1px solid green');
				jQuery('#keydata').css('border', '1px solid green');

				var netw = net;

        fixedSize = 328 + 39 ;
        totalSize = fixedSize + hexlength + keylength ; 

        approxFee  = (totalSize/1000)*0.1;


         jQuery('.approxFee').text('Approximate Fee : '+ approxFee+' XRK');

                var senderAddress = jQuery('#sendRecipientaddress').val();

                   jQuery('#sendpopup').removeAttr('data-toggle');

                    jQuery.ajax({
                     type: "POST",
                     url: 'validateaddress.php',
                     data:{net:net, senderAddress: senderAddress},
                     success:function(Response) {
                         var x = Response;
                         x = JSON.parse(x);

                          //  x = x.result;


                        CONSOLE_DEBUG && console.log('validate address result :', x);
                       
                        var  validateaddr =  x.result['isvalid'];
                         
                         CONSOLE_DEBUG && console.log('validate address result :', validateaddr);
                         
                          if( validateaddr == false){

                             CONSOLE_DEBUG && console.log('You Entered an Invalid Recipient Address');

                             jQuery('#myModal2').modal('hide');

                              // jQuery('#modalshowaddr').text('You Entered an invalid Recipient Address');
                              // jQuery('#modalshowaddr').css("color", "#c13434");
                              // jQuery('#sendUSD').css("display", "none");
                              // jQuery('#sendt').css("display", "none");
                              //  jQuery('h4.modal-title').css("color", "#c13434");
                              // jQuery('h4.modal-title').text('ERROR !');

                              // jQuery('#sendpopup').attr("data-target", "myModal3");

                           jQuery('#myModal1').modal('show');



                          }else{

                          	  jQuery('#myModal1').modal('hide');

                          	CONSOLE_DEBUG && console.log('You Entered valid Recipient Address');
                          	 // jQuery('h4.modal-title').text('Authorize Transaction ');
                          	 // jQuery('h4.modal-title').css("color", "#3f4453");
                          	 // jQuery('#modalshowaddr').css("color", "#3f4453");
                          	 // jQuery('#sendt').css("display", "block");
                          	 //  jQuery('#sendUSD').css("display", "block");
                          	 // jQuery('#modalshowaddr').text('Public Address : '+ pubaddr);
                          	 // document.getElementById('modalshowaddress').innerHTML = 'Public Address : '+ pubaddr;

                          	 jQuery('#myModal2').modal('show');

                          }
                         
                       
                       

                               
                       }
                   });

			 jQuery("#sendpopup").attr("data-toggle", "modal");
		
		}
		if (inputVal.value != "" && inputVal1.value != "" &&  keyData.value == ""  &&  hexData.value == "") {
				
        approxFee = 0.0328; 

        jQuery('.approxFee').text('Approximate Fee : '+approxFee+' XRK');

				var netw = net;

                var senderAddress = jQuery('#sendRecipientaddress').val();

                   jQuery('#sendpopup').removeAttr('data-toggle');

                    jQuery.ajax({
                     type: "POST",
                     url: 'validateaddress.php',
                     data:{net:net, senderAddress: senderAddress},
                     success:function(Response) {
                         var x = Response;
                         x = JSON.parse(x);

                          //  x = x.result;


                        CONSOLE_DEBUG && console.log('validate address result :', x);
                       
                        var  validateaddr =  x.result['isvalid'];
                         
                         CONSOLE_DEBUG && console.log('validate address result :', validateaddr);
                         
                          if( validateaddr == false){

                             CONSOLE_DEBUG && console.log('You Entered an Invalid Recipient Address');

                             jQuery('#myModal2').modal('hide');
                         	  jQuery('#myModal1').modal('show');



                          }else{

                          	  jQuery('#myModal1').modal('hide');

                          	CONSOLE_DEBUG && console.log('You Entered valid Recipient Address');
                         

                          	 jQuery('#myModal2').modal('show');

                          }
                         
                       
                       

                               
                       }
                   });

			 jQuery("#sendpopup").attr("data-toggle", "modal");
		
		}
		

		

	}	




