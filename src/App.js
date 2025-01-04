import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./Components/common/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import Aboutus from "./pages/Aboutus";
import ContactUs from "./pages/ContactUs";
import MyProfile from "./Components/common/MyProfile";
import Sidebar from "./Components/common/Sidebar";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./pages/PrivateRoute";
import Profileerror from "./pages/Profileerror";

import ChangeProfilePicture from "./Components/Settings/ChangeProfilePicture";
import Settingitems from "./Components/Settings/Settingitems";
import EnrolledCourses from "./Components/common/EnrolledCourses";
import Cart from "./Components/common/Cart";
import {ACCOUNT_TYPE} from "./utils/constants"
import { useSelector } from "react-redux";
import AddCourse from "./Components/common/Addcourse";
import Catalog from "./pages/Catalog";
import CourseDetail from "./pages/CourseDetail";
function App() {
  const {user}= useSelector((state)=>state.profile)
  const token= useSelector((state)=>state.auth);
  const course= useSelector((state)=>state.course);
  return (
    <div
      className="w-screen min-h-screen bg-richBlack-900 flex flex-col font-inter text-white"
    >
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="catalog/:catalogName" element={<Catalog></Catalog>}></Route>
        <Route path="courses/:courseId" element={<CourseDetail

        
        
        ></CourseDetail>}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/update-password/:token" element={<UpdatePassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/contact" element={<ContactUs />} />

        {/* Private Routes */}
        <Route
          path="/dashboard/*"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          {/* Nested Dashboard Routes */}
          <Route path="my-profile" element={<MyProfile />} />
          <Route path="Settings" element={<Settingitems></Settingitems>} />
        </Route>
        

       {
        user?.accountType=== ACCOUNT_TYPE.STUDENT && (
          <>
          <Route path="dashboard/enrolled-courses" element={<EnrolledCourses></EnrolledCourses>}></Route>
        <Route path="dashboard/Cart" element={<Cart></Cart>}></Route>
       
          </>
        )
       }
       {
        user?.accountType===ACCOUNT_TYPE.INSTRUCTOR && (
          <>
          <Route path="dashboard/add-course" element={<AddCourse></AddCourse>}></Route>
          </>
        )
       }

        {/* Fallback Route */}
        <Route path="*" element={<Profileerror />} />
      </Routes>
    </div>
  );
}

export default App;
