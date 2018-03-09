    /////////////////////////////
   // Recordskeeper Wallet JS //
  // Adarsha Jha             //
 // Toshblocks innovations  //
/////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
var CONSOLE_DEBUG = true;
var privkey1;
var  pubaddr;
var pubkey1;
var net = localStorage.getItem("network");
 
$( document ).ready(function() { // document ready function starts here, so you can call all the function which you want to run after the DOM is ready
         
           // Animate loader off screen
           $(".se-pre-con").fadeOut("slow");  // fadeout the preloader
           var Newwalletflag = 1; // SET the Newwalletflag to 1
          
           var newAddressCount = 1; // set the newAddressCounter to 1

      
            

            showAddress();

            clearModalInputs();

            // checkRecAddressFilled();

            // checkAmountFilled();

            recieve();
            if(net == "MainNetwork"){
                  $('#top').css('background', '#22283a');
                  $('#top').css('color', '#ffffff');
                  $('.tgl-light').prop('checked', true);
                 
                   $('#togglecontlabel').text('Main Network');
            }
           else if(net == "TestNetwork"){

                $('#top').css('background', '#54b2ce');
                $('#togglecontlabel').text('Test Network');
           }
           else{
               net == "TestNetwork";
               localStorage.setItem("network", "TestNetwork");
           }
//            generateQRcode();
           //listwallettransactions(); // call listwallettransactions() here which is mentioned down below
          // converTableToCSV(); // call converTableTOCSV function here when the DOM is ready.
           //onClickToCopy(); //click to copy ClipBoard and show a small tooltip notification
          // onClickEye();  // on click eye selects the address and generates the correct qrcode
           //generateAddress();
          // sendTransaction(); // send Transaction function 
           
            
           networkToggle(); // Network Toggle function
           
           if(document.getElementById("currentdate") != null){
             document.getElementById("currentdate").innerHTML = Date();
           }

         $("#walletloginbtn").click(function(){
            var netw = net;
           pubaddr = $("#registered_adr").val();
           localStorage.setItem("pubaddr", pubaddr);
           net = localStorage.getItem("network");
           
           CONSOLE_DEBUG && console.log("wallet address " , pubaddr);
            if(pubaddr == '' ){
              
               $("#registered_adr").css("border", "1px solid red");

            } else{


                importAddress(net);


                
                
                
            }
            
        });
        
         
}); //document ready function ends here 
    $("#createkeypairsbtn").click(function(){
        createkeypairs(net);
         
       
        
    });
// 
function createkeypairs(net){
    var netw = net;
  $.ajax({
    type: "POST",
    url: 'createkeypairs.php',
    data:{net: netw},
    success:function(Response) {
        var x = Response;
        x = JSON.parse(x);
         //  x = x.result;
         var y = x.error;
         if(y != null){
             swal({
                     title:'Something went wrong! <br> Please try again!!!',
                     type: 'error',
                     confirmButtonClass: "btn-danger",
                      confirmButtonText: "OK!",
                     timer: 15000
             });
         }
         else{
              
              CONSOLE_DEBUG && console.log('result in json format :', x);
              
              pubaddr = x.result[0].address;   //public address here 
              
              privkey1 = x.result[0].privkey;    // privkey here
              
              pubkey1    = x.result[0].pubkey;      // pubkey here
              
              CONSOLE_DEBUG && console.log('private key : ', privkey1);  
              CONSOLE_DEBUG && console.log('public address :', pubaddr);
              CONSOLE_DEBUG && console.log('public key :', pubkey1);

             
              
              localStorage.setItem("pubaddr", pubaddr);
              document.getElementById('modalshowaddress').innerHTML = 'Public Address : '+ pubaddr;
              document.getElementById('modalshowkey').innerHTML = 'Private Key : ' + privkey1;
              
               $("#registered_adr").val(pubaddr); //set the value to textbox automatically
               $("#reg_priv_key").val(privkey1);  //set the value to textbox automatically

                ///////////////
               var dataStr = "data:text/json;charset=utf-8," + ('{'+'"xrk_address"'+":"+'"'+pubaddr+'"'+","+'"xrk_privatekey"'+":"+'"'+privkey1+'"'+'}');
                var dlAnchorElem = document.getElementById('downloadlink');
                dlAnchorElem.setAttribute("href",     dataStr     );
                dlAnchorElem.setAttribute("download", "Recordskeeper-wallet.json");
                dlAnchorElem.click();

         
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
                        link.href = makeTextFile('{'+'"xrk_address"'+":"+'"'+pubaddr+'"'+","+'"xrk_privatekey"'+":"+'"'+privkey1+'"'+'}');
                        link.style.display = 'block';
         
                })();

                // importAddress(net);

                onCreateImportAddress(netw);
      }

    }
  });

}

function importAddress(netw) {
    var local =netw;
    var a = pubaddr;
    $.ajax({
       type: "POST",
       url: 'importaddress.php',
       data:({public: a, net: local}),
        success:function(Response) {
            var x = Response;
            x = JSON.parse(x);

            var y = x.error;
           console.log("value here : ",y);
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
    $.ajax({
       type: "POST",
       url: 'importaddress.php',
       data:({public: a, net: local}),
        success:function(Response) {
            var x = Response;
            x = JSON.parse(x);

            var y = x.error;
           console.log("value here : ",y);
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
    $.ajax({
       type: "POST",
       url: 'getaddressbalances.php',
       data:({public: a, net: local}),
        success:function(Response) {
            var x = Response;
            x = JSON.parse(x);
        //  x = x.result;
            CONSOLE_DEBUG && console.log('getaddressbalance result :', x);
            
            $("#liBalanceBTC").text(x.result[0].qty+" XRK"); 
            listaddresstransactions();
        }                
    });
}


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




function listaddresstransactions(){
    var local =localStorage.getItem("network");
    var a = localStorage.getItem("pubaddr");
    $.ajax({
       type: "POST",
       url: 'listaddresstransactions.php',
       data:({public: a, net: local}),
        success: function(body){
            var x = JSON.parse(body);
             var date = new Date();
            console.log(x, "list transaction result");
            if(x.result.length == 0){
              CONSOLE_DEBUG &&  console.log("no Transactions on this address.");
              $('#notransaction').css("display", "block");
              $('#tableone').css("display", "none");
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
                console.log(days);
                console.log(hours);
                console.log(x.result);
                if (local == "TestNetwork"){
                var str1 = "http://test-explorer.recordskeeper.co/RecordsKeeper%20Testnet/tx/";
                }
                else{
                   var str1 = "http://explorer.recordskeeper.co/RecordsKeeper%20Mainnet/tx/";
                }
                var str2 = x.result[i].txid;
                var str3 = str1.concat(str2);
                console.log(str3);
                if(days > 0){
                    if(hours > 0){
                        $('.table-a').append("<tr>  <td id='childAddresses'><a href="+str3+" target='_blank'>"+x.result[i].txid+"</a></td><td><a  data-toggle='tooltip' title='"+date+"'>"+days+"<span class='xrk'> days </span>"+hours+"<span class='xrk'> hours </span></a></td><td>"+x.result[i].balance['amount']+"<span class='xrk'> XRK</span> <span class='xrk in'> in </span></td></tr>");
                    }
                   else{
                       $('.table-a').append("<tr>  <td id='childAddresses'><a href="+str3+" target='_blank'>"+x.result[i].txid+"</a></td><td><a  data-toggle='tooltip' title='"+date+"'>"+days+"<span class='xrk'> days </span></a></td><td>"+x.result[i].balance['amount']+"<span class='xrk'> XRK</span> <span class='xrk in'> in </span></td></tr>");
                   }            
                }
                else if(hours > 0){
                    if(minutes > 0){
                         $('.table-a').append("<tr>  <td id='childAddresses'><a href="+str3+" target='_blank'>"+x.result[i].txid+"</a></td><td><a  data-toggle='tooltip' title='"+date+"'>"+hours+"<span class='xrk'> hours </span>"+minutes+"<span class='xrk'> minutes </span></a></td><td>"+x.result[i].balance['amount']+"<span class='xrk'> XRK</span> <span class='xrk in'> in </span></td></tr>");
                    }
                   else{
                        $('.table-a').append("<tr>  <td id='childAddresses'><a href="+str3+" target='_blank'>"+x.result[i].txid+"</a></td><td><a  data-toggle='tooltip' title='"+date+"'>"+hours+"<span class='xrk'> hours </span></a></td><td>"+x.result[i].balance['amount']+"<span class='xrk'> XRK</span> <span class='xrk in'> in </span></td></tr>");
                   } 
                }
                else if(minutes > 0){
                    if(seconds > 0){
                         $('.table-a').append("<tr>  <td id='childAddresses'><a href="+str3+" target='_blank'>"+x.result[i].txid+"</a></td><td><a  data-toggle='tooltip' title='"+date+"'>"+minutes+"<span class='xrk'> minutes </span>"+seconds+"<span class='xrk'> seconds </span></a></td><td>"+x.result[i].balance['amount']+"<span class='xrk'> XRK</span> <span class='xrk in'> in </span></td></tr>");
                    }
                   else{
                        $('.table-a').append("<tr>  <td id='childAddresses'><a href="+str3+" target='_blank'>"+x.result[i].txid+"</a></td><td><a  data-toggle='tooltip' title='"+date+"'>"+minutes+"<span class='xrk'> minutes </span></a></td><td>"+x.result[i].balance['amount']+"<span class='xrk'> XRK</span> <span class='xrk in'> in </span></td></tr>");
                   } 
                }
                else{
                    $('.table-a').append("<tr>  <td id='childAddresses'><a href="+str3+" target='_blank'>"+x.result[i].txid+"</a></td><td><a  data-toggle='tooltip' title='"+date+"'>"+seconds+"<span class='xrk'> seconds </span></a></td><td>"+x.result[i].balance['amount']+"<span class='xrk'> XRK</span> <span class='xrk in'> in </span></td></tr>");
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
                console.log(days);
                console.log(hours);
                console.log(x.result)
                if (local == "TestNetwork"){
                var str1 = "http://test-explorer.recordskeeper.co/RecordsKeeper%20Testnet/tx/";
                }
                else{
                   var str1 = "http://explorer.recordskeeper.co/RecordsKeeper%20Mainnet/tx/";
                }
                var str2 = x.result[i].txid;
                var str3 = str1.concat(str2);
                console.log(str3);
                if(days > 0){
                    if(hours > 0){
                        $('.table-a').append("<tr>  <td id='childAddresses'><a href="+str3+" target='_blank'>"+x.result[i].txid+"</a></td><td><a  data-toggle='tooltip' title='"+date+"'>"+days+"<span class='xrk'> days </span>"+hours+"<span class='xrk'> hours </span></a></td><td>"+Math.abs(x.result[i].balance['amount'])+ "<span class='xrk'> XRK</span><span class='xrk out'> Out </span></td></tr>");
            }
                   else{
                       $('.table-a').append("<tr>  <td id='childAddresses'><a href="+str3+" target='_blank'>"+x.result[i].txid+"</a></td><td><a  data-toggle='tooltip' title='"+date+"'>"+days+"<span class='xrk'> days </span></a></td><td>"+Math.abs(x.result[i].balance['amount'])+ "<span class='xrk'> XRK</span><span class='xrk out'> Out </span></td></tr>");
            }       
                }
                else if(hours > 0){
                    if(minutes > 0){
                        $('.table-a').append("<tr>  <td id='childAddresses'><a href="+str3+" target='_blank'>"+x.result[i].txid+"</a></td><td><a  data-toggle='tooltip' title='"+date+"'>"+hours+"<span class='xrk'> hours </span>"+minutes+"<span class='xrk'> minutes </span></a></td><td>"+Math.abs(x.result[i].balance['amount'])+ "<span class='xrk'> XRK</span><span class='xrk out'> Out </span></td></tr>");
            }
                   else{
                       $('.table-a').append("<tr>  <td id='childAddresses'><a href="+str3+" target='_blank'>"+x.result[i].txid+"</a></td><td><a  data-toggle='tooltip' title='"+date+"'>"+hours+"<span class='xrk'> hours </span></a></td><td>"+Math.abs(x.result[i].balance['amount'])+ "<span class='xrk'> XRK</span><span class='xrk out'> Out </span></td></tr>");
            }
                   } 
                
                else if(minutes > 0){
                    if(seconds > 0){
                         $('.table-a').append("<tr>  <td id='childAddresses'><a href="+str3+" target='_blank'>"+x.result[i].txid+"</a></td><td><a  data-toggle='tooltip' title='"+date+"'>"+minutes+"<span class='xrk'> minutes </span>"+seconds+"<span class='xrk'> seconds </span></a></td><td>"+Math.abs(x.result[i].balance['amount'])+ "<span class='xrk'> XRK</span><span class='xrk out'> Out </span></td></tr>");
            }
            
                   else{
                        $('.table-a').append("<tr>  <td id='childAddresses'><a href="+str3+" target='_blank'>"+x.result[i].txid+"</a></td><td><a  data-toggle='tooltip' title='"+date+"'>"+minutes+"<span class='xrk'> minutes </span></a></td><td>"+Math.abs(x.result[i].balance['amount'])+ "<span class='xrk'> XRK</span><span class='xrk out'> Out </span></td></tr>");
            }
                            }  
                
            else{
                $('.table-a').append("<tr>  <td id='childAddresses'><a href="+str3+" target='_blank'>"+x.result[i].txid+"</a></td><td><a  data-toggle='tooltip' title='"+date+"'>"+seconds+"<span class='xrk'> seconds </span></a></td><td>"+Math.abs(x.result[i].balance['amount'])+ "<span class='xrk'> XRK</span><span class='xrk out'> Out </span></td></tr>");
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
  $('.showaddr').append("XRK Address : ", address);
  $('#modalshowaddr').append(address);
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
    $('.table-b').append("<tr> <td id='childAddresses'>"+localStorage.getItem("pubaddr")+"</td></tr>");
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
        $('.formerrorpara').fadeIn('slow').text('Enter the amount !! ');
        return false;
    }
    if (AddressRec == "") {
         $('.formerrorpara').fadeIn('slow').text('Enter the Reciepient Address !! ');
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
        if($('#cb1').is(':checked'))
            {
             net = "test";
               localStorage.setItem("network", "TestNetwork");
                $('#top').css('background', '#54b2ce');
                 $('#togglecontlabel').text('Test Network');
                 window.location.href = "index.php";
              
            }
            else
            {
                net = "main";
               localStorage.setItem("network","MainNetwork");
                
                 $('#top').css('background', '#22283a');
                  $('#top').css('color', '#ffffff');
                 
                   $('#togglecontlabel').text('Main Network');
                   window.location.href = "index.php";
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
    $('#sendt').click(function(){
        var a = $('#sendBTC').val();
        console.log(a);
        var b = $('#sendRecipientaddress').val();
        var c = $('#sendUSD').val();
        var d = toHex($('#hexdata').val());
        var e = $('#keydata').val();
        console.log(a, b, c, d);
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
    $.ajax({
       type: "POST",
       url: 'createrawsendfrom.php',
       data:{from: aa, key: ab, val: ac, net: ca, to: ad, amount: ae },
        success:function(Response) {
             var x = Response;
             x = JSON.parse(x);
         //  x = x.result;

            var y = x.error;
           console.log(y);
           if (y != null){
              swal({
                   title:'Data is too large for you current Address balance. <br> Kindly get more XRK or try with small data!',
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
    $.ajax({
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
    $.ajax({
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
        console.log("transaction id result : ", x.result);
//        $('#txid').text(x.result);
        console.log ("txurl", txUrl+x.result);
        var aurl = txUrl+x.result;

        swal({
                    title:'Your transction has been processed.',
                   
                    html: '<a href="'+aurl+'" target="_blank"> <b>Check Transaction status here:</b><br> '+x.result+'</a>',
                    type: 'success',
                    showConfirmButton: false,

                    timer: 15000
            });

        $("#sendt").val('');
        $("#sendRecipientaddress").val('');
        $("#sendBTC").val('');
        $("#hexdata").val('');
        $("#keydata").val('');
       } 
    }
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




var count = $('#tableone').children('tr').length;
console.log(count);



// $('#myModal2').on('hidden.bs.modal', function () {
//     $('#sendUSD').val('');
// })

function clearModalInputs(){
            $('#myModal2').on('hidden.bs.modal', function () {
                $('#sendUSD').val('');
            });
}









// Globally declare values of port and url