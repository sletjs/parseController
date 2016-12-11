

var dirw = require('./src/dirw');

dirw.walk('./t', 0, handleFile);


function handleFile(path, floor) {

  if (/\.git/.test(path) || /node_modules/.test(path)) {
    
  } else if (/\.js$/.test(path)) {
      console.log(path)
  } else{
    // console.log('error')
  }
}

