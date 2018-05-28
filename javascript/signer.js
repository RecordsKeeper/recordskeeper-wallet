jQuery(document).ready(function(){



        var getUrlParameter = function getUrlParameter(sParam) {
              var sPageURL = decodeURIComponent(window.location.search.substring(1)),
              sURLVariables = sPageURL.split('&'),
              sParameterName,
              i;

          for (i = 0; i < sURLVariables.length; i++) {
              sParameterName = sURLVariables[i].split('=');

              if (sParameterName[0] === sParam) {
                  return sParameterName[1] === undefined ? true : sParameterName[1];
              }
          }
      };
      //CONSOLE_DEBUG && console.log("multisigHex", multisig);
      var multisigtransactionHex = getUrlParameter('multisig');
      CONSOLE_DEBUG && console.log("multisigHex", multisigtransactionHex);
        jQuery("#signtxhex").text("Transaction Hex : "+ multisigtransactionHex);


    	jQuery("#signersend").click(function(){

    		sendmultisigvalue = jQuery("#signerprivkey").val();

    		
            signMultisigTransaction();
            

    	});
    	CONSOLE_DEBUG && console.log("net", net);

    	
      jQuery(".toggle-password").click(function() {

       jQuery(this).toggleClass("fa-eye fa-eye-slash");
       var input = jQuery(jQuery(this).attr("toggle"));
       if (jQuery('#signerprivkey').attr("type") == "password") {
         jQuery('#signerprivkey').attr("type", "text");
       } else {
         jQuery('#signerprivkey').attr("type", "password");
       }
      });
      

      

});
var  transactionID ;
var CONSOLE_DEBUG = true ;
var transactionUrl ;

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

  function changeToPassword(){
    document.getElementById("signerprivkey").type = 'text';
            jQuery("i.fas.fa-eye").addClass('fa-eye-slash');
           jQuery("i.fas.fa-eye").removeClass('fa-eye');
  }






function signMultisigTransaction(){


  var getUrlParameter = function getUrlParameter(sParam) {
         var sPageURL = decodeURIComponent(window.location.search.substring(1)),
         sURLVariables = sPageURL.split('&'),
         sParameterName,
         i;
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
};

    	var multisigtransactionHex = getUrlParameter('multisig');
    	CONSOLE_DEBUG && console.log("multisigHex", multisigtransactionHex);

      // jQuery("#signtxhex").text("Transaction Hex : "+ multisigtransactionHex);

    	var redeemScript = getUrlParameter('redeemScript');
    	CONSOLE_DEBUG && console.log("redeemScript", redeemScript);

    	var decodeMultisigVinTxid = getUrlParameter('txid');
    	CONSOLE_DEBUG && console.log("txid", decodeMultisigVinTxid);

    	var getRawTransactionResp = getUrlParameter('getRawTransactionResp');
    	CONSOLE_DEBUG && console.log("getRawTransactionResp", getRawTransactionResp);

    	var decodeMultisigVout = getUrlParameter('vout');
    	CONSOLE_DEBUG && console.log("vout", decodeMultisigVout);

      jQuery.ajax({
              type: "POST",
              url: 'signmultitransaction.php',
             
              data: {
                   net: net,   
                   multisigtransactionHex : multisigtransactionHex,
                   redeemScript : redeemScript,
                   decodeMultisigVinTxid : decodeMultisigVinTxid,
                   getRawTransactionResp : getRawTransactionResp,
                   decodeMultisigVout : decodeMultisigVout,
                   sendmultisigvalue : sendmultisigvalue
                  
              },

              success: function(Response) {
                 
                 var signmultiTransactionRes = Response ; 

                 signmultiTransactionRes = JSON.parse(signmultiTransactionRes);

                  CONSOLE_DEBUG && console.log("signmultiTransactionRes", signmultiTransactionRes);

                  if ( signmultiTransactionRes.result == null ){

                  	swal({
                  	icon: "error",
                      title: 'Incorrect Private Key',
                      html: '<p></p>',
                      type: 'error',
                      confirmButtonClass: "btn-danger",
                      confirmButtonText: "OK!",
                      timer: 15000
                  });

                  }

                 else{

                 				signmultiTransactionComplete = signmultiTransactionRes.result.complete;
                 				CONSOLE_DEBUG && console.log("signmultiTransactionComplete", signmultiTransactionComplete);
                 				 multisigsendhex = signmultiTransactionRes.result.hex;
  							

  				               if ( signmultiTransactionComplete == false){

  				                   signmultiTransactionHex = signmultiTransactionRes.result.hex;

  				                   CONSOLE_DEBUG && console.log("signmultiTransactionRes", signmultiTransactionHex);

  				                   

  				                    var URLBase = "http://wallet.recordskeeper.co/signer.php?multisig=";
  				                    var TrailingFixedData = signmultiTransactionHex;

  				                    finalURL = URLBase +  TrailingFixedData + "&redeemScript="+redeemScript+"&txid="+decodeMultisigVinTxid+"&vout="+decodeMultisigVout+"&getRawTransactionResp="+getRawTransactionResp;
  				                    CONSOLE_DEBUG && console.log("finalURL", finalURL);

  				                   jQuery(".signtransUrl").css("display", "block");
                             jQuery('#signerprivkey').val('');
                               jQuery('#signersend').prop('disabled', true);
                               jQuery('#signersend').removeClass('testnetColor');
                               jQuery('#signersend').addClass('disabledbtn');
  				                   jQuery(".signurl").text(finalURL);
  				                   jQuery(".asignhref").attr("href", finalURL);
                           

  	            				}

  				               else {

  				                 
                             // sendmultisig();
  							            
                             sendmultisig();

  							             if(net == "TestNetwork" ){

  							             	transactionUrl = "https://test-explorer.recordskeeper.co/RecordsKeeper%20Testnet/tx/" ;
  							             }
  							             else{

  							             	transactionUrl = "https://explorer.recordskeeper.co/RecordsKeeper%20Mainnet/tx/" ;
  							             }

  							             
  							            


                        
  				               }
                 }
              }

       });

}

function sendmultisig(){

    jQuery.ajax({
            type: "POST",
            url: 'sendmultisig.php',
           
            data: {
                net: net,
                
                multisigsendhex: multisigsendhex
                
            },

            success: function(Response) {
               
               var multiSigResponse = Response ;

               multiSigResp = JSON.parse(multiSigResponse);
               multiSigResponse = multiSigResp.result ;
               CONSOLE_DEBUG && console.log("sendmultisig Response : ", multiSigResponse);
               transactionID = multiSigResponse ;

              if( multiSigResponse == null && multiSigResp.error['code'] == -26  ){

               		swal({
	                	icon: "error",
	                    title: 'Amount is too low for multisig transaction',
	                    html: '<p></p>',
	                    type: 'error',
	                    confirmButtonClass: "btn-danger",
	                    confirmButtonText: "OK!",
	                    timer: 15000
               		 });

               }

               else if( multiSigResponse == null ){

                  swal({
                    icon: "error",
                      title: 'Transaction already in Blockchain',
                      html: '<p></p>',
                      type: 'error',
                      confirmButtonClass: "btn-danger",
                      confirmButtonText: "OK!",
                      timer: 15000
                   });

               }

               else {
                 swal({
                              title: 'Transaction Successful !',
                              html: '<a href="' + transactionUrl + transactionID +'" target="_blank"> <b>Check Transaction status here:</b><br>'+ transactionID +'</a>',
                              type: 'success',
                              confirmButtonClass: "btn-success",
                              confirmButtonText: "Close!",
                              timer: 15000
                          });
                 
                 
               }
               
              
              

              
              

            }

          });

       

}


var returnsendmultisigValue ;









