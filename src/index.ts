import * as CryptoJS from "crypto-js";

class Block {
     public index:number;
     public hash:string;
     public previousHash:string;
     public data : string;
     public timestamp: number;

     static calculateBlockHash = (
          index:number, 
          previousHash:string, 
          timestamp:number, 
          data:string
     ):string => CryptoJS.SHA256(index + previousHash + timestamp + data).toString();

     static validateStructure = (aBlock : Block) : boolean => 
          typeof aBlock.index === "number" && 
          typeof aBlock.hash === "string" && 
          typeof aBlock.previousHash === "string" &&
          typeof aBlock.timestamp === "number" &&
          typeof aBlock.data === "string";

     constructor(
          index:number,
          hash:string,
          previousHash:string,
          data : string,
          timestamp: number
     ){
          this.index = index;
          this.hash = hash;
          this.previousHash = previousHash;
          this.data = data;
          this.timestamp = timestamp;
     }
}

const genesisBlock: Block = new Block(0, "12341234", "", "Hello", 12345);

let blockchain: Block[] = [genesisBlock];

const getBlockChain = () : Block[] => blockchain;

const getLatestBlock = () : Block => blockchain[blockchain.length - 1];

const getNewTimeStamp = () : number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data:string) : Block => {
     const previousBlock : Block = getLatestBlock();
     const newIndex : number = previousBlock.index + 1;
     const newTimestamp : number = getNewTimeStamp();

     const newHash : string = Block.calculateBlockHash(
          newIndex, 
          previousBlock.hash, 
          newTimestamp, 
          data  
     );

     const newBlock : Block = new Block(
          newIndex, 
          newHash, 
          previousBlock.hash, 
          data, 
          newTimestamp
     );

     addBlock(newBlock);
     return newBlock;
} 

const getHashforBlock = (aBlock : Block) :string => 
     Block.calculateBlockHash(
          aBlock.index,
           aBlock.previousHash, 
           aBlock.timestamp, 
           aBlock.data
     );

const isBlockValid = (candidateBlock : Block, previousBlock: Block) : boolean => {
     // 블록 유효시 구조 검증
     if(!Block.validateStructure(candidateBlock)){
          console.log("validateStructure")
          return false;
     // 이전 블록 인덱스 + 1이 candidateBlock 인덱스와 같지않으면 false
     }else if(previousBlock.index + 1 !== candidateBlock.index){
          console.log("previousBlock.index")
          return false;
     // 이전 블록 해쉬가 후보 블록의 previousHash 와 같지않다면 false
     }else if(previousBlock.hash !== candidateBlock.previousHash){
          console.log("previousBlock.hash")
          return false;
     // 해쉬를 계산했는데 다른 해쉬를 갖고있다면
     }else if(getHashforBlock(candidateBlock) !== candidateBlock.hash){
          console.log("getHashforBlock")
          return false;
     }else {
          console.log("valid true")
          return true;
     }
};

const addBlock = (candidateBlock : Block ): void => {
     if(isBlockValid(candidateBlock, getLatestBlock())){
          blockchain.push(candidateBlock);
     }
}


createNewBlock("second Block");
createNewBlock("third Block");
createNewBlock("fourth Block");

console.log(blockchain);



// interface Human{
//      name: string;
//      age: number;
//      gender: string;
// }

// class Human{
//      public name : string;
//      public age : number;
//      public gender : string;
//      constructor(name: string, age:number, gender:string){
//           this.name = name;
//           this.age = age;
//           this.gender = gender;
//      }
// }

// const lynn = new Human("lynn", 10, 'female')

// const person = {
//      name:"person1",
//      age:24,
//      gender:"female"
     
// }
// const sayHi = (person: Human): string => {
//      return `Hello ${person.name} I'm ${person.age} gender ${person.gender}`;
// }


// const sayHi = (name:string, age:number, gender:string):string => {
//      return `Hello ${name} I'm ${age} gender ${gender}`;
// }

// console.log(sayHi("JW", 32, "male"));
// console.log(sayHi(lynn));

export {};