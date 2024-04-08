import Header from "./header";
import Footer from "./footer";
import axios from "axios";
import PurchasedCard from "./purchasedcard";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
function Purchased() {
    const [purchased, setPurchased] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    let location = useLocation();
    const isadmin = location.state;
    
    useEffect(() => {
        if (isadmin !== null && isadmin !== undefined) {
            setIsAdmin(isadmin.from);
        }
        
    }, [isadmin]);

    useEffect(() => {
        const fetchpurchased = async () => {
            const response = await axios.get("http://localhost:8000/user/course/purchased");
            console.log(response.data.courses)
            if(response.data.courses!==null && response.data.courses!==undefined){
                setPurchased(response.data.courses)
             localStorage.setItem("purchasedcourses",JSON.stringify(response.data.courses))
            }        
            const courses = localStorage.getItem("purchasedcourses") 
            setPurchased(JSON.parse(courses))
        };
        fetchpurchased();
    }, []);
    return (
        <>
        
            <Header isAdmin={isAdmin} />
            <div className="flex flex-col p-5 sm:flex-row sm:justify-center flex-wrap gap-8">
                {purchased.map((element) => (
                     
                    <PurchasedCard  key={element._id} courselecture={element.lectures} title={element.title} price={element.price} fileurl={element.fileurl} syllabus={element.syllabus} description={element.description} />
                ))}
            </div>
            <Footer />
        </>
    );
}

export default Purchased;