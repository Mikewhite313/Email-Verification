const jwt = require("jsonwebtoken");
exports.authenticatication = (req,res,next) => {
    try {
        const headers = req.headers.authorization;
        if(!headers){
          return res.status(404).json("Access Token Required");
        }
        const authToken = headers.split(" ")[1];
        const decode = jwt.verify(authToken,process.env.authKey);
        req.user = decode;
        return next();
        
    } catch (error) {
        console.log("error",error);
    }
}