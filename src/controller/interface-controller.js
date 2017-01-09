"use strict";

const Cube = require('./../model/cube-model.js').Cube;

let _spec = {
  operationCounter : -1,
  transactionCounter : -1,
  cube : new Cube()
};

function setOperationsCounter(command){
  try{
    if(_spec.operationCounter < 0 && command.length == 1 && Number(command[0]) >= 1 && Number(command[0]) <= 50) {
      _spec.cube = new Cube();
      _spec.operationCounter = Number(command[0]);
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
    if(_spec.operationCounter < 0) {
      throw new Error('Must input operation number')
    } else if (_spec.transactionCounter < 0 && command.length == 2 && Number(command[0]) && Number(command[1]) >= 1 && Number(command[1]) <= 1000) {
      _spec.cube.initializeCube(command[0]);
      _spec.transactionCounter = command[1];
      return '';
    } else {
      throw new Error('Invalid operation')
    }
  } catch(err) {
    return err.message;
  }
}

function excecuteTransaction(command) {
  try {
    if(_spec.operationCounter < 0){
      throw new Error('must input operation number');
    } else if(_spec.transactionCounter == 0) {
      _spec.transactionCounter = -1;
      _spec.operationCounter--;
      return '';
    } else {
      switch(command[0]){
        case 'UPDATE':
          _spec.transactionCounter--;
          _spec.cube.updateRow(command[1],command[2],command[3],command[4]);
          return '';
        case 'QUERY':
          _spec.transactionCounter--;
          return _spec.cube.queryCube(command[1],command[2],command[3],command[4],command[5],command[6]);
        default:
          return 'unknown command'
      }
    }
  } catch(err) {
    return err;
  }
}

function resetApp() {
  _spec.transactionCounter = -1;
  _spec.operationCounter = -1;
  _spec.cube = new Cube();
}

module.exports.setOperationsCounter = setOperationsCounter;
module.exports.setTransactionsCounter = setTransactionsCounter;
module.exports.excecuteTransaction = excecuteTransaction;
module.exports.resetApp = resetApp;

module.exports._specs = _spec;