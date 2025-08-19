import User from "../models/User.js";

//middleware to check if user is authenticated
export const protect = async (req, res, next)=>{
    const{userId} = req.auth();
    if(!userId){
        // res.json({success: false, message: "not authenticated"})
        return res.json({success: false, message: "not authenticated"})
    }
    else{
        // const user =await User.findById(userId);
        // req.user=user;
        const user = await User.findById(userId);
        if (!user) {
            return res.json({success: false, message: "user not found"})
        }
        req.user = user;
        next()
    }
}