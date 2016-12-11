# parseController

slet中工具模块，用于解析某个目录下的所有可用的controller

## 用法

```
require('.')('./t', function(resultArray) {
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

