const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const key = ec.genKeyPair();
const publicKey = key.getPublic('hex');

class candidateWallet{
    constructor(id){
        this.id = id;
        this.publicKey = publicKey;
        this.amount = 0;
    }

    getPublicKey(){
        return this.publicKey;
    }

    addVote(){
        this.amount = this.amount + 1;
        return {
            id: this.id,
            type: 'election',
            tokens: 1000
        };
    }

    getAmount(){
        return this.amount;
    }

}

module.exports = candidateWallet;