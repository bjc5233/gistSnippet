const fs = require('fs');


const formatSuccessMsg = function(apiName, params, resultMsg) {
    return `======接口[${apiName}]\t接口参数[${JSON.stringify(params)}]\t结果信息[${resultMsg}]`;
}
const formatErrorMsg = function(apiName, params, errorMsg) {
    return `======接口[${apiName}]\t接口参数[${JSON.stringify(params)}]\t出错信息[${errorMsg}]`;
}

const validateCallback = function(callback) {
    if(callback && typeof(callback) === "function"){ 
        return true;
    }
    return false;
}



exports.formatSuccessMsg = formatSuccessMsg;
exports.formatErrorMsg = formatErrorMsg;
exports.validateCallback = validateCallback;
