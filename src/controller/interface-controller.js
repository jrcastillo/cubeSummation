"use strict";

const Cube = require('./../model/cube-model.js').Cube;

let operationCounter = -1;
let transactionCounter = -1;
let cube;

function setOperationsCounter(command){
  try{
    if(operationCounter < 0 && command.length == 1 && Number(command[0]) >= 1 && Number(command[0]) <= 50) {
      cube = new Cube();
      operationCounter = Number(command[0]);
      return '';
    } else {
      resetApp();
      return 'Please insert number of test cases';
    }
  } catch(err) {
    return err;
  }
}

function setTransactionsCounter(command) {
  try{
    if(operationCounter < 0) {
      throw new Error('Must input operation number')
    } else if (transactionCounter < 0 && command.length == 2 && Number(command[0]) && Number(command[1]) >= 1 && Number(command[1]) <= 1000) {
      cube.initializeCube(command[0]);
      transactionCounter = command[1];
      return '';
    } else {
      throw new Error('Invalid operation')
    }
  } catch(err) {
    return err;
  }
}

function excecuteTransaction(command) {
  try {
    if(operationCounter < 0){
      throw new Error('must input operation number');
    } else if(transactionCounter == 0) {
      transactionCounter = -1;
      operationCounter--;
      return '';
    } else {
      switch(command[0]){
        case 'UPDATE':
          transactionCounter--;
          cube.updateRow(command[1],command[2],command[3],command[4]);
          return '';
        case 'QUERY':
          transactionCounter--;
          return cube.queryCube(command[1],command[2],command[3],command[4],command[5],command[6]);
        default:
          return 'unknown command'
      }
    }
  } catch(err) {
    return err;
  }
}

function resetApp() {
  transactionCounter = -1;
  operationCounter = -1;
  cube = new Cube();
}

module.exports.setOperationsCounter = setOperationsCounter;
module.exports.setTransactionsCounter = setTransactionsCounter;
module.exports.excecuteTransaction = excecuteTransaction;
module.exports.resetApp = resetApp;