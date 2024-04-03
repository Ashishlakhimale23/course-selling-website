import  { useState } from 'react';
import { NavLink,useNavigate} from 'react-router-dom';

function Header({isAdmin}) {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  return (
    <>
      <div className="lg:hidden z-10" >
        <nav
          className={`absolute inset-0 transform lg:transform-none lg:opacity-100 duration-200 lg:relative z-10 w-80 bg-white text-white h-screen p-3 shadow-md ${
            open ? 'translate-x-0  ease-in opacity-100' : '-translate-x-full ease-out opacity-0'
          }`}
        >
          <div className="flex justify-between">
            <span className="font-bold text-2xl sm:text-3xl p-2 text-black">Sidebar</span>
            <button
              className="p-2 focus:outline-none  rounded-md lg:hidden"
              onClick={() => setOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
          <ul className="mt-8 ">
            <li >
            <NavLink
              to="/home"
              className={({isActive}) => 
                ` hover:text-orange-600 ${isActive ? "text-orange-700" : "text-black"} block px-4 py-2`
              }
            >Home
            </NavLink>
            
            <NavLink
              to="/uploadcourses"
              className={({isActive}  ) => 
                ` hover:text-orange-600 ${isActive ? "text-orange-700" : "text-black"}  px-4 py-2 `}
             style={{ display: isAdmin ? 'block' : 'none' }}
            >
             UploadCourses 
            </NavLink>
            <NavLink
              to="/purchasedcourse"
              className={({isActive}  ) => 
                ` hover:text-orange-600 ${isActive ? "text-orange-700" : "text-black"}  block px-4 py-2`
              }
            >
             Purchasedcourse 
            </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className="relative z-0 lg:flex-grow">
        <header className="flex bg-white text-white items-center px-3 shadow-md h-16 justify-between">
          <button
            className="p-2 focus:outline-none  rounded-md lg:hidden"
            onClick={() => setOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="text-xl font-bold flex items-center pl-3 ">
            <span className='text-black'>Get</span>
            <span className="text-orange-600">better</span>
            <span className="text-gray-400">*</span>
          </div>
          <div className="lg:w-1/4 space-x-2  lg:flex justify-between items-center hidden  ">
            <NavLink
              to="/home"
              className={({isActive}) => 
                ` hover:text-orange-600 ${isActive ? "text-orange-600" : "text-black"}`
              }
            >
              Home
            </NavLink>
           
            <NavLink
              to="/uploadcourses"
              className={({isActive}  ) => 
                ` hover:text-orange-600 ${isActive ? "text-orange-700" : "text-black"}`}
                style={{visibility : isAdmin ? "visible" : 'hidden'}}
                

              
            >
             UploadCourses 
            </NavLink>
            <NavLink
              to="/purchasedcourse"
              className={({isActive}  ) => 
                ` hover:text-orange-600 ${isActive ? "text-orange-700" : "text-black"}`
              }
            >
             Purchasedcourse 
            </NavLink>
          </div>
          <div className="space-x-2 pr-9  ">
            <button className="text-white bg-orange-600 p-2 rounded-lg" onClick={()=>{
                localStorage.removeItem("authtoken")
                navigate("/login")
            }}>
             Logout 
            </button>
          </div>
        </header>
      </div>
    </>
  );
}

export default Header;
