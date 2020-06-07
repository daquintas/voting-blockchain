const forge = require('node-forge');

class Block {
    constructor(index, timestamp, data){
        this.index = index;
        this.timestamp  = timestamp;
        this.data = data;
        this.previousHash = 0;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash(){
        var md = forge.md.sha256.create();
        md.update(this.index + this.previousHash + this.timestamp + this.data + this.nonce);
        return md.digest().toHex()
    }

    mineBlock(difficulty){
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("Block mined: " + this.hash);
    }

}

module.exports = Block;