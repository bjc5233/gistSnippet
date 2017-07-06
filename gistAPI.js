//github上gist相关的API封装
//接口地址 https://developer.github.com/v3/gists/
//TODO loglevel设置
//TODO token从配置中读取


const https = require('https');
const querystring = require('querystring');
const common = require('./common');


//========================= userInfo =========================
const userInfo = function(userName, callback) {
    const options = buildRequestOption(`/users/${userName}`, 'GET');
    var req = https.request(options, function(res) {
        let user = '';
        res.setEncoding('utf8');
        res.on('data', function(chunk) {
            user += chunk;
        });
        res.on('end', function() {
            if (res.statusCode == 200) {
                user = JSON.parse(user);
                console.log(common.formatSuccessMsg('userInfo', userName, user.id));
                if(common.validateCallback(callback)){ 
                    callback(null, user); 
                }
            } else {
                console.error(common.formatErrorMsg('userInfo', userName, res.statusCode + ' ' + res.statusMessage));
                if(common.validateCallback(callback)){ 
                    callback(new Error(res.statusCode)); 
                }
            }
        });
        res.on('error', (e) => {
            console.error(common.formatErrorMsg('userInfo', userName, e.message));
            if(common.validateCallback(callback)){ 
                callback(e); 
            }
        });
    });
    req.end();
};
//========================= userInfo =========================







//========================= get =========================
const get = function(gistId, callback) {
    const options = buildRequestOption(`/gists/${gistId}`, 'GET');
    var req = https.request(options, function(res) {
        let gist = '';
        res.setEncoding('utf8');
        res.on('data', function(chunk) {
            gist += chunk;
        });
        res.on('end', function() {
            if (res.statusCode == 200) {
                gist = JSON.parse(gist);
                console.log(common.formatSuccessMsg('get', gistId, gist.id));
                if(common.validateCallback(callback)){ 
                    callback(null, gist); 
                }
            } else {
                console.error(common.formatErrorMsg('get', gistId, res.statusCode + ' ' + res.statusMessage));
                if(common.validateCallback(callback)){ 
                    callback(new Error(res.statusCode)); 
                }
            }
        });
        res.on('error', (e) => {
            console.error(common.formatErrorMsg('get', gistId, gist.id, e.message));
            if(common.validateCallback(callback)){ 
                callback(e); 
            }
        });
    });
    req.end();
};
//========================= get =========================



//========================= list =========================
// TODO https://developer.github.com/v3/#pagination
const list = function(userName, pageIndex, pageSize, callback) {
    const queryData = querystring.stringify({
        // 'since' : '2017-06-27T10:06:58Z'
        page: (pageIndex ? pageIndex : 1),
        per_page: (pageSize ? pageSize : 10)
    });

    let path;
    if (userName) {
        path = `/users/bjc5233/gists?${queryData}`
    } else {
        path = `/gists/public?${queryData}`
    }
    const options = buildRequestOption(path, 'GET');
    var req = https.request(options, function(res) {
        let gists = '';
        res.setEncoding('utf8');
        res.on('data', function(chunk) {
            gists += chunk;
        });
        res.on('end', function() {
            if (res.statusCode == 200) {
                gists = JSON.parse(gists);
                console.log(common.formatSuccessMsg('list', [userName, pageIndex, pageSize], gists.length));
                if(common.validateCallback(callback)){ 
                    callback(null, gists); 
                }
            } else {
                console.error(common.formatErrorMsg('list', userName, res.statusCode + ' ' + res.statusMessage));
                if(common.validateCallback(callback)){ 
                    callback(new Error(res.statusCode)); 
                }
            }
        });
        res.on('error', (e) => {
            console.error(common.formatErrorMsg('list', userName, e.message));
            if(common.validateCallback(callback)){ 
                callback(e); 
            }
        });
    });
    req.end();
};
//========================= list =========================



//========================= add =========================
const add = function(fileName, fileContent, description, callback) {
    const options = buildRequestOption('/gists', 'POST');
    const queryData = JSON.stringify({
        description,
        "public": false,
        "files": {
            [fileName]: {
                "content": fileContent
            }
        }
    });
    var req = https.request(options, function(res) {
        let gist = '';
        res.setEncoding('utf8');
        res.on('data', function(chunk) {
            gist += chunk;
        });
        res.on('end', function() {
            if (res.statusCode == 201) {
                gist = JSON.parse(gist);
                console.log(common.formatSuccessMsg('add', fileName, gist.id));
                if(common.validateCallback(callback)){ 
                    callback(null, gist); 
                }
            } else {
                console.error(common.formatErrorMsg('add', fileName, res.statusCode + ' ' + res.statusMessage));
                if(common.validateCallback(callback)){ 
                    callback(new Error(res.statusCode)); 
                }
            }
        });
        res.on('error', (e) => {
            console.error(common.formatErrorMsg('add', fileName, e.message));
            if(common.validateCallback(callback)){ 
                callback(e); 
            }
        });
    });
    req.end(queryData);
};
//========================= add =========================



//========================= edit =========================



const edit = function(gistId, description, fileName, fileContent, callback) {
    const options = buildRequestOption(`/gists/${gistId}`, 'PATCH');
    const queryData = JSON.stringify({
        description,
        "public": false,
        "files": {
            [fileName]: {
                "content": description
            }
        }
    });
    console.log(queryData);
    var req = https.request(options, function(res) {
        let gist = '';
        res.setEncoding('utf8');
        res.on('data', function(chunk) {
            gist += chunk;
        });
        res.on('end', function() {
            if (res.statusCode == 200) {
                gist = JSON.parse(gist);
                console.log(common.formatSuccessMsg('edit', gistId, gist.id));
                if(common.validateCallback(callback)){ 
                    callback(null, gist); 
                }
            } else {
                console.error(common.formatErrorMsg('edit', gistId, res.statusCode + ' ' + res.statusMessage));
                if(common.validateCallback(callback)){ 
                    callback(new Error(res.statusCode)); 
                }
            }
        });
        res.on('error', (e) => {
            console.error(common.formatErrorMsg('edit', gistId, e.message));
            if(common.validateCallback(callback)){ 
                callback(e); 
            }
        });
    });
    req.end(queryData);
};
//========================= edit =========================



//========================= del =========================
const del = function(gistId, callback) {
    const options = buildRequestOption(`/gists/${gistId}`, 'DELETE');
    var req = https.request(options, function(res) {
        res.on('data', function(chunk) {
        });
        res.on('end', function() {
            if (res.statusCode == 204) {
                console.log(common.formatSuccessMsg('del', gistId, '删除成功'));
                if(common.validateCallback(callback)){ 
                    callback(null); 
                }
            } else {
                console.error(common.formatErrorMsg('del', gistId, res.statusCode + ' ' + res.statusMessage));
                if(common.validateCallback(callback)){ 
                    callback(new Error(res.statusCode)); 
                }
            }
        });
        res.on('error', (e) => {
            console.error(common.formatErrorMsg('del', gistId, e.message));
            if(common.validateCallback(callback)){ 
                callback(e); 
            }
        });
    });
    req.end();
};
//========================= del =========================


//========================= listCommits =========================
// TODO https://developer.github.com/v3/#pagination
const listCommits = function(gistId, callback) {
    const options = buildRequestOption(`/gists/${gistId}/commits`, 'GET');
    var req = https.request(options, function(res) {
        let commits = '';
        res.setEncoding('utf8');
        res.on('data', function(chunk) {
            commits += chunk;
        });
        res.on('end', function() {
            if (res.statusCode == 200) {
                commits = JSON.parse(commits);
                console.log(common.formatSuccessMsg('listComment', gistId, commits.length));
                if(common.validateCallback(callback)){ 
                    callback(null, commits); 
                }
            } else {
                console.error(common.formatErrorMsg('listComment', gistId, res.statusCode + ' ' + res.statusMessage));
                if(common.validateCallback(callback)){ 
                    callback(new Error(res.statusCode)); 
                }
            }
        });
        res.on('error', (e) => {
            console.error(common.formatErrorMsg('listComment', gistId, e.message));
            if(common.validateCallback(callback)){ 
                callback(e); 
            }
        });
    });
    req.end();
};
//========================= listComment =========================



//========================= isStarred =========================
const isStarred = function(gistId, callback) {
    const options = buildRequestOption(`/gists/${gistId}/star`, 'GET');
    var req = https.request(options, function(res) {
        res.on('data', function(chunk) {
        });
        res.on('end', function() {
            if (res.statusCode == 204) {
                console.log(common.formatSuccessMsg('isStarred', gistId, '已标记星星'));
                if(common.validateCallback(callback)){ 
                    callback(null, true); 
                }
            } else {
                console.error(common.formatErrorMsg('isStarred', gistId, res.statusCode + ' ' + res.statusMessage));
                if(common.validateCallback(callback)){ 
                    callback(null, false); 
                }
            }
        });
        res.on('error', (e) => {
            console.error(common.formatErrorMsg('isStarred', gistId, e.message));
            if(common.validateCallback(callback)){ 
                callback(e); 
            }
        });
    });
    req.end();
};
//========================= isStarred =========================



//========================= star =========================
const star = function(gistId, callback) {
    const options = buildRequestOption(`/gists/${gistId}/star`, 'PUT');
    var req = https.request(options, function(res) {
        res.on('data', function(chunk) {
        });
        res.on('end', function() {
            if (res.statusCode == 204) {
                console.log(common.formatSuccessMsg('star', gistId, '标记星星成功'));
                if(common.validateCallback(callback)){ 
                    callback();
                }
            } else {
                console.error(common.formatErrorMsg('star', gistId, res.statusCode + ' ' + res.statusMessage));
                if(common.validateCallback(callback)){ 
                    callback(new Error(res.statusCode)); 
                }
            }
        });
        res.on('error', (e) => {
            console.error(common.formatErrorMsg('star', gistId, e.message));
            if(common.validateCallback(callback)){ 
                callback(e); 
            }
        });
    });
    req.end();
};
//========================= star =========================



//========================= unStar =========================
const unStar = function(gistId, callback) {
    const options = buildRequestOption(`/gists/${gistId}/star`, 'DELETE');
    var req = https.request(options, function(res) {
        res.on('data', function(chunk) {
        });
        res.on('end', function() {
            if (res.statusCode == 204) {
                console.log(common.formatSuccessMsg('unStar', gistId, '取消标记星星成功'));
                if(common.validateCallback(callback)){ 
                    callback();
                }
            } else {
                console.error(common.formatErrorMsg('unStar', gistId, res.statusCode + ' ' + res.statusMessage));
                if(common.validateCallback(callback)){ 
                    callback(new Error(res.statusCode)); 
                }
            }
        });
        res.on('error', (e) => {
            console.error(common.formatErrorMsg('unStar', gistId, e.message));
            if(common.validateCallback(callback)){ 
                callback(e); 
            }
        });
    });
    req.end();
};
//========================= unStar =========================



//========================= fork =========================
const fork = function(gistId, callback) {
    const options = buildRequestOption(`/gists/${gistId}/forks`, 'POST');
    var req = https.request(options, function(res) {
        let newGist = '';
        res.setEncoding('utf8');
        res.on('data', function(chunk) {
            newGist += chunk;
        });
        res.on('end', function() {
            if (res.statusCode == 200) {
                newGist = JSON.parse(newGist);
                console.log(common.formatSuccessMsg('fork', gistId, 'newGist.id'));
                if(common.validateCallback(callback)){ 
                    callback(null, newGist);
                }
            } else {
                console.error(common.formatErrorMsg('fork', gistId, res.statusCode + ' ' + res.statusMessage));
                if(common.validateCallback(callback)){ 
                    callback(new Error(res.statusCode)); 
                }
            }
        });
        res.on('error', (e) => {
            console.error(common.formatErrorMsg('fork', gistId, e.message));
            if(common.validateCallback(callback)){ 
                callback(e); 
            }
        });
    });
    req.end();
};
//========================= fork =========================











const buildRequestOption = function(path, method) {
    return {
        host: 'api.github.com',
        path,
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'token 7ca38f4742d19da85e26f85baeaa5facb846b78a',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.86 Safari/537.36',
            'Accept': 'application/vnd.github.v3+json',
            'Time-Zone': 'Asia/Shanghai'
        }
    };
}











exports.userInfo = userInfo;
exports.get = get;
exports.list = list;
exports.add = add;
exports.edit = edit;
exports.del = del;
exports.listCommits = listCommits;
exports.isStarred = isStarred;
exports.star = star;
exports.unStar = unStar;
exports.fork = fork;