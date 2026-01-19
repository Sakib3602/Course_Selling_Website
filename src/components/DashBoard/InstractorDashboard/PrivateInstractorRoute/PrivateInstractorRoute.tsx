import { AuthContext } from "@/components/Authentication_Work/AuthProvider/AuthProvider";
import { useContext } from "react";
import { Navigate } from "react-router";

const PrivateInstractorRoute = ({ children }: { children: React.ReactNode }) => {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("AuthContext is not available");
  }
  //   const Navigate = useNavigate();
  const { person, loading } = auth;
  if (loading) {
    return (
      <div className="flex flex-row gap-2">
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
      </div>
    );
  }
  if (!person) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default PrivateInstractorRoute;
