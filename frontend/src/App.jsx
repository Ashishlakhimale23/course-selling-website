import "./App.css";
import { Navigate,BrowserRouter as Router,Routes,Route} from "react-router-dom";
import  Signin  from "./components/signin";
import  Login  from "./components/login";
import  Home  from "./components/home";
import Courses from "./components/courses";
import UploadCourses from "./components/uploadcourses";
import Coursedetails from "./components/coursedetails";
import Purchased from "./components/purchasedcourse";
function App() {
  const authtoken = localStorage.getItem("authtoken")
  return(
    <>
    <Router>
      <Routes>
        
        <Route path="/" element={authtoken ?( <Navigate to="/home" replace /> ):(<Navigate to="/home" replace />)}></Route>
        <Route path="/signin" Component={Signin}/>
        <Route path="/login" Component={Login}/>
        <Route exact path="/home" Component={Home}/>    
        <Route path="/courses" Component={Courses}/>    
        <Route path="/uploadcourses" Component={UploadCourses}/>    
        <Route path="/coursedetails" Component={Coursedetails}/> 
        <Route path="/purchasedcourse" Component={Purchased}/> 

      </Routes>
    </Router>

    </>
    
  )
    }
export default App;
