const Usercouser = require("../model/couser")
const User = require("../model/user")
const jwt = require('jsonwebtoken')
const bcrpty = require('bcryptjs')


async function handlecouserinput(req,res){
     const {title,description,price,fileurl,syllabus}=req.body;

    await Usercouser.create({
        title,
        description,
        price,
        fileurl,       
        syllabus

    })
    return res.json({"task":"completed"})

}

async function handlecouseroutput(req,res){
    const adminemail= "admin's email" 
    const adminpassword ="admin's password"
    let isAdmin; 
    let purchased ;
    let decoded;
    
const auth = req.headers.authorization || req.headers.Authorization;

if (!auth?.startsWith("Bearer ")) return res.json({ "status": "header not found" });

const Token = auth.split(' ')[1];
     decoded = jwt.verify(Token,"23032004");
    const response = bcrpty.compare(adminpassword,decoded.password) 
    if(decoded.email === adminemail && response){
           isAdmin = true
    }
    else{
          isAdmin = false; 
    }


    let courses =[];

    const user = await User.findOne({email : decoded.email})
    if(user){
        purchased = user.purchased ;
        
    }
     
    const usercouser = Usercouser.find({});
    (await usercouser).forEach(element => {
          let decision =  purchased.includes(element._id)     
          courses.push({
                purchased:decision,
                _id:element._id,
                title:element.title,
                description:element.description,
                price:element.price,
                fileurl:element.fileurl,
                syllabus:element.syllabus,
                

                
            }
                
            )

       
    });
  

    return res.json({courses:courses,isAdmin:isAdmin});

}

async function handlecoursepurchased(req,res){
    const title = req.params.id;
    const Couser = await Usercouser.findById(title)
    if(Couser===null || Couser === undefined){
        return res.send("not found")

    }
   const auth = req.headers.authorization || req.headers.Authorization;

if (!auth?.startsWith("Bearer ")) return res.json({ "status": "header not found" });

const Token = auth.split(' ')[1];
    const decoded = jwt.verify(Token,"your secret key");
     
    const email = decoded.email;
    const user = await User.findOne({email});
    

    if(user.purchased.includes(title)){
        return res.end()
    }
    else{
        user.purchased.push(Couser._id);
        await user.save();

        return res.json({"task":"complete"})
    }
}

async function handlepurchased(req,res){
 const auth = req.headers.authorization || req.headers.Authorization;
    if (!auth?.startsWith("Bearer ")) return res.json({ "status": "header not found" });

const Token = auth.split(' ')[1];
    const decoded = jwt.verify(Token,"your secret key ");
 
    const email = decoded.email;
    const user = await User.findOne({email});
   
    let courses = [];

    for(let courseId of user.purchased){
        const course = await Usercouser.findById(courseId);
        if(course===null || course ===undefined){
            continue
        }
        console.log(course._doc)
        courses.push({ ...course._doc});
    
    }

   return res.status(200).json({ courses: courses });
    

}

async function handlecouserupload(req,res){
    const {courseid,title,vediourl}=req.body;

   const course = await Usercouser.findById(courseid);
   if(!course.lectures.includes(title) && !course.lectures.includes(vediourl)){

    course.lectures.push({title:title,vediourl:vediourl})
    await course.save()
    return res.json({task:"completed"})
    

   }else{
    return res.send("already included")
   }
   


}

module.exports ={
 handlecouserinput,
 handlecouseroutput,
 handlecoursepurchased,
 handlepurchased,
 handlecouserupload
}


