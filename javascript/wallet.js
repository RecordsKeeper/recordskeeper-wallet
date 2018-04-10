
bitcore = require('bitcore-lib');
Mnemonic = require('bitcore-mnemonic');
buffer = bitcore.util.buffer;





var CONSOLE_DEBUG = true;
var privkey1;
var  pubaddr;
var pubkey1;
var net = localStorage.getItem("network");
var Bal ;
pubaddr =localStorage.getItem("pubaddr");
var mainNetAddr;
var testNetAddr;
var address_pubkeyhash_version ;
var address_checksum_value ;
var private_key_version ;
wordListLang = 'ENGLISH';
entropyLength = 256;
password = ''; 
var seed ;


jQuery( document ).ready(function() { // document ready function starts here, so you can call all the function which you want to run after the DOM is ready
         
           // Animate loader off screen

           jQuery(".se-pre-con").fadeOut("slow");           // fadeout the preloader
           var Newwalletflag = 1;                     //  SET the Newwalletflag to 1     
           var newAddressCount = 1;                  //   set the newAddressCounter to 1

            showAddress();

             // getPagination('#tableone');

            $(".modal").on("hidden.bs.modal", function(){
                $(".restorebefore").css("display", "block");
                $(".restoreappend").remove();

            });
            
           

            clearModalInputs();

            recieve();
            if(net == "MainNetwork"){

                  address_pubkeyhash_version= '0041bb05';
                  address_checksum_value = '07cb53da' ;
                  private_key_version = '80fbe117' ;
                  CONSOLE_DEBUG && console.log("address_pubkeyhash_version", address_pubkeyhash_version);
                  CONSOLE_DEBUG && console.log("address_checksum_value", address_checksum_value);
                  CONSOLE_DEBUG && console.log("private_key_version", private_key_version);




                  jQuery('#top').css('background', '#22283a');
                  jQuery('#top').css('color', '#ffffff');
                  jQuery('.tgl-light').prop('checked', true);
                  jQuery('#togglecontlabel').text('Main Network');
                  jQuery('nav#nav').css('background', '#22283a');
                  jQuery('#walletloginbtn').click(function(){
                          mainNetAddr = jQuery('#registered_adr').val() ;
                          localStorage.setItem("mainNetAddr", mainNetAddr);
                   });

                      mainNetAddr = localStorage.getItem("mainNetAddr");
                     jQuery('#registered_adr').val(mainNetAddr);
                     jQuery("#printimg").attr("src","images/mainnet.png");
                     jQuery('walletheader').css('background', '#22283a');
            }
           else if(net == "TestNetwork"){

                address_pubkeyhash_version= '6F';
                address_checksum_value = '00000000';
                private_key_version = 'EF';
                CONSOLE_DEBUG && console.log("address_pubkeyhash_version", address_pubkeyhash_version);
                  CONSOLE_DEBUG && console.log("address_checksum_value", address_checksum_value);
                  CONSOLE_DEBUG && console.log("private_key_version", private_key_version);


                jQuery('#top').css('background', '#54b2ce');
                jQuery('#togglecontlabel').text('Test Network');
                jQuery('button').addClass('testnetColor');
                jQuery('nav#nav').css('background', 'rgb(84, 178, 206)');
                jQuery('#walletloginbtn').click(function(){

                          testNetAddr = jQuery('#registered_adr').val() ;
                          localStorage.setItem("testNetAddr", testNetAddr);
                   });
                 testNetAddr = localStorage.getItem("testNetAddr");
                     jQuery('#registered_adr').val(testNetAddr);
                      jQuery("#printimg").attr("src","images/testnet.png");
                       jQuery('walletheader').css('background', 'rgb(84, 178, 206)');
           }
           else{

                  address_pubkeyhash_version= '0041bb05';
                  address_checksum_value = '07cb53da' ;
                  private_key_version = '80fbe117' ;
                  CONSOLE_DEBUG && console.log("address_pubkeyhash_version", address_pubkeyhash_version);
                  CONSOLE_DEBUG && console.log("address_checksum_value", address_checksum_value);
                  CONSOLE_DEBUG && console.log("private_key_version", private_key_version);

               net == "MainNetwork";
               localStorage.setItem("network", "MainNetwork");
                jQuery('#cb1').prop('checked', true);
               jQuery('#walletloginbtn').click(function(){

                          mainNetAddr = jQuery('#registered_adr').val() ;
                          localStorage.setItem("mainNetAddr", mainNetAddr);
                });

                mainNetAddr = localStorage.getItem("mainNetAddr");
                jQuery('#registered_adr').val(mainNetAddr);
                 jQuery("#printimg").attr("src","images/mainnet.png");
                 jQuery('walletheader').css('background', '#22283a');
           }

            
           networkToggle(); // Network Toggle function
           
           if(document.getElementById("currentdate") != null){
             document.getElementById("currentdate").innerHTML = Date();
           }

           jQuery("#walletloginbtn").click(function(){
             var netw = net;
             pubaddr = jQuery("#registered_adr").val();
             
             net = localStorage.getItem("network");
             
             CONSOLE_DEBUG && console.log("wallet address " , pubaddr);
              if(pubaddr == '' ){
                
                 jQuery("#registered_adr").css("border", "1px solid red");

              } else{

                  importAddress(net);

      
              }     
           });


          restoreWallet();

          createXrkHDWallet();
            



         
});     //document ready function ends here 


    
      









jQuery("#createkeypairsbtn").click(function(){

    // if (jQuery("#qrcode").contains(img) ; )
  if (jQuery('#qrcode').length) {
    jQuery('#qrcode img').remove();
    jQuery('#qrcode2 img').remove();
  } 
  else {
    CONSOLE_DEBUG && console.log ('Oops! qr code broke');
  }
    // if( )

    createkeypairs(net);     
});



// createkeypair function() that creates key pairs 
// Params : net 
// Return : 



  // importAddress function imports the address generated after createkeypairs 
 //  Params : net 
//   Return :

function importAddress(netw) {
    var local =netw;
    var a = pubaddr;
    jQuery.ajax({
       type: "POST",
       url: 'importaddress.php',
       data:({public: a, net: local}),
        success:function(Response) {
            var x = Response;
            x = JSON.parse(x);

            var y = x.error;
            CONSOLE_DEBUG && console.log("value here : ",y);
             if (y != null){
                  swal({
                     title:'Invalid Address!',
                     type: 'error',
                     confirmButtonClass: "btn-danger",
                      confirmButtonText: "Close!",
                     timer: 15000
                  });
             }
            else{
          //  x = x.result;
              CONSOLE_DEBUG && console.log('importaddress result :', x);
              window.location.href = "home.php";
            } 
      }  
    });
}

// onCreateImportAddress function()
// Params : netw
// return : none 


function onCreateImportAddress(netw) {
    var local =netw;
    var a = pubaddr;
    CONSOLE_DEBUG && console.log(a);
    jQuery.ajax({
       type: "POST",
       url: 'importaddress.php',
       data:({public: a, net: local}),
        success:function(Response) {
            var x = Response;
            x = JSON.parse(x);

            var y = x.error;
           CONSOLE_DEBUG && console.log("value here : ",y);
           if (y != null){
                swal({
                   title:'Invalid Address!',
                   type: 'error',
                   confirmButtonClass: "btn-danger",
                    confirmButtonText: "Close!",
                   timer: 15000
                });
           }
           else{
        //  x = x.result;
            CONSOLE_DEBUG && console.log('onCreateimportaddress result :', x);
            
        }
        
      }  
    });
}






function getaddressbalances() {
    var local =localStorage.getItem("network");;
    var a = localStorage.getItem("pubaddr");
    jQuery.ajax({
       type: "POST",
       url: 'getaddressbalances.php',
       data:({public: a, net: local}),
        success:function(Response) {
            var x = Response;
            x = JSON.parse(x);
        //  x = x.result;
            CONSOLE_DEBUG && console.log('getaddressbalance result :', x);

            Bal = x.result[0].qty;
            
            jQuery("#liBalanceBTC").text(x.result[0].qty+" XRK"); 
            listaddresstransactions();
        }                
    });
}




/*
onClickEye : This function changes the qr code as per the corresponding addresses.
params : null 
*/
function onClickEye(){
           jQuery(document).on("click", ".icon-eye", function(e){
                     jQuery('tr').css("background-color", "");
                     jQuery(this).parent().parent().parent().css( "background-color", "#ecf1f6" ).delay( 800 );
                     var id = jQuery(this).attr("id").substr(7).trim();
                     var childAddressesValue = jQuery('#childAddresses'+id).html();// get the value in #childAddresses
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
    jQuery(document).on("click", ".clickToCopy", function(){
                    jQuery(this).parent().append("<div class='notify'>copied</div>").delay(3000);
                    var id = jQuery(this).attr("id").substr(11).trim();
                    copyToClipBoard(id);
                    
                    
                });
}
/* 
copyToClipBoard : It Copies the html of element childAddresses
@param: id
@return: executes Copy command
*/



function copyToClipBoard(id) {
    var jQuerytemp = jQuery("<input>");
    jQuery("body").append(jQuerytemp);
    jQuerytemp.val(jQuery('#childAddresses'+id).text()).select();
    document.execCommand("copy");
    jQuerytemp.remove();
}




function listaddresstransactions(){

     


    var local =localStorage.getItem("network");
    var a = localStorage.getItem("pubaddr");
    jQuery.ajax({
       type: "POST",
       url: 'listaddresstransactions.php',
       data:({public: a, net: local}),
        success: function(body){
            var x = JSON.parse(body);
          

             var date = new Date();
            CONSOLE_DEBUG && console.log(x, "list transaction result");
            x.result = x.result.reverse();


            if(x.result.length == 0){
              CONSOLE_DEBUG &&  console.log("no Transactions on this address.");
              jQuery('#notransaction').css("display", "block");
              jQuery('#tableone').css("display", "none");
           }
         else{
             for(var i= 0; i < x.result.length; i++) {
                if (x.result[i].balance.amount >= 0){
                var date = new Date((x.result[i].time)*1000);
                var date1 = new Date();
                var diff = date1 - date;
                diff = diff/1000;
                 var seconds = Math.floor(diff % 60);
                 diff = diff/60;
                 var minutes = Math.floor(diff % 60);
                 diff = diff/60;
                 var hours = Math.floor(diff % 24);  
                 var days = Math.floor(diff/24);
                CONSOLE_DEBUG && console.log(days);
                CONSOLE_DEBUG && console.log(hours);
                CONSOLE_DEBUG && console.log(x.result);
                getPagination('#tableone');
                if (local == "TestNetwork"){
                var str1 = "http://test-explorer.recordskeeper.co/RecordsKeeper%20Testnet/tx/";
                }
                else{
                   var str1 = "http://explorer.recordskeeper.co/RecordsKeeper%20Mainnet/tx/";
                }
                var str2 = x.result[i].txid;
                var str3 = str1.concat(str2);
              CONSOLE_DEBUG &&  console.log(str3);
                if(days > 0){
                    if(hours > 0){
                        jQuery('.table-a').append("<tr>  <td id='childAddresses'><a href="+str3+" target='_blank'>"+x.result[i].txid+"</a></td><td><a  data-toggle='tooltip' title='"+date+"'>"+days+"<span class='xrk'> days </span>"+hours+"<span class='xrk'> hours ago</span></a></td><td>"+x.result[i].balance['amount']+"<span class='xrk'> XRK</span> <span class='xrk in'> in </span></td></tr>");
                    }
                   else{
                       jQuery('.table-a').append("<tr>  <td id='childAddresses'><a href="+str3+" target='_blank'>"+x.result[i].txid+"</a></td><td><a  data-toggle='tooltip' title='"+date+"'>"+days+"<span class='xrk'> days </span></a></td><td>"+x.result[i].balance['amount']+"<span class='xrk'> XRK</span> <span class='xrk in'> in </span></td></tr>");
                   }            
                }
                else if(hours > 0){
                    if(minutes > 0){
                         jQuery('.table-a').append("<tr>  <td id='childAddresses'><a href="+str3+" target='_blank'>"+x.result[i].txid+"</a></td><td><a  data-toggle='tooltip' title='"+date+"'>"+hours+"<span class='xrk'> hours </span>"+minutes+"<span class='xrk'> minutes ago</span></a></td><td>"+x.result[i].balance['amount']+"<span class='xrk'> XRK</span> <span class='xrk in'> in </span></td></tr>");
                    }
                   else{
                        jQuery('.table-a').append("<tr>  <td id='childAddresses'><a href="+str3+" target='_blank'>"+x.result[i].txid+"</a></td><td><a  data-toggle='tooltip' title='"+date+"'>"+hours+"<span class='xrk'> hours </span></a></td><td>"+x.result[i].balance['amount']+"<span class='xrk'> XRK</span> <span class='xrk in'> in </span></td></tr>");
                   } 
                }
                else if(minutes > 0){
                    if(seconds > 0){
                         jQuery('.table-a').append("<tr>  <td id='childAddresses'><a href="+str3+" target='_blank'>"+x.result[i].txid+"</a></td><td><a  data-toggle='tooltip' title='"+date+"'>"+minutes+"<span class='xrk'> minutes </span>"+seconds+"<span class='xrk'> seconds ago</span></a></td><td>"+x.result[i].balance['amount']+"<span class='xrk'> XRK</span> <span class='xrk in'> in </span></td></tr>");
                    }
                   else{
                        jQuery('.table-a').append("<tr>  <td id='childAddresses'><a href="+str3+" target='_blank'>"+x.result[i].txid+"</a></td><td><a  data-toggle='tooltip' title='"+date+"'>"+minutes+"<span class='xrk'> minutes ago</span></a></td><td>"+x.result[i].balance['amount']+"<span class='xrk'> XRK</span> <span class='xrk in'> in </span></td></tr>");
                   } 
                }
                else{
                    jQuery('.table-a').append("<tr>  <td id='childAddresses'><a href="+str3+" target='_blank'>"+x.result[i].txid+"</a></td><td><a  data-toggle='tooltip' title='"+date+"'>"+seconds+"<span class='xrk'> seconds ago</span></a></td><td>"+x.result[i].balance['amount']+"<span class='xrk'> XRK</span> <span class='xrk in'> in </span></td></tr>");
                }
                         }
                else {

                var date = new Date((x.result[i].time)*1000);
                var date1 = new Date();
                var diff = date1 - date;
                var diff = date1 - date;
                diff = diff/1000;
                var seconds = Math.floor(diff % 60);
                 diff = diff/60;
                 var minutes = Math.floor(diff % 60);
                 diff = diff/60;
                 var hours = Math.floor(diff % 24);  
                 var days = Math.floor(diff/24);
                CONSOLE_DEBUG && console.log(days);
                CONSOLE_DEBUG && console.log(hours);
                CONSOLE_DEBUG && console.log(x.result)
                if (local == "TestNetwork"){
                var str1 = "http://test-explorer.recordskeeper.co/RecordsKeeper%20Testnet/tx/";
                }
                else{
                   var str1 = "http://explorer.recordskeeper.co/RecordsKeeper%20Mainnet/tx/";
                }
                var str2 = x.result[i].txid;
                var str3 = str1.concat(str2);
              CONSOLE_DEBUG &&  console.log(str3);

                if(days > 0){
                    if(hours > 0){
                        jQuery('.table-a').append("<tr>  <td id='childAddresses'><a href="+str3+" target='_blank'>"+x.result[i].txid+"</a></td><td><a  data-toggle='tooltip' title='"+date+"'>"+days+"<span class='xrk'> days </span>"+hours+"<span class='xrk'> hours ago</span></a></td><td>"+Math.abs(x.result[i].balance['amount'])+ "<span class='xrk'> XRK</span><span class='xrk out'> Out </span></td></tr>");
            }
                   else{
                       jQuery('.table-a').append("<tr>  <td id='childAddresses'><a href="+str3+" target='_blank'>"+x.result[i].txid+"</a></td><td><a  data-toggle='tooltip' title='"+date+"'>"+days+"<span class='xrk'> days ago</span></a></td><td>"+Math.abs(x.result[i].balance['amount'])+ "<span class='xrk'> XRK</span><span class='xrk out'> Out </span></td></tr>");
            }       
                }
                else if(hours > 0){
                    if(minutes > 0){
                        jQuery('.table-a').append("<tr>  <td id='childAddresses'><a href="+str3+" target='_blank'>"+x.result[i].txid+"</a></td><td><a  data-toggle='tooltip' title='"+date+"'>"+hours+"<span class='xrk'> hours </span>"+minutes+"<span class='xrk'> minutes ago</span></a></td><td>"+Math.abs(x.result[i].balance['amount'])+ "<span class='xrk'> XRK</span><span class='xrk out'> Out </span></td></tr>");
            }
                   else{
                       jQuery('.table-a').append("<tr>  <td id='childAddresses'><a href="+str3+" target='_blank'>"+x.result[i].txid+"</a></td><td><a  data-toggle='tooltip' title='"+date+"'>"+hours+"<span class='xrk'> hours </span></a></td><td>"+Math.abs(x.result[i].balance['amount'])+ "<span class='xrk'> XRK</span><span class='xrk out'> Out </span></td></tr>");
            }
                   } 
                
                else if(minutes > 0){
                    if(seconds > 0){
                         jQuery('.table-a').append("<tr>  <td id='childAddresses'><a href="+str3+" target='_blank'>"+x.result[i].txid+"</a></td><td><a  data-toggle='tooltip' title='"+date+"'>"+minutes+"<span class='xrk'> minutes </span>"+seconds+"<span class='xrk'> seconds ago</span></a></td><td>"+Math.abs(x.result[i].balance['amount'])+ "<span class='xrk'> XRK</span><span class='xrk out'> Out </span></td></tr>");
            }
            
                   else{
                        jQuery('.table-a').append("<tr>  <td id='childAddresses'><a href="+str3+" target='_blank'>"+x.result[i].txid+"</a></td><td><a  data-toggle='tooltip' title='"+date+"'>"+minutes+"<span class='xrk'> minutes ago</span></a></td><td>"+Math.abs(x.result[i].balance['amount'])+ "<span class='xrk'> XRK</span><span class='xrk out'> Out </span></td></tr>");
            }
                            }  
                
            else{
                jQuery('.table-a').append("<tr>  <td id='childAddresses'><a href="+str3+" target='_blank'>"+x.result[i].txid+"</a></td><td><a  data-toggle='tooltip' title='"+date+"'>"+seconds+"<span class='xrk'> seconds ago</span></a></td><td>"+Math.abs(x.result[i].balance['amount'])+ "<span class='xrk'> XRK</span><span class='xrk out'> Out </span></td></tr>");
            }
                            }
            // add a table row here
        }
        }
        }
    });


      

}

function showAddress(){
  var address = localStorage.getItem("pubaddr");
  jQuery('.showaddr').append("XRK Address : ", address);
  jQuery('#modalshowaddr').append(address);
}

// code to generate qr code 
function generateQRcode(){
    
        qrgenerate = pubaddr;
        jQuery("#divQrCode").qrcode({
                //render:"table"
                width: 204,
                height: 204,
                text: qrgenerate
        });
}
    
function recieve(){
    jQuery('.table-b').append("<tr> <td id='childAddresses'>"+localStorage.getItem("pubaddr")+"</td></tr>");
}
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
        jQuery('.formerrorpara').fadeIn('slow').text('Enter the amount !! ');
        return false;
    }
    if (AddressRec == "") {
         jQuery('.formerrorpara').fadeIn('slow').text('Enter the Reciepient Address !! ');
        return false;
    }
    if(BTCvalue != 0 && AddressRec != 0) {
            
        
    }
}
var  newAddressCount = 0;
// ToggleNetwork() function here to allow users to change the network on toggle
// params : 
// Return : NULL 
    
    function ToggleNetwork(){
        if(jQuery('#cb1').is(':checked'))
            {
              address_pubkeyhash_version= '6F';
                address_checksum_value = '00000000';
                private_key_version = 'EF';

             net = "test";
               localStorage.setItem("network", "TestNetwork");
                jQuery('#top').css('background', '#54b2ce');
                 jQuery('#togglecontlabel').text('Test Network');
                 window.location.href = "index.php";
                 jQuery('button').addClass('testnetColor');
                  jQuery('nav#nav').css('background', 'rgb(84, 178, 206)');
              
            }
            else
            {
                  address_pubkeyhash_version= '0041bb05';
                  address_checksum_value = '07cb53da' ;
                  private_key_version = '80fbe117' ;

                net = "main";
               localStorage.setItem("network","MainNetwork");

             
                  jQuery('#registered_adr').val(pubaddr);

                 jQuery('#top').css('background', '#22283a');
                  jQuery('#top').css('color', '#ffffff');
                   jQuery('nav#nav').css('background', '#22283a');
              
                   jQuery('#togglecontlabel').text('Main Network');
                   window.location.href = "index.php";
            }
    }
function converTableToCSV(){
    jQuery("#export").click(function(){
        jQuery("#table-a").table2csv('output', {appendTo: '#out'});
        jQuery("#table-a").table2csv();
    });     
}
function CopyToClipboard(){
    jQuery('#clickToCopy1').on("click", function(){
        alert('Click to copy!');
    });
}
    jQuery('#sendt').click(function(){
        var a = jQuery('#sendBTC').val();
        CONSOLE_DEBUG &&  console.log(a);
        var b = jQuery('#sendRecipientaddress').val();
        var c = jQuery('#sendUSD').val();
        var d = toHex(jQuery('#hexdata').val());
        var e = jQuery('#keydata').val();
        CONSOLE_DEBUG && console.log(a, b, c, d);
        createRawSendFrom(a, b, c, d, e);
    });

   

    function createRawSendFrom(a, b, c, d, e) {
    var ca = localStorage.getItem("network");
    var aa = localStorage.getItem("pubaddr");;
    var ab = e;
    var ac = d;
    var ad = b;
    var ae = a;
    var af = c;
    jQuery.ajax({
       type: "POST",
       url: 'createrawsendfrom.php',
       data:{from: aa, key: ab, val: ac, net: ca, to: ad, amount: ae },
        success:function(Response) {
             var x = Response;
             x = JSON.parse(x);
         //  x = x.result;
            jQuery('#myModal2').modal('hide');
            var y = x.error;
           CONSOLE_DEBUG && console.log(y);
           if (y != null){
              swal({
                   title:'Insufficient XRK Tokens',
                   html : '<p>you dont have enough XRK tokens. If you are recording data in this transaction, try with smaller data </p>' ,
                   type: 'error',
                   confirmButtonClass: "btn-danger",
                    confirmButtonText: "OK!",
                   timer: 15000
             });
           }
           else{
             var globe = x.result;
             CONSOLE_DEBUG && console.log('create raw send from:', globe);

             signrawtransaction(globe, af );
           }
        }
    });
}
function signrawtransaction(globe, af){
     var aa = af;
    var ab = globe;
  var ca = localStorage.getItem("network");
    jQuery.ajax({
       type: "POST",
       url: 'signrawtransaction.php',
       data:{from: globe, key: aa, net: ca},
        success:function(Response) {
            var x = Response;
            x = JSON.parse(x);
            var y = x.error;
           if (y != null){
              swal({
                   title:'Private Key entered is Incorrect. Please try again!',
                   type: 'error',
                   confirmButtonClass: "btn-danger",
                   confirmButtonText: "OK!",
                   timer: 15000
              });
           }
           else{
             var globe = x.result.hex;
             CONSOLE_DEBUG && console.log('sign raw:', globe);

            sendrawtransaction(globe);
           }
        }
    });
}
function sendrawtransaction(globe) {
    var ab = globe;
    var txUrl;
    var ca = localStorage.getItem("network");
    if(ca=="TestNetwork"){
        txUrl = "http://test-explorer.recordskeeper.co/RecordsKeeper%20Testnet/tx/";
    }else if(ca == "MainNetwork"){
        txUrl = "http://explorer.recordskeeper.co/RecordsKeeper%20Mainnet/tx/";
    }
    jQuery.ajax({
    type: "POST",
    url: 'sendrawtransaction.php',
    data:({tx_hex: ab, net: ca}),
    success:function(Response) {
        var x = Response;
        x = JSON.parse(x);
    //  x = x.result;
    var y = x.error;
          if (y != null){
          swal({
                  title:'Invalid Transaction! ',
                  type: 'error',
                  confirmButtonClass: "btn-danger",
                  confirmButtonText: "OK!",
                  timer: 15000
          });
          }
          else{
        CONSOLE_DEBUG && console.log('result in json format :', x);
        CONSOLE_DEBUG && console.log("transaction id result : ", x.result);
//        jQuery('#txid').text(x.result);
         CONSOLE_DEBUG && console.log ("txurl", txUrl+x.result);
        var aurl = txUrl+x.result;

        swal({
                    title:'Your transction has been processed.',
                   
                    html: '<a href="'+aurl+'" target="_blank"> <b>Check Transaction status here:</b><br> '+x.result+'</a>',
                    type: 'success',
                    showConfirmButton: true,
                    confirmButtonClass: "btn-success",
                     confirmButtonText: "OK!",

                    timer: 15000
            });

        jQuery("#sendt").val('');
        jQuery("#sendRecipientaddress").val('');
        jQuery("#sendBTC").val('');
        jQuery("#hexdata").val('');
        jQuery("#keydata").val('');
       } 
    }
});
}
function networkToggle(){
  jQuery('.tgl-btn').click(function(){
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




var count = jQuery('#tableone').children('tr').length;
CONSOLE_DEBUG && console.log(count);



// jQuery('#myModal2').on('hidden.bs.modal', function () {
//     jQuery('#sendUSD').val('');
// })

function clearModalInputs(){
            jQuery('#myModal2').on('hidden.bs.modal', function () {
                jQuery('#sendUSD').val('');
            });
}



// copySeedPhrase() function here

function copySeedPhrase() {
  /* Get the text field */
  var copyText = document.getElementById("seed");

  /* Select the text field */
  copyText.select();

  /* Copy the text inside the text field */
  document.execCommand("Copy");

  /* Alert the copied text */
 CONSOLE_DEBUG && console ("Copied the text: " + copyText.value);
}



function restoreWallet(){


jQuery("#restoreWalletBtn").click(function(){

  var seedCode = jQuery("#seedTextArea").val();

  CONSOLE_DEBUG && console.log ("seedCode", seedCode);

 
    restoreBip39XRKWallet(seedCode, password, address_pubkeyhash_version, address_checksum_value, private_key_version);


     
        $("#restoremodBody").on("hidden.bs.modal", function(){
                $("#restoremodBody").html(" ");
            });



});

}



function createXrkHDWallet(){

  var netw = net;

  jQuery("#createXRKhd").click(function(){

      var passwordValue = $("#firstpass").val();
      

     jQuery("#qrcodecontainer").css("display", "block");

     
      generateBip39XRKWallet(passwordValue, wordListLang, entropyLength, 
        address_pubkeyhash_version, address_checksum_value,
        private_key_version);

                document.getElementById('modalshowaddress').innerHTML = 'Public Address : '+ pubaddr;

                jQuery('#registered_adr').val(pubaddr);
                document.getElementById('modalshowkey').innerHTML = 'Private Key : ' + privkey1;


                jQuery('modalboxaddress').text('Public Address : '+ pubaddr);
                jQuery('modalboxkey').text('Private Key : ' + privkey1);


                 var dataStr = "data:text/json;charset=utf-8," + ('{'+'"xrk_address"'+":"+'"'+pubaddr+'"'+","+'"xrk_private_key"'+":"+'"'+privkey1+'"'+'}');
                  var dlAnchorElem = document.getElementById('downloadlink');
                  dlAnchorElem.setAttribute("href",     dataStr     );

                   if(net == "MainNetwork"){
                       dlAnchorElem.setAttribute("download", "Recordskeeper-wallet.json");
                       dlAnchorElem.click();
                   }else if (net == "TestNetwork"){

                     dlAnchorElem.setAttribute("download", "Recordskeeper-test-wallet.json");
                       dlAnchorElem.click();
                   }
                    
                   (function () {
                        var textFile = null,
                        makeTextFile = function (text) {
                          var data = new Blob([text], {type: 'text/plain'});

                          // If we are replacing a previously generated file we need to
                          // manually revoke the object URL to avoid memory leaks.
                          if (textFile !== null) {
                            window.URL.revokeObjectURL(textFile);
                          }

                          textFile = window.URL.createObjectURL(data);

                          return textFile;
                        };
                        var create = document.getElementById('create'),
                          textbox = document.getElementById(privkey1);
                          var link = document.getElementById('downloadlink');
                          link.href = makeTextFile('{'+'"xrk_address"'+":"+'"'+pubaddr+'"'+","+'"xrk_private_key"'+":"+'"'+privkey1+'"'+'}');
                          link.style.display = 'block';
                   })();

                  // importAddress(net);


                jQuery(".modal-body.standfont").children().empty();
    jQuery(".modal-body.standfont").append("<div class = 'createappend'><p class='themecolor'><i class='fas fa-dot-circle themecolor maright10'></i>Your wallet has been created.<br>Please download your private key and save it at a safe place, you will need it for your trasactions.</p><p class = 'seedlabel'>Seed Phrase (24 words, order is important) </p> <p id ='seed' > "+seed+"</p><p id='modalshowaddress'>"+pubaddr+"</p><p id ='modalshowkey'>"+privkey1+"</p></div></div><div class='col-md-12'></div></div>" );




                  onCreateImportAddress(netw);

            
           
                 var qrcode2 = new QRCode(document.getElementById("qrcode2"), {
                    width : 200,
                    height : 200
                  });
                  var qrcode = new QRCode(document.getElementById("qrcode"), {
                    width : 200,
                    height : 200
                  });

                  function makeCode () {    // qr code generater function for address
                    var elText = pubaddr;
                    var elprive = privkey1;     //pass  value of address stored in elpriv
                   
                    
                    qrcode.makeCode(elText);
                     
                  }
                  makeCode();                 // call the function here 


                  function makeCode1 () {    // qr code generater function for privkey
                    var elText = pubaddr;   
                    var elprive = privkey1;
                   
                    
                    qrcode2.makeCode(elprive);    //pass  value of privkey stored in elpriv
                     
                  }
                  makeCode1();                    // call the function  


                   jQuery("#modaladdrcont").append("<div> <p class='addrcl'>Public Address : "+pubaddr+"</p><p class ='addrcl'>Private Key : "+privkey1+"</p></div>");
                  document.getElementById('modalboxaddress').innerHTML = 'Public Address : '+ pubaddr;
                  document.getElementById('modalboxkey').innerHTML = 'Private key : '+ privkey1;


             
              $("#printWallet").click(function() {

                $("#printwalletcont").show();
                
                var contents = $("#modaladdrcont").html();
                var contents2 = $("#qrcodecontainer").html();
                var frame1 = $('<iframe />');
                frame1[0].name = "frame1";
                // frame1.css({ "position": "absolute", "top": "-1000000px" });
                $("body").append(frame1);
                var frameDoc = frame1[0].contentWindow ? frame1[0].contentWindow : frame1[0].contentDocument.document ? frame1[0].contentDocument.document : frame1[0].contentDocument;
                frameDoc.document.open();
                //Create a new HTML document.
                frameDoc.document.write('<html><head><title>Print Wallet</title><style>@page{size:landscape; } #printimg{ width : 100%;} #modaladdrcont{ width : 100%; display: none !important ; clear : both ; } .addrcl{width : 100% ; clear : both;} .modc{display : none} </style>');
                frameDoc.document.write('</head><body>');
                //Append the external CSS file.
                frameDoc.document.write('<link href="styles/style.css" rel="stylesheet" type="text/css" media="print"/>');
                //Append the DIV contents.
                
                frameDoc.document.write(contents2);
                 frameDoc.document.write(contents);

                frameDoc.document.write('</body></html>');
                frameDoc.document.close();
                setTimeout(function () {
                    window.frames["frame1"].focus();
                    window.frames["frame1"].print();
                    frame1.remove();
                }, 1500);
            });  
             
    
             
       

           
          
  }); 
}


    // function to generate BIP39XRKwallet
   
  
function generateBip39XRKWallet(password, wordListLang, entropyLength, 
        address_pubkeyhash_version, address_checksum_value,
        private_key_version) {

        const wordList = eval('Mnemonic.Words.'+wordListLang);
        var code = new Mnemonic(entropyLength, wordList);

        var xprivKey = code.toHDPrivateKey(password); // using a passphrase
        var masterPrivateKey = xprivKey.privateKey.toString();

        xrkPublicAddress = createXRKAddressFromPrivateKey(masterPrivateKey, address_pubkeyhash_version, address_checksum_value);
        xrkPrivateKey = createXRKPrivateKeyFromPrivateKey(masterPrivateKey, private_key_version, address_checksum_value);

        var xrkWallet = {  "status": "success", "address": xrkPublicAddress, "privateKey": xrkPrivateKey, "seed": code.toString() };

        CONSOLE_DEBUG && console.log("xrkWallet", xrkWallet);
        CONSOLE_DEBUG && console.log("xrkWallet success : ", xrkWallet.status);
        CONSOLE_DEBUG && console.log("xrkWallet address :", xrkWallet.address);


            CONSOLE_DEBUG && console.log("xrkWallet privateKey :", xrkWallet.privateKey);
             CONSOLE_DEBUG && console.log("xrkWallet seed :", xrkWallet.seed);
             seed = xrkWallet.seed ;

            localStorage.setItem("pubaddr", xrkWallet.address);
            pubaddr =localStorage.getItem("pubaddr");
            privkey1 = xrkWallet.privateKey;
            CONSOLE_DEBUG && console.log("xrkWallet privkey1 :",privkey1);

            CONSOLE_DEBUG && console.log("xrkWallet pubaddr :",pubaddr);



        return xrkWallet;

       
    }




function restoreBip39XRKWallet(codeStr, password = '', address_pubkeyhash_version= '0041bb05', 
        address_checksum_value = '07cb53da', private_key_version = '80fbe117') {

        if(!Mnemonic.isValid(codeStr)) 
            return {"status": "error", "message": "Seed/mnemonic list is not valid."} ;

        var code = new Mnemonic(codeStr);

        var xprivKey = code.toHDPrivateKey(password); // using a passphrase

        var masterPrivateKey = xprivKey.privateKey.toString();

        xrkPublicAddress = createXRKAddressFromPrivateKey(masterPrivateKey, address_pubkeyhash_version, address_checksum_value);
        xrkPrivateKey = createXRKPrivateKeyFromPrivateKey(masterPrivateKey, private_key_version, address_checksum_value);

        var xrkWallet = { "status": "success", "address": xrkPublicAddress, "privateKey": xrkPrivateKey};

        CONSOLE_DEBUG && console.log("xrkWallet success : ", xrkWallet.status);
          CONSOLE_DEBUG && console.log("xrkWallet address :", xrkWallet.address);
            CONSOLE_DEBUG && console.log("xrkWallet privateKey :", xrkWallet.privateKey);
            var privatekey = xrkWallet.privateKey;

            $(".restorebefore").css("display", "none");

            $("#restoremodBody").append("<div class='restoreappend'><p class='publicad'>Public Address : "+xrkWallet.address +"</p><p class='publicad'>Private Key : "+ privatekey+"</p> </div> ")


        return xrkWallet;

        if ( xrkWallet.status != success ){
          jQuery("#restoreErrorP").html("not successful !")
        }



    }


 // this functions creates XRK Public Address from master private key
    function createXRKAddressFromPrivateKey(masterPrivateKey, address_pubkeyhash_version, address_checksum_value) {
        
        // step 1: Get raw private key
        var privateKeyHex = new bitcore.PrivateKey(masterPrivateKey);

        // step 2: Get public key from private key
        var publicKeyHex = privateKeyHex.publicKey; 
        var publicKeyBuffer = publicKeyHex.toBuffer();

        // step 3: Calculate sha256 hash of the public key
        var publicKeySHA256Hash = new bitcore.crypto.Hash.sha256(publicKeyBuffer);

        // step 4: Calculate ripemd160 hash of the previous sha256 hash
        var publicKeyRipemd160Hash = new bitcore.crypto.Hash.ripemd160(publicKeySHA256Hash);

        // step 5: insert address_pubkeyhash_version at appropriate place in previous digest
        var adrPubKeyHashVer = buffer.hexToBuffer(address_pubkeyhash_version); 
        var insertStep = Math.floor(20/adrPubKeyHashVer.length)
        var publicKeyExtendedRipemd160Hash = buffer.copy(publicKeyRipemd160Hash);

        for (var i = 0; i < adrPubKeyHashVer.length; i++) {
            
            var buf_before = publicKeyExtendedRipemd160Hash.slice(0, i + i*insertStep);
            var buf_middle = adrPubKeyHashVer.slice(i, i+1);
            var buf_after = publicKeyExtendedRipemd160Hash.slice(i + i*insertStep);

            publicKeyExtendedRipemd160Hash = buffer.concat([buf_before, buf_middle, buf_after]);

        }

        // step 6: Calculate sha256 of the extended ripemd160
        var publicKeySHA256HashOfExtendedRipemd160Hash = new bitcore.crypto.Hash.sha256(publicKeyExtendedRipemd160Hash);

        // step 7: Calculate sha256 hash of the previous sha256 hash
        var publicKeySHA256HashOfSHA256HashOfExtendedRipemd160Hash = new bitcore.crypto.Hash.sha256(publicKeySHA256HashOfExtendedRipemd160Hash);

        // step 8: Get address checksum - First 4 bytes of previous hash
        var addressChecksum = publicKeySHA256HashOfSHA256HashOfExtendedRipemd160Hash.slice(0, 4);

        // step 9: XOR above checksum with address-checksum-value blockchain parameter
        var adrChecksumValue = buffer.hexToBuffer(address_checksum_value);
        var xoredChecksum = xorBuffer(adrChecksumValue, addressChecksum);

        // step 10: Add xored checksum at the end of extended ripemd160 hash (from step 5)
        var xrkPublicBinaryAddress = buffer.concat([publicKeyExtendedRipemd160Hash, xoredChecksum]);

        // step 11: Apply bitcoin base58 encoding to above result
        var xrkPublicAddress = bitcore.encoding.Base58.encode(xrkPublicBinaryAddress);






        return xrkPublicAddress;
    }



    // this functions creates XRK Private Key from master private key
    function createXRKPrivateKeyFromPrivateKey(masterPrivateKey, private_key_version, address_checksum_value) {
        
        // step 1: Get raw private key
        var privateKeyHex = new bitcore.PrivateKey(masterPrivateKey);
        var privateKeyBuffer = privateKeyHex.toBuffer();

        // step 2: Append 0x01 at end of private key (if corresponding public key is compressed)
        var buf01 = buffer.emptyBuffer(1);
        buf01[0] = 1;
        var privateKeyBufferAppended = buffer.concat([privateKeyBuffer, buf01]);

        // step 3: insert private_key_version at appropriate place in previous result
        var privateKeyVer = buffer.hexToBuffer(private_key_version); 
        var insertStep = Math.floor(33/privateKeyVer.length)
        var privateKeyExtended = buffer.copy(privateKeyBufferAppended);

        for (var i = 0; i < privateKeyVer.length; i++) {
            
            var buf_before = privateKeyExtended.slice(0, i + i*insertStep);
            var buf_middle = privateKeyVer.slice(i, i+1);
            var buf_after  = privateKeyExtended.slice(i + i*insertStep);

            privateKeyExtended = buffer.concat([buf_before, buf_middle, buf_after]);
        }

        // step 4: Calculate sha256 of the extended private key
        var privateKeyExtendedSHA256 = new bitcore.crypto.Hash.sha256(privateKeyExtended);

        // step 5: Calculate sha256 hash of the previous sha256 hash
        var privateKeyExtendedSHA256OfSHA256 = new bitcore.crypto.Hash.sha256(privateKeyExtendedSHA256);
        
        // step 6: Get address checksum - First 4 bytes of previous hash
        var addressChecksum = privateKeyExtendedSHA256OfSHA256.slice(0, 4);

        // step 7: XOR above checksum with address-checksum-value blockchain parameter
        var adrChecksumValue = buffer.hexToBuffer(address_checksum_value);
        var xoredChecksum = xorBuffer(adrChecksumValue, addressChecksum);

        // step 8: Add xored checksum at the end of extended privatekey (from step 3)
        var xrkBinaryPrivateKey = buffer.concat([privateKeyExtended, xoredChecksum]);

        // step 9: Apply bitcoin base58 encoding to above result
        var xrkPrivateKey = bitcore.encoding.Base58.encode(xrkBinaryPrivateKey);


        return xrkPrivateKey;
    }



    function xorBuffer(bufA, bufB) {
        var xorBuf = buffer.emptyBuffer(bufA.length);
    
        for (var i = 0; i < bufA.length; i++) 
            xorBuf[i] = bufA[i] ^ bufB[i];
           CONSOLE_DEBUG && console.log(xorBuf);
          return xorBuf;
         
    }







// Globally declare values of port and url