"use strict";

const readline  = require('readline');
const interfaceController = require('../controller/interface-controller.js');
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('******* Cube Summation Challenge *********');
console.log('******* Input number of test cases *********');


rl.on('line', (line) => {
  if(line == 'exit')
    rl.close();

  try{
    let command = line.split(' ');
    if(operationCounter < 0 && command.length == 1 && Number(command[0]) >= 1 && Number(command[0]) <= 50) {
      operationCounter = Number(line);
      return '';
    } else if (transactionCounter < 0 && command.length == 2 && Number(command[0]) && Number(command[1]) >= 1 && Number(command[1]) <= 1000) {
      cube = functions.initializeCube(command[0]);
      transactionCounter = command[1];
      return '';
    } else if (command.length == 5 || command.length == 7) {
      switch(command[0]){
        case 'UPDATE':
          functions.updateRow(cube,command[1],command[2],command[3],command[4]);
          transactionCounter--;
          break;
        case 'QUERY':
          transactionCounter--;
          console.log(Number(functions.queryCube(cube,command[1],command[2],command[3],command[4],command[5],command[6])));
          console.log('*******operation********');
          console.log(operationCounter);
          console.log('*******transact********');
          console.log(transactionCounter);
          console.log('***************');
          rl.resume();
          break;
        default:
          return 'unknown command'
      }
    } else {
      operationCounter = -1;
      transactionCounter = -1;
      cube = [];
      rl.write('error writing commands, restarting');
      return '';
    }

    if(transactionCounter == 0) {
      transactionCounter = -1;
      operationCounter--;
    }

    if(operationCounter == 0)
      operationCounter = -1;

  } catch(err){
    return err.toString();
  }

});
