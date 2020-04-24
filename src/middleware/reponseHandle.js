
export function APIError(message = '未知错误', statusCode = 430001) {
	this.message = message;
	this.statusCode = statusCode;
};

export function restify(){
    return async (ctx, next) => {
        ctx.rest = (data) => {
            ctx.response.type = 'application/json';
			ctx.response.body = {
				result: data,
				statusCode: 1000,
				message: "OK"
			}
        }
        try{
            await next()
        }catch(e){
            ctx.response.body = {
                statusCode: e.statusCode || 43001,
                message: e.message || '未知错误'
            }
        }
    }
}