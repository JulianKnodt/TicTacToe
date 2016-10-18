class Player {
  constructor(symbol) {
    this.symbol = symbol; 
  }
  play(grid, x, y) {
    grid[y][x] = symbol;
  }
}

class Board {
  constructor(size, ...players) {
    this.size = size || 3;
    this.grid = [];
    for(var i = 0; i < this.size; i ++) {
      let row = [];
      for(var x = 0; x < this.size; x ++) {
        row.push('☐');
      }
      this.grid.push(row);
    }
    this.players = players;
    this.current = 0;
  }
  finished() {
    let winner = this.checkAll();
    if (winner) {
      console.log('Player', winner, 'Won');
      if(this.finish) {
        this.finish();
      }
    } else {
      return false;
    };
  }
  updateBoard(symbol, x, y) {
    this.grid[y][x] = symbol;
  }
  checkAll() {
    let winningSymbol;
    let majorDiag = this.checkPositiveDiag();
    let minorDiag = this.checkNegativeDiag();
    let row = this.checkRows();
    let col = this.checkCols();
    if(row) {
      return row;
    } else if (col) {
      return col;
    } else if (majorDiag) {
      return majorDiag;
    } else if (minorDiag) {
      return minorDiag
    } else {
      return false;
    }
  }
  onFinish(callback) {
    this.finish = callback;
  }
  checkPositiveDiag() {
    let won = true;
    let compare;
    if(this.grid[0][0] === '☐') {
      return false;
    } else {
      compare = this.grid[0][0];
    }
    for (var i = 0; i < this.size; i ++) {
      if(this.grid[i][i] !== compare) {
        won = false;
      }
    }
    if(won) {
      return compare;
    } else {
      return false;
    }
  }
  checkNegativeDiag() {
    let won = true;
    let compare;
    if(this.grid[0][this.size-1] === '☐') {
      return false;
    } else {
      compare = this.grid[0][this.size-1];
    }
    for (var i = 0; i < this.size; i ++) {
      if(this.grid[i][this.size - i - 1] !== compare) {
        won = false;
      }
    }
    if(won) {
      return compare;
    } else {
      return false;
    }
  }
  checkCols() {
    let won = false;
    let compare;
    for (var i = 0; i < this.size; i ++) {
      if(this.grid[0][i] === '☐') {
        continue;
      } else {
        compare = this.grid[0][i];
      }
      let colComplete = true;
      for (var x = 0; x < this.size; x ++) {
        if(this.grid[x][i] !== compare) {
          colComplete = false;
          break;
        }
      }
      if(colComplete) {
        won = true;
      }
    }
    if (won) {
      return compare;
    } else {
      return false;
    }
  }
  checkRows() {
    let won = false;
    let compare;
    this.grid.forEach(row => {
      if(row[0] === '☐'){
        return false;
      } else {
        compare = row[0];
      }
      if(row.every(item => item === compare)) {
        won = true;
      }
    });
    if(won) {
      return compare;
    } else {
      return false;
    }
  }
  printPretty() {
    this.grid.forEach(row => {
      console.log('|' + row.toString() + '|');
    });
    console.log('Player', this.players[this.current].symbol +'\'s turn.');
  }
  promptCurrent() {
    return 'Player', this.players[this.current].symbol + ', please pick a position';
  }
  play (x, y) {
    if(this.grid[y][x] === '☐') {      
      this.updateBoard(this.players[this.current].symbol, x, y);
      this.current = (this.current + 1) % this.players.length;
      return true;
    } else {
      return false;
    }
  }
}

module.exports = {
  Player,
  Board
};

