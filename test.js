// const os = require('os');
// const clipboardy = require('clipboardy');
// const EOL = os.EOL;

// const str = `abc${EOL}鲍俊超${EOL}123${EOL}`;

// //clipboardy.writeSync(str);

// let fileContent = clipboardy.readSync();
// fileContent += os.EOL;
// fileContent += 'os.EOL.test';
// console.log(JSON.stringify(fileContent));
// console.log('============================================');
// console.log(fileContent);









// const fs = require('fs');
// const path = require('path');
// const makeDir = require('make-dir');
// const common = require('./common');









// const dirpath ="F:\\test\\a\\b"


// console.log();
// console.log('===========================');







 
// makeDir(dirpath).then(path => {
//     console.log(path);
//     //=> '/Users/sindresorhus/fun/unicorn/rainbow/cake' 
// });











//关系嵌套任务
var Promise = require("bluebird");
var readFileAsync = Promise.promisify(require("fs").readFile);



// 顺序执行
readFileAsync("./data/1.txt","utf8")
    .then(function(data){
        Promise.reject(new SyntaxError("noooooo!"));
    })
    .catch(Error,function(err){
        console.log('===========================Error');
        console.log(err);
    })
    .catch(SyntaxError,function(err){
        console.log('===========================SyntaxError');
        console.log(err);
    })
    .catch(function(err){
        console.log(err);
    })

//无关系汇总任务
// Promise.all([
//         readFileAsync("./data/1.txt","utf8"),
//         readFileAsync("./data/2.txt","utf8"),
//         readFileAsync("./data/3.txt","utf8")
//     ])
//     .then(function(datas){
//         console.log('===========================all:' + datas);
//     })
//     .catch(function(err){
//         console.log(err);
//     });
