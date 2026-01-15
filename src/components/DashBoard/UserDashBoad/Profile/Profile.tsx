import { Mail, Phone, MapPin, Briefcase, User } from "lucide-react";
import Dialog from "./Dialog";
import useAxiosPublic from "@/url/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "@/components/Authentication_Work/AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  occupation?: string;
  image?: string;
  gender?: string;
  joinDate?: string;
}

export default function Profile() {

  const axiosPub = useAxiosPublic()

  const auth = useContext(AuthContext)
  if (!auth) {
    throw new Error("AuthContext is undefined");
  }
  const { person } = auth;

  const {data} = useQuery({
    queryKey : ['user-profile', person?.email],
    queryFn : async()=>{
      const res = await axiosPub.get(`userP/${person?.email}`);
      return res.data;
    }
  })




  const user: UserProfile = {
    id: "1",
    name: data?.name ?? "Lionel Andrés Messi Cuccitini",
    email: data?.email ?? "leomessi@intermiami.com",
    phone: data?.phone ?? "+1 (305) 555-0123",
    address: data?.address ?? "123 Ocean Drive, Miami, FL 33139",
    occupation: "Student of Edupro Academy",
    gender: "Active",

    image:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 font-sans">
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200 overflow-hidden border border-slate-100">
        
        {/* --- Cover Header --- */}
        <div className="h-32 md:h-48 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative">
           {/* You could add a real cover image here if available */}
           <div className="absolute inset-0 bg-black/10"></div>
        </div>

        {/* --- Profile Header Section --- */}
        <div className="px-6 md:px-10 pb-8 relative">
          
          <div className="flex flex-col md:flex-row items-start justify-between gap-4">
            
            {/* Avatar & Info Wrapper */}
            <div className="flex flex-col md:flex-row items-center md:items-end -mt-12 md:-mt-16 gap-6 w-full">
              
              {/* Avatar Image with White Border */}
              <div className="relative group">
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full border-[6px] border-white shadow-lg object-cover bg-white"
                />
                <span className="absolute bottom-4 right-4 bg-green-500 w-5 h-5 border-4 border-white rounded-full"></span>
              </div>

              {/* Name & Basic Meta */}
              <div className="text-center md:text-left flex-1 mb-2">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
                  {user.name}
                </h1>
                
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-y-2 gap-x-4 mt-2 text-slate-600 text-sm font-medium">
                  {user.occupation && (
                    <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-full">
                      <Briefcase className="w-4 h-4 text-slate-500" />
                      {user.occupation}
                    </span>
                  )}
                  {user.gender && (
                    <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-full">
                      <User className="w-4 h-4 text-slate-500" />
                      {user.gender}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Button (Desktop Position) */}
              <div className="hidden md:block mb-4">
                <Dialog />
              </div>
            </div>
          </div>

          {/* Action Button (Mobile Position) */}
          <div className="md:hidden mt-6 w-full">
            <Dialog />
          </div>

          <hr className="my-8 border-slate-200" />

          {/* --- Detailed Info Grid --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Email Card */}
            <div className="group flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/50 transition-all duration-300">
              <div className="p-3 bg-white rounded-xl shadow-sm text-indigo-600 group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                  Email Address
                </p>
                <a href={`mailto:${user.email}`} className="text-slate-900 font-medium truncate block hover:text-indigo-600 transition-colors">
                  {user.email}
                </a>
              </div>
            </div>

            {/* Phone Card */}
            <div className="group flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/50 transition-all duration-300">
              <div className="p-3 bg-white rounded-xl shadow-sm text-emerald-600 group-hover:scale-110 transition-transform">
                <Phone className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                  Phone Number
                </p>
                {user.phone ? (
                  <a href={`tel:${user.phone}`} className="text-slate-900 font-medium hover:text-emerald-600 transition-colors">
                    {user.phone}
                  </a>
                ) : (
                  <span className="text-slate-400 italic">Not provided</span>
                )}
              </div>
            </div>

            {/* Address Card (Full Width on Desktop if needed, currently half) */}
            <div className="group flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-purple-200 hover:bg-purple-50/50 transition-all duration-300 md:col-span-2">
              <div className="p-3 bg-white rounded-xl shadow-sm text-purple-600 group-hover:scale-110 transition-transform">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                  Location
                </p>
                <span className="text-slate-900 font-medium">
                  {user.address || <span className="text-slate-400 italic">Not provided</span>}
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}