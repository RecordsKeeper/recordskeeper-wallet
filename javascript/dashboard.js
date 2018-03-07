$(document).ready(function(){

	

	 checkRecAddressFilled();

            checkAmountFilled();


});

$("#sendpopup").click(function(){
	checkBoth();

});


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
		

		else{


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

                             CONSOLE_DEBUG && console.log('You Entered an invalid Recipient Address');
                             $('#modalshowaddr').text('You Entered You Entered an invalid Recipient Address');
                              $('#modalshowaddr').css("color", "red");
                          }else{

                          	CONSOLE_DEBUG && console.log('You Entered valid Recipient Address');
                          	 $('#modalshowaddr').css("color", "#3f4453");
                          	 document.getElementById('modalshowaddress').innerHTML = 'Public Address : '+ pubaddr;
                          }
                         
                       
                       

                               
                       }
                   });

			 $("#sendpopup").attr("data-toggle", "modal");
		}

	}	