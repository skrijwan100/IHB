
import jwt from 'jsonwebtoken'
const jwt_secret=process.env.ACCESS_TOKEN_SECRET;

const fecthuer=(req,res,next)=>{
    try {
        const authtoken= req.header("accessToken");
        if(!authtoken){
            return res.status(404).json({"massage":"Invalid Auth token"})
         }
         const data= jwt.verify(authtoken,jwt_secret)
         console.log(data)
         req.user=data._id
         next();
    } catch (error) {
         console.log(error)
         return res.status(500).json({"error":"Intarnal server error"})
    }

}
export {fecthuer};