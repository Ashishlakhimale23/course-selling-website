import React, { useEffect, useState } from "react";
import Footer from "./footer";
import Header from "./header";
import { useLocation } from "react-router";
import Vediocard from "./vediocard";

function Coursecontent() {
    let location = useLocation();
    const [course, setCourse] = useState([]);
    const [courselen,setCourselen] =useState(0)
 
    const handelstate = (data) =>{
       setCourse(data[0])
       setCourselen(data[0].length)

    }
   useEffect(() => {
if (location.state && location.state.data && location.state.data.coursedata && location.state.data.coursedata.courselecture) {
            const data = location.state.data.coursedata.courselecture;
 
        handelstate(data)
       }
    }, []);

    return (
        <>
            <Header />
            <div style={{display:courselen===0 ? 'block' : "none"}} className="font-semibold text-3xl p-3">
                <span>
                    Content to be upload soon
                    </span>
                    </div>
                   <div className="flex flex-col p-5 sm:flex-row  flex-wrap gap-14 ">

                {course.map((element, index) => (
                    <Vediocard key={index} vediotitle={element.title} vediourl={element.vediourl} />
                ))}
            </div> 
            <Footer />
        </>
    );
}

export default Coursecontent;
