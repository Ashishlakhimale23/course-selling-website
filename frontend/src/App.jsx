import "./App.css";
import { Navigate,BrowserRouter as Router,Routes,Route} from "react-router-dom";
import { useEffect, useState } from "react";
import  Signin  from "./components/signin";
import  Login  from "./components/login";
import  Home  from "./components/home";
import UploadCourses from "./components/uploadcourses";
import Coursedetails from "./components/coursedetails";
import Purchased from "./components/purchasedcourse";
import Uploadlectures from "./components/uploadlectures";
import Coursecontent from "./components/coursecontent";

function App() {
  const authtoken = localStorage.getItem("authtoken");

  return (
    <>
    
    <Router>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={authtoken ? <Navigate to="/home" /> : <Navigate to="/login" />}
        />
        <Route path="/home" element={<Home />} />
        <Route path="/uploadcourses" element={<UploadCourses />} />
        <Route path="/coursedetails" element={<Coursedetails />} />
        <Route path="/purchasedcourse" element={<Purchased />} />
        <Route path="/uploadlectures" element={<Uploadlectures />} />
<Route path="/coursecontent" element={<Coursecontent />} />

      </Routes>
    </Router>

        
</>
  );
} 
export default App;
