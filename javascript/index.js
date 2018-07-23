$(document).ready(function(){
$(".modal").on("hidden.bs.modal", function(){
                $(".restorebefore").css("display", "block");
                $(".restoreappend").remove();
                $("#firststand").css("display", "block");
                $(".createappend").remove();
                $("#modaladdrcont").empty();
                $(".addrcl").remove();
                $("#qrcodecontainer").css("display", "none");
                $("#qrcodecontainer2").css("display", "none");
                $("#congrats").css("display", "none");
                // $("#qrcode").children().remove();
                // $("#qrcode2").children().remove();
                $("#qrcode3").children().remove();
                $("#qrcode4").children().remove();
                jQuery("#printWallet").css("display", "none");
                $("#printWallet2").css("display", "none");
                $(".errorContP").css("display", "none");
                $(".errorsignP").css("display", "none");
                $("#restoremultiform").css("display", "block");
                $(".multisigCont").css("display", "none");
                                $('#restoremultiform')[0].reset();
                $( "#qrcode5" ).find( "img" ).remove();

                $(".mainro").empty();

                count = 2;

            });

			  MnemonicsArray = Mnemonic.Words.ENGLISH;
                
          
     
           


			$('.modal').on('hidden', function() {
				$(':input', this).val('');
				$("#seedTextArea").val('');
				$("#firstpass").val('');
				$("#printWallet2").css("display", "none");
                $("#restoremultiform").trigger("reset");
                $('#restoremultiform')[0].reset();
                $("#errorsignP").css("display", "none");

			});


});

