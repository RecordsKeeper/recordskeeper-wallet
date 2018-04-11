$(document).ready(function(){
$(".modal").on("hidden.bs.modal", function(){
                $(".restorebefore").css("display", "block");
                $(".restoreappend").remove();
                jQuery("#firststand").css("display", "block");
                jQuery(".createappend").remove();
                jQuery("#modaladdrcont").empty();
                jQuery(".addrcl").remove();
                jQuery("#qrcodecontainer").css("display", "none");

            });

			MnemonicsArray = Mnemonic.Words.ENGLISH;
            
             $( "#seedTextArea" ).autocomplete({
        source: MnemonicsArray
    });

});