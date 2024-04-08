const jwt = require('jsonwebtoken')
const bcrpty = require("bcryptjs")

async function userverification(req,res,next){
     
    const auth = req.headers.authorization || req.headers.Authorization;

if (!auth?.startsWith("Bearer ")) return res.json({ "status": "header not found" });

const Token = auth.split(' ')[1];
try {
    const decoded = jwt.verify(Token,"your secret key");
    
  

    next();
} catch (error) {
    console.error("Token verification failed:", error);
    return res.status(400).json({ "status": "Unauthorized" });
}

}

function checkuser(req,res,next){
    const email= "admin's email"
    const password = "admin's password"
const auth = req.headers.authorization || req.headers.Authorization;

if (!auth?.startsWith("Bearer ")) return res.json({ "status": "header not found" });

const Token = auth.split(' ')[1];
console.log(Token);
    const decoded = jwt.verify(Token,"your secret key");
    const response = bcrpty.compare(password,decoded.password) 
    if(decoded.email === email && response){
        next()
    }
    else{
        return res.json({"Access":"not allowed"})
    }

}





module.exports = {userverification,checkuser}
