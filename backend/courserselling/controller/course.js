const Usercouser = require("../model/couser")
const User = require("../model/user")
const jwt = require('jsonwebtoken')
const bcrpty = require('bcryptjs')
const cloudinary = require("cloudinary").v2;
cloudinary.config({ 
  cloud_name: 'ddweepkue', 
  api_key: '993344952783557', 
  api_secret: 'X6Z_kqsjTs-k0_Kjpo-J8jLABDc' 
});


async function handlecouserinput(req,res){
     const {title,description,price,fileurl,syllabus}=req.body;
     console.log(req.body) 

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
    let isAdmin ;
    const email= "ashishlakhimale23@gmail.com"
    const password = "ashishlakhimale23"
const auth = req.headers.authorization || req.headers.Authorization;

if (!auth?.startsWith("Bearer ")) return res.json({ "status": "header not found" });

const Token = auth.split(' ')[1];
console.log(Token);
    const decoded =  jwt.verify(Token,"23032004");
    console.log(decoded);
    const response = await bcrpty.compare(password,decoded.password) 
    console.log(response)
    if(decoded.email === email && response){
        isAdmin = true;
        
    }
    else{
        isAdmin = false; 
    }

    let courses =[];
    
    const usercouser = Usercouser.find({});
    (await usercouser).forEach(element => {
       
          courses.push({
                title:element.title,
                description:element.description,
                price:element.price,
                fileurl:element.fileurl,
                syllabus:element.syllabus
            }
                
            )

       
    });
    console.log(courses)

    return res.json({courses:courses,isAdmin:isAdmin});

}

async function handlecoursepurchased(req,res){
    console.log("hello")
    const title = req.params.id;
    console.log(title)
    const Couser =await Usercouser.findOne({title});
   const auth = req.headers.authorization || req.headers.Authorization;

if (!auth?.startsWith("Bearer ")) return res.json({ "status": "header not found" });

const Token = auth.split(' ')[1];
console.log(Token);
    const decoded = jwt.verify(Token,"23032004");
    console.log(decoded);
     
    const email = decoded.email;
    const user = await User.findOne({email});
    console.log(user)
    console.log(decoded)
    console.log(Couser._id)

    if(user.purchased.includes(Couser._id)){
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
console.log(Token);
    const decoded = jwt.verify(Token,"23032004");
    console.log(decoded);
 
    const email = decoded.email;
    const user = await User.findOne({email});
   
    let courses = [];

    for(let courseId of user.purchased){
        const course = await Usercouser.findById(courseId);
        courses.push({ ...course._doc});
    }

   return res.status(200).json({ courses: courses });
    

}

module.exports ={
 handlecouserinput,
 handlecouseroutput,
 handlecoursepurchased,
 handlepurchased
}


