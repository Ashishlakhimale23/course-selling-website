const express = require("express")
const router = express.Router()

const {handlesignin,handlelogin}=require("../controller/user")
const {handlecouserinput, handlecouseroutput,handlecoursepurchased,handlepurchased}=require("../controller/course")
const {userverification,checkuser}=require("../middlerware/middleware")

router.post("/signin",handlesignin);
router.post("/login",handlelogin);

router.post("/course",checkuser,handlecouserinput);
router.get("/course",userverification,handlecouseroutput);
router.post("/course/:id",userverification,handlecoursepurchased)
router.get("/course/purchased",userverification,handlepurchased)


module.exports = router