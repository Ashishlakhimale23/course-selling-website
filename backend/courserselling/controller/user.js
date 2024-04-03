const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function handlesignin(req, res) {
  const {username,email,password } = req.body;
  console.log(password)
  let result ;
  console.log(req.body);
  const saltRounds = 10;
  console.log(username, email);
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
  console.log(req.body);
  console.log(email)
  console.log(password)
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ task: "incompleted" });
  } else {
    console.log("emailfound");
    const result = await bcrypt.compare(password, user.password);

    if (result) {
      const token = jwt.sign(
        { email: email, password: user.password },
        "23032004",
      );

      const option = {
        httpOnly: true,
      };
      console.log(token)

      return res.json({"token": token});
    }
    return res.json({ task: "inpassword" }).end();
  }
}

module.exports = {
  handlesignin,
  handlelogin,
};
