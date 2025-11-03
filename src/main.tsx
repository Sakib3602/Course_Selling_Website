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
      </AuthProvider>
    </BrowserRouter>
    ,
  </QueryClientProvider>
);
