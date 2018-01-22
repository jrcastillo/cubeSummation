'use strict';

const readline  = require('readline');
const interfaceController = require('../controller/interface-controller.js');

let initOperationsCounter = 2;

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('******* Cube Summation Challenge *********');
console.log('******* Input number of test cases *********');
console.log('Input amount of test cases');

rl.on('line', (line) => {
  if(line === 'exit')
    rl.close();

  try{
    let command = line.split(' ');
    if(initOperationsCounter === 2 && command.length === 1 && command[0] !== '') {
      initOperationsCounter--;
      interfaceController.setOperationsCounter(command);
    } else if (initOperationsCounter === 1 && command.length === 2) {
      if(interfaceController.setTransactionsCounter(command)){
        initOperationsCounter--;
      }
    } else if (initOperationsCounter === 0 && command.length === 5 || command.length === 7) {
      interfaceController.executeTransaction(command);
      if(interfaceController.checkTestCases()){
          initOperationsCounter = 1;
      }
    } else {
      initOperationsCounter = 2;
      interfaceController.resetApp();
      console.log('error writing commands, please start over');
      console.log('');
      console.log('Input amount of test cases');
    }

    rl.resume();
  } catch(err){
    console.log(err.toString());
    interfaceController.resetApp();
    rl.resume();
  }
});
