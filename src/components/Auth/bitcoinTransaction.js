const bitcoin = require("bitcoinjs-lib");
const axios = require("axios");
const BITCOIN_DIGITS = 8;
const BITCOIN_SAT_MULT = Math.pow(10, BITCOIN_DIGITS);
const BITCOIN_FEE = 10000;
function getInputs(utxos){
  return new Promise(res=>{
    let inputs = [];
    let utxosCount = utxos.length;
    let count = 0;
    utxos.forEach(async utxo => {
      if (utxo.confirmations >= 6) {
        let urlTxes = await axios.get("https://blockchain.info/rawtx/"+utxo.tx_hash_big_endian+"?cors=true&format=hex");
        urlTxes = urlTxes.data
        inputs.push({
          hash: utxo.tx_hash_big_endian,
          index: utxo.tx_output_n, 
          nonWitnessUtxo: Buffer.from(urlTxes, 'hex')
        });
        count++
        if (count === utxosCount){
          res(inputs)
        }
      }
    });
  })
}
function transaction(privateKey, toPublicKey, fromPublicKey, amount){
  return new Promise((resolve, reject) => {
    let amtSatoshi = Math.floor(amount * BITCOIN_SAT_MULT);
    let bitcoinNetwork = bitcoin.networks.bitcoin;
    axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios.get("https://blockchain.info/unspent?cors=true&active=" + fromPublicKey).then(async resp=> {
      try {
        const utxos = resp.data.unspent_outputs
        const key = bitcoin.ECPair.fromWIF(privateKey)
        let tx = new bitcoin.Psbt(bitcoinNetwork);
        let availableSat = 0;
utxos.forEach(input => {
          availableSat += input.value;
        })
  
        let tx_inputs = await getInputs(utxos);
        tx_inputs.forEach(input => {
          tx.addInput(input)
        });
  
        tx.addOutput({
          address: toPublicKey,
          value: amtSatoshi
        })
  
        tx.addOutput({
          address: fromPublicKey, 
          value: availableSat - amtSatoshi - BITCOIN_FEE
        });
  
        tx.signInput(0, key)
        tx.validateSignaturesOfInput(0)
        tx.finalizeAllInputs()
  
        if (availableSat < amtSatoshi + BITCOIN_FEE) {
          reject({ data: "You do not have enough satoshis available to send this transaction."})
          return;
        }
     
        axios.post('https://blockchain.info/pushtx', { tx: tx.extractTransaction().toHex() }).then( resp => {
          resolve({ msg: "Transaction submited", txId: tx.extractTransaction().toHex()})
        }).catch( err => {
          reject({ data: err.response.data});
        })
      } catch (err) {
        reject({ data: "Error - (87)" });
      }
    }).catch(err=> {
    //   reject({ data: err.response.data})
    });
  })
  
}
module.exports = { transaction };