//1.Deposite some money
//2.Determine number of lines to bet on
//3.Collect a bet amount
//4.Spin the slot machine 
//5.Check if the user won 
//6.Give the user their winnings
//7.Play again
const prompt = require("prompt-sync")();


const ROWS=3;
const COLS=3;

const SYMBOLS_COUNT={
    A:2,
    B:4,
    C:6,
    D:8,
};
const SYMBOLS_VALUES={
    A:5,
    B:4,
    C:3,
    D:2,
};









const deposit = () =>{
    while(true){
    const depositamount=prompt("Enter a deposit amount: ");
      const numberdepositamount=parseFloat(depositamount);
      if(isNaN(numberdepositamount)|| numberdepositamount <= 0){
        console.log("Invalide deposit amount ,try again.");
      }

      else{
        return numberdepositamount;
      }
    
   }
};


const getnumberoflines= () =>{
    while(true)
    {
        const lines=prompt("Enter a number of lines to bet on (1-3): ");
          const numberoflines=parseFloat(lines);


          if(isNaN(numberoflines)|| numberoflines <= 0 || numberoflines > 3){
            console.log("Invalide number of lines ,try again.");
          }
          else
          {
            return numberoflines;
          }
          
    }
};
const getbet =(balance,lines) => {
    while(true)
    {
        const bet=prompt("Enter a bet per line: ");
          const numberbet=parseFloat(bet);


          if(isNaN(numberbet)|| numberbet <= 0 || numberbet > balance / lines){
            console.log("Invalide bet  ,try again.");
          }
          else
          {
            return numberbet;
          }
          
    }
    
};
const spin = () =>{
    const symbols = [];
    for (const [symbol,count]  of Object.entries(SYMBOLS_COUNT)){
        for(let i=0;i < count;i++){
            symbols.push(symbol);
        }

    }

    const reels=[];
    for(let i=0;i < COLS;i++){
      reels.push([]);
      const reelsymbols=[...symbols];
      for(let j=0;j < ROWS;j++){
        const randomIndex=Math.floor(Math.random() * reelsymbols.length)
        const selectedsymbol = reelsymbols[randomIndex];
        reels[i].push(selectedsymbol);
        reelsymbols.splice(randomIndex,1);


        }
    }
    return reels; 

};
const transpose=(reels) => {
  const rows=[];
  for(let i=0;i<ROWS;i++){
    rows.push([]);
    for(let j=0;j < COLS;j++){
      rows[i].push(reels[j][i])
    }
  }
  return rows;
};


function printRows(rows) {
  for (const row of rows) {
    let rowString = "";
    for (const [i,symbol] of row.entries()) {
      rowString += symbol;
      if (i != rows.length - 1) {
        rowString += " | ";
      }
    }
    console.log(rowString)
  }

}



const getwinnings=(rows,bet,lines) => {

  let winnings=0;
  for(let row=0;row<lines;row++){
    const symbols=rows[row];
    let allsame=true;
    for(const symbol of symbols){
      if (symbol!=symbols[0]){
        allsame=false;
        break;
      }
        
    }
    if(allsame){
      winnings+=bet*SYMBOLS_VALUES[symbols[0]];
    }
  }
  return winnings;
};

const game =() =>{
  let balance  =deposit();
  while(true){
    console.log("You have a balance of $"+balance);
    const numberoflines =getnumberoflines();
    const bet =getbet(balance,numberoflines);
    balance-=bet*numberoflines;
    const reels=spin();
    const rows=transpose(reels);
    printRows(rows);
    const winnings=getwinnings(rows,bet,numberoflines);
    balance+=winnings;
    console.log("You won,$ "+ winnings.toString());
    if(balance<=0){
      console.log("You ran out of money!");
      break;
    }
    const playagain=prompt("Do you want to play again(y/n)?");
    if(playagain!="y")
    {
      break;
    }

  }
 

};
game();
 





 

