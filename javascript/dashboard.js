$(document).ready(function(){

	 checkRecAddressFilled();

            checkAmountFilled();

});



function checkRecAddressFilled() {
  var inputVal = document.getElementById("sendRecipientaddress");
    if (inputVal.value == "") {
        $('#sendRecipientaddress').css('border', '1px solid red');
        $('#sendpopup').removeAttr('data-toggle');

    }
    else{
        $('#sendRecipientaddress').css('border', '1px solid green');
        $("#sendpopup").attr("data-toggle", "modal");
    }
}

function checkAmountFilled() {
  var inputVal = document.getElementById("sendBTC");
    if (inputVal.value == "") {
        $('#sendBTC').css('border', '1px solid red');
         $('#sendpopup').removeAttr('data-toggle');
    }
    else{
        $('#sendBTC').css('border', '1px solid green');
        $("#sendpopup").attr("data-toggle", "modal");
    }
}