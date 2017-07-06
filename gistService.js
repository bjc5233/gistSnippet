// 对gistAPI的一些封装

const iconv = require('iconv-lite');
const clipboardy = require('clipboardy');
const prompt = require('prompt');
const makeDir = require('make-dir');
const common = require('./common');
const promise = require("bluebird");
const gistApi = promise.promisifyAll(require('./gistAPI'));
const fs = promise.promisifyAll(require('fs'));





// promise.all([
//     gistApi.userInfoAsync("bjc5233"),
//     gistApi.getAsync("be060fb64bf17db45f0a63cb739926b5")
// ]).then(function(datas) {
    
//     console.log(datas[0]);
//     console.log("================================");
//     console.log(datas[1]);
// }).catch(function(err){
//     console.log('===========================error');
//     console.log(err);
// });










// gistApi.userInfo("bjc5233", function (user) {
//     console.log(user.private_gists);
// });


// gistApi.get("b511a5a45a359c1e9885d8e8a9ee6575", function(err, gist) {
//     console.log(gist);
//     console.log(gist.description);
//     console.log(`===========================`);
//     const desc = JSON.parse(gist.description);
//     console.log(desc);
//     console.log(desc.lang);
// });




// gistApi.list("bjc5233", function (gists) {
//     console.log(`===========================${gists.length}`);
//     console.log(gists);
// });


// const gistId = "05dae39400724269566cbc12f1a54f76";
// const newContent = "come from cli gist desc content Update haha";
// gistApi.edit(gistId, newContent, function (gist) {
//     console.log(gist);
// });


// const gistId = "a71122d66846de77fbb86f38c21e7452";
// gistApi.del(gistId, function () {
//     console.log('回调');
// });



// const gistId = "05dae39400724269566cbc12f1a54f76";
// gistApi.listCommits(gistId, function (comments) {
//     console.log(comments);
// });




// const gistId = "a71122d66846de77fbb86f38c21e7452";
// gistApi.star(gistId, function (flag) {
//     console.log('ok');
// });



// const gistId = "05dae39400724269566cbc12f1a54f76";
// gistApi.unStar(gistId, function (flag) {
//     console.log('ok');
// });



// const gistId = "a71122d66846de77fbb86f38c21e7452";
// gistApi.isStarred(gistId, function (flag) {
//     console.log(flag);
// });


// const gistId = "e95f197467120b7133a44b9b6a8cabeb";
// gistApi.fork(gistId, function (gist) {
//     console.log(gist);
// });















// const codeBasePath = "C:\\path\\bat\\batlearn\\coder";
// fs.readdir(codeBasePath, (err, fileNames) => {
//     if (err) {
//         return console.error(err);
//     }
	
// 	console.log(`读取路径：${codeBasePath}`);
// 	console.log(`文件数量：${fileNames.length}`);
//     fileNames.forEach((fileName) => {
    	
//         fs.readFile(codeBasePath + "\\" + fileName, (err, data) => {
//         	console.log(`处理文件中：${fileName}`);
//         	const fileContent = iconv.decode(data, 'gb2312');
//         	const desc = "#tag1 #tag2";
// 			gistApi.add(fileName, fileContent, desc, function (gist) {
// 			    console.log(`文件处理完成：gist编号${gist.id}`);
// 			});
//         });
//     });
// });



// gistApi.list("bjc5233", function (gists) {
// 	if (!gists) {
// 		return;
// 	}

// 	gists.forEach((gist) => {
// 		gistApi.del(gist.id, function () {
// 		    console.log('回调');
// 		});
// 	});
// });







//========================= syncClipSnippet =========================
const dirname = 'c:\\path\\bat\\batlearn\\coder2'
const syncClipSnippet = function(dirname, callback) {
    let fileContent = clipboardy.readSync();
    fileContent = fileContent.replace(/\r\r\n/g,"\r\n");
    console.log('========================= clipbord =========================');
    console.log(fileContent);
    console.log('========================= clipbord =========================');
    console.log();
    console.log();

    prompt.message = '';
    prompt.delimiter = ':';
    prompt.start();
    prompt.get(['fileName', 'desc'], function (err, result) {
        const fileName = result.fileName;
        if (!fileName) {
            return;
        }

        const desc = (result.desc ? result.desc : 'sync from clip');
        const filePath = dirname + '\\' + fileName;

        //同步snippet
        syncClip2File(fileName, fileContent, dirname, desc);
        gistApi.add(fileName, fileContent, desc, function (gist) {
            console.log(`文件从剪切板上传到gist完成：gist编号${gist.id}`);
        });
    });
};
//========================= syncClipSnippet =========================



//========================= syncClip2File =========================
const syncClip2File = function(fileName, fileContent, dirname, desc, callback) {
    const writeFile = () => {
        const desc = (desc ? desc : 'syncClip2File');
        const filePath = `${dirname}\\${fileName}`;
        fs.writeFile(filePath, fileContent, function(err) {
            if (err) {
                console.error(common.formatErrorMsg('syncClip2File', `${dirname} ${fileName}`, err.message));
                if(common.validateCallback(callback)){ 
                    callback(err); 
                }
                return;
            }
            if(common.validateCallback(callback)){ 
                callback();
            }
        });
    }


    if (!fs.existsSync(dirname)) {
        makeDir(dirname).then(dirname => {
            console.log(`目录${dirname}创建成功`);
            writeFile();            
        });
    }
};
//========================= syncClip2File =========================








//========================= syncPath2Gist =========================
const syncPath2Gist = function(codeBasePath, callback) {
    fs.readdir(codeBasePath, (err, fileNames) => {
        if (err) {
            return console.error(err);
        }
        
        console.log(`读取路径：${codeBasePath}`);
        console.log(`文件数量：${fileNames.length}`);

        let addCount = 0;
        fileNames.forEach((fileName) => {
            fs.readFile(codeBasePath + "\\" + fileName, (err, data) => {
                console.log(`处理文件中：${fileName}`);
                const fileContent = iconv.decode(data, 'gb2312');
                const desc = "#tag1 #tag2";
                gistApi.add(fileName, fileContent, desc, function (gist) {
                    console.log(`文件处理完成：gist编号${gist.id}`);
                    addCount ++;
                    if (addCount == fileNames.length) {
                        console.log(common.formatSuccessMsg('syncPath2Gist', codeBasePath, '已创建' + addCount + '个gist'));
                        callback && callback.apply();
                    }
                });
            });
        });
    });
};
//========================= syncPath2Gist =========================


//========================= syncGist2Path =========================
const syncGist2Path = function(codeBasePath, callback) {
    // 路径存在?

    // 分页获取gist

    // get gist 读取content

    // 保存为文件
};
//========================= syncGist2Path =========================





//========================= delUserGists =========================
const delUserGists = function(userName, callback) {
    //  TODO 先分页获取全部gist
    gistApi.list(userName, function(gists) {
        if (!gists) {
            return;
        }

        let delCount = 0;
        gists.forEach((gist) => {
            gistApi.del(gist.id);
            delCount ++;
            if (delCount == gists.length) {
                console.log(common.formatSuccessMsg('delUserGists', userName, '已删除' + delCount + '个gist'));
                callback && callback.apply();
            }
        });
    });
};
//========================= delUserGists =========================



//========================= fetchUserGists =========================
const fetchUserGists = function(userName, callback) {
    const filePath = `c:\\path\\bat\\batlearn\\coder4`
    makeDir(filePath).then((filePath) => {
        // 获取用户信息，得到gist总条数
        gistApi.userInfoAsync(userName).then(function(user) {
            const gistTotal = user.private_gists;
            const pageSize = 30;
            
            const pageMaxIndex = Math.ceil(gistTotal / pageSize);
            console.log(`获取用户信息成功，gist总数[{${user.private_gists}]，每页[${pageSize}]条，共计[${pageMaxIndex}]页`);

            // 分页获取所有gist地址信息
            let allGists = [];

            const listInstances = [];
            for (let i = 1; i <= pageMaxIndex; i++) {
                listInstances.push(gistApi.listAsync(userName, i, pageSize));
            }
            promise.all(listInstances).then(function(gistsArray) {
                for (let i = 0; i < gistsArray.length; i ++) {
                    allGists = allGists.concat(gistsArray[i]);
                }
                return allGists;

            }).then(function(allGists) {
                // 获取所有gist完整信息
                const getInstances = [];
                for (let i = 0; i < allGists.length; i ++) {
                    getInstances.push(gistApi.getAsync(allGists[i].id));
                }
                promise.all(getInstances).then(function(allEntireGists) {
                    // 为每条gist创建对应文件
                    for (let i = 0; i < allEntireGists.length; i ++) {
                        const entireGist = allEntireGists[i];
                        const rawFileDesc = '{"lang": "other","tag": [], "desc": ""}';
                        let fileDesc = entireGist.description;
                        let fileDescJson = null;
                        if (fileDesc) {
                            try {
                                fileDescJson = JSON.parse(fileDesc);
                            } catch (err) {
                                fileDesc = rawFileDesc;
                            }
                        } else {
                            fileDesc = rawFileDesc;
                        }

                        const fileName = Object.keys(entireGist.files)[0];
                        const entireGistFile = entireGist.files[fileName];
                        const language = fileDescJson ? fileDescJson.lang : 'other';
                        const fileContent = entireGistFile.content;

                        // 根据language创建子文件夹
                        // TODO 以后maybe根据描述中的#language来处理
                        // AHK根据上下文环境猜测语言环境[java\js]，如果不能猜测，全局搜索；
                        //     用户输入文本如果在当前语言环境找不到，则全局查找
                        let curFilePath = `${filePath}\\${language}`;
                        if (!fs.existsSync(curFilePath)) {
                            fs.mkdirSync(curFilePath);
                        }
                        curFilePath = `${curFilePath}\\${fileName}`;
                        fs.writeFileAsync(curFilePath, fileContent).then(function(){
                            console.log(`文件[${curFilePath}]创建成功`);
                        });

                        curDescFilePath = `${curFilePath}.desc`;
                        fs.writeFileAsync(curDescFilePath, fileDesc).then(function(){
                            console.log(`文件[${curDescFilePath}]创建成功`);
                        });
                    }
                }).catch(function(err){
                    console.error(`===========================allEntireGists error:${err.message}`);
                });
            }).catch(function(err){
                console.error(`===========================listAsync error:${err.message}`);
            });
        });
    });
};
//========================= fetchUserGists =========================





exports.syncPath2Gist = syncPath2Gist;
exports.syncGist2Path = syncGist2Path;
exports.delUserGists = delUserGists;







// syncPath2Gist("C:\\path\\bat\\batlearn\\coder");
// delUserGists("bjc5233");
// syncGist2Path("C:\\path\\bat\\batlearn\\coder2");
fetchUserGists("bjc5233");