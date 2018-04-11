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

    <link rel="stylesheet" media="screen" href="styles/screen.css">
    <link rel="stylesheet" media="print" href="styles/print.css">
    <link rel="icon" type="image/x-icon" href="images/fav.png">
    <link rel="stylesheet" media="screen" href="styles/wallet.css">


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
    <div id="root">
        <header id="top">
            <p id="logo">
                <a href="./">
                  <img src="images/logo.png">
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
                        <p>If you're a new user please click on the create XRK wallet button.</p>
                        <button type="submit" class="createwalletBtn margintop30" id="createkeypairsbtn1" data-toggle="modal" data-target="#myModal1">Create XRK Wallet</button>
                        <button type="submit" class="createwalletBtn margintop30" id="createkeypairsbtn1" data-toggle="modal" data-target="#myModal2">Restore XRK Wallet</button>
                    </div>
                    <div class="row margintop30">
                        <p>If you already have XRK wallet, please enter your wallet address here. </p>
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
                    <p class="themecolor"><i class="fas fa-dot-circle themecolor maright10"></i>Your wallet has been created.<br> Please download your private key and save it at a safe place, you will need it for your trasactions.
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



                    <a download="Recordskeeper-wallet-key.json" id="downloadlink" download>Download</a>
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
                    <h4 class="modal-title ">Recordskeeper Wallet</h4>
                    <span class="standfont"></span>
                </div>
                <div class="modal-body " id="firststand">

                    <div id="fistmodbod">
                        <p class="themecolor">
                            <i class="fas fa-dot-circle themecolor maright10"></i> Welcome to recordskeeper wallet<br> To ensure better security of your wallet you may enter a password.
                        </p>
                        <div class="row">
                            <div class="col-md-6">
                                <input type="password" name="firstpass" class="mb20" placeholder="password (OPTIONAL)" id="firstpass">
                            </div>
                            <div class="col-md-6">
                                <input type="password" name="firstpass" class="mb20" placeholder="confirm password" id="confpass">
                            </div>
                            <div class="colmd-12">
                                <button type="submit" class="createwalletBtn margintop30" id="createXRKhd">Create XRK Wallet</button>
                            </div>
                        </div>
                    </div>
                    
                </div>
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
                 <a download="Recordskeeper-wallet-key.json" id="downloadlink" download>Download</a>
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
                    <h4 class="modal-title">Recordskeeper Wallet</h4>
                </div>
                <div class="modal-body" id="restoremodBody">
                    <div class="restorebefore">
                        <span class="seedlabel">Seed (24 words, order is important. Please write it or print it ):</span>
                       
                        <div class="textareaCont">
                            <textarea rows="15" cols="100" id="seedTextArea" value=""></textarea>

                        </div>


                        <div class="row">
                            <div class="col-md-12">
                                <input type="password" name="firstpass" class="mb20" placeholder="password" id="restorepass">
                            </div>

                            <div class="colmd-12">

                                <button type="submit" class="createwalletBtn margintop30" id="restoreWalletBtn">Restore XRK Wallet</button>
                                <p id="restoreErrorP"></p>

                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" id="createKeyCloseBtn" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    <!-- all the script here to make the page load faster -->


    <script src="javascript/jquery.js"></script>
    <script src="javascript/scripts.js"></script>
    <script src="javascript/custom.js"></script>
    <script src="javascript/mobile.js"></script>
    <script src="javascript/index.js"></script>
     <script src="javascript/tagsly.js"></script>
   <!--  <script>
      $(function() {
        $('#tags').tagsly({
          suggestions: function(input, cb) {
            cb(['jQuery', 'Html', 'CSS', 'JavaScript']);
          },
          placeholder: 'Enter tags!',
          maxItems: 5
        });
      });
    </script> -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.8.13/jquery-ui.min.js"></script>
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
