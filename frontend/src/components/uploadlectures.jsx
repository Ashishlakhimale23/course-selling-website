import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Footer from "./footer";
import Header from "./header";

function Uploadlectures() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [courseid,setCourseid] = useState("")
  const {state} = useLocation()

  const id = state.data;

  
  useEffect(()=>{
       if(id!==null && id!==undefined){
        setCourseid(id.uploaddata._id)
       }
  },[id])
  
  
  const triggersubmit = useCallback(async () => {
     const auth = axios.defaults.headers.common['Authorization'];

const Token = auth.split(' ')[1]; 
    delete axios.defaults.headers.common["Authorization"];
    try {
        if (!file) {
            return null;
        }
        const formData = new FormData();
         formData.append("file",file);
         formData.append("upload_preset", "your upload preset"); 
         formData.append("api_key", "your api key"); 
         console.log(formData)
         
        console.log(file)
        const response = await axios.post("https://api.cloudinary.com/v1_1/your cloud name/video/upload",formData,{ headers: [
            { "X-localization": localStorage.getItem("authtoken") },
            { "Access-Control-Allow-Origin": '*' },
            { "Access-Control-Allow-Headers": 'Origin, X-Requested-With, Content-Type, Accept '},
            { "Access-Control-Allow-Methods": "POST, GET, PUT, OPTIONS, DELETE" },
            { "Access-Control-Max-Age": 3600 }
          ]}) 
     
axios.defaults.headers.common["Authorization"] = `Bearer ${Token}`

        const res = await axios.post("http://localhost:8000/user/uploadlectures", {
            title,
            courseid, 
            vediourl:response.data.secure_url
        });
     
        const keys = Object.keys(res.data);
        if (!keys.includes("task")) {
            setTitle("");
            setFile(null);
           

        } else {
            setTitle("");
            setFile(null);
           

        }
    } catch (err) {
        console.error(err);
    } 
      }, [title,file,courseid]);
  const handelsubmit = useCallback(
    (e) => {
      e.preventDefault();
      triggersubmit();
    },
    [triggersubmit],
  );

    const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  return (
    <>
    <Header/>
    <div className="min-h-screen flex flex-col justify-center">
      <form
        action=""
        className=" relative sm:w-96 mx-auto text-center"
        onSubmit={handelsubmit}
      >
        <label className="text-2xl font-light">Enter the title and vedio to upload</label>
        <div className="mt-4 bg-white shadow-md rounded-lg">
          <div className="h-2 bg-indigo-500 rounded-t-md"></div>
          <div className="px-3 py-4">
            <label className="block font-semibold text-left">
               Title
            </label>
            <input
              type="text"
              placeholder="Username or file"
              className="mt-2 border hover:outline-none focus:outline-none w-full h-5 focus:ring-1 focus:ring-indigo-400 rounded-md px-4 py-5"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />

            <label className="block mt-2  font-semibold text-left">
             Vedio 
            </label>
            
             <input
                  type="file"
                  accept="vedio/*"
                  className="mt-2 border hover:outline-none focus:outline-none  focus:ring-1 focus:ring-indigo-400 rounded-md px-4 py-5"
                  onChange={handleFileChange}
                />
            <div className="flex justify-between items-baseline">
              <button
                type="submit"
                className="px-5 py-3 bg-indigo-500 mt-2 text-white rounded-md hover:bg-indigo-400"
              >
               Upload 
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
    <Footer/>
</>
  );
}
export default Uploadlectures;
