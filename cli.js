#!/usr/bin/env node

'use strict';

var argv = process.argv;
argv.shift();

var file_path = __dirname;
var current_path = process.cwd();

require('.')(current_path, function(resultArray) {
    console.log(resultArray)
})

