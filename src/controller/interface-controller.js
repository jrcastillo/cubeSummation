'use strict';

const Cube = require('./../model/cube-model.js').Cube;

let testCase = {
  testCaseCounter: -1,
  transactionCounter : -1,
  cube : new Cube()
};

function setOperationsCounter(command){
  try{
    if(testCase.testCaseCounter < 0
      && command.length === 1
      && 1 <= Number(command[0]) <= 50) {
        testCase.cube = new Cube();
        testCase.testCaseCounter = Number(command[0]);
        return testCase;
    } else {
      resetApp();
      console.log('Please insert number of test cases');
    }
  } catch(err) {
    console.log(err);
  }
}

function setTransactionsCounter(command) {
  try{
    if(testCase.testCaseCounter <= 0) {
      throw new Error('No test case available to set transactions to')
    } else if (testCase.transactionCounter <= 0
      && command.length === 2
      && !isNaN(command[0])
      && !isNaN(command[1])
      && 1 <= Number(command[1]) <= 1000) {
        testCase.cube.initializeCube(Number(command[0]));
        testCase.transactionCounter = Number(command[1]);
        return testCase;
    } else {
      throw new Error('Invalid operation')
    }
  } catch(err) {
    console.log(err.message);
    return false;
  }
}

function executeTransaction(command) {
  let result;
  try {
    if(testCase.transactionCounter === 0 && testCase.testCaseCounter > 0){
      throw new Error('No test case or transactions available');
    } else {
      switch(command[0].toUpperCase()){
        case 'UPDATE':
          testCase.transactionCounter--;
          result = testCase.cube.updateRow(command[1],command[2],command[3],command[4]);
          break;
        case 'QUERY':
          testCase.transactionCounter--;
          result = testCase.cube.queryCube(command[1],command[2],command[3],command[4],command[5],command[6]);
          break;
        default:
          console.log('unknown command')
      }

      if(testCase.transactionCounter === 0){
        testCase.testCaseCounter--;
      }

      return result;
    }
  } catch(err) {
    return err;
  }
}

function checkTestCases(){
  return testCase.testCaseCounter > 0 && testCase.transactionCounter <= 0;
}


function resetApp() {
  testCase.transactionCounter = -1;
  testCase.operationCounter = -1;
  testCase.cube = new Cube();
}

module.exports.setOperationsCounter = setOperationsCounter;
module.exports.setTransactionsCounter = setTransactionsCounter;
module.exports.executeTransaction = executeTransaction;
module.exports.resetApp = resetApp;
module.exports.checkTestCases = checkTestCases;
