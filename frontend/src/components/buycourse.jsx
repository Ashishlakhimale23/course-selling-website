import axios from "axios"
import toast,{Toaster} from "react-hot-toast"
function Replycard({fileurl,title,price,_id,purchased}){
    const handlepurchase = async ()=>{
        const response = await axios.post(`http://localhost:8000/user/course/${_id}`)
        if(!Object.keys(response.data).includes("task")){
           toast.error('purchased failed', {
      style: {
        background: '#333',
        color: '#fff',
      },
    }); 

        }
        else{
toast.success('purchased', {
      style: {
        background: '#333',
        color: '#fff',
      },
    }); 
        }

    } 
    return(

        <>
        <div  className="w-80 shadow-md pb-4 rounded-3xl  antialiased">
            <div>
               <img src={fileurl} alt="" className="w-full rounded-t-3xl h-56"/>

            </div>
            <div className="p-3 ">
                <span className="block text-2xl font-sans mb-2">{title}</span>
                <label htmlFor="" className="">Price</label>
                <span className="block text-lg font-semibold mb-2">${price}</span>
                <button className="w-full bg-blue-700 text-white py-3 text-xl rounded-3xl" style={{display : purchased ? "block" : "none"}}>purchased</button>
                <button className="w-full bg-blue-700 text-white py-3 text-xl rounded-3xl" onClick={handlepurchase} style={{display : purchased ? "none" : "block"}}>Buy Now</button>


            </div>
        </div>
        <Toaster/>
        </>
    )
}
export default Replycard