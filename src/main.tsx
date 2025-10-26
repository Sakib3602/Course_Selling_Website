import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router";
import Details from "./components/Basic_Com/Details/Details.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./components/Authentication_Work/AuthProvider/AuthProvider.tsx";
import RegistrationForm from "./components/Authentication_Work/AuthProvider/Registration/RegistrationForm.tsx";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/d/:id" element={<Details />} />
          <Route path="/register" element={<RegistrationForm />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
    ,
  </QueryClientProvider>
);
