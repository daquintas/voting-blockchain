const Block = require("./Block"); 

class Blockchain{

constructor(){
    this.chain = [this.createGenesis()];
    this.pendingTransactions = [];
    this.difficulty = 2;
}

createGenesis(){
    return new Block(0, "05/06/2020", "Genesis Block");
}

lastestBlock(){
    return this.chain[this.chain.length - 1];
}

addBlock(newBlock){
    newBlock.previousHash = this.lastestBlock().hash;
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
}

addTransaction(transaction) {
    this.pendingTransactions.push(transaction);
}

minePendingTransactions(toAddress) {
    let block = new Block(Date.now(), this.pendingTransactions);
    this.addBlock(block);
	this.pendingTransactions = [];
}

checkValid(){
    for(let i = 1; i < this.chain.length; i++){
        const currentBlock = this.chain[i];
        const previousBlock = this.chain[i-1];

        if(currentBlock.hash !== currentBlock.calculateHash()){
            return false;
        }

        if(currentBlock.previousHash !== previousBlock.hash){
            return false;
        }
    }

    return true;
}

}

module.exports = Blockchain;