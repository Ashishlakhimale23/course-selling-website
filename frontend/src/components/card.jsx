import {useNavigate} from "react-router-dom"
function Card({fileurl,title,price,syllabus,description}){
    const navigate = useNavigate();
    const datatosend = {
        description:description,
        syllabus:syllabus,
        title:title,
        price:price,
        fileurl:fileurl
    }
    return(

        <>
        <div  className="w-80 shadow-md pb-4 rounded-3xl h-96 antialiased">
            <div>
               <img src={fileurl} alt="" className="w-full rounded-t-3xl h-56"/>

            </div>
            <div className="p-3 space-y-3">
                <span className="block text-2xl font-sans">{title}</span>
                <span className="block text-lg font-semibold">${price}</span>
                <button className="w-full bg-blue-700 text-white py-3 text-xl rounded-3xl" onClick= {()=>navigate("/coursedetails",{state:{data:{datatosend}}})}>View Details</button>


            </div>
        </div>
        </>
    )
}
export default Card 