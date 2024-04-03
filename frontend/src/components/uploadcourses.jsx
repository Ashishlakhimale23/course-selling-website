import Header from "./header"
import Footer from "./footer"
import { useState,useCallback } from "react";
import axios from "axios";



function UploadCourses(){
    const [title,setTitle] = useState("")   
    const [description,setDescription] = useState("")
    const [price,setPrice] = useState("")
    const [file, setFile] = useState(null);
    const [syllabus,setSyllabus] = useState("")
   
    
const triggerhandel = useCallback(async () => {
     const auth = axios.defaults.headers.common['Authorization'];
console.log(auth)
const Token = auth.split(' ')[1]; 
delete axios.defaults.headers.common["Authorization"];
    try {
        if (!file) {
            return null;
        }
        const formData = new FormData();
         formData.append("file", file);
         formData.append("tags", "coursefiles");
         formData.append("upload_preset", "coursefiles"); 
         formData.append("api_key", "993344952783557"); 
         console.log(formData)
         
        console.log(file)
        const response = await axios.post("https://api.cloudinary.com/v1_1/ddweepkue/image/upload",formData) 
        console.log(response.data.secure_url)     
     
axios.defaults.headers.common["Authorization"] = `Bearer ${Token}`

                console.log("header set ")
        const res = await axios.post("http://localhost:8000/user/course", {
            title,
            description,
            syllabus,
            price,
            fileurl:response.data.secure_url
        });

        console.log(res.data);
        const keys = Object.keys(res.data);
        if (!keys.includes("task")) {
            setTitle("");
            setDescription("");
            setPrice("");
            setFile(null);
            setSyllabus("");
           

        } else {
            setTitle("");
            setDescription("");
            setPrice("");
            setFile(null);
            setSyllabus("")
           

        }
    } catch (err) {
        console.error(err);
    }

}, [description, price, file, title]);

  const handleFileChange = (event) => {
    console.log(event.target.files[0]);
    setFile(event.target.files[0]);
  };
  const handelsubmit = useCallback(
    (e) => {
      e.preventDefault();
    triggerhandel();
    },
    [triggerhandel],
  );
    return (
      <>
        <Header></Header>
        
        <div className="min-h-screen  flex justify-center items-center   ">
          <form
            action=""
            className=" relative sm:w-96 mx-auto text-center"
            onSubmit={handelsubmit}
          >
            <label htmlFor="" className="text-2xl font-light">
              Enter the details
            </label>
            <div className="mt-4 bg-white shadow-md rounded-lg">
              <div className="h-2 bg-indigo-500 rounded-t-md"></div>
              <div className="px-3 py-4">
                <label className="block font-semibold text-left">Title</label>
                <input
                  type="text"
                  placeholder="Title"
                  className="mt-2 border hover:outline-none focus:outline-none w-full h-5 focus:ring-1 focus:ring-indigo-400 rounded-md px-4 py-5"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
                <label className="block font-semibold text-left">
                  Description
                </label>
                <textarea
                  name=""
                  id=""
                  cols="10"
                  rows="3"
                  placeholder="Description"
                  className="mt-2 border hover:outline-none focus:outline-none w-full  focus:ring-1 focus:ring-indigo-400 rounded-md px-4 py-5"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                ></textarea>
<label className="block font-semibold text-left">
                Syllabus 
                </label>
                <textarea
                  name=""
                  id=""
                  cols="10"
                  rows="3"
                  placeholder="syllabus"
                  className="mt-2 border hover:outline-none focus:outline-none w-full  focus:ring-1 focus:ring-indigo-400 rounded-md px-4 py-5"
                  value={syllabus}
                  onChange={(e) => {
                    setSyllabus(e.target.value);
                  }}
                ></textarea>
                <label className="block font-semibold text-left">Price</label>

                <input
                  type="text"
                  placeholder="Price"
                  className="mt-2 border hover:outline-none focus:outline-none w-full h-5 focus:ring-1 focus:ring-indigo-400 rounded-md px-4 py-5"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
                <label className="block font-semibold text-left">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  className="mt-2 border hover:outline-none focus:outline-none  focus:ring-1 focus:ring-indigo-400 rounded-md px-4 py-5"
                  onChange={handleFileChange}
                />

                <button
                  type="submit"
                  className="px-5 py-3 bg-indigo-500 mt-2 text-white rounded-md hover:bg-indigo-400 flex"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>

        <Footer></Footer>
      </>
    );
}
export default UploadCourses;