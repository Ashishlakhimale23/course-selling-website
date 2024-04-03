const jwt = require('jsonwebtoken')
const bcrpty = require("bcryptjs")

async function userverification(req,res,next){
     
    const auth = req.headers.authorization || req.headers.Authorization;

if (!auth?.startsWith("Bearer ")) return res.json({ "status": "header not found" });

const Token = auth.split(' ')[1];
console.log(Token);
try {
    const decoded = jwt.verify(Token,"23032004");
    console.log(decoded);
    req.authenticated;
    
    next();
} catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({ "status": "Unauthorized" });
}

}

function checkuser(req,res,next){
    const email= "ashishlakhimale23@gmail.com"
    const password = "ashishlakhimale23"
const auth = req.headers.authorization || req.headers.Authorization;

if (!auth?.startsWith("Bearer ")) return res.json({ "status": "header not found" });

const Token = auth.split(' ')[1];
console.log(Token);
    const decoded = jwt.verify(Token,"23032004");
    console.log(decoded);
    const response = bcrpty.compare(password,decoded.password) 
    if(decoded.email === email && response){
        next()
    }
    else{
        return res.json({"Access":"not allowed"})
    }

}





module.exports = {userverification,checkuser}
