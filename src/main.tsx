import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router";
import Details from "./components/Basic_Com/Details/Details.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./components/Authentication_Work/AuthProvider/AuthProvider.tsx";
import RegistrationForm from "./components/Authentication_Work/AuthProvider/Registration/RegistrationForm.tsx";
import { Login } from "./components/Authentication_Work/AuthProvider/Login/Login.tsx";
import Carts from "./components/Basic_Com/Carts/Carts.tsx";
import UserHomeDash from "./components/DashBoard/UserDashBoad/UserHomeDash.tsx";
import Profile from "./components/DashBoard/UserDashBoad/Profile/Profile.tsx";
import EnrolledCourses from "./components/DashBoard/UserDashBoad/EnrolledCourses/EnrolledCourses.tsx";
import Announcements from "./components/DashBoard/UserDashBoad/Announcements/Announcements.tsx";
import Tasks from "./components/DashBoard/UserDashBoad/Tasks/Tasks.tsx";
import Support from "./components/DashBoard/UserDashBoad/Support/Support.tsx";
import PrivateUserRoute from "./components/DashBoard/UserDashBoad/PrivateUserRoute/PrivateUserRoute.tsx";
import ProfileAdmin from "./components/DashBoard/AdminDashBoard/ProfileAdmin/ProfileAdmin.tsx";
import PrivateAdminroute from "./components/DashBoard/AdminDashBoard/PrivateAdminroute/PrivateAdminroute.tsx";
import ProfileA from "./components/DashBoard/AdminDashBoard/ProfieA/ProfileA.tsx";
import SupportReq from "./components/DashBoard/AdminDashBoard/SupportReq/SupportReq.tsx";
import Instractors from "./components/DashBoard/AdminDashBoard/Instractors/Instractors.tsx";
import Announcement from "./components/DashBoard/AdminDashBoard/Announcement/Announcement.tsx";
import AddCourse from "./components/DashBoard/AdminDashBoard/AddCourse/AddCourse.tsx";
import AllUsers from "./components/DashBoard/AdminDashBoard/AllUsers/AllUsers.tsx";
import PrimiumUsers from "./components/DashBoard/AdminDashBoard/PrimiumUsers/PrimiumUsers.tsx";
import AllStudents from "./components/DashBoard/AdminDashBoard/AllStudents/AllStudents.tsx";
import ManageCourses from "./components/DashBoard/AdminDashBoard/ManageCourses/ManageCourses.tsx";
import UpdateCourse from "./components/DashBoard/AdminDashBoard/ManageCourses/UpdateCourse.tsx";
import AllProduct from "./components/Basic_Com/ALLPRODUCT/AllProduct.tsx";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/d/:id" element={<Details />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<Login></Login>} />
          <Route path="/carts" element={<Carts></Carts>} />
          <Route path="/allproducts" element={<AllProduct />} />
        </Routes>
        {/* User Work */}
        <Routes>
          <Route path="/dashboard" element={<PrivateUserRoute><UserHomeDash /></PrivateUserRoute>}>
            <Route index element={<Profile />} />
            <Route path="/dashboard/courses" element={<EnrolledCourses />} />
            <Route path="/dashboard/announcements" element={<Announcements></Announcements>} />
            <Route path="/dashboard/tasks" element={<Tasks></Tasks>} />
              <Route path="/dashboard/helpdesk" element={<Support></Support>} />

            {/* <Route path="/dashboard/profile" element={<Profile />} /> */}
          </Route>
        </Routes>
        {/* User Work */}
        {/* Admin Work */}
        <Routes>
          <Route path="/admin/dashboard" element={<PrivateAdminroute><ProfileAdmin></ProfileAdmin></PrivateAdminroute>}>
            <Route index element={<ProfileA></ProfileA>} />
            <Route path="/admin/dashboard/supportreq" element={<SupportReq></SupportReq>} />
            <Route path="/admin/dashboard/ins" element={<Instractors></Instractors>} />
            <Route path="/admin/dashboard/anc" element={<Announcement></Announcement>} />
            <Route path="/admin/dashboard/addcourse" element={<AddCourse></AddCourse>} />
            <Route path="/admin/dashboard/allusers" element={<AllUsers></AllUsers>} />
            <Route path="/admin/dashboard/pusers" element={<PrimiumUsers></PrimiumUsers>} />
            <Route path="/admin/dashboard/students" element={<AllStudents></AllStudents>} />
            <Route path="/admin/dashboard/CourseAll" element={<ManageCourses></ManageCourses>} />
            <Route path="/admin/dashboard/updateCourse" element={<UpdateCourse></UpdateCourse>} />
          </Route>
        </Routes>

        {/* Admin Work */}
      </AuthProvider>
    </BrowserRouter>
    ,
  </QueryClientProvider>
);
