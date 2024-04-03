import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import joi from "joi"
import axios from "axios";
function Signin() {
  const schema = joi.object({
    username:joi.string(),
    email: joi.string().email({minDomainSegments:2,tlds:{allow:["com","net"]}}),
    password:joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    })
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
const [isOpen, setIsOpen] = useState(false);
  const triggerhandel = useCallback(async () => {
    await axios
      .post("http://localhost:8000/user/signin", {
        email,
        password,
        username,
              })
      .then((res) => {
        console.log(res.data);
        const response = Object.keys(res.data);
        if (!response.includes("created")) {
          setEmail("");
          setPassword("");
          setUsername("");
          alert("validation error");
          navigate("/signin");
        } else {
          setEmail("");
          setPassword("");
          setUsername("");
          navigate("/login");
        }
      })
      .catch((error) => console.log(error));
  }, [password, username]);

  const handelsubmit = useCallback(
    (e) => {
      e.preventDefault();
     const valid = schema.validate({username:username,email:email,password:password})
     if(valid.error){
         setEmail("");
          setPassword("");
          setUsername("");
          console.log(valid.error)
      return
     }
     else{
     triggerhandel();
     }
    },
    [triggerhandel],
  );

  return (
    <div className="min-h-screen flex flex-col justify-center">
      <form
        action=""
        className=" relative sm:w-96 mx-auto text-center"
        onSubmit={handelsubmit}
      >
        <label className="text-2xl font-light">Login to your account</label>
        <div className="mt-4 bg-white shadow-md rounded-lg">
          <div className="h-2 bg-indigo-500 rounded-t-md"></div>
          <div className="px-3 py-4">
            <label className="block font-semibold text-left">Email</label>
            <input
              type="email"
              placeholder="email"
              className="mt-2 border hover:outline-none focus:outline-none w-full h-5 focus:ring-1 focus:ring-indigo-400 rounded-md px-4 py-5"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="block font-semibold text-left">Username</label>
            <input
              type="text"
              placeholder="Username"
              className="mt-2 border hover:outline-none focus:outline-none w-full h-5 focus:ring-1 focus:ring-indigo-400 rounded-md px-4 py-5"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label className="block mt-2 font-semibold text-left">
              Password
            </label>
            <input
            type="password"
                           placeholder="Password"
              className="mt-2 border hover:outline-none focus:outline-none w-full h-5 focus:ring-1 focus:ring-indigo-400 rounded-md px-4 py-5 mb-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
      
                         <div className="flex justify-between items-baseline">
              <button
                type="submit"
                className="px-5 py-3 bg-indigo-500 mt-2 text-white rounded-md hover:bg-indigo-400"
              >
                Signin
              </button>
              <a href="/login" className="font font-semibold">
                login
              </a>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
export default Signin;
