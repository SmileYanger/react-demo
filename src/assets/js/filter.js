/**
* 拼接图片地址
* @param {*} value
*/
 const url=function (value) {
    if (!value) return ''
    value = 'http://weixianyu.oss-cn-zhangjiakou.aliyuncs.com/' + value
    return value
}
export default {
	url
}

