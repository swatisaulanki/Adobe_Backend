require("dotenv").config();
const jwt = require("jsonwebtoken");
const authentications = (req, res, next) => {
    const token = req.headers?.authorization;
    try{
        let dcode = jwt.verify(token,process.env.ACCESS_TOKEN_PRIVATE_KEY);
        console.log(dcode)
        req.body.id = dcode.id;
        next();
    }
    catch(err){
       res.send("Please login again");
    }
}
module.exports = authentications;