const EventEmitter = require('events');

var fs = require('fs')
var path = require('path');
var rdl = require('rdl')

var debug = require('debug')('parseController')

module.exports = function(folderPathOrFilePath, cb){
  var stats = fs.statSync(folderPathOrFilePath)
  if (stats.isFile()) {
    var info = parseOne(folderPathOrFilePath)
    if(info) return info
  }
  
  if (stats.isDirectory()) {
    var result = []
    // console.log('dir')
    //return dir(folderPathOrFilePath, cb)
    rdl(folderPathOrFilePath).then(function(files){
      
      files.forEach(function(file){
        if (/\.git/.test(file) || /node_modules/.test(file)) {
          debug('ignore = ' + file)
        } else if (/\.js$/.test(file)) {
          debug('file = ' + file)
          var info = parseOne(file)
          // console.log(info)
          if (info) result.push(info)
        } else{
          debug('error ' + file)
        }
      })
      // i++
      cb(result)
 //
    })
  }
}

function file(folderPath, cb){
  dirw.walk(folderPath, 0, handleFile);

  var result = []
  var i = 0;
  
  function handleFile(path, floor, count) {
    console.log(path)
    i++
    if (/\.git/.test(path) || /node_modules/.test(path)) {
    
    } else if (/\.js$/.test(path)) {
      console.log(path)
      var info = parseOne(path)
    
      if (info) result.push(info)
    } else{
      // console.log('error')
    }
  
    if (i == count && result && result.length > 0){
      // console.dir(result)
      cb(result)
    }
  }
}

// 解析单个Controller文件
function parseOne(file) {
  var arr = fs.readFileSync(file).toString().split(/\r?\n/ig)
  
  var result = {
    path: file
  }
  for (var i in arr) {
    var t = arr[i]
    
    if (/class/.test(t) && /extends/.test(t)) {
        // class MyBasicController extends BasicController {
        // module.exports = class MyBasicController extends BasicController {
        result.origin = t
        
        t = t.replace('module.exports','')
        t = t.replace('=','')
        t = t.replace('{','').trim()
        // console.log(t)
        var info = t.split('extends')
          
        if (info.length === 2) {
          var base = info[1].trim()
          var clz = info[0].replace('class','').trim()
          // console.log(dep)
          // console.log(clz)
          result.base = base
          result.clz = clz
          result.dep_controller = deptController(base)
        } else {
          console.log('slet controller: class MyBasicController extends BasicController {')
        }
    }
  }
  
  if (result.clz && result.base) return result
}

// 约定：
// 
// - 所有的模块必须以slet-开头
// - 对外暴露的class的小写，作为后面的名字
//    - 比如：BasicController，对应的模块为slet-basiccontroller
// 
function deptController(base) {    
    return 'slet-' + base.toLowerCase()
}
