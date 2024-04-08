import {useNavigate} from "react-router-dom"
function PurchasedCard({fileurl,title,price,syllabus,description,isAdmin,_id,courselecture}){
    const navigate = useNavigate();
    let courselectures = [];
    courselectures.push(courselecture)

    const datatosend = {
        _id:_id,
        description:description,
        syllabus:syllabus,
        title:title,
        price:price,
        fileurl:fileurl,
        purchased:true
        
        
    }
    const uploaddata = {
        _id:_id,
    }
    const coursedata = {
        courselecture:courselectures
    } 
    const handleupload =() =>{
        navigate("/uploadlectures",{state:{data:{uploaddata}}})
    }
    return(

        <>
        <div  className="w-80 shadow-md pb-4 rounded-3xl  antialiased">
            <div>
               <img src={fileurl} alt="" className="w-full rounded-t-3xl h-56"/>

            </div>
            <div className="p-3 space-y-3">
                <span className="block text-2xl font-sans">{title}</span>
                <span className="block text-lg font-semibold">${price}</span>
                <button className="w-full bg-blue-700 text-white py-3 text-xl rounded-3xl" onClick= {()=>navigate("/coursedetails",{state:{data:{datatosend}}})}>View Details</button>
                <button className="w-full bg-blue-700 text-white py-3 text-xl rounded-3xl" style={{display:isAdmin ? "block" : "none"}} onClick={handleupload}>Upload</button>
                <button className="w-full bg-blue-700 text-white py-3 text-xl rounded-3xl" onClick={()=>navigate("/coursecontent",{state:{data:{coursedata}}})} >View the content</button>

            </div>
        </div>
        </>
    )
}
export default PurchasedCard