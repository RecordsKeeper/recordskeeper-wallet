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

//  do the work after everything was loaded (DOM, media elements) 
//  params : null 
//  return : NULL

  window.onload = function () {
  getaddressbalances(); //load the first address on page load.

  



  }

 // on click of export button download all list transactions into csv format
 // table2csv js library is used here which has a function table2csv
 // Name of the file can be changed by going to the libray in the javascript folder
 // so let's put this code inside a function called convertTableToCSV

  
        
          //getPagination('.table-class');
          //getPagination('table');
      /*          PAGINATION 
      - on change max rows select options fade out all rows gt option value mx = 5
      - append pagination list as per numbers of rows / max rows option (20row/5= 4pages )
      - each pagination li on click -> fade out all tr gt max rows * li num and (5*pagenum 2 = 10 rows)
      - fade out all tr lt max rows * li num - max rows ((5*pagenum 2 = 10) - 5)
      - fade in all tr between (maxRows*PageNum) and (maxRows*pageNum)- MaxRows 
      */
     
  function getPagination (table){
      
        jQuery('.pagination').html('');           // reset pagination 
        var trnum = 0 ;                 // reset tr counter 
        var maxRows =  20 ;   // get Max Rows from select option
        var totalRows = jQuery(table+' tbody tr').length;   // numbers of rows 
       jQuery(table+' tr:gt(0)').each(function(){     // each TR in  table and not the header
        trnum++;                  // Start Counter 
        if (trnum > maxRows ){            // if tr number gt maxRows
          
          jQuery(this).hide();              // fade it out 
        }if (trnum <= maxRows ){jQuery(this).show();}// else fade in Important in case if it ..
       });                      //  was fade out to fade it in 
       if (totalRows > maxRows){            // if tr total rows gt max rows option
        var pagenum = Math.ceil(totalRows/maxRows); // ceil total(rows/maxrows) to get ..  
                              //  numbers of pages 
        for (var i = 1; i <= pagenum ;){      // for each page append pagination li 
        jQuery('.pagination').append('<li data-page="'+i+'">\
                      <span>'+ i++ +'<span class="sr-only">(current)</span></span>\
                    </li>').show();
        }                     // end for i 
      }                         // end if row count > max rows
      jQuery('.pagination li:first-child').addClass('active'); // add active class to the first li 
      jQuery('.pagination li').on('click',function(e){    // on click each page
       
          e.preventDefault();

        var pageNum = jQuery(this).attr('data-page'); // get it's number
        var trIndex = 0 ;             // reset tr counter
        jQuery('.pagination li').removeClass('active'); // remove active class from all li 
        jQuery(this).addClass('active');          // add active class to the clicked 
         jQuery(table+' tr:gt(0)').each(function(){   // each tr in table not the header
          trIndex++;                // tr index counter 
          // if tr index gt maxRows*pageNum or lt maxRows*pageNum-maxRows fade if out
          if (trIndex > (maxRows*pageNum) || trIndex <= ((maxRows*pageNum)-maxRows)){
            jQuery(this).hide();    
          }else {jQuery(this).show();}        //else fade in 
         });                    // end of for each tr in table
          });                   // end of on click pagination list
    
                        // end of on select change 
     
                
                // END OF PAGINATION 
  } 



  jQuery(".hideshareurl").click(function(){

    jQuery(".signtransUrl").css("display", "none");
    jQuery("#sendRecipientaddressmulti").val('');
    jQuery("#multisigAmount").val('');

  });


