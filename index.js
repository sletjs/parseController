

var dirw = require('./src/dirw');

dirw.walk('.', 0, handleFile);

function handleFile(path, floor) {
  console.log(path)
}

