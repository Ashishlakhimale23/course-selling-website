import axios from "axios"
function Replycard({fileurl,title,price}){
    const handlepurchase = async ()=>{
        const response = await axios.post(`http://localhost:8000/user/course/${title}`)
        console.log(response.data)
        if(!Object.keys(response.data).includes("task")){
            alert("purchased failed")

        }
        else{
            alert("purchased")
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
                <button className="w-full bg-blue-700 text-white py-3 text-xl rounded-3xl" onClick={handlepurchase}>Buy Now</button>


            </div>
        </div>
        </>
    )
}
export default Replycard