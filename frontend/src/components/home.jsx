import Header from "./header"
import Footer from "./footer";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./card";
function Home(){
    const navigate = useNavigate();
    const [courses,setCourses] = useState([])
    const [admin,setAdmin] = useState(true);
    let response;
    
    useEffect(()=>{
        const authtoken = localStorage.getItem("authtoken");
        if(!authtoken){
            console.log("header not found");
            navigate("/signin")
            
        }
        else{
            
            axios.defaults.headers.common["Authorization"] = `Bearer ${authtoken}`
           
            console.log("header set")}
        
        const fetchcourses = async ()=>{
            try{
                 response = await axios.get("http://localhost:8000/user/course")
                console.log(response.data.courses)
                setCourses(response.data.courses)
                console.log(response.data.isAdmin)
                setAdmin(response.data.isAdmin)

            }
            catch(err){
                console.error(err)
            }
        }
        fetchcourses();
        
        


    
    },[navigate])



    
    return(
        <>
        <Header isAdmin={admin}></Header>    
        <div className="flex flex-col p-5 sm:flex-row sm:justify-center flex-wrap gap-8 ">
        {courses.map((course)=>(
            <Card key={course.id} fileurl={course.fileurl} title={course.title} price={course.price} syllabus={course.syllabus} description={course.description}/>
        ))}
        </div>
    
        <Footer></Footer>
        </>
       
    ) 
}
export default Home;