 <?php

?>


<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>RecordsKeeper</title>
    <meta name="description" content="">
    <meta name="keywords" content="">
    <meta name="theme-color" content="#212739">
    <meta name="MobileOptimized" content="320">
    <meta name="HandheldFriendly" content="true">
    <meta name="viewport" content="width=device-width, initial-scale=1, target-densitydpi=device-dpi">
    <meta name="author" content="http://psdhtml.me">
    <!-- Bootstrap core CSS -->
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">

    <link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet">
    <link rel="stylesheet" media="screen" href="styles/textext.core.css">
    <link rel="stylesheet" type="text/css" href="styles/textext.plugin.autocomplete.css">
    <link rel="stylesheet" media="screen" href="styles/screen.css">
    <link rel="stylesheet" media="print" href="styles/print.css">
    <link rel="icon" type="image/x-icon" href="images/fav.png">
    <link rel="stylesheet" media="screen" href="styles/wallet.css">
    <link rel="stylesheet" media="screen" href="styles/bootstrap-tokenfield.css">
    <link rel="stylesheet" media="screen" href="styles/textext.plugin.autocomplete.css">
    <link rel="stylesheet" media="screen" href="styles/tokenfield-typeahead.css">
     <!-- jQuery UI CSS -->
    <link href="https://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" type="text/css" rel="stylesheet">
    <!-- Bootstrap styling for Typeahead -->
    <link href="styles/tokenfield-typeahead.css" type="text/css" rel="stylesheet">
    <!-- Tokenfield CSS -->
    <link href="styles/bootstrap-tokenfield.css" type="text/css" rel="stylesheet">
    <!-- Docs CSS -->
    <link href="styles/pygments-manni.css" type="text/css" rel="stylesheet">
    <link href="styles/docs.css" type="text/css" rel="stylesheet">
 
  



    


    <!-- link for table to css cdn here  -->
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/TableExport/3.3.13/css/tableexport.css">
    <meta property="og:title" content="">
    <meta property="og:type" content="website">
    <meta property="og:description" content=".">
    <meta property="og:site_name" content="">
    <meta property="og:url" content="">
    <meta property="og:image" content="">
    <style type="text/css">
    </style>

</head>

<body>
    <div class="se-pre-con"></div>
    <!-- <div id="loader">
      <img src="images/spin.gif">
    </div> -->
    <div id="root">
        <header id="top">
            <p id="logo">
                <a href="./">
                  <img src="images/logo.svg">
                </a>
            </p>
            <nav id="skip">
                <ul>
                    <li><a href="#nav" accesskey="n">Skip to navigation (n)</a></li>
                    <li><a href="#content" accesskey="c">Skip to content (c)</a></li>
                    <li><a href="#footer" accesskey="f">Skip to footer (f)</a></li>
                </ul>
            </nav>
            <nav id="nav">
                <ul>
                    <div id="togglecont">
                        <input class="tgl tgl-light" id="cb1" type="checkbox" />
                        <label class="tgl-btn" for="cb1"></label>
                    </div>
                    <span>
                        <label id="togglecontlabel">Mainnet</label>
                    </span>
                </ul>
            </nav>
        </header>


        <article id="content">
            <div class="row">
                <div class="loginContainer">
                    <div class="row">
                        <p class="font14">If you're a new user please click on the create XRK wallet button.</p>
                        <button type="submit" class="createwalletBtn margintop30" id="createkeypairsbtn1" data-toggle="modal" data-target="#myModal1">Create XRK Wallet</button>
                        <button type="submit" class="createwalletBtn margintop30" id="createkeypairsbtn1" data-toggle="modal" data-target="#myModal2">Restore XRK Wallet</button>
                    </div>
                    <div class="row margintop30">
                        <p class="font14">If you already have XRK wallet, please enter your wallet address here. </p>
                        <input type="text" class="registered_address logininputs" name="registered_adr" id="registered_adr" placeholder="Enter your XRK wallet address" value="">
                        <button type="submit" class="createwalletBtn margintop30" id="walletloginbtn">Submit</button>
                    </div>
                </div>
            </div>
        </article>

        <footer id="footer">
            <ul>
                <li>&copy; RecordsKeeper @ 2016-2018. All rights reserved </li>
                <li><a href="./" target="_blank">Terms</a></li>
                <li><a href="./" target="_blank">Privacy Policy</a></li>
                <li><a href="http://explorer.recordskeeper.co/" target="_blank">Mainnet Explorer</a></li>
                <li><a href="http://test-explorer.recordskeeper.co/" target="_blank">Testnet Explorer</a></li>

                <li><a href="http://faucet.recordskeeper.co/" target="_blank">Faucet</a></li>
                <li><a href="http://stats.recordskeeper.co/" target="_blank">Blockchain Statistics</a></li>
                <li><a href="http://miner.recordskeeper.co/" target="_blank">Miner Statistics</a></li>
                <li><a href="http://airdrop.recordskeeper.co/" target="_blank">Airdrop</a></li>
                <li><a href="http://demo.recordskeeper.co/" target="_blank">Demo</a></li>
                <li><a href="https://docs.recordskeeper.co/" target="_blank">Docs</a></li>

            </ul>
        </footer>
    </div>

    <div id="myModal" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Recordskeeper Wallet</h4>
                </div>
                <div class="modal-body standfont" id="printdiv">
                    <p class="themecolor" ><i class="fas fa-dot-circle themecolor maright10"></i>Your wallet has been created.<br> Please download your private key and save it at a safe place, you will need it for your trasactions.
                    </p>
                    <p id="modalshowaddress">

                    </p>
                    <p id="modalshowkey">

                    </p>
                    <div id="printwalletcont">
                        <div class="walletheader">
                            <img src="images/logo.png">
                        </div>
                        <div class="row walletcontent">
                            <div class="col-md-6">
                                <div id="qrcode">
                                    <p class="qrlabel">

                                    </p>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div id="qrcode2">
                                    <p class="qrlabel">

                                    </p>
                                </div>

                            </div>
                        </div>
                        <div class="row walletcontent">
                            <p id="modalboxaddress" class="modc">

                            </p>
                            <p id="modalboxkey" class="modc">

                            </p>
                        </div>

                    </div>



                    <a download="RecordsKeeper-wallet-key.json" id="downloadlink" download>Download</a>
                    <a id="printWallet" value="Print" class="noprint">Print Wallet</a>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" id="createKeyCloseBtn" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <div id="myModal1" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title ">Create RecordsKeeper Wallet</h4>
                    <span class="standfont"></span>
                </div>
                <div class="modal-body " id="firststand">

                    <div id="fistmodbod">
                       
                        <p class="themecolor regular   font14">
                             You may create XRK wallet without any password but it is highly recommended that you provide a password for additional security of your wallet.
                        </p>
                        <div class="row">
                            <div class="col-md-6">
                                <input type="password" name="firstpass" class="mb20" placeholder="Password (optional)" id="firstpass" value="">
                            </div>
                            <div class="col-md-6">
                                <input type="password" name="firstpass" class="mb20" placeholder="Confirm Password" id="confpass" value="" >
                            </div>
                            <div class="colmd-12">
                                <button type="submit" class="createwalletBtn margintop30" id="createXRKhd">Create XRK Wallet</button>
                            </div>
                        </div> 
                    </div>
                    
                </div>
                 <div class="seedcont"> <img id="printimg2" src="">  </div>
                <div id="seedcontainer">
                      
                </div>
               <!--  <p class="seedcontainer" id="seed">
                    
                </p> -->
               


                <div class='row walletcontent' id="qrcodecontainer">
                    <img src='images/testnet.png' id='printimg'>
                    <div class='col-md-6'>
                        
                        <div id='qrcode'>
                            <p class='qrlabel'>Public Address</p>
                        </div>
                    </div>
                    <div class='col-md-6'>

                        <div id='qrcode2'>
                            <p class='qrlabel'>Private Key</p>
                        </div>
                    </div>
                </div>

                <div class=''>
                    <div class='' id="modaladdrcont">
                        <p id='modalboxaddress' class='modc'></p>
                        <p id='modalboxkey' class='modc'></p>
                    </div>
                    <div>
                        <div class="col-md-12 printcontainer">

                            <a id='printWallet' value='Print' class='noprint'>Print Wallet</a>
                        </div>
                    </div>
                </div>
                 <a download="RecordsKeeper-wallet-key.json" id="downloadlink" download>Download</a>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" id="createKeyCloseBtn" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

    <div id="myModal2" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title" id="restoretitle">Restore RecordsKeeper Wallet</h4>

                </div>
                <p id="congrats">Congratulations !! your wallet has been restored.</p>
                <div class="modal-body " id="restoremodBody">
                    <form id="restoreform">
                      <div class="restorebefore">
                         
                         
                          <div class="textareaCont">
                              <label class="labelrestore"> Enter 24 Seed words in correct order to restore your wallet</label>
                              <textarea rows="15" cols="100" class="form-control" id="seedTextArea" value="" required="required" style="width: 100% !important"></textarea>
                             

                              <p id="restoreErrorP">Please Enter a Valid Seed Phrase</p>
                          </div>


                          <div class="row">
                              <div class="col-md-12">
                                  <label class="labelrestore">Please enter exactly same password below only If you have set password while creating wallet you are trying to restore. Any password entered will restore a valid XRK wallet which may be different than your actual wallet. Make sure your password is correct.</label>
                                  <input type="password" name="firstpass" class="mb20" placeholder="Password" id="restorepass">
                              </div>

                              <div class="colmd-12">

                                  <button type="submit" class="createwalletBtn margintop30" id="restoreWalletBtn">Restore XRK Wallet</button>
                                  

                              </div>
                          </div>
                      </div>
                       <div class='row walletcontent' id="qrcodecontainer2">
                          <img id='printimg3' src='' >
                          <div class='col-md-6 code3' >
                                <p class='qrlabel'>Public Address</p>
                                <div id='qrcode3'>
                                    
                                </div>
                          </div>
                          <div class='col-md-6 code4'>
                                  <p class='qrlabel'>Private Key</p>
                                  <div id='qrcode4'>
                                      
                                  </div>
                          </div>
                      </div>
                    </form>
                </div>


                <div class="modal-footer">
                    <div class="col-md-12 margbot10">
                      <a id='printWallet2' value='Print' class='noprint'>Print Wallet</a>
                    </div>
                    

                    <button type="button" class="btn btn-default" id="createKeyCloseBtn" data-dismiss="modal">Close</button>
                </div>
            </div>


        </div>

    </div>

    <!-- all the script here to make the page load faster -->


    <script src="javascript/jquery.js"></script>
    <script src="https://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-autocomplete/1.0.7/jquery.auto-complete.min.js"></script> -->
    <script src="javascript/bootstrap-tokenfield.min.js"></script>
         

    <script src="javascript/scripts.js"></script>
    <script src="javascript/custom.js"></script>
    <script src="javascript/mobile.js"></script>
    <script src="javascript/index.js"></script>
    
    <script type="text/javascript" src="javascript/typeahead.bundle.js" charset="UTF-8"></script>
        <script type="text/javascript" src="javascript/typeahead.bundle.js" charset="UTF-8"></script>

    <script type="text/javascript" src="javascript/docs.js" charset="UTF-8"></script>

    <script>



    </script>
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.8.13/jquery-ui.min.js"></script> -->
    <script src="https://cdn.rawgit.com/davidshimjs/qrcodejs/gh-pages/qrcode.min.js"></script>

    <script src="javascript/table2CSV.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/6.11.0/sweetalert2.all.min.js"></script>
    <script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>
    <script src="javascript/bitcore-lib/bitcore-lib.js"></script>
    <script src="javascript/bitcore-mnemonic/bitcore-mnemonic.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.qrcode/1.0/jquery.qrcode.min.js"></script>
    <script src="javascript/wallet.js"></script>

    <script src="https://fastcdn.org/FileSaver.js/1.1.20151003/FileSaver.min.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/TableExport/3.3.13/js/tableexport.js"></script>
</body>

</html>
