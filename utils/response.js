// 错误信息封装
let routerResponse = (option={}) => {
    return async function(ctx,next){
        ctx.success = function (data,msg) {
            ctx.type = option.type || 'json'
            ctx.body = {
                success: true,
                code : option.successCode || 0,
                msg : msg,
                data : data
            }
        }
 
        ctx.fail = function (msg,code) {
            ctx.type = option.type || 'json'
            ctx.body = {
                success: false,
                code : code || option.failCode || 99,
                msg : msg || option.successMsg || 'fail',
            }
            // console.log(ctx.body)
        }
 
       await next()
    }
 
}

module.exports = routerResponse