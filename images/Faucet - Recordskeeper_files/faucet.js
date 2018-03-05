
/////////////////////////////////
   // Recordskeeper Faucet 	  //
  // Shuchi Tyagi			 //
 // Toshblocks innovations  //
/////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////


$(document).ready(function(){
		 // Animate loader off screen
		   $(".se-pre-con").fadeOut("slow");  // fadeout the preloader

});







function sendXRK(){
    
    jQuery.post("../rk-faucet/php/send.php", { "address": address})
        .done(function(data) {
            if(data.success){
                console.log("Transaction ID",data.result);
                jQuery('#address').val('');
                swal({
                    type: 'success',
                    title: data.result,
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
            else{
                console.log("Could not process request");
                console.log(data);
                jQuery('#address').val('');
                swal({
                    type: 'error',
                    title: 'Please try again!',
                    showConfirmButton: false,
                    timer: 1500
                  })
            }

        });
            
}
jQuery(document).ready(function() {
    document.getElementById('send').addEventListener('click', function(e) {
        address = jQuery('#address').val();
        if(address!=''){
            sendXRK();
        }      
        else{
            $('#address').css('border', '1px solid #ea2121')
        } 
    });
});