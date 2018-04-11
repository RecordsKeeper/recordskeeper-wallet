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


            });

			MnemonicsArray = Mnemonic.Words.ENGLISH;

	 // $('#seedTextArea').tagsly({
  //         suggestions: function(input, cb) {
  //           cb(MnemonicsArray);
  //         },
  //         placeholder: 'Enter tags!',
  //         maxItems: 5
  //       });
    
            
             $( "#seedTextArea" ).autocomplete({
        source: MnemonicsArray
    });


             $('#mymodal2').on('hidden', function() {
    $(':input', this).val('');
  });


});