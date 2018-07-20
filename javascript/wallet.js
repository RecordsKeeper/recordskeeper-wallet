// required bitcore.js libraries to interact with blockchain //
    bitcore = require('bitcore-lib');
    Mnemonic = require('bitcore-mnemonic');
    buffer = bitcore.util.buffer;

// List of global variables declared and Console toggle can be achieved by changing the value of CONSOLE_DEBUG to either true or false //

var CONSOLE_DEBUG = false;
var privkey1;
var pubaddr;
var pubkey1;
var net = localStorage.getItem("network");
var Bal;
pubaddr = localStorage.getItem("pubaddr");
var mainNetAddr;
var testNetAddr;
var address_pubkeyhash_version;
var address_checksum_value;
var private_key_version;
wordListLang = 'ENGLISH';
entropyLength = 256;
password = '';
var seed;
var MnemonicsArray;
var ismultiSig;
var homeMultisig = localStorage.getItem("ismultiSig");
var publicKeyHex1;
var publicKeyHex;
var publicKeys;
var count = 2;
var numItems;
var requiredSignatures;
var multiSigAddress;
var utxo = [];
var PublicKeyString;
var multisigAmount ;
var globalpublickeyhex;
var sendRecipientaddressmulti ;
var multisigtransactionHex ;
var decodeMultisigVout;
var decodeMultisigVinTxid;

// document.ready function to put the methods ready in DOM 

jQuery(document).ready(function() { 

    // Animate loader off screen

    jQuery(".se-pre-con").fadeOut("slow"); // fadeout the preloader
    var Newwalletflag = 1; //  SET the Newwalletflag to 1     
    var newAddressCount = 1; //   set the newAddressCounter to 1

    showAddress();


    
    CONSOLE_DEBUG && console.log("homeMultisig", homeMultisig);

    homeMultisig = localStorage.getItem("ismultiSig");

    var tin = localStorage.getItem("ismultiSig");
    CONSOLE_DEBUG && console.log("tin", tin);

    // jQuery(".signtransUrl").removeClass(hidden);

    selectCount();

    if (tin == 0) {

        jQuery(".normalsend").css("display", "block");
        jQuery(".multisend").css("display", "none");
         jQuery("#multiForm").css("display", "none !important");
          jQuery("#multiForm").removeClass('hidden');
         jQuery("#multiForm").addClass('displaynone');
    } else {
        jQuery(".normalsend").css("display", "none");
        jQuery("#pfform").css("display", "none !important");
         jQuery("#pfform").removeClass('hidden');
         jQuery("#pfform").addClass('displaynone');
        jQuery(".multisend").css("display", "block");
    }


    // getPagination('#tableone');

    jQuery(".tag-ctn").css("width", "100% !important");

    clearModalInputs();

    addMoreRows();

    recieve();

    sendMultitransaction();

    if (net == "MainNetwork") {

        address_pubkeyhash_version = '0041bb05';
        address_checksum_value = '07cb53da';
        private_key_version = '80fbe117';
        CONSOLE_DEBUG && console.log("address_pubkeyhash_version", address_pubkeyhash_version);
        CONSOLE_DEBUG && console.log("address_checksum_value", address_checksum_value);
        CONSOLE_DEBUG && console.log("private_key_version", private_key_version);
        jQuery('#top').css('background', '#22283a');
        jQuery('#top').css('color', '#ffffff');
        jQuery('.tgl-light').prop('checked', true);
        jQuery('#togglecontlabel').text('Main Network');
        jQuery('nav#nav').css('background', '#22283a');
        jQuery('head').append('<style> span.select:before{background : #22283a !important ;}</style>');
        jQuery("button#closemod").css('background', '#22283a !important');
        jQuery('#walletloginbtn').click(function() {

                  valueChanged();

           
                mainNetAddr = jQuery('#registered_adr').val();

                pubaddr = mainNetAddr;

                localStorage.setItem("mainNetAddr", mainNetAddr);
           

        });
        mainNetAddr = localStorage.getItem("mainNetAddr");
        jQuery('#registered_adr').val(mainNetAddr);
        jQuery("#printimg").attr("src", "images/mainnet.png");
        jQuery("#printimg2").attr("src", "images/mainnet.png");
        jQuery("#printimg3").attr("src", "images/mainnet.png");
        jQuery("#printimgMultisig").attr("src", "images/mainnet.png");
        jQuery('walletheader').css('background', '#22283a');
    } else if (net == "TestNetwork") {

        address_pubkeyhash_version = '6F';
        address_checksum_value = '00000000';
        private_key_version = 'EF';
        CONSOLE_DEBUG && console.log("address_pubkeyhash_version", address_pubkeyhash_version);
        CONSOLE_DEBUG && console.log("address_checksum_value", address_checksum_value);
        CONSOLE_DEBUG && console.log("private_key_version", private_key_version);
        jQuery('#top').css('background', '#54b2ce');
        jQuery('#togglecontlabel').text('Test Network');
        jQuery('button').addClass('testnetColor');
        jQuery('nav#nav').css('background', 'rgb(84, 178, 206)');
        jQuery("button#closemod").css('background', 'rgb(84, 178, 206) !important');
       
        jQuery('head').append('<style> span.select:before{background : #339ab9 !important}</style>');
        jQuery('#walletloginbtn').click(function() {

            testNetAddr = jQuery('#registered_adr').val();

            pubaddr = testNetAddr;

            localStorage.setItem("testNetAddr", testNetAddr);

            valueChanged();
        });
        testNetAddr = localStorage.getItem("testNetAddr");
        jQuery('#registered_adr').val(testNetAddr);
        jQuery("#printimg").attr("src", "images/testnet.png");
        jQuery("#printimg2").attr("src", "images/testnet.png");
        jQuery("#printimg3").attr("src", "images/testnet.png");
        jQuery("#printimgMultisig").attr("src", "images/testnet.png");
        jQuery('walletheader').css('background', 'rgb(84, 178, 206)');
    } else {

        address_pubkeyhash_version = '0041bb05';
        address_checksum_value = '07cb53da';
        private_key_version = '80fbe117';
        CONSOLE_DEBUG && console.log("address_pubkeyhash_version", address_pubkeyhash_version);
        CONSOLE_DEBUG && console.log("address_checksum_value", address_checksum_value);
        CONSOLE_DEBUG && console.log("private_key_version", private_key_version);
        net == "MainNetwork";
        localStorage.setItem("network", "MainNetwork");
        jQuery('#cb1').prop('checked', true);
        jQuery('#walletloginbtn').click(function() {

            mainNetAddr = jQuery('#registered_adr').val();
            pubaddr = mainNetAddr;
            localStorage.setItem("mainNetAddr", mainNetAddr);
            valueChanged();
        });
        mainNetAddr = localStorage.getItem("mainNetAddr");
        jQuery('#registered_adr').val(mainNetAddr);
        jQuery("#printimg").attr("src", "images/mainnet.png");
        jQuery("#printimg2").attr("src", "images/mainnet.png");
        jQuery("#printimg3").attr("src", "images/mainnet.png");
        jQuery("#printimgMultisig").attr("src", "images/mainnet.png");
        jQuery(".select:before").css('background', '#22283a');
        jQuery('walletheader').css('background', '#22283a');
        jQuery('head').append('<style> span.select:before{background : #22283a !important ;}</style>');
        jQuery("button#closemod").css('background', '#22283a !important');
    }


    networkToggle(); // Network Toggle function


         jQuery("body").on('click', '.deleterow', function(){
                decrementCount();
                count=count+1;
                jQuery("#n option[value="+count+"]").remove();
                count= count-1;
                jQuery( "#deleterow"+count+"" ).css("display", "block");
                CONSOLE_DEBUG && console.log("lengthMulti");
                jQuery(this).parent().parent().remove ();

         });

    // createMultisigWallet();

    if (document.getElementById("currentdate") != null) {
        document.getElementById("currentdate").innerHTML = Date();
    }

    jQuery("#walletloginbtn").click(function() {
        var netw = net;
        pubaddr = jQuery("#registered_adr").val();

        CONSOLE_DEBUG && console.log(pubaddr);
        localStorage.setItem("pubaddr", pubaddr);

        net = localStorage.getItem("network");

        CONSOLE_DEBUG && console.log("wallet address ", pubaddr);
        valueChanged();
        if (pubaddr == '') {

            jQuery("#registered_adr").css("border", "1px solid red");

        } 
        else if (ismultiSig == 0){
                importAddress(netw, pubaddr, "Address");
                listaddresses();
                 
                
        }
        else if(ismultiSig == 1){
                importAddress(netw, pubaddr, "Address"); 
                listaddresses();
                
        }
      
    });



    createXrkHDWallet();

    

    jQuery("#restoreform").submit(function(event) {

        event.preventDefault();

        restoreWallet();

    });


    jQuery('.modal').on('hidden.bs.modal', function(e) {
        jQuery(this)
            .find("input,textarea,select")
            .val('')
            .end()
            .find("input[type=checkbox], input[type=radio]")
            .prop("checked", "")
            .end();
            jQuery(".mainro").empty();

        jQuery("#confpass").css("border", "1px solid #a4aaba");
        jQuery("#congrats").css("display", "none");
        jQuery(".token").remove();
        jQuery("#restoreErrorP").css("display", "none");
        

    });

    jQuery("#signmultitransaction").click(function(){

        sendmultisigvalue = jQuery("#sendmultisig").val();
        signMultisigTransaction();

        if ( sendmultisigvalue == '' && signmultiTransactionRes.result == null){
            jQuery('.modal-dialog').css("display", "none") ;
            swal({
                    icon: "error",
                    title: 'Enter Private Key carefully !',
                    html: '<p></p>',
                    type: 'error',
                    confirmButtonClass: "btn-danger",
                    confirmButtonText: "OK!",
                    timer: 15000
                });


         }

        


    });






}); //document ready function ends here 




// importAddress function imports the address generated after createkeypairs 
//  Params : netw, pubaddr
//   Return :

function importAddress(netw, pubaddr, status) {
    var local = netw;
    var a = pubaddr;
    jQuery.ajax({
        type: "POST",
        url: 'importaddress.php',
        data: ({
            public: a,
            async: false,
            net: local
        }),
        success: function(Response) {
            var x = Response;
            x = JSON.parse(x);

            var y = x.error;
            CONSOLE_DEBUG && console.log("value here : ", y);
            if (y != null) {
                swal({
                    title: 'Invalid ' + status + '!',
                    type: 'error',
                    confirmButtonClass: "btn-danger",
                    confirmButtonText: "Close!",
                    timer: 15000
                });
            } else {
                //  x = x.result;
                CONSOLE_DEBUG && console.log('importaddress result :', x);
                // reloadPage();
            }
        }
    });
}


function reloadPage() {
    window.location.href = "home.php";
}


// onCreateImportAddress function()
// Params : netw
// return : none 


function onCreateImportAddress(netw) {
    var local = netw;
    var a = pubaddr;
    CONSOLE_DEBUG && console.log(a);
    jQuery.ajax({
        type: "POST",
        url: 'importaddress.php',
        data: ({
            public: a,
            net: local
        }),
        success: function(Response) {
            var x = Response;
            x = JSON.parse(x);

            var y = x.error;
            CONSOLE_DEBUG && console.log("value here : ", y);
            if (y != null) {
                swal({
                    title: 'Invalid Address!',
                    type: 'error',
                    confirmButtonClass: "btn-danger",
                    confirmButtonText: "Close!",
                    timer: 15000
                });
            } else {
                //  x = x.result;
                CONSOLE_DEBUG && console.log('onCreateimportaddress result :', x);

            }

        }
    });
}




function getaddressbalances() {
    var local = localStorage.getItem("network");;
    var a = localStorage.getItem("pubaddr");
    jQuery.ajax({
        type: "POST",
        url: 'getaddressbalances.php',
        data: ({
            public: a,
            net: local
        }),
        success: function(Response) {
            var x = Response;
            x = JSON.parse(x);
            //  x = x.result;
            CONSOLE_DEBUG && console.log('getaddressbalance result :', x);

            Bal = x.result[0].qty;

            jQuery("#liBalanceBTC").text(x.result[0].qty + " XRK");
            listaddresstransactions();

        }
    });
}




/*
onClickEye : This function changes the qr code as per the corresponding addresses.
params : null 
*/
function onClickEye() {
    jQuery(document).on("click", ".icon-eye", function(e) {
        jQuery('tr').css("background-color", "");
        jQuery(this).parent().parent().parent().css("background-color", "#ecf1f6").delay(800);
        var id = jQuery(this).attr("id").substr(7).trim();
        var childAddressesValue = jQuery('#childAddresses' + id).html(); // get the value in #childAddresses
        console.log(childAddressesValue, "childAddressesValue");
        jQuery("#divQrCode").empty(); //empty the div first
        jQuery("#divQrCode").qrcode({    
            width: 204,
                height: 204,
                text: childAddressesValue
        });
    }); // icon-eye click function block ends here              
}
/*
onClickToCopy : This function copies the corresponding addresses when clicked on clickToCopy Btn.
params : null 
*/
function onClickToCopy() {
    jQuery(document).on("click", ".clickToCopy", function() {
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



// function copyToClipBoard(id) {

//     var jQuerytemp = jQuery("<input>");
//     jQuery("body").append(jQuerytemp);
//     jQuerytemp.val(jQuery('#childAddresses' + id).text()).select();
//     document.execCommand("copy");
//     jQuerytemp.remove();


// }




function listaddresstransactions() {




    var local = localStorage.getItem("network");
    var a = localStorage.getItem("pubaddr");
    jQuery.ajax({
        type: "POST",
        url: 'listaddresstransactions.php',
        data: ({
            public: a,
            net: local
        }),
        success: function(body) {
            var x = JSON.parse(body);


            var date = new Date();
            CONSOLE_DEBUG && console.log(x, "list transaction result");
            x.result = x.result.reverse();


            if (x.result.length == 0) {
                CONSOLE_DEBUG && console.log("no Transactions on this address.");
                jQuery('#notransaction').css("display", "block");
                jQuery('#tableone').css("display", "none");
            } else {
                for (var i = 0; i < x.result.length; i++) {
                    var checkamount = x.result[i].balance.amount;
                    CONSOLE_DEBUG && console.log("checkamount : ", checkamount);

                    if (x.result[i].balance.amount > 0) {



                        var date = new Date((x.result[i].time) * 1000);
                        var date1 = new Date();
                        var diff = date1 - date;
                        diff = diff / 1000;
                        var seconds = Math.floor(diff % 60);
                        diff = diff / 60;
                        var minutes = Math.floor(diff % 60);
                        diff = diff / 60;
                        var hours = Math.floor(diff % 24);
                        var days = Math.floor(diff / 24);
                        CONSOLE_DEBUG && console.log(days);
                        CONSOLE_DEBUG && console.log(hours);
                        CONSOLE_DEBUG && console.log(x.result);
                        getPagination('#tableone');
                        if (local == "TestNetwork") {
                            var str1 = "https://test-explorer.recordskeeper.co/RecordsKeeper%20Testnet/tx/";
                        } else {
                            var str1 = "https://explorer.recordskeeper.co/RecordsKeeper%20Mainnet/tx/";
                        }
                        var str2 = x.result[i].txid;
                        var str3 = str1.concat(str2);
                        CONSOLE_DEBUG && console.log(str3);

                        if (days > 0) {
                            if (hours > 0) {

                                jQuery('.table-a').append("<tr >  <td id='childAddresses" + i + "' class='addressrows' ><a href=" + str3 + " target='_blank'>" + x.result[i].txid + "</a></td><td><a  data-toggle='tooltip' title='" + date + "'>" + days + "<span class='xrk'> days </span>" + hours + "<span class='xrk'> hours ago</span></a></td><td>" + x.result[i].balance['amount'] + "<span class='xrk'> XRK</span> <span class='xrk in'> in </span></td></tr>");
                            } else {

                                jQuery('.table-a').append("<tr>  <td id='childAddresses" + i + "' class='addressrows'><a href=" + str3 + " target='_blank'>" + x.result[i].txid + "</a></td><td><a  data-toggle='tooltip' title='" + date + "'>" + days + "<span class='xrk'> days </span></a></td><td>" + x.result[i].balance['amount'] + "<span class='xrk'> XRK</span> <span class='xrk in'> in </span></td></tr>");
                            }
                        } else if (hours > 0) {
                            if (minutes > 0) {

                                jQuery('.table-a').append("<tr>  <td id='childAddresses" + i + "' class='addressrows'><a href=" + str3 + " target='_blank'>" + x.result[i].txid + "</a></td><td><a  data-toggle='tooltip' title='" + date + "'>" + hours + "<span class='xrk'> hours </span>" + minutes + "<span class='xrk'> minutes ago</span></a></td><td>" + x.result[i].balance['amount'] + "<span class='xrk'> XRK</span> <span class='xrk in'> in </span></td></tr>");
                            } else {


                                jQuery('.table-a').append("<tr>  <td id='childAddresses" + i + "' class='addressrows'><a href=" + str3 + " target='_blank'>" + x.result[i].txid + "</a></td><td><a  data-toggle='tooltip' title='" + date + "'>" + hours + "<span class='xrk'> hours </span></a></td><td>" + x.result[i].balance['amount'] + "<span class='xrk'> XRK</span> <span class='xrk in'> in </span></td></tr>");
                            }
                        } else if (minutes > 0) {
                            if (seconds > 0) {

                                jQuery('.table-a').append("<tr>  <td id='childAddresses" + i + "' class='addressrows'><a href=" + str3 + " target='_blank'>" + x.result[i].txid + "</a></td><td><a  data-toggle='tooltip' title='" + date + "'>" + minutes + "<span class='xrk'> minutes </span>" + seconds + "<span class='xrk'> seconds ago</span></a></td><td>" + x.result[i].balance['amount'] + "<span class='xrk'> XRK</span> <span class='xrk in'> in </span></td></tr>");
                            } else {


                                jQuery('.table-a').append("<tr>  <td id='childAddresses" + i + "' class='addressrows'><a href=" + str3 + " target='_blank'>" + x.result[i].txid + "</a></td><td><a  data-toggle='tooltip' title='" + date + "'>" + minutes + "<span class='xrk'> minutes ago</span></a></td><td>" + x.result[i].balance['amount'] + "<span class='xrk'> XRK</span> <span class='xrk in'> in </span></td></tr>");
                            }
                        } else {


                            jQuery('.table-a').append("<tr>  <td id='childAddresses" + i + "' class='addressrows'><a href=" + str3 + " target='_blank'>" + x.result[i].txid + "</a></td><td><a  data-toggle='tooltip' title='" + date + "'>" + seconds + "<span class='xrk'> seconds ago</span></a></td><td>" + x.result[i].balance['amount'] + "<span class='xrk'> XRK</span> <span class='xrk in'> in </span></td></tr>");
                        }


                    } else if (x.result[i].balance.amount < 0) {

                        var date = new Date((x.result[i].time) * 1000);
                        var date1 = new Date();
                        var diff = date1 - date;
                        var diff = date1 - date;
                        diff = diff / 1000;
                        var seconds = Math.floor(diff % 60);
                        diff = diff / 60;
                        var minutes = Math.floor(diff % 60);
                        diff = diff / 60;
                        var hours = Math.floor(diff % 24);
                        var days = Math.floor(diff / 24);
                        CONSOLE_DEBUG && console.log(days);
                        CONSOLE_DEBUG && console.log(hours);
                        CONSOLE_DEBUG && console.log(x.result)
                        if (local == "TestNetwork") {
                            var str1 = "https://test-explorer.recordskeeper.co/RecordsKeeper%20Testnet/tx/";
                        } else {
                            var str1 = "https://explorer.recordskeeper.co/RecordsKeeper%20Mainnet/tx/";
                        }
                        var str2 = x.result[i].txid;
                        var str3 = str1.concat(str2);
                        CONSOLE_DEBUG && console.log(str3);

                        if (days > 0) {
                            if (hours > 0) {


                                jQuery('.table-a').append("<tr>  <td id='childAddresses" + i + "' class='addressrows'><a href=" + str3 + " target='_blank'>" + x.result[i].txid + "</a></td><td><a  data-toggle='tooltip' title='" + date + "'>" + days + "<span class='xrk'> days </span>" + hours + "<span class='xrk'> hours ago</span></a></td><td>" + Math.abs(x.result[i].balance['amount']) + "<span class='xrk'> XRK</span><span class='xrk out'> Out </span></td></tr>");
                            } else {



                                jQuery('.table-a').append("<tr>  <td id='childAddresses" + i + "' class='addressrows'><a href=" + str3 + " target='_blank'>" + x.result[i].txid + "</a></td><td><a  data-toggle='tooltip' title='" + date + "'>" + days + "<span class='xrk'> days ago</span></a></td><td>" + Math.abs(x.result[i].balance['amount']) + "<span class='xrk'> XRK</span><span class='xrk out'> Out </span></td></tr>");
                            }
                        } else if (hours > 0) {
                            if (minutes > 0) {



                                jQuery('.table-a').append("<tr>  <td id='childAddresses" + i + "' class='addressrows'><a href=" + str3 + " target='_blank'>" + x.result[i].txid + "</a></td><td><a  data-toggle='tooltip' title='" + date + "'>" + hours + "<span class='xrk'> hours </span>" + minutes + "<span class='xrk'> minutes ago</span></a></td><td>" + Math.abs(x.result[i].balance['amount']) + "<span class='xrk'> XRK</span><span class='xrk out'> Out </span></td></tr>");
                            } else {



                                jQuery('.table-a').append("<tr>  <td id='childAddresses" + i + "' class='addressrows'><a href=" + str3 + " target='_blank'>" + x.result[i].txid + "</a></td><td><a  data-toggle='tooltip' title='" + date + "'>" + hours + "<span class='xrk'> hours </span></a></td><td>" + Math.abs(x.result[i].balance['amount']) + "<span class='xrk'> XRK</span><span class='xrk out'> Out </span></td></tr>");
                            }
                        } else if (minutes > 0) {
                            if (seconds > 0) {



                                jQuery('.table-a').append("<tr>  <td id='childAddresses" + i + "' class='addressrows'><a href=" + str3 + " target='_blank'>" + x.result[i].txid + "</a></td><td><a  data-toggle='tooltip' title='" + date + "'>" + minutes + "<span class='xrk'> minutes </span>" + seconds + "<span class='xrk'> seconds ago</span></a></td><td>" + Math.abs(x.result[i].balance['amount']) + "<span class='xrk'> XRK</span><span class='xrk out'> Out </span></td></tr>");
                            } else {



                                jQuery('.table-a').append("<tr>  <td id='childAddresses" + i + "' class='addressrows'><a href=" + str3 + " target='_blank'>" + x.result[i].txid + "</a></td><td><a  data-toggle='tooltip' title='" + date + "'>" + minutes + "<span class='xrk'> minutes ago</span></a></td><td>" + Math.abs(x.result[i].balance['amount']) + "<span class='xrk'> XRK</span><span class='xrk out'> Out </span></td></tr>");
                            }
                        } else {



                            jQuery('.table-a').append("<tr>  <td id='childAddresses" + i + "' class='addressrows'><a href=" + str3 + " target='_blank'>" + x.result[i].txid + "</a></td><td><a  data-toggle='tooltip' title='" + date + "'>" + seconds + "<span class='xrk'> seconds ago</span></a></td><td>" + Math.abs(x.result[i].balance['amount']) + "<span class='xrk'> XRK</span><span class='xrk out'> Out </span></td></tr>");
                        }
                    }
                    // add a table row here
                }
            }
        }
    });



}

function showAddress() {
    var address = localStorage.getItem("pubaddr");
    jQuery('.showaddr').append("XRK Address : ", address);
    jQuery('#modalshowaddr').append(address);
}

// code to generate qr code 
function generateQRcode() {

    qrgenerate = pubaddr;
    jQuery("#divQrCode").qrcode({     //render:"table"
            
        width: 204,
            height: 204,
            text: qrgenerate
    });
}


function recieve() {
    jQuery('.table-b').append("<tr> <td id='childAddresses'>" + localStorage.getItem("pubaddr") + "</td></tr>");
}
// 
// 
// toHex() function here that converts any string toHex
// Params : str 
// return : hex 
function toHex(str) {
    var hex = '';
    for (var i = 0; i < str.length; i++) {
        hex += '' + str.charCodeAt(i).toString(16);
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
    if (BTCvalue != 0 && AddressRec != 0) {


    }
}
var newAddressCount = 0;
// ToggleNetwork() function here to allow users to change the network on toggle
// params : 
// Return : NULL 

function ToggleNetwork() {
    if (jQuery('#cb1').is(':checked')) {
        address_pubkeyhash_version = '6F';
        address_checksum_value = '00000000';
        private_key_version = 'EF';

        net = "test";
        localStorage.setItem("network", "TestNetwork");
        jQuery('#top').css('background', '#54b2ce');
        jQuery('#togglecontlabel').text('Test Network');
        window.location.href = "index.php";
        jQuery('button').addClass('testnetColor');
        jQuery('nav#nav').css('background', 'rgb(84, 178, 206)');

    } else {
        address_pubkeyhash_version = '0041bb05';
        address_checksum_value = '07cb53da';
        private_key_version = '80fbe117';

        net = "main";
        localStorage.setItem("network", "MainNetwork");


        jQuery('#registered_adr').val(pubaddr);

        jQuery('#top').css('background', '#22283a');
        jQuery('#top').css('color', '#ffffff');
        jQuery('nav#nav').css('background', '#22283a');

        jQuery('#togglecontlabel').text('Main Network');
        window.location.href = "index.php";
    }
}

function converTableToCSV() {
    jQuery("#export").click(function() {
        jQuery("#table-a").table2csv('output', {
            appendTo: '#out'
        });
        jQuery("#table-a").table2csv();
    });
}

function CopyToClipboard() {
    jQuery('#clickToCopy1').on("click", function() {
        alert('Click to copy!');
    });
}
jQuery('#sendt').click(function() {
    var a = jQuery('#sendBTC').val();
    CONSOLE_DEBUG && console.log(a);
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
        data: {
            from: aa,
            key: ab,
            val: ac,
            net: ca,
            to: ad,
            amount: ae
        },
        success: function(Response) {
            var x = Response;
            x = JSON.parse(x);
            //  x = x.result;
            jQuery('#myModal2').modal('hide');
            var y = x.error;
            CONSOLE_DEBUG && console.log(y);
            if (y != null) {
              swal ({
                    title: 'Insufficient XRK Tokens',
                    html: '<p>you dont have enough XRK tokens. If you are recording data in this transaction, try with smaller data </p>',
                    type: 'error',
                    confirmButtonClass: "btn-danger",
                    confirmButtonText: "OK!",
                    timer: 15000
                });
            } else {
                var globe = x.result;
                CONSOLE_DEBUG && console.log('create raw send from:', globe);

                signrawtransaction(globe, af);
            }
        }
    });
}


function signrawtransaction(globe, af) {
    var aa = af;
    var ab = globe;
    var ca = localStorage.getItem("network");
    jQuery.ajax({
        type: "POST",
        url: 'signrawtransaction.php',
        data: {
            from: globe,
            key: aa,
            net: ca
        },
        success: function(Response) {
            var x = Response;
            x = JSON.parse(x);
            var y = x.error;
            if (y != null) {
                swal({
                    title: 'Private Key entered is Incorrect. Please try again!',
                    type: 'error',
                    confirmButtonClass: "btn-danger",
                    confirmButtonText: "OK!",
                    timer: 15000
                });
            } else {
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
    if (ca == "TestNetwork") {
        txUrl = "http://test-explorer.recordskeeper.co/RecordsKeeper%20Testnet/tx/";
    } else if (ca == "MainNetwork") {
        txUrl = "http://explorer.recordskeeper.co/RecordsKeeper%20Mainnet/tx/";
    }
    jQuery.ajax({
        type: "POST",
        url: 'sendrawtransaction.php',
        data: ({
            tx_hex: ab,
            net: ca
        }),
        success: function(Response) {
            var x = Response;
            x = JSON.parse(x);
            //  x = x.result;
            var y = x.error;
            if (y != null) {
                swal({
                    title: 'Invalid Transaction! ',
                    type: 'error',
                    confirmButtonClass: "btn-danger",
                    confirmButtonText: "OK!",
                    timer: 15000
                });
            } else {
                CONSOLE_DEBUG && console.log('result in json format :', x);
                CONSOLE_DEBUG && console.log("transaction id result : ", x.result);
                //        jQuery('#txid').text(x.result);
                CONSOLE_DEBUG && console.log("txurl", txUrl + x.result);
                var aurl = txUrl + x.result;

                swal({
                    title: 'Your transction has been processed.',

                    html: '<a href="' + aurl + '" target="_blank"> <b>Check Transaction status here:</b><br> ' + x.result + '</a>',
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



function networkToggle() {
    jQuery('.tgl-btn').click(function() {
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




function clearModalInputs() {
    jQuery('#myModal2').on('hidden.bs.modal', function() {
        jQuery('#sendUSD').val('');
        jQuery(".modal-backdrop").css("display", "none");

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
    CONSOLE_DEBUG && console("Copied the text: " + copyText.value);
}




function restoreWallet() {


    // jQuery("#restoreWalletBtn").click(function(){


    jQuery("#printWallet2").css("display", "block");

    if (jQuery("#qrcode3").children.length)

        var seedCode = jQuery("#seedTextArea").val().replace(/,/g, "").trim();

    // seedCode = jQuery("#seedTextArea").val().replace(/,/g, "");




    CONSOLE_DEBUG && console.log("seedCode", seedCode);

    var restorepass = jQuery("#restorepass").val();

    var restoreResult = restoreBip39XRKWallet(seedCode, restorepass, address_pubkeyhash_version, address_checksum_value, private_key_version);



    CONSOLE_DEBUG && console.log(restoreResult);
    CONSOLE_DEBUG && console.log("restoreResult.status", restoreResult.status);
    CONSOLE_DEBUG && console.log("restoreResult.address", restoreResult.address);
    
    
       
        jQuery(".restoreappend").remove();

        jQuery("#qrcode3").find('img').remove();

        jQuery("#qrcode4").find('img').remove();

        jQuery("#qrcode7").find('img').remove();

        jQuery(".restorebefore").css("display", "none");


        

    

    if (restoreResult.status == 'success') {

        jQuery("#restoreErrorP").css("display", "none");

        jQuery("#congrats").css("display", "block");
        jQuery("#qrcodecontainer2").css("display", "block");

        // jQuery("#restoretitle").text("Restore XRK Wallet")

        // if (jQuery('#qrcode3').children().length > 0) {

        //     jQuery('#qrcode3').children().remove();
        //     jQuery('#qrcode4').children().remove();
        //     jQuery('#qrcode7').children().remove();

        //     jQuery(".restoreappend").remove();

        // }


        


        var privatekey = restoreResult.privateKey;
        var publickey = restoreResult.publicKey;
        

        



        jQuery("#restoremodBody").append("<div class='restoreappend'><p class='publicad'>xrk_wallet_address : " + restoreResult.address + "</p><p class='publicad'>xrk_wallet_private_key : " + privatekey + "</p><p class='publicad'>xrk_wallet_public_key: " + publickey + "</p> </div> ");
        


        // document.getElementById('seed').innerHTML =  seed ;

        var qrcode3 = new QRCode(document.getElementById("qrcode3"), {
            width: 200,
            height: 200
        });
        var qrcode5 = new QRCode(document.getElementById("qrcode4"), {
            width: 200,
            height: 200
        });
        var qrcode7 = new QRCode(document.getElementById("qrcode7"), {
            width: 200,
            height: 200
        });



        function makeCode() { // qr code generater function for address

            var elText = restoreResult.address;
            var elprive = restoreResult.privateKey; //pass  value of address stored in elpriv
            var elpub = restoreResult.publicKey;
            


            qrcode3.makeCode(elText);

        }

        makeCode(); // call the function here 


        function makeCode2() { // qr code generater function for privkey
            var elText = restoreResult.address;
            var elprive = restoreResult.privateKey;
            var elpub = restoreResult.publicKey;


            qrcode5.makeCode(elprive); //pass  value of privkey stored in elpriv

        }

        makeCode2(); // call the function  

        function makeCode3() { // qr code generater function for address

            var elText = restoreResult.address;
            var elprive = restoreResult.privateKey;
            var elpub = restoreResult.publicKey;
            


            qrcode7.makeCode(elpub.toString());

        }

        makeCode3(); // call the function here 

        jQuery("#qrcodecontainer2").css("display", "block");
        jQuery("#congrats").css("display", "block");



        jQuery("#modaladdrcont").append("<div> <p class='addrcl'>xrk_wallet_address : " + restoreResult.address + "</p><p class ='addrcl'>xrk_wallet_private_key : " + restoreResult.privateKey + "</p><p class ='addrcl'>xrk_wallet_private_key : " + restoreResult.publicKey + "</p></div>");




        jQuery("#restoremodBody").on("hidden.bs.modal", function() {
            jQuery("#restoremodBody").html(" ");
        });


        jQuery("#printWallet2").click(function() {

            // jQuery("#printwalletcont").show();
            // var congrat = jQuery("#congrats").html();
            
            var contents = jQuery(".restoreappend").html();
            var contents2 = jQuery("#qrcodecontainer2").html();
            var frame1 = jQuery('<iframe />');
            frame1[0].name = "frame1";
            // frame1.css({ "position": "absolute", "top": "-1000000px" });
            jQuery("body").append(frame1);
            var frameDoc = frame1[0].contentWindow ? frame1[0].contentWindow : frame1[0].contentDocument.document ? frame1[0].contentDocument.document : frame1[0].contentDocument;
            frameDoc.document.open();
            //Create a new HTML document.

            frameDoc.document.write('<html><head><title>Print Wallet</title><style>@page{ } #qrcodecontainer2{ margin-bottom : 150 px; width: 100%; } #printimg{ width : 100%; }#modaladdrcont{ width : 100%; display: none !important ;  clear : both ; margin-top:20px; } .modc{display : none} .code3{ width : 100% ; }  .code4{ position : absolute ; top : 75px; right : 40%; } .code5{ position : absolute ; top : 75px; right : 10%; }   </style> ');


            frameDoc.document.write('</head><body>');

            frameDoc.document.write('<link href="styles/style.css" rel="stylesheet" type="text/css" media="print"/>');
            //Append the external CSS file.

            //Append the DIV contents.

            // frameDoc.document.write(congrat);

            frameDoc.document.write(contents2);
            frameDoc.document.write(contents);

            frameDoc.document.write('</body></html>');
            frameDoc.document.close();
            setTimeout(function() {
                window.frames["frame1"].focus();
                window.frames["frame1"].print();
                frame1.remove();
            }, 1500);
        });

    } else {

        jQuery("#restoreErrorP").css("display", "block");
    }


    // });

}




function createMultisigWallet(e) {




    if (numItems >= requiredSignatures) {

        jQuery(".errorsignP").fadeOut();


        var multiFormValues = jQuery("#restoremultiform").serialize().split("&");
        console.log("multiFormValues", multiFormValues);
        var obj = {};
        var a;

        for (var key in multiFormValues) {
            console.log(multiFormValues[key]);
            obj[multiFormValues[key].split("=")[0]] = multiFormValues[key].split("=")[1];
        }

        console.log(obj);

        var values = Object.keys(obj).map(function(key) {
            return obj[key];
        });
        publicKeys = values;
        publicKeys.pop();
        console.log("public keys", publicKeys);

        for (var i = 0; i < publicKeys.length; i++) {

            CONSOLE_DEBUG && console.log("public keys : ", publicKeys[i]);
            importAddress(net, publicKeys[i], "Public Keys");
        }

            if (net == "MainNetwork") {

                var address = AddMultisig();

            } else if (net == "TestNetwork") {

                var address = AddMultisig();
            }



        try {

            

            // var address = new bitcore.Address(publicKeys,  bitcore.Networks.test, requiredSignatures);

            jQuery("#submitPbKeys").css("display", "none");

            jQuery("#restoremultiform").fadeOut();

            jQuery(".errorContP").fadeOut();

            jQuery(".multisigCont").fadeIn();

            jQuery("#printWalletmultisig").css("display", "block");

            pubaddr = multiSigAddress ;
            localStorage.setItem("pubaddr", multiSigAddress);

            importAddress(net, pubaddr, "Address");



            jQuery("#restoremultiform").fadeOut();
            jQuery("#multiaddress").text(pubaddr);
            jQuery("#registered_adr").val(pubaddr);

            var qrcode5 = new QRCode(document.getElementById("qrcode5"), {
                width: 300,
                height: 300
            });

            function makeCode5() { // qr code generater function for address

                var elText = pubaddr;
                var elprive = privkey1; //pass  value of address stored in elpriv


                qrcode5.makeCode(elText);

            }

            makeCode5();

            var dataStr = "data:text/json;charset=utf-8," + ('{' + '"xrk_multisig_wallet_address"' + ":" + '"' + pubaddr + '"}');

                var dlAnchorElem = document.getElementById('downloadlink');

                dlAnchorElem.setAttribute("href", dataStr);

                if (net == "MainNetwork") {
                    dlAnchorElem.setAttribute("download", "xrk_multisig_wallet-"+ pubaddr +".json");
                    dlAnchorElem.click();
                } else if (net == "TestNetwork") {

                    dlAnchorElem.setAttribute("download", "xrk_test_multisig_wallet-"+ pubaddr +".json");
                    dlAnchorElem.click();
                }

                (function() {
                    var textFile = null,
                        makeTextFile = function(text) {
                            var data = new Blob([text], {
                                type: 'text/plain'
                            });

                            // If we are replacing a previously generated file we need to
                            // manually revoke the object URL to avoid memory leaks.
                            if (textFile !== null) {
                                window.URL.revokeObjectURL(textFile);
                            }

                            textFile = window.URL.createObjectURL(data);

                            return textFile;
                        };

                    var create = document.getElementById('create');
  
                    var link = document.getElementById('downloadlink');

                    link.href = makeTextFile('{' + '"xrk_multisig_wallet_address"' + ":" + '"' + pubaddr + '"}');
                    
                    link.style.display = 'block';
                })();

                 jQuery("#printWallet2").css("display", "block !important");
                 jQuery("#modaladdrcont").append("<div> <p class='addrcl'>XRK Multisig Address : " + pubaddr +"</p></div>");

                  jQuery("#printWalletmultisig").on("click", function()   {

                       // jQuery("#printimgMultisig").css("display", "block");
                        var imghead = jQuery(".multisigCont").html();
                        var contents = jQuery("#seed").html();
                        var contents2 = jQuery(".seedlabel").html();
                        var frame1 = jQuery('<iframe />');
                        frame1[0].name = "frame1";
                        
                        jQuery("body").append(frame1);
                        var frameDoc = frame1[0].contentWindow ? frame1[0].contentWindow : frame1[0].contentDocument.document ? frame1[0].contentDocument.document : frame1[0].contentDocument;
                        frameDoc.document.open();
                        
                        //Create a new HTML document.
                        frameDoc.document.write('<html><head><title>Print Wallet</title><style> .seedlabel{ width : 100%; } #seed{width: 100%; clear:both;}p#seed { font-size: 15px; padding: 15px; background: #eae8e8; border-radius: 4px; font-weight: 600;margin-bottom: -10px;-webkit-print-color-adjust: exact; position:absolute ; top : 15px; } #seedprintcont{ position : relative ; width : 100%;} #seedprintim{ position: relative ; } #seedpl{ position : absolute; top :100px; left:20px; } #contenpl{ position : absolute; top :140px; left:20px; word-wrap:break-word; width :70%; } #printimg2{display: block !important ; width : 81.8% !important ;} </style>');
                        frameDoc.document.write('</head><body>');
                        //Append the external CSS file.
                        frameDoc.document.write('<link href="styles/style.css" rel="stylesheet" type="text/css" media="print"/>');
                        //Append the DIV contents.

                        frameDoc.document.write(imghead);

                        


                     
                        frameDoc.document.write('</body></html>');
                        frameDoc.document.close();
                        setTimeout(function() {
                            window.frames["frame1"].focus();
                            window.frames["frame1"].print();
                            frame1.remove();
                        }, 1500);
                    });

   


        } catch (e) {

            CONSOLE_DEBUG && console.log(e);
            // e.preventDefault();
            jQuery(".errorContP").fadeIn();

        }


    } else {
        // e.preventDefault();
        CONSOLE_DEBUG && console.log("numItems", numItems);

        jQuery(".errorsignP").fadeIn();
    }

}




function sendMultitransaction() {

    jQuery("#sendmultitran").click(function() {

         jQuery("#multisigModal").modal('hide');

         jQuery("#multisigModal").css("display", "none !important");
         jQuery(".modal-backdrop.in").css("display", "none");

         multisigAmount = jQuery("#multisigAmount").val();
         sendRecipientaddressmulti = jQuery("#sendRecipientaddressmulti").val();

         if ( multisigAmount == '' || sendRecipientaddressmulti == ''){
            jQuery('.modal-dialog').css("display", "none") ;
            swal({
                    icon: "error",
                    title: 'Please Enter the required fields!',
                    html: '<p></p>',
                    type: 'error',
                    confirmButtonClass: "btn-danger",
                    confirmButtonText: "OK!",
                    timer: 15000
                });


         }
         else if ( multisigAmount != '' && sendRecipientaddressmulti != ''){
            jQuery('.modal-dialog').css("display", "block") ;
            jQuery.ajax({
                type: "POST",
                url: 'createmultisigtransaction.php',
               
                data: {
                    net: net,
                    multisigAddress: pubaddr,
                    amount : multisigAmount,
                    sendRecipientaddressmulti : sendRecipientaddressmulti
                },

                success: function(Response) {
                    var x = Response;
                    x = JSON.parse(x);
                   

                    if(x.result != null){
                         jQuery("#multisigModal").modal('show');
                         multisigtransactionHex = x.result ;

                        CONSOLE_DEBUG && console.log("multisigtransactionhex : ", multisigtransactionHex);


                        decodeMultisigTransaction() ;

                        listaddressesSendButton();
                    }
                   else  if ( x.result == null ){

                            if(x.error['code']== -1){

                                swal({
                                    icon: "error",
                                    title: 'Invalid Recipient Address !',
                                    html: '<p></p>',
                                    type: 'error',
                                    confirmButtonClass: "btn-danger",
                                    confirmButtonText: "OK!",
                                    timer: 15000
                                });

                            }else{
                                swal({
                                    icon: "error",
                                    title: 'Insufficient funds !',
                                    html: '<p></p>',
                                    type: 'error',
                                    confirmButtonClass: "btn-danger",
                                    confirmButtonText: "OK!",
                                    timer: 15000
                                });
                            }

                         

                    }else{

                        jQuery("#multisigModal").modal('show');

                        multisigtransactionHex = x.result ;

                        CONSOLE_DEBUG && console.log("multisigtransactionhex : ", multisigtransactionHex);


                        decodeMultisigTransaction() ;

                        listaddressesSendButton();

                    }

                    

                    
                }
            });

         }
        


      




    });
}



function decodeMultisigTransaction(){

    jQuery.ajax({
            type: "POST",
            url: 'decodetransaction.php',
           
            data: {
                net: net,
                
                multisigtransactionHex : multisigtransactionHex
            },

            success: function(Response) {
                var decodeMultisigResponse = Response;



                var decodeMultisigResponse = JSON.parse(decodeMultisigResponse);
                CONSOLE_DEBUG && console.log("decodetransaction hex : ", decodeMultisigResponse);

                decodeMultisigVinTxid = decodeMultisigResponse.result.vin[0].txid;
                CONSOLE_DEBUG && console.log("decodetransaction vin0 txid : ", decodeMultisigVinTxid);

                decodeMultisigVout = decodeMultisigResponse.result.vin[0].vout;
                CONSOLE_DEBUG && console.log("decodetransaction vin0 Vout : ", decodeMultisigVout);

                getRawTransactionMultisig() ; // call getrawtransactionmultisig function here 



            }

          });


} 



function getRawTransactionMultisig(){

    jQuery.ajax({
            type: "POST",
            url: 'getrawtransactionmultisig.php',
           
            data: {
                net: net,
  
                decodeMultisigVinTxid : decodeMultisigVinTxid
              
            },

            success: function(Response) {
               
                getRawTransactionResp = Response;

                getRawTransactionResp = JSON.parse(getRawTransactionResp);
                CONSOLE_DEBUG && console.log("getRawTransactionResp hex : ", getRawTransactionResp);

                getRawTransactionResp = getRawTransactionResp.result.vout[decodeMultisigVout].scriptPubKey.hex;

                CONSOLE_DEBUG && console.log("getRawTransactionResp hex : ", getRawTransactionResp);
            }

          });

}


function listaddresses(){

        jQuery.ajax({
            type: "POST",
            url: 'listaddresses.php',
           
            data: {
                net: net,
                async : false,
                pubaddr: pubaddr
                
            },

            success: function(Response) {
               
               var listaddressesResponse = Response ;



               listaddressesResponse = JSON.parse(listaddressesResponse);


               if(listaddressesResponse.error != null){
                
                swal({
                                    icon: "error",
                                    title: 'Invalid Address !',
                                    html: '<p></p>',
                                    type: 'error',
                                    confirmButtonClass: "btn-danger",
                                    confirmButtonText: "OK!",
                                    timer: 15000
                            });
               }
               else {
                    
                    importAddress(net, pubaddr);
                    CONSOLE_DEBUG && console.log("listaddresses Response : ", listaddressesResponse);
 
                redeemScript = listaddressesResponse.result[0].hex;
                CONSOLE_DEBUG && console.log("redeemScript Response : ", redeemScript);

                multiSigval = listaddressesResponse.result[0].script;
                CONSOLE_DEBUG && console.log("Multisig validity: ", multiSigval);


                    



                        if ( multiSigval == undefined && redeemScript == undefined ){

                              ismultiSig = 0;
                              localStorage.setItem("ismultiSig", ismultiSig);
                               importAddress(net, pubaddr);
                            reloadPage();
                        }
                        else if ( multiSigval == undefined && redeemScript == undefined){

                            ismultiSig = 0;
                              localStorage.setItem("ismultiSig", ismultiSig);

                                importAddress(net, pubaddr);
                            reloadPage();
                        }
                        
                        else if ( multiSigval == undefined ){

                                ismultiSig = 0;
                                  localStorage.setItem("ismultiSig", ismultiSig);
                                  importAddress(net, pubaddr);
                            reloadPage();
                        }
                        else if ( multiSigval == "multisig" ){

                                ismultiSig = 1;
                                 localStorage.setItem("ismultiSig", ismultiSig);
                                 importAddress(net, pubaddr);
                            reloadPage();
                        }
                        else{
                            ismultiSig = 0;
                                 localStorage.setItem("ismultiSig", ismultiSig);
                            importAddress(net, pubaddr);
                            reloadPage();
                        }


               }
                
            }

          });

}


function listaddressesSendButton(){

        jQuery.ajax({
            type: "POST",
            url: 'listaddresses.php',
           
            data: {
                net: net,
                async : false,
                pubaddr: pubaddr
                
            },

            success: function(Response) {
               
               var listaddressesResponse = Response ;
               listaddressesResponse = JSON.parse(listaddressesResponse);
                CONSOLE_DEBUG && console.log("listaddresses Response : ", listaddressesResponse);

                redeemScript = listaddressesResponse.result[0].hex;
                CONSOLE_DEBUG && console.log("redeemScript Response : ", redeemScript);

               

            }

          });

}



function signMultisigTransaction(){

    jQuery.ajax({
            type: "POST",
            url: 'signmultitransaction.php',
           
            data: {
                net: net,
                // pubaddr: pubaddr,
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
               signmultiTransactionComplete = signmultiTransactionRes.result.complete;
               CONSOLE_DEBUG && console.log("signmultiTransactionComplete", signmultiTransactionComplete);



               if ( signmultiTransactionComplete == false){

                   signmultiTransactionHex = signmultiTransactionRes.result.hex;

                   CONSOLE_DEBUG && console.log("signmultiTransactionRes", signmultiTransactionHex);

                   

                    var URLBase = "http://wallet.recordskeeper.co/signer.php?multisig=";
                    var TrailingFixedData = signmultiTransactionHex;

                    finalURL = URLBase +  TrailingFixedData + "&redeemScript="+redeemScript+"&txid="+decodeMultisigVinTxid+"&vout="+decodeMultisigVout+"&getRawTransactionResp="+getRawTransactionResp;


                   jQuery(".signtransUrl").css("display", "block");
                   jQuery(".signurl").text(finalURL);
                   jQuery(".asignhref").attr("href", finalURL);
                   jQuery(".txhexurl").text(finalURL);
                   jQuery("#txhexcodeurlinput").text(finalURL);


                    



               }else {

                  multisigsendhex = signmultiTransactionRes.result.hex;

                 sendmultisig();
                 swal({
                    title: 'Transaction Successful !',
                    html: '<p>You can check your transaction status in wallet </p><a class="bold" href="' + transactionUrl + transactionID +'" target="_blank"> <b>Check Transaction status here:</b><br>'+ transactionID +'</a>',
                    type: 'success',
                    confirmButtonClass: "btn-success confirmRedirect",
                    confirmButtonText: "Close!",
                    timer: 15000
                });

                        jQuery(".confirmRedirect").click(function(){
                            window.location.href = "http://wallet.recordskeeper.co/";
                          });
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
                              html: '<p>You can check your transaction status in wallet </p><a class="bold" href="' + transactionUrl + transactionID +'" target="_blank"> <b>Check Transaction status here:</b><br>'+ transactionID +'</a>',
                              type: 'success',
                              confirmButtonClass: "btn-success confirmRedirect",
                              confirmButtonText: "Close!",
                              timer: 15000
                          });
                          jQuery(".confirmRedirect").click(function(){
                            window.location.href = "http://wallet.recordskeeper.co/";
                          });
                      
                  
               }
               
              
              

              
              

            }

          });

       

}


function createXrkHDWallet() {

    var netw = net;

    jQuery("#createXRKhd").click(function() {

        var firstpass = jQuery("#firstpass").val();
        var secondpass = jQuery("#confpass").val();



        if (firstpass != secondpass) {

            jQuery("#confpass").css("border", "1px solid red");

            return false;

        } else if (firstpass == secondpass) {


            jQuery("#firstpass").css("border", "1px solid gainsboro");
            jQuery("#confpass").css("border", "1px solid gainsboro");

        }

        CONSOLE_DEBUG && console.log("firstpass", firstpass);
        CONSOLE_DEBUG && console.log("firstpass", secondpass);


        var passwordValue = jQuery("#firstpass").val();

        CONSOLE_DEBUG && console.log(MnemonicsArray);




        jQuery("#qrcode").find('img').remove();

        jQuery("#qrcode2").find('img').remove();

        jQuery("#qrcode6").find('img').remove();

        jQuery("#qrcodecontainer").css("display", "block");

        jQuery("#firststand").css("display", "none");


        generateBip39XRKWallet(passwordValue, wordListLang, entropyLength, address_pubkeyhash_version, address_checksum_value, private_key_version);


        jQuery('#registered_adr').val(pubaddr);

        CONSOLE_DEBUG && console.log("PublicKeyString value here : ",PublicKeyString);

        jQuery('modalboxaddress').text('Public Address : ' + pubaddr);
        jQuery('modalboxkey').text('Private Key : ' + privkey1);
        jQuery('modalboxkey').text('Public Key : ' + PublicKeyString);

        jQuery("#registered_adr").text(pubaddr);

        var dataStr = "data:text/json;charset=utf-8," + ('{' + '"xrk-wallet-address"' + ":" + '"' + pubaddr + '"' + "," + '"xrk-wallet-private-key"' + ":" + '"' + privkey1 + '"' + "," + '"xrk-wallet-public-key"' + ":" + '"' + PublicKeyString + '"' + "," + '"xrk-wallet-recovery-seed"' + ":" + '"' + seed + '"' + '}');

        var dlAnchorElem = document.getElementById('downloadlink');

        dlAnchorElem.setAttribute("href", dataStr);

        if (net == "MainNetwork") {
            dlAnchorElem.setAttribute("download", "rk-wallet-"+ pubaddr +".json");
            dlAnchorElem.click();
        } else if (net == "TestNetwork") {

            dlAnchorElem.setAttribute("download", "rk-test-wallet-"+ pubaddr +".json");
            dlAnchorElem.click();
        }

        (function() {
            var textFile = null,
                makeTextFile = function(text) {
                    var data = new Blob([text], {
                        type: 'text/plain'
                    });

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

            link.href = makeTextFile('{' + '"xrk-address"' + ":" + '"' + pubaddr + '"' + "," + '"xrk-private-key"' + ":" + '"' + privkey1 + '"' + "," + '"xrk-PublicKey"' + ":" + '"' + PublicKeyString + '"}');
            
            link.style.display = 'block';
        })();


        jQuery(".standfont").empty();

        jQuery("#seedcontainer").append("<div class = 'createappend'><p class='themecolor font14 regular'><span class = 'green'>Your XRK wallet has been created successfully.</span><br><br>Please securely store your wallet file (RecordsKeeper-wallet.json) to access your wallet at later stage. You only need public address to view XRK balance or transactions. Private key should never be shared or disclosed to anyone and is only required to publish records/transactions or while sending XRK tokens to others.</p><p class = 'seedlabel regular font14'> Alternatively,  you can write down seed phrase (24 words) in same order as displayed below to restore your wallet completely. If you have entered a password while creating this wallet, please make sure you enter it as well while restoring the wallet. This is recommended way to backup your wallet. <i class='fas fa-print' id='seedprint'></i>) </p><div class='seedcont'> <img id = 'printimg2'src=''>  </div><p id ='seed' > " + seed + "</p><p id='modalshowaddress'>" + pubaddr + "</p><p id ='modalshowkey'>" + privkey1 + "</p></div></div><div class='col-md-12'></div></div>");




        onCreateImportAddress(netw);


       var qrcode2 = new QRCode(document.getElementById("qrcode2"), {
           width: 200,
           height: 200
       });
       var qrcode = new QRCode(document.getElementById("qrcode"), {
           width: 200,
           height: 200
       });

       var qrcode6 = new QRCode(document.getElementById("qrcode6"), {
           width: 200,
           height: 200
       });

       function makeCode() { // qr code generater function for address

           var elText = pubaddr;
           var elprive = privkey1; //pass  value of address stored in elpriv


           qrcode.makeCode(elText);

       }

       makeCode(); // call the function here

       function makeCode6() { // qr code generater function for address

           var elText = PublicKeyString;
           var elprive = privkey1; //pass  value of address stored in elpriv


           qrcode6.makeCode(elText);

       }

       makeCode6(); // call the function here

       function makeCode1() { // qr code generater function for privkey
           var elText = pubaddr;
           var elprive = privkey1;


           qrcode2.makeCode(elprive); //pass  value of privkey stored in elpriv

       }
       makeCode1(); // call the function  

       jQuery("#printWallet").css("display", "block");
       jQuery("#modaladdrcont").append("<div> <p class='addrcl'>xrk-wallet-address : <br> " + pubaddr + "</p><p class='addrcl'>xrk-wallet-public-key : <br>" + PublicKeyString + "</p><p class ='addrcl'>xrk-wallet-private-key : <br>" + privkey1 + "</p></div>");
       // document.getElementById('modalboxaddress').innerHTML = 'Public Address : '+ pubaddr;
       // document.getElementById('modalboxkey').innerHTML = 'Private key : '+ privkey1;

        jQuery("#seedprint").on("click", function() {
            var imghead = jQuery(".seedcont").html();
            var contents = jQuery("#seed").html();
            var contents2 = jQuery(".seedlabel").html();
            var frame1 = jQuery('<iframe />');
            frame1[0].name = "frame1";
            // frame1.css({ "position": "absolute", "top": "-1000000px" });
            jQuery("body").append(frame1);
            var frameDoc = frame1[0].contentWindow ? frame1[0].contentWindow : frame1[0].contentDocument.document ? frame1[0].contentDocument.document : frame1[0].contentDocument;
            frameDoc.document.open();
            //Create a new HTML document.
            frameDoc.document.write('<html><head><title>Print Wallet</title><style> .seedlabel{ width : 100%; } #seed{width: 100%; clear:both;}p#seed { font-size: 15px; padding: 15px; background: #eae8e8; border-radius: 4px; font-weight: 600;margin-bottom: -10px;-webkit-print-color-adjust: exact; position:absolute ; top : 15px; } #seedprintcont{ position : relative ; width : 100%;} #seedprintim{ position: relative ; } #seedpl{ position : absolute; top :100px; left:20px; } #contenpl{ position : absolute; top :140px; left:20px; word-wrap:break-word; width :70%; } #printimg2{display: block !important ; width : 81.8% !important ;} </style>');
            frameDoc.document.write('</head><body>');
            //Append the external CSS file.
            frameDoc.document.write('<link href="styles/style.css" rel="stylesheet" type="text/css" media="print"/>');
            //Append the DIV contents.

            frameDoc.document.write(imghead);

            frameDoc.document.write("<div id = 'seedprintcont'> </div>");

            frameDoc.document.write("<p id = 'seedpl'>seedphrase (24 words, order is important.)</p>");


            frameDoc.document.write("<div id= 'contenpl' >" + contents + "</div>");

            frameDoc.document.write('</body></html>');
            frameDoc.document.close();
            setTimeout(function() {
                window.frames["frame1"].focus();
                window.frames["frame1"].print();
                frame1.remove();
            }, 1500);
        });

        jQuery("#printWallet").click(function() {

            jQuery("#printwalletcont").show();


            var contents = jQuery("#modaladdrcont").html();
            var contents2 = jQuery("#qrcodecontainer").html();
            var frame1 = jQuery('<iframe />');
            frame1[0].name = "frame1";
            
            jQuery("body").append(frame1);
            var frameDoc = frame1[0].contentWindow ? frame1[0].contentWindow : frame1[0].contentDocument.document ? frame1[0].contentDocument.document : frame1[0].contentDocument;

            frameDoc.document.open();

            //Create a new HTML document.
            frameDoc.document.write('<html><head><title>Print Wallet</title><style>@page{size:landscape; } #qrcodecontainer{ margin-bottom : 150 px; } #printimg{ width : 100%;} #modaladdrcont{ width : 100%; display: none !important ; clear : both ; margin-top:20px; } .addrcl{width : 100% ; clear : both;} .modc{display : none}; img{width:550px !important} </style>');
            frameDoc.document.write('</head><body>');

            //Append the external CSS file.

            frameDoc.document.write('<link href="styles/style.css" rel="stylesheet" type="text/css" media="print"/>');

            //Append the DIV contents.

            frameDoc.document.write(contents2);
            frameDoc.document.write(contents);

            frameDoc.document.write('</body></html>');

            frameDoc.document.close();

            setTimeout(function() {
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

    const wordList = eval('Mnemonic.Words.' + wordListLang);
    var code = new Mnemonic(entropyLength, wordList);

    var xprivKey = code.toHDPrivateKey(password); // using a passphrase
    var masterPrivateKey = xprivKey.privateKey.toString();

    xrkPublicAddress = createXRKAddressFromPrivateKey(masterPrivateKey, address_pubkeyhash_version, address_checksum_value);
    xrkPrivateKey = createXRKPrivateKeyFromPrivateKey(masterPrivateKey, private_key_version, address_checksum_value);

    CONSOLE_DEBUG && console.log("final publickey hex pkh1: ", PublicKeyString);
    // var pkh = bitcore.PublicKey.fromString(PublicKeyString);
    // CONSOLE_DEBUG && console.log("final publickey hex pkh: ", pkh);


    var xrkWallet = {
        "status": "success",
        "address": xrkPublicAddress,
        "privateKey": xrkPrivateKey,
        "publicKey": PublicKeyString,
        "seed": code.toString()
    };

    CONSOLE_DEBUG && console.log("xrkWallet", xrkWallet);
    CONSOLE_DEBUG && console.log("xrkWallet success : ", xrkWallet.status);
    CONSOLE_DEBUG && console.log("xrkWallet address :", xrkWallet.address);


    CONSOLE_DEBUG && console.log("xrkWallet privateKey :", xrkWallet.privateKey);
    CONSOLE_DEBUG && console.log("xrkWallet seed :", xrkWallet.seed);
    seed = xrkWallet.seed;

    localStorage.setItem("pubaddr", xrkWallet.address);
    pubaddr = localStorage.getItem("pubaddr");
    privkey1 = xrkWallet.privateKey;
    CONSOLE_DEBUG && console.log("xrkWallet privkey1 :", privkey1);

    CONSOLE_DEBUG && console.log("xrkWallet pubaddr :", pubaddr);



    return xrkWallet;


}




function restoreBip39XRKWallet(codeStr, password = '', address_pubkeyhash_version = '0041bb05',
    address_checksum_value = '07cb53da', private_key_version = '80fbe117') {

    try {
        if (!Mnemonic.isValid(codeStr))
            return {
                "status": "error",
                "message": "Seed/mnemonic list is not valid."
            };
    } catch (e) {
        return {
            "status": "error",
            "message": "Seed/mnemonic list is not valid."
        };
    }

    var code = new Mnemonic(codeStr);

    var xprivKey = code.toHDPrivateKey(password); // using a passphrase
    var masterPrivateKey = xprivKey.privateKey.toString();

    xrkPublicAddress = createXRKAddressFromPrivateKey(masterPrivateKey, address_pubkeyhash_version, address_checksum_value);
    xrkPrivateKey = createXRKPrivateKeyFromPrivateKey(masterPrivateKey, private_key_version, address_checksum_value);

    var xrkWallet = {
        "status": "success",
        "address": xrkPublicAddress,
        "publicKey": publicKeyHex,
        "privateKey": xrkPrivateKey
    };

    return xrkWallet;
}


// this functions creates XRK Public Key from master private key
function createXRKPublicKeyFromPrivateKey(masterPrivateKey, address_pubkeyhash_version, address_checksum_value) {

    // step 1: Get raw private key
    var privateKeyHex = new bitcore.PrivateKey(masterPrivateKey);

    // step 2: Get public key from private key
    publicKeyHex1 = privateKeyHex.publicKey;

    CONSOLE_DEBUG && console.log("public key hex is adarsha: " + publicKeyHex1);

    return publicKeyHex1.toString();

}


// this functions creates XRK Public Address from master private key
function createXRKAddressFromPrivateKey(masterPrivateKey, address_pubkeyhash_version, address_checksum_value) {

    // step 1: Get raw private key
    var privateKeyHex = new bitcore.PrivateKey(masterPrivateKey);

    // step 2: Get public key from private key
    publicKeyHex = privateKeyHex.publicKey;

    var publicKeyBuffer = publicKeyHex.toBuffer();


    // step 3: Calculate sha256 hash of the public key
    var publicKeySHA256Hash = new bitcore.crypto.Hash.sha256(publicKeyBuffer);

    // step 4: Calculate ripemd160 hash of the previous sha256 hash
    var publicKeyRipemd160Hash = new bitcore.crypto.Hash.ripemd160(publicKeySHA256Hash);

    // step 5: insert address_pubkeyhash_version at appropriate place in previous digest
    var adrPubKeyHashVer = buffer.hexToBuffer(address_pubkeyhash_version);
    var insertStep = Math.floor(20 / adrPubKeyHashVer.length)
    var publicKeyExtendedRipemd160Hash = buffer.copy(publicKeyRipemd160Hash);

    for (var i = 0; i < adrPubKeyHashVer.length; i++) {

        var buf_before = publicKeyExtendedRipemd160Hash.slice(0, i + i * insertStep);
        var buf_middle = adrPubKeyHashVer.slice(i, i + 1);
        var buf_after = publicKeyExtendedRipemd160Hash.slice(i + i * insertStep);

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


    console.log("public key hex is: " + publicKeyHex);

    // convert publicKeyString to toString 

    PublicKeyString = publicKeyHex.toString();

    console.log("PublicKeyString key hex is: " + PublicKeyString);


    console.log("public address is : " + xrkPublicAddress);



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
    var insertStep = Math.floor(33 / privateKeyVer.length)
    var privateKeyExtended = buffer.copy(privateKeyBufferAppended);

    for (var i = 0; i < privateKeyVer.length; i++) {

        var buf_before = privateKeyExtended.slice(0, i + i * insertStep);
        var buf_middle = privateKeyVer.slice(i, i + 1);
        var buf_after = privateKeyExtended.slice(i + i * insertStep);

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




jQuery(document).ready(function() {
    var jsonData = [];
    var fruits = Mnemonic.Words.ENGLISH;

    myFunction();

});


jQuery("#seedTextArea").click(function() {

    myFunction();

});

function myFunction() {
    var str = jQuery(".token-label").text();
    CONSOLE_DEBUG && console.log(str);
    var res = str.split(" ");
    CONSOLE_DEBUG && console.log(res);
}




function addMoreRows() {

   

    jQuery(".fas").click(function() {


        jQuery(".deleterow").css("display", "none");

        incrementCount();
         selectCount();

        jQuery(".mainro").append("<div class='row multirow'><div class='col-md-2 pad10 fonts12 '>Public Key " + count + "  : </div><div class='col-md-9'><input type='text' name='publickey" + count + "' placeholder='Enter Public Key " + count + "'  id='publickey" + count + "' value='' required='required'></div><div class = 'col-md-1'> <i class='fas fa-minus-circle deleterow' id='deleterow"+count+"'></i> </div> </div>");

           jQuery("#n").append("<option  value="+count+">"+count+"</option>");


    });
}

// if the count variable is undefined, set its value to zero

// function to increment value of count variable
function incrementCount() {

    count++;

    CONSOLE_DEBUG && console.log("count", count);
}

function decrementCount(){

    count--;

    CONSOLE_DEBUG && console.log("decrement count", count);
}


function valueChanged() {
    if (jQuery('.checkboxmulti').is(":checked")) {
        // alert("hello");

        ismultiSig = 1;
        localStorage.setItem("ismultiSig", ismultiSig);
        

    } else {
        ismultiSig = 0;
        localStorage.setItem("ismultiSig", ismultiSig);
    }
}
// Globally declare values of port and url



function AddMultisig() {

    CONSOLE_DEBUG && console.log("publicKeys multisig", publicKeys);
    publicKeys = JSON.stringify( publicKeys );
    jQuery.ajax({
        type: "POST",
        url: 'multisig.php',
        data: ({
            publicKeys: publicKeys,
            net: net,
            requiredSignatures: requiredSignatures

        }),
        async: false,
        success: function(Response) {
            var x = Response;
            var y = JSON.parse(x);

            // CONSOLE_DEBUG && console.log("error code", y.error['code']);

            if( y.result == null ){
                
               jQuery('#myModal3').css("display", "none");
               jQuery('#myModal3').css("display", "none")
                jQuery(".modal-backdrop").css("display", "none")
                swal({
                    title: 'Invalid Public Keys !',
                    type: 'error',
                    confirmButtonClass: "btn-danger",
                    confirmButtonText: "Close!",
                    timer: 15000
                });



            }
            else{

       


                 multiSigAddress = y.result;

                CONSOLE_DEBUG && console.log("addmultisig value here : ", multiSigAddress);

                localStorage.setItem("pubaddr", multiSigAddress);
            }

           




        }
    });

    return multiSigAddress;
}


jQuery("#createmultisig").click(function(){
    

    if ( jQuery('.mainro').children().length == 0 ) {
    // div has no other tags inside it
        mainRow();
    }
});



function mainRow(){

    jQuery(".mainro").append("<div class='firstrow multirow row'><div class='col-md-2 pad10 fonts12 '> Public Key 1 : </div><div class='col-md-9'><input type='text' name='publickey1' placeholder='Enter Public Key 1' id='publickey1' value='' required='required'></div></div><div class='firstrow multirow row'><div class='col-md-2 pad10 fonts12 '>Public Key 2 : </div><div class='col-md-9'><input type='text' name='publickey2' placeholder='Enter Public Key 2' id='publickey2' value='' required='required'></div></div> ");
}



function selectCount(){

    for(i=count; i <= count ; i ++ ){
        CONSOLE_DEBUG && console.log("count", count);
        if (count > 2 ) {
            jQuery("#selc").append("<option value='"+count+"' id='option"+count+"'>"+count+"</option>");
        }
    }
}

function deleteCount(){

    for(i=count; i >= count ; i -- ){
        CONSOLE_DEBUG && console.log("count", count);
        

        if (count > 2 ) {
           // $('.ct option[value='+count+']').remove();
           // jQuery('.ct').find('[value='+count+']').remove();
           $('#sel')
           .find('option')
            .remove()
            .end()
            .append("<option value='"+count+"' id='option"+count+"'>"+count+"</option>");
        }
    }
}






function copyToClipboard(element) {

 var temp = jQuery("<input>");
 jQuery("body").append(temp);
 temp.val(jQuery(element).text()).select();
 document.execCommand("copy");
 temp.remove();
 jQuery(".copied").fadeIn().delay(3000);
 jQuery(".copied").fadeOut();
}

// Wait for the DOM to be ready
jQuery(function() {
    // Initialize form validation on the registration form.
    // It has the name attribute "registration"
    jQuery("form[name='restoremultiform']").validate({
        // Specify validation rules
        rules: {
            // The key name on the left side is the name attribute
            // of an input field. Validation rules are defined
            // on the right side


        },
        // Specify validation error messages
        messages: {
            email: "Please enter a valid email address"
        },
        // Make sure the form is submitted to the destination defined
        // in the "action" attribute of the form when valid
        submitHandler: function(form) {

            numItems = jQuery('.multirow').length;
            CONSOLE_DEBUG && console.log("numItems", numItems);

            requiredSignatures = jQuery("#n").val();

            createMultisigWallet();
        }
    });
});