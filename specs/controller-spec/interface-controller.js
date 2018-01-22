"use strict";

const assert = require('assert');
const casual = require('casual');

const controller = require('../../src/controller/interface-controller');

process.setMaxListeners(0);

describe('Controller of interface specs', function() {
  let command = [];

  afterEach(function() {
    controller.resetApp();
  });

  function createAndUpdateCube(numberTransactions,dimension, widthParam, heightParam, lengthParam, valueParam){
    let width = widthParam || casual.integer(1,dimension),
        height = heightParam || casual.integer(1,dimension),
        length = lengthParam || casual.integer(1,dimension),
        value = valueParam || casual.integer(-1000000000,1000000);

    if(dimension && numberTransactions){
      controller.setOperationsCounter(['1']);
      controller.setTransactionsCounter([dimension,numberTransactions]);
    }

    command = ['UPDATE', width, height, length, value];
    return controller.executeTransaction(command);
  }

  it('should successfully set the test cases counter', (done) => {
    command = [casual.integer(1,50).toString()];
    let result = controller.setOperationsCounter(command);
    assert.equal(result.testCaseCounter, command[0], 'operation number defined');
    done();
  });

  it('should successfully set the cube dimension', (done) => {
    command = [casual.integer(1,100).toString(), casual.integer(1,1000).toString()];
    controller.setOperationsCounter([casual.integer(1,50).toString()]);
    let result = controller.setTransactionsCounter(command);
    assert.equal(result.cube.dimension, command[0], 'cube dimension');
    done();
  });

  it('should successfully execute an update transaction', (done) => {
    let dimension = casual.integer(1,50);
    let width = casual.integer(1,dimension), height = casual.integer(1,dimension), length = casual.integer(1,dimension), value = casual.integer(-1000000000,1000000);
    let result = createAndUpdateCube(1, dimension, width, height, length, value);
    let cellValue = result.cells;
    assert.equal(cellValue[width-1][height-1][length-1], value, 'updated cell value');
    done();
  });

  it('should successfully execute a query transaction', (done) => {
    let dimension = casual.integer(1,50);
    let valueOne = casual.integer(-1000000000,1000000);
    let valueTwo = casual.integer(-1000000000,1000000);
    createAndUpdateCube(3,dimension,null,null,null,valueOne);
    createAndUpdateCube(null,dimension,null,null,null,valueTwo);
    command = ['QUERY',1,1,1,dimension,dimension,dimension];
    let result = controller.executeTransaction(command);
    assert.equal(result, valueOne+valueTwo, 'sum of values');
    done();
  });

});
