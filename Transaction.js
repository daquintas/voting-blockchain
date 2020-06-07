const forge = require('node-forge');

const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

class Transaction {

    constructor(from, to, amount){
        this.from = from;
        this.to = to.getPublicKey();
        this.amount = amount;
        this.timestamp = Date.now();
        this.hash = this.calculateHash();
        this.signature = null;
    }

    calculateHash(){
        var md = forge.md.sha256.create();
        md.update(this.from + this.to + this.amount+ this.timestamp);
        return md.digest().toHex()
    }

    signTransaction(signingKey){
        const hashTx = this.calculateHash();
        const sig = signingKey.sign(hashTx, 'base64');
        this.signature = sig.toDER('hex');
    }

    isValid(){
        if(this.from === null) return true;
      
          if(!this.signature || this.signature.length === 0){
              throw new Error('No signature in this transaction');
          }
      
          const publicKey = ec.keyFromPublic(this.from, 'hex');
          console.log("Signature is valid");
          return publicKey.verify(this.calculateHash(), this.signature);
    }

    setSig(signature){
        this.signature = signature;
    }

}

module.exports = Transaction;