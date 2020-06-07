const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const Blockchain = require('./Blockchain');
const Transaction = require('./Transaction');
const candidateWallet = require('./candidateWallet');

//Initializate the blockchain system
let voting_chain = new Blockchain();

//My data
const key = ec.genKeyPair();
const myPublicKey = key.getPublic('hex');
let myRewards = [];

let candidateA = new candidateWallet('Josh');
let candidateB = new candidateWallet('Maria');

console.log("-Josh has "+candidateA.getAmount()+" votes.");
console.log("-------------------------------------------");

//Start the process
const tx1 = new Transaction(myPublicKey, candidateA, 1);
tx1.signTransaction(key);
if(tx1.isValid()){
    voting_chain.addTransaction(tx1);
    voting_chain.minePendingTransactions(candidateA.getPublicKey());
    rewards = candidateA.addVote(1);
    myRewards.push(rewards);
}

const tx2 = new Transaction(myPublicKey, candidateB, 1);
tx2.signTransaction(key);
if(tx1.isValid()){
    voting_chain.addTransaction(tx2);
    voting_chain.minePendingTransactions(candidateB.getPublicKey());
    rewards = candidateB.addVote(1);
    myRewards.push(rewards);
}

console.log("-------------------------------------------");
console.log("Rewards received: "+JSON.stringify(myRewards));
console.log("-Josh has "+candidateA.getAmount()+" votes.");
console.log("-Maria has "+candidateB.getAmount()+" votes.\n");
console.log("-BLOCKCHAIN-\n\n"+JSON.stringify(voting_chain, null, 4));
console.log("\n\nBlockchain valid? : "+ voting_chain.checkValid());