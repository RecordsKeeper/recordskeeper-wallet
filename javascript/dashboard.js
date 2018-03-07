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
        $("#sendpopup").attr("data-toggle", "modal");
    }
}

function checkBoth(){

	if (inputVal.value == "" && inputVal1.value == "" ) {
		 $('#sendRecipientaddress').css('border', '1px solid red');
		 $('#sendBTC').css('border', '1px solid red');
		 $("#sendpopup").removeAttr('data-toggle');
		
		}

		else{
			 $("#sendpopup").attr("data-toggle", "modal");
		}

	}	