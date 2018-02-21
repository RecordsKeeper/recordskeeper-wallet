/*
Name: app.js
Company: Toshblocks
Author: Mayank Vijh
Description: This file uses the browser bitcore libraries to help create the wallet.
Note: The Child addresses are generated with 0 index child key from the master and 
      The Change addresses are generated with 1 index child key from the master.
*/


/*
Required Libraries
*/
var bitcore = require('bitcore-lib');
var Mnemonic = require('bitcore-mnemonic');
var Explorers = require('bitcore-explorers');
var Insight = Explorers.Insight;
var insightTestnet = new Insight('testnet');
var insightMainnet = new Insight('mainnet');
/*
Global Variables
*/
//Pass DEBUG as "true" to start the console logging
var DEBUG = true;
//var childaddress =1;
var changeaddress =1;
const BTC_SATOSHI = 100000000;
var previouslastaddress = 1;
var lastaddress = 1;
/*
generatePrivateKey(): This function is use to generate a new Private Key
@params: network- This defined the network either 'mainnet' or 'testnet', you can also pass empty string to use mainnet.
@return: Generated Private Key is returned
*/
function generatePrivateKey(network) {
  DEBUG && console.log('generatePrivateKey: Starting');
  var privateKey;
  if (network == 'testnet' || network == 'mainnet' || network == '') {
    DEBUG && console.log("generatePrivateKey: Generating the Private Key");
    privateKey = new bitcore.PrivateKey(network);

    DEBUG && console.log("generatePrivateKey: Private Key is: ");
    DEBUG && console.log(privateKey);
          
  }
  else  {
    DEBUG && cosole.log("generatePrivateKey: Please specify the correct network");
    throw "generatePrivateKey: Please specify the correct network";
  }
  getBalancefromUtxosTestnet
  DEBUG && console.log('generatePrivateKey: Ending');
  return privateKey;
}

/*
generateWIFPrivateKey: This function is use to generate a new Private Key in Wallet Friendly format
@params: network- This defined the network either 'mainnet' or 'testnet', you can also pass empty string to use mainnet.
@return: Generated Private Key in WIF format is returned
*/
function generateWIFPrivateKey(network)  {
  DEBUG && console.log('generateWIFPrivateKey: Starting');
  var privateKey;
  if (network == 'testnet' || network == 'mainnet' || network == '') {
    DEBUG && console.log("generateWIFPrivateKey: Generating the Private Key in WIF");
    privateKey = new bitcore.PrivateKey(network).toWIF();
    DEBUG && console.log("generateWIFPrivateKey: Private Key in WIF is: ");
    DEBUG && console.log(privateKey);
  }
  else  {
    DEBUG && console.log("generateWIFPrivateKey: Please specify the correct network");
    throw "generateWIFPrivateKey: Please specify the correct network";
  }
  DEBUG && console.log('generateWIFPrivateKey: Ending');
  return privateKey;
}

/*
getAddressFromPrivateKey: This function is use to get address from the Private Key
@params: priv- Private Key to get address from
@return: Generated address is returned
*/
function getAddressFromPrivateKey(priv) {
  DEBUG && console.log('getAddressFromPrivateKey: Starting');
  if (priv=='')
  {
    DEBUG && console.log('getAddressFromPrivateKey: No Private Key Provided');
    throw "getAddressFromPrivateKey: No Private Key Provided";
  }
  var privKey = new bitcore.PrivateKey(priv);
  var address = privKey.toAddress();
  DEBUG && console.log('getAddressFromPrivateKey: Generate address is: ');
  DEBUG && console.log(address);
  DEBUG && console.log('getAddressFromPrivateKey: Ending');
  return address;
}

/*
generatePrivateKeyFromSHA256: This function is use to get Private Key in WIF from a random string
@params: str- random string for the hash to get the key.
network- This defined the network either 'mainnet' or 'testnet', you can also pass empty string to use mainnet.
@return: Generated address is returned
*/
function generatePrivateKeyWIFFromSHA256(str, network)  {
  DEBUG && console.log('generatePrivateKeyWIFFromSHA256: Starting');
  if (str=='') {
    DEBUG && console.log('generatePrivateKeyWIFFromSHA256: No string provided')
    throw "generatePrivateKeyWIFFromSHA256: No string provided"
  }
  var value = new Buffer(str);
  var hash = bitcore.crypto.Hash.sha256(value);
  var bn = bitcore.crypto.BN.fromBuffer(hash);
  var privateKey;
  if (network == 'testnet' || network == 'mainnet' || network == '') {
    DEBUG && console.log('generatePrivateKeyWIFFromSHA256: Generating WIF Private Key');
    privateKey = new bitcore.PrivateKey(bn, network);
    DEBUG && console.log('generatePrivateKeyWIFFromSHA256: Generated WIF Private Key is: ');
    DEBUG && console.log(privateKey);
  }
  else {
    DEBUG && console.log("generatePrivateKeyFromSHA256: Please specify the correct network");
    throw "generatePrivateKeyFromSHA256: Please specify the correct network";
  }
  DEBUG && console.log('generatePrivateKeyWIFFromSHA256: Ending');
  return privateKey.toWIF();
}

/*
getAddressFromWIF: This function is use to get address from the WIF Private Key
@params: wif- Private Key in wif format to get address from
@return: Generated address is returned
*/
function getAddressFromWIF(wif) {
  DEBUG && console.log('getAddressFromWIF: Starting');
  if (wif=='') {
    DEBUG && console.log('getAddressFromWIF: No wif provided')
    throw "getAddressFromWIF: No wif provided"
  }
  var address = new bitcore.PrivateKey.fromWIF(wif).toAddress();
  DEBUG && console.log('getAddressFromWIF: Generating WIF Address');
  console.log(address);
  DEBUG && console.log('getAddressFromWIF: Ending');
  return address;
}

/*
generateRandomMnemonic: This function is use to generate a random Mnemonic Seed
@params: N/A
@return: Generate mnemonic string
*/
function generateRandomMnemonic() {
  DEBUG && console.log('generateRandomMnemonic: Starting');
  var code = new Mnemonic();
  DEBUG && console.log('generateRandomMnemonic: Generated Mnemonics are: ');
  DEBUG && console.log(code.toString());
  DEBUG && console.log('generateRandomMnemonic: Ending');
  return code.toString();
}

/*
genHDPrivKeyMnemonics: This function is use to generate HD Private Keys from Mnemonics
@params: str- The mnemonics string to generate HD Private Key
customWordlist- This is the world list to map the mnemonic to. Pass empty string to use Bitcore WordList
@return: The HD Private Key is returned.
*/
function genHDPrivKeyMnemonics(str, customWordlist)  {
  DEBUG && console.log('genHDPrivKeyMnemonics: Starting');
  if (str=='') {
    DEBUG && console.log('genHDPrivKeyMnemonics: No mnemonics provided')
    throw "genHDPrivKeyMnemonics: No mnemonics provided"
  }
  var valid;
  if (customWordlist == ""){
    valid = Mnemonic.isValid(str);
  }
  else {
    valid = Mnemonic.isValid(str, customWordlist);
  }

  DEBUG && console.log("genHDPrivKeyMnemonics: Mnemonic validity: " + valid);
  var code,xpriv;
  if (valid) {
    code = new Mnemonic(str);
    xpriv = code.toHDPrivateKey();
  } else {
    DEBUG && console.log("genHDPrivKeyMnemonics: Mnemonic is not valid");
    throw "genHDPrivKeyMnemonics: Error- Mnemonic is not valid";
  }
  DEBUG && console.log('genHDPrivKeyMnemonics: Ending');
  return xpriv;
}

/*
genHDPrivKeyMnemonicsPass: This function is use to generate HD Private Keys from Mnemonics with Password
@params: str- The mnemonics string to generate HD Private Key
password- Password to protect the HD Private Key
customWordlist- This is the world list to map the mnemonic to. Pass empty string to use Bitcore WordList
@return: The HD Private Key is returned.
*/
function genHDPrivKeyMnemonicsPass(str, password, customWordlist) {
  DEBUG && console.log('genHDPrivKeyMnemonicsPass: Starting');
  if (str=='' || password=='') {
    DEBUG && console.log('genHDPrivKeyMnemonicsPass: No mnemonics or password provided');
    throw "genHDPrivKeyMnemonicsPass: No mnemonics or password provided";
  }
  var valid;
    if (customWordlist == ""){
      valid = Mnemonic.isValid(str);
    }
    else {
      valid = Mnemonic.isValid(str, customWordlist);
    }
  var code,xpriv;
  if (valid) {
    code = new Mnemonic(str);
    xpriv = code.toHDPrivateKey(password);
  } else {
    DEBUG && console.log("genHDPrivKeyMnemonicsPass: Mnemonic is not valid");
    throw "genHDPrivKeyMnemonicsPass: Error- Mnemonic is not valid";
  }
  var HDPrivateKey = bitcore.HDPrivateKey;
  var retrivedkey = new HDPrivateKey(xpriv);
  //var privkey = retrivedkey.toObject().privateKey;
  DEBUG && console.log('genHDPrivKeyMnemonicsPass: Generated private key is: ');
  DEBUG && console.log(retrivedkey);
  DEBUG && console.log('genHDPrivKeyMnemonicsPass: Ending');
  return retrivedkey;
}

/*
genHDPrivKey: This function is use to generate HD PrivKey
@params: N/A
@return: The generate HD Private Key is returned.
*/
function genHDPrivKey() {
  DEBUG && console.log('genHDPrivKey: Starting');
  var HDPrivateKey = bitcore.HDPrivateKey;
  var hdPrivateKey = new HDPrivateKey();
  DEBUG && console.log("genHDPrivKey: Generated HD Priv Key is: ");
  DEBUG && console.log(hdPrivateKey);
  DEBUG && console.log('genHDPrivKey: Ending');
  return hdPrivateKey;
}

/*
retriveHDKeyFromMnemonicKey: This function is use to retrive the HD Private Key from Mnemonic generated key.
@params: xpriv- Mnemonic generated private key.
@return: The retrived HD Key is returned.
*/
function retriveHDKeyFromMnemonicKey(xpriv) {
  DEBUG && console.log('retriveHDKeyFromMnemonicKey: Starting');
  if (xpriv=='') {
      DEBUG && console.log('retriveHDKeyFromMnemonicKey: No mnemonic private key provided');
      throw "retriveHDKeyFromMnemonicKey: No mnemonic private key provided";
  }
  var HDPrivateKey = bitcore.HDPrivateKey;
  var retrievedKey = new HDPrivateKey(xpriv);
  DEBUG && console.log("retriveHDKeyFromMnemonicKey: Retrived HD Priv Key is: ");
  DEBUG && console.log(retrievedKey);
  DEBUG && console.log('retriveHDKeyFromMnemonicKey: Ending');
  return retrievedKey;
}

/*
getMasterAddressFromHDKey: This function is used to generate the master address from the HD Private Key
@params: hdprivkey- This is the HD Private Key to get master address.
network- This is the network defined for the address. Pass 'testnet' to use Testnet or pass 'livenet' or 'mainnet' to use Mainnet.
@return: The master address for the HD Key is returned.
*/
function getMasterAddressFromHDKey(hdprivkey, network) {
  DEBUG && console.log('getMasterAddressFromHDKey: Starting');
  if (hdprivkey=='', network=='') {
      DEBUG && console.log('getMasterAddressFromHDKey: No private key or network provided');
      throw "getMasterAddressFromHDKey: No private key or network provided";
  }
  var retrivedKey = new bitcore.HDPrivateKey(hdprivkey);
  var hdpublickey = retrivedKey.hdPublicKey;
  var address;
  if (network == 'testnet') {
    address = new bitcore.Address(hdpublickey.publicKey, bitcore.Networks.testnet);
  } else if(network == 'mainnet' || network == 'livenet') {
    address = new bitcore.Address(hdpublickey.publicKey, bitcore.Networks.livenet);
  }
  DEBUG && console.log('getMasterAddressFromHDKey: The master address for HD Key is: ');
  DEBUG && console.log(address);
  DEBUG && console.log('getMasterAddressFromHDKey: Ending');
  return address;
}

/*
genChildAddress - This function is use to generate the child addresses with a counter
@params: xpriv- This is the HD private key
network- This is the network defined for the address. Pass 'testnet' to use Testnet or pass 'livenet' or 'mainnet' to use Mainnet.
@return: The generated new address is returned.
*/
function genChildAddress(xpriv, network, newaddresscount) {
  
  DEBUG && console.log('genChildAddress: Starting');
  if (xpriv=='' || network=='') {
    DEBUG && console.log('genChildAddress: No private key or network provided');
    throw "genChildAddress: No private key or network provided";
  }
  var retrivedKey = new bitcore.HDPrivateKey(xpriv);
  DEBUG && console.log('genChildAddress: The retrivedkey is: ');
  DEBUG && console.log(retrivedKey);
  //var hdPublicKey = retrivedKey.hdPublicKey;
  var childprivatekey = retrivedKey.deriveChild(0).deriveChild(newaddresscount);
  var childAddress = childprivatekey.privateKey.toAddress(bitcore.Networks.testnet);
  //var childAddress = new bitcore.Address(hdPublicKey.deriveChild(0).deriveChild(newaddresscount).publicKey, bitcore.Networks.testnet);
  DEBUG && console.log('genChildAddress: The child address for HD Key is: ');
  DEBUG && console.log(childAddress);
  DEBUG && console.log('genChildAddress: The child private Key for HD Key is: ');
  DEBUG && console.log(childprivatekey);
  //childaddress++;
  DEBUG && console.log('genChildAddress: Ending');
  return childAddress;
}

/*
getBalancefromUtxosTestnet: This function will get the utxos for the address and add the amount and fees for the transaction to the Testnet.
@params: addressOutpoint- Address where the user has the unspent bitcoins
@return: Transaction is returned
*/
function getBalancefromUtxosTestnet(addressOutpoint) {
  DEBUG && console.log('getBalancefromUtxosTestnet: Starting');
  return new Promise(function(resolve, reject) {
    insightTestnet.getUnspentUtxos(addressOutpoint, function(err, utxos){
    if (err)  {
      //Handle the errors
      DEBUG && console.log('getBalancefromUtxosTestnet: Error - ');
      DEBUG && console.log(err);
      return reject(err);
      
    }
    else  {
      //get total balance for the addresses
      DEBUG && console.log('getBalancefromUtxosTestnet: Utxos output is - ');
      DEBUG && console.log(utxos);
      var sum =0;
      utxos.forEach(function(ut) {
        sum = sum + ut.satoshis;
      });
      DEBUG && console.log('getBalancefromUtxosTestnet: Total unspent satoshis -');
      DEBUG && console.log(sum);
      DEBUG && console.log('getBalancefromUtxosTestnet: Ending');
      resolve(sum/BTC_SATOSHI);
      }
  });
  });
}

/*
sendTransactionfromUtxosTestnet: This function will get the utxos for the address and add the amount and fees for the transaction to be broadcasted to Testnet and broadcast the transaction.
@params: addressOutpoint- Address where the user has the unspent bitcoins
sendAddress- This is the address where the transaction has to be sent.
amount- The amount of satoshis to be sent.
fees- Fees required for the transaction.
privatekeys- All the privatekeys corresponding to the addresses used.
@return: Transaction ID is returned
*/
function sendTransactionfromUtxosTestnet(addressOutpoint, sendAddress, amount, fee, privatekeys) {

  DEBUG && console.log('sendTransactionfromUtxosTestnet: Starting');
  amount = amount*BTC_SATOSHI;
  fee = fee*BTC_SATOSHI;
  var sendAdd = bitcore.Address.fromString(sendAddress);
  var changeAdd = bitcore.Address.fromString('mrD6KfhHPPbaKbBLmDDUP6QmZV1PEurLGW');
  console.log("addressOutpoint", addressOutpoint);
  return new Promise(function(resolve, reject) {
  insightTestnet.getUnspentUtxos(addressOutpoint, function(err, utxos){
    if (err)  {
      //Handle the errors
      DEBUG && console.log('sendTransactionfromUtxosTestnet: Error - ');
      DEBUG && console.log(err);
      return reject(err);
    }
    else  {
      //create transaction with utxo
      DEBUG && console.log('sendTransactionfromUtxosTestnet: The unspent output is - ');
      DEBUG && console.log(utxos);
      var tx = bitcore.Transaction();
      tx.from(utxos);
      tx.to(sendAdd, amount);
      tx.change(changeAdd);
      tx.fee(fee);
      DEBUG && console.log('sendTransactionfromUtxosTestnet: The created transaction is - ');
      DEBUG && console.log(tx);
      var signingkeys = [];
      var HDPrivateKey = bitcore.HDPrivateKey;
      for (var i =0; i < privatekeys.length; i++) {
         signingkeys.push(new bitcore.PrivateKey(new HDPrivateKey(privatekeys[i]).toObject().privateKey));
       }
      console.log("privatekeys", signingkeys);
      tx.sign(signingkeys);
      DEBUG && console.log('sendTransactionfromUtxosTestnet: The signed transaction is - ');
      DEBUG && console.log(tx);
      insightTestnet.broadcast(tx.serialize(), function(err, returnedTxId) {
      if (err) {
              // Handle the errors here
      }
      else {
              DEBUG && console.log('Transaction broadcast successfull: ', returnedTxId);
      }
      });
      DEBUG && console.log('getTransactionfromUtxosTestnet: Ending');
      resolve(tx);
      }
  });
});
}

/*
genChangeAddress - This function is use to generate the change addresses with a counter
@params: xpriv- This is the HD private key
network- This is the network defined for the address. Pass 'testnet' to use Testnet or pass 'livenet' or 'mainnet' to use Mainnet.
@return: The generated change address is returned.
*/
function genChangeAddress(xpriv, network) {
  DEBUG && console.log('genChangeAddresses: Starting');
  if (xpriv=='' || network=='') {
    DEBUG && console.log('genChangeAddresses: No private key or network provided');
    throw "genChangeAddresses: No private key or network provided";
  }
  var retrivedKey = new bitcore.HDPrivateKey(xpriv);
  DEBUG && console.log('genChangeAddresses: Retrived key is -');
  DEBUG && console.log(retrivedKey);
  var hdPublicKey = retrivedKey.hdPublicKey;
  var changeprivatekey = retrivedKey.deriveChild(1).deriveChild(changeaddress);
  var changeAddress = new bitcore.Address(hdPublicKey.deriveChild(1).deriveChild(changeaddress).publicKey, bitcore.Networks.testnet);
  DEBUG && console.log('genChangeAddresses: The change address for HD Key is: ');
  DEBUG && console.log(changeAddress);
  DEBUG && console.log('genChangeAddresses: The change private Key for HD Key is: ');
  DEBUG && console.log(changeprivatekey);
  changeaddress++;
  DEBUG && console.log('genChangeAddresses: Ending');
  return changeAddress;

}

/*
genChildKeys - This function is use to generate the child keys with a counter
@params: xpriv- This is the HD private key
network- This is the network defined for the address. Pass 'testnet' to use Testnet or pass 'livenet' or 'mainnet' to use Mainnet.
@return: The child priv key is returned.
*/
function genChildKeys(xpriv, network, newaddresscount) {
  
  DEBUG && console.log('genChildKeys: Starting');
  if (xpriv=='' || network=='') {
    DEBUG && console.log('genChildKeys: No private key or network provided');
    throw "genChildKeys: No private key or network provided";
  }
  var retrivedKey = new bitcore.HDPrivateKey(xpriv);
  DEBUG && console.log(retrivedKey);
  var hdPublicKey = retrivedKey.hdPublicKey;
  var childprivatekey = retrivedKey.deriveChild(0).deriveChild(newaddresscount);
  
  
  DEBUG && console.log('genChildKeys: The child private Key for HD Key is: ');
  DEBUG && console.log(childprivatekey);
  //childaddress++;
  DEBUG && console.log('genChildKeys: Ending');
  return childprivatekey;
}

/*
lastAddressPromise: This is the internal function used to check the balance in the child address for the provided key
@param: resolve- This is the resolve function passed to the function from the promise made in the calling function.
xpriv - This is the HD Master private key which is used to generate the child addresses
childCounter - This is the value for the derived child key and address. For example: Pass '1' to get the first child, Pass '2' to get the 2nd child
@return: If the address has some unspent output then the derived childCounter corresponding to the address is returned else 0 is returned.
*/

function lastAddressPromise(resolve, xpriv, childCounter) {
  DEBUG && console.log('lastAddressPromise: Starting');
  var retrivedKey = new bitcore.HDPrivateKey(xpriv);
  DEBUG && console.log('lastAddressPromise: The retrivedkey is: ');
  DEBUG && console.log(retrivedKey);
  var childprivatekey = retrivedKey.deriveChild(0).deriveChild(childCounter);
  DEBUG && console.log('lastAddressPromise: The child key is: ');
  DEBUG && console.log(childprivatekey);
  var childAddress = childprivatekey.privateKey.toAddress(bitcore.Networks.testnet);
  DEBUG && console.log('lastAddressPromise: The child address is: ');
  DEBUG && console.log(childAddress);
  
    insightTestnet.getUnspentUtxos(childAddress, function(err, utxos){
      if (err)  {
        //Handle the errors
        DEBUG && console.log('lastAddressPromise: Error - ');
        DEBUG && console.log(err);
        return err;
      }
      else  {
        DEBUG && console.log('lastAddressPromise: The balance in the address is: ');
        DEBUG && console.log(utxos.length);
        if (utxos.length > 0)  {
          DEBUG && console.log('lastAddressPromise: The Address derive counter is: ');
          DEBUG && console.log(childCounter);
          lastaddress = childCounter;
          resolve(lastaddress);

        }
        else
        {
          DEBUG && console.log('lastUsedAddress: No balance in current address');
          resolve(0);

        }
        DEBUG && console.log('lastAddressPromise: Ending');
   
      }
  
 });

}

/*
loopPromiseGetLastAddress: This function is used to get the last address used in the chain of all the addresses.
@params: xpriv - This is the HD Master Key to derive the childs.
startCounter - This is the start counter to check for the used addresses.
endCounter - This is the end counter to check for the used addresses.
@return: The last used address in the chain of all the addresses is returned.
*/
async function loopPromiseGetLastAddress(xpriv, startCounter, endCounter) {
    DEBUG && console.log('loopPromiseGetLastAddress: Starting');
    for (let i = startCounter; i <= endCounter; i++) {
        await new Promise(resolve => {
        // Call the function to check the balance in the address
        var returnpromise = lastAddressPromise(resolve, xpriv, i);

        });
        DEBUG && console.log("loopPromiseGetLastAddressloop: Last address which has vaule is :")
        DEBUG && console.log(lastaddress);
    }
    if (lastaddress == previouslastaddress)
    {
      DEBUG && console.log("loopPromiseGetLastAddressloop: Last address which has vaule is :")
      DEBUG && console.log(lastaddress);
      DEBUG && console.log("loopPromiseGetLastAddressloop: Ending")
      return lastaddress;
    }
    else
    {
      previouslastaddress = lastaddress;
      DEBUG && console.log("loopPromiseGetLastAddressloop: Check the next 'endCounter' addresses.")
      loopPromiseGetLastAddress(xpriv, lastaddress, lastaddress+endCounter);
    
    }
}






//To use the QR code, we will use the google api. Something like this: https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=%2012kQMUkB9QJu9X5JP9H9M2qMUmrGtDakkV
