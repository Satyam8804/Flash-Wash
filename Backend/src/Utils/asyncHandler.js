// wrapper to handle asyncronous tasks

const asyncHandler =(fn)=>{
    return (req,res,next)=>{
        Promise.resolve(fn(req,res,next)).
        catch((err)=>next(err))
    }

}
export {asyncHandler}


/**
 * const asyncHandler = (fb) => async (req,res ,next) =>{
 *      try{
 *          await fn(req,res,next)
 *      }catch(err){
 *          res.status(err.code || 500).json({
 *              success:false,
 *              message :err.message
 *          })
 *      }
 * }
 */