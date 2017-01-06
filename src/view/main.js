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
    if(command.length == 1) {
      console.log(interfaceController.setOperationsCounter(command));
      rl.resume();
    } else if (command.length == 2) {
      console.log(interfaceController.setTransactionsCounter(command));
      rl.resume();
    } else if (command.length == 5 || command.length == 7) {
      console.log(interfaceController.excecuteTransaction(command));
      rl.resume();
    } else {
      interfaceController.resetApp();
      rl.write('error writing commands, restarting');
      return '';
    }

  } catch(err){
    console.log(err.toString());
    interfaceController.resetApp();
    rl.resume();
  }
});
