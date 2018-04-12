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
                $("#qrcode").children().remove();
                $("#qrcode2").children().remove();
                $("#qrcode3").children().remove();
                $("#qrcode4").children().remove();
                jQuery("#printWallet").css("display", "none");
                $("#printWallet2").css("display", "none");


            });

			MnemonicsArray = Mnemonic.Words.ENGLISH;
            
            


			$('.modal').on('hidden', function() {
				$(':input', this).val('');
				$("#seedTextArea").val('');
				$("#firstpass").val('');
				$("#printWallet2").css("display", "none");
			});


});