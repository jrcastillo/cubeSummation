"use strict";

class Cube {

  constructor() {
    this.cells = [];
    this.dimension = this.cells.length;
  }

  initializeCube(inputSides) {
    if(inputSides < 1 || inputSides > 101) {
      throw new Error('dimension must be 1 <= dimension <= 100');
    }

    try{
      for (let n = 0; n < inputSides; n++) {
        this.cells[n] = [];
        for (let m = 0; m < inputSides; m++) {
          this.cells[n][m] = [];
          for (let l = 0; l < inputSides; l++){
            this.cells[n][m][l] = 0;
          }
        }
      }
      this.dimension = this.cells.length;
      return this;
    } catch(err){
      throw err;
    }
  }

  updateRow(width, height, length, value) {

    if((width < 1  || width > this.dimension) &&
      (height < 1 || height > this.dimension) &&
      (length < 1 || length > this.dimension))
      throw new Error('sides must be between 1 and ' + this.dimension);
    if(value > 1000000000 || value < -1000000000)
      throw new Error('value must be between -10^9 and 10^9');

    try{
      this.cells[formatPosition(width)][formatPosition(height)][formatPosition(length)] = Number(value);
      return this;
    } catch(err) {
      throw err;
    }
  }

  queryCube(widthFrom, heightFrom, lengthFrom, widthTo, heightTo, lengthTo) {

    widthFrom = formatPosition(widthFrom);
    widthTo = formatPosition(widthTo);
    heightTo = formatPosition(heightTo);
    heightFrom = formatPosition(heightFrom);
    lengthTo = formatPosition(lengthTo);
    lengthFrom = formatPosition(lengthFrom);

    if(widthFrom > widthTo || heightFrom > heightTo || lengthFrom > lengthTo)
      throw new Error('starting point must be smaller than finishing point');
    if(this.dimension === 0)
      throw new Error('cube not initialized');

    try {
      let sum = 0;
      for(let i = widthFrom; i <= widthTo; i++) {
        for(let j = heightFrom; j <= heightTo; j++) {
          for(let k = lengthFrom; k <= lengthTo; k++) {
            sum += this.cells[i][j][k];
          }
        }
      }
      console.log(sum);
      return sum;
    } catch(err) {
      throw err;
    }
  }

}

function formatPosition(position) {
  if(!Number(position))
    throw new Error('Value not a number');

  return position - 1;
}

module.exports.Cube = Cube;
