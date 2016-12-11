# parseController

slet中工具模块，用于解析某个目录下的所有可用的controller信息或某个文件的controller信息

## 用法1：获取某个文件的controller信息

```
var result = require('parseController')('./t/controllers/basicctrl.js')

console.log(result)
```

参数说明

- './t/controllers/basicctrl.js' 是controller文件的具体路径，必须是完整路径

结果

```
{ path: './t/controllers/basicctrl.js',
  origin: 'module.exports = class MyBasicController extends BasicController {',
  base: 'BasicController',
  clz: 'MyBasicController',
  dep_controller: 'slet-basiccontroller' }
```


## 用法2：获取某个目录的controller信息数组

```
require('parseController')('./t', function(resultArray) {
    console.log(result)
})

```

参数说明

- './t' 是controller所在目录
- cb是回调函数，resultArray是最终返回的array信息

结果

```
[ { path: './t/controllers/basicctrl.js',
    origin: 'module.exports = class MyBasicController extends BasicController {',
    base: 'BasicController',
    clz: 'MyBasicController',
    dep_controller: 'slet-basiccontroller' },
  { path: './t/controllers/basicctrl2.js',
    origin: 'class MyBasicController extends BasicController {',
    base: 'BasicController',
    clz: 'MyBasicController',
    dep_controller: 'slet-basiccontroller' } ]
```

