const fs = require('fs');
const iconv = require('iconv-lite');
const gistApi = require('./gistAPI');


// const gistId = "be060fb64bf17db45f0a63cb739926b5";
// gistApi.get(gistId, function (gist) {
//     console.log(gist);
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
// 			gistApi.add(desc, fileName, fileContent, function (gist) {
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


gistApi.addPathGists("C:\\path\\bat\\batlearn\\coder");
// gistApi.delUserGists("bjc5233");