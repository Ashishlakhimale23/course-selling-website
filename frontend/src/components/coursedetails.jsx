import Header from "./header";
import Footer from "./footer";
import {useLocation} from "react-router-dom"
import Replycard from "./buycourse"
import { useState } from "react";
function Coursedetails(){

    const {state} = useLocation();
    const receivedata = state?.data;
    const [isAdmin,setIsAdmin] = useState(false)
    return (
        <>
        <Header isAdmin={isAdmin}/>
        <div className="w-full px-8 py-10 bg-blue-500 text-white text-3xl font-semibold sm:absolute">
            {receivedata.datatosend.title}
        </div>
        <div className="relative sm:pt-10 p-8 w-full sm:flex sm:flex-row-reverse sm:absolute">
            <Replycard _id={receivedata.datatosend._id} title={receivedata.datatosend.title} fileurl={receivedata.datatosend.fileurl} price={receivedata.datatosend.price} purchased={receivedata.datatosend.purchased}/>
            
        </div>
        <div className="p-8 sm:pt-36 sm:pr-96">

            <label htmlFor="" className="text-3xl block font-medium mb-5">Description</label>
          <p className="text-black mb-5 font-medium text-xl"style={{ whiteSpace: 'pre-wrap' }}>{receivedata.datatosend.description}</p>
         <label htmlFor="" className="text-3xl block font-medium mb-5">Syllabus</label>
          <p className="text-black mb-5 " style={{ whiteSpace: 'pre-wrap' }}>{receivedata.datatosend.syllabus}</p>
        </div>
        <Footer/>
        </>
    )
}
export default Coursedetails; 