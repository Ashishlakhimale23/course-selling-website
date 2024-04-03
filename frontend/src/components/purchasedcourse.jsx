import Header from "./header";
import Footer from "./footer";
import axios from "axios";
import Card from "./card";
import { useEffect, useState } from "react";
function Purchased(){
    const [purchased,setPurchased] = useState([]);
    useEffect(()=>{
        const fetchpurchased =async () =>{
          const response =  await axios.get("http://localhost:8000/user/course/purchased")
          console.log(response.data)
          console.log(response.data.courses)
          setPurchased(response.data.courses) 

        }
        fetchpurchased()
    },[])
    return(
        <>
        <Header/>
        <div className="flex flex-col p-5 sm:flex-row sm:justify-center flex-wrap gap-8 ">
           {purchased.map((element)=>(
              <Card key={element._id} title={element.title} price={element.price} fileurl={element.fileurl} syllabus={element.syllabus} description={element.description}/>
           ))}
        </div>
        <Footer/>
        </>
    )
}
export default Purchased;