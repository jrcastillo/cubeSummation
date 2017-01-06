"use strict";

const assert = require('assert');
const casual = require('casual');

const functions = require('../src/functions.js');

process.setMaxListeners(0);

describe('Functionality tests for cube processing', function() {

  let cube = [];
  let dimensionLength = 0;

  beforeEach('initialize cube and length', function() {
    dimensionLength = casual.integer(2, 50);
    cube = functions.initializeCube(dimensionLength);
  });

  it('should initialize the cube with the suggested dimension', function(done) {
    let indexToCheck = casual.integer(1,dimensionLength-1);
    assert.equal(Array.isArray(cube[indexToCheck]), true, 'it is an array');
    assert.equal(cube[indexToCheck].length, dimensionLength, 'has the specified length');
    done();
  });

  it('should update a row of the cube', function(done) {
    let width = casual.integer(1, dimensionLength);
    let height = casual.integer(1,dimensionLength);
    let length = casual.integer(1,dimensionLength);
    let value = casual.integer(1,1000);

    cube = functions.updateRow(cube,width,height,length, value);

    assert.equal(cube[width-1][height-1][length-1], value, 'value has been updated correctly');

    done();
  });

  it('should query the cube between the specified range', function(done) {
    let widthFrom = casual.integer(1, dimensionLength);
    let widthTo = casual.integer(widthFrom, dimensionLength);
    let heightFrom = casual.integer(1,dimensionLength);
    let heightTo = casual.integer(heightFrom,dimensionLength);
    let lengthFrom = casual.integer(1,dimensionLength);
    let lengthTo = casual.integer(lengthFrom,dimensionLength);
    let value = casual.integer(1,1000);
    let checkArray = [];

    /*
      Function to prevent same coordinates from repeating themselves and updating the same cell
     */
    for(let i = 0; i < 2; i++) {
      let widthUpdate = casual.integer(widthFrom,widthTo);
      let heightUpdate = casual.integer(heightFrom,heightTo);
      let lengthUpdate = casual.integer(lengthFrom, lengthTo);

      if(checkArray.length == 0)
        checkArray.push(widthUpdate,heightUpdate,lengthUpdate);
      else if(checkArray[0] == widthUpdate && checkArray[1] == heightUpdate && checkArray[2] == lengthUpdate)
        i--;

      cube = functions.updateRow(cube,widthUpdate,heightUpdate,lengthUpdate, value);
    }

    let sumResult = functions.queryCube(cube,widthFrom,heightFrom,lengthFrom,widthTo,heightTo,lengthTo);

    assert.equal(sumResult, value*2, 'value has been summed correctly');

    done();
  });

  it('should query the cube between the specified range and not count out-of-range values', function(done) {
    let widthFrom = casual.integer(1, dimensionLength - 1);
    let widthTo = casual.integer(widthFrom, dimensionLength - 1);
    let heightFrom = casual.integer(1,dimensionLength - 1);
    let heightTo = casual.integer(heightFrom,dimensionLength - 1);
    let lengthFrom = casual.integer(1,dimensionLength - 1);
    let lengthTo = casual.integer(lengthFrom,dimensionLength - 1);
    let value = casual.integer(1,1000);
    let checkArray = [];

    /*
     Function to prevent same coordinates from repeating themselves and updating the same cell
     */
    for(let i = 0; i < 3; i++) {
      let widthUpdate = casual.integer(widthFrom,widthTo);
      let heightUpdate = casual.integer(heightFrom,heightTo);
      let lengthUpdate = casual.integer(lengthFrom, lengthTo);

      if(checkArray.length == 0)
        checkArray.push(widthUpdate,heightUpdate,lengthUpdate);
      else if(checkArray[0] == widthUpdate && checkArray[1] == heightUpdate && checkArray[2] == lengthUpdate)
        i--;
      else if(i == 2) {
        widthUpdate = dimensionLength;
        heightUpdate = dimensionLength;
        lengthUpdate = dimensionLength;
      }

      cube = functions.updateRow(cube,widthUpdate,heightUpdate,lengthUpdate, value);
    }

    let sumResult = functions.queryCube(cube,widthFrom,heightFrom,lengthFrom,widthTo,heightTo,lengthTo);

    assert.equal(sumResult, value*2, 'value has been summed correctly');

    done();
  })
});
