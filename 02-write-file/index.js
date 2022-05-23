const { createWriteStream } = require('fs');
const path = require('path');
const { stdin, stdout } = require('process');

const filePath = path.join(__dirname, 'output.txt');
const writable = createWriteStream(filePath);

stdin.on('data', chunk => {
  if(chunk.toString().trim() === 'exit') {
    stdout.write('Good luck');
    process.exit();
  } else {
    stdout.write('write some text\n');
    writable.write(chunk.toString());
  }
});
