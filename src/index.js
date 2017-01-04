"use strict";

let testCasesNumber = 0; // <= 1 y <= 50
let memoryCube = [];

function initializeCube(inputSides) {
  if(inputSides < 1 || inputSides > 101)
    throw new Error('dimension must be 1 <= dimension <= 100');

  let cube = [];
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
}

function formatPosition(position){
  return position - 1;
}

function updateRow(cube, width, height, length, value) {
  let dimensionLimit = cube.length + 1;
  if(value < 1 || value > 1001)
    throw new Error('dimension must be between 1 and 1000');
  if((width > 0  || width < dimensionLimit) &&
     (height > 0 || height < dimensionLimit) &&
     (length > 0 && length < dimensionLimit))
    throw new Error('sides must be between 1 and ' + cube.length);
  if(value >= 1000000000 || value < -1000000000)
    throw new Error('value must be between -10^9 and 10^9');

  cube[formatPosition(width)][formatPosition(height)][formatPosition(length)] = value;
  return cube;
}

function queryCube(cube, widthFrom, heightFrom, lengthFrom, widthTo, heightTo, lengthTo) {
  let sum = 0;
  if(widthFrom > widthTo || heightFrom > heightTo || lengthFrom > lengthTo)
    throw new Error('starting point must be smaller than finishing point');
  if(cube.length === 0)
    throw new Error('cube not initialized');

  for(let i = widthFrom; i < widthTo + 1; i++) {
    for(let j = heightFrom; j < heightTo + 1; j++) {
      for(let k = lengthFrom; k < lengthTo + 1; k++) {
        console.log(cube[i]);
        console.log(cube[i][j]);
        console.log(cube[i][j][k]);
        sum += cube[i][j][k];
        console.log(sum);
      }
    }
  }
  return sum;
}