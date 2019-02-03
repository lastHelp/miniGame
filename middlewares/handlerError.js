async function handlerError(ctx,next){
    try{
      await next()
   }catch(err){
           ctx.body=err.message;
           ctx.status =  err.statusCode || err.status || 500; 
       }
   }

module.exports = handlerError;