import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./card";
import Header from "./header";
import Footer from "./footer";
function Home(){
    const navigate = useNavigate();
    const [courses,setCourses] = useState([])
    const [isAdmin,setIsAdmin] =useState(null)

    let response;
         
    useEffect( ()=>{

    
  
        const authtoken = localStorage.getItem("authtoken");
        if(!authtoken){
            navigate("/signin");
            
        }
        else{
            
            axios.defaults.headers.common["Authorization"] = `Bearer ${authtoken}`;
           
           }
 
                const fetchcourses = async ()=>{
            try{
                 response = await axios.get("http://localhost:8000/user/course")
                console.log(response.data.courses)
                console.log(response.data.isAdmin)
                setCourses(response.data.courses)
                setIsAdmin(response.data.isAdmin)
            }
            catch(err){
                console.error(err)
            }
             
        }
        fetchcourses();
         
        
         
   
    },[])
     



    
    return(
        <>
        <Header isAdmin={isAdmin}/>
        <div className="flex justify-center p-6 font-semibold text-4xl antialiased"><span>Featured</span></div>
        <div className="flex flex-col p-5 sm:flex-row sm:justify-center flex-wrap gap-8 ">
        {courses.map((course)=>(
            <Card  key={course.id} _id={course._id} isAdmin={isAdmin} fileurl={course.fileurl} title={course.title} price={course.price} syllabus={course.syllabus} description={course.description} purchased={course.purchased}/>
        ))}
        </div>
         <Footer/>    
           <Toaster />
         </>
       
    ) 
}
export default Home;