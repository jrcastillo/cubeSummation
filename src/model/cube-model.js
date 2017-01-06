"use strict";

function initializeCube(inputSides) {
  let cube = [];
  if(inputSides < 1 || inputSides > 101) {
    throw new Error('dimension must be 1 <= dimension <= 100');
  }

  try{
    for (let n = 0; n < inputSides; n++) {
      cube[n] = [];
      for (let m = 0; m < inputSides; m++) {
        cube[n][m] = [];
        for (let l = 0; l < inputSides; l++){
          cube[n][m][l] = 0;
        }
      }
    }
    return cube;
  } catch(err){
    throw err;
  }
}

function formatPosition(position){
  if(!Number(position))
    throw new Error('Value not a number');

  return position - 1;
}

function updateRow(cube, width, height, length, value) {
  let dimensionLimit = cube.length + 1;

  if(value < 1 || value > 1001)
    throw new Error('dimension must be between 1 and 1000');
  if((width < 1  || width > dimensionLimit) &&
    (height < 1 || height > dimensionLimit) &&
    (length < 1 || length > dimensionLimit))
    throw new Error('sides must be between 1 and ' + cube.length);
  if(value > 1000000000 || value < -1000000000)
    throw new Error('value must be between -10^9 and 10^9');

  try{
    cube[formatPosition(width)][formatPosition(height)][formatPosition(length)] = Number(value);
    return cube;
  } catch(err) {
      throw err;
  }
}

function queryCube(cube, widthFrom, heightFrom, lengthFrom, widthTo, heightTo, lengthTo) {

  widthFrom = formatPosition(widthFrom);
  widthTo = formatPosition(widthTo);
  heightTo = formatPosition(heightTo);
  heightFrom = formatPosition(heightFrom);
  lengthTo = formatPosition(lengthTo);
  lengthFrom = formatPosition(lengthFrom);

  if(widthFrom > widthTo || heightFrom > heightTo || lengthFrom > lengthTo)
    throw new Error('starting point must be smaller than finishing point');
  if(cube.length === 0)
    throw new Error('cube not initialized');

  try {
    let sum = 0;
    for(let i = widthFrom; i <= widthTo; i++) {
      for(let j = heightFrom; j <= heightTo; j++) {
        for(let k = lengthFrom; k <= lengthTo; k++) {
          sum += cube[i][j][k];
        }
      }
    }
    return sum;
  } catch(err) {
    throw err;
  }
}

module.exports.initializeCube = initializeCube;
module.exports.updateRow = updateRow;
module.exports.queryCube = queryCube;
