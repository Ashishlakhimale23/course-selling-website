const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


async function handlesignin(req, res) {
  const {username,email,password } = req.body;
  let result ;
  const saltRounds = 10;
    await bcrypt.hash(password, saltRounds).then(response=>result=response).catch(error=>console.log(error))
      
    await   User.create({
          username,
          email,
          password:result, 
        }).then(r=>console.log(r)).catch(error=>console.log(error))
    return res.json({created:username})       
 }

async function handlelogin(req,res) {
  const {email,password} = req.body;
  
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ task: "incompleted" });
  } else {
    const result = await bcrypt.compare(password, user.password);

    if (result===true) {
      const token = jwt.sign(
        { email: email, password: user.password },
        "your secret key",
      );

      return res.json({"token": token});
    }
    else{
    return res.json({ task: "inpassword" }).end();}
  }
}
module.exports = {
  handlesignin,
  handlelogin,
}
