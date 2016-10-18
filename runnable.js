#!/usr/bin/env node

const game = require('./tttLogic');

let player1;
let player2;
let size;

if (process.argv[2]) {
  player1 = new game.Player(process.argv[2][0]);
}
if (process.argv[3]) {
  player2 = new game.Player(process.argv[3][0]);
}
if (process.argv[4]) {
  size = Number(process.argv[4]);
} else {
  size = 3;
}
const newGame = new game.Board(size, player1, player2);
newGame.printPretty();
newGame.onFinish(() => {
  process.exit();
});
process.stdin.resume();
process.stdin.setEncoding('utf8');

console.log('Please insert an (x,y) coordinate')
process.stdin.on('data', (text) => {
  if(text.split(',').length === 2) {
    var coords = text.split(',');
    coords[1] = coords[1].slice(0, -1);
    coords = coords.map(coord => {
      return Number(coord);
    });
    process.stdout.write('\033c');
    if(!newGame.play(coords[0], coords[1])) {
      process.stdout.write('Invalid Move\n');
    };
    newGame.printPretty();
    newGame.finished();
  }
  if (text === 'quit\n') {
    console.log('Quitting game');
    process.exit();
  }
}); 