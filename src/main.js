"use strict";

const functions = require('./functions.js');
const readline  = require('readline');

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let operationCounter = -1;
let transactionCounter = -1;
let cube = [];

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
          break;
        case 'QUERY':
          rl.write(Number(functions.queryCube(cube,command[1],command[2],command[3],command[4],command[5],command[6])));
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
  } catch(err){
    return err.toString();
  }

});
