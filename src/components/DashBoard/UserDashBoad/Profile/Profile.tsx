
import { Mail, Phone, MapPin,  } from "lucide-react";
import Dialog from "./Dialog";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  occupation?: string;
  image?: string;
  gender?: string;
}

export default function Profile() {
 
 const user :UserProfile = {
    id: "",
    name: "Your Name",
    email: "user@example.com",
    phone: "",
    address: "",
    occupation: "",
    gender: "",
    image:
      "https://st5.depositphotos.com/5183619/67992/v/450/depositphotos_679927214-stock-illustration-default-avatar-profile-placeholder-abstract.jpg",
  }
  
  return (
    <div className="poppins bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden">
      {/* Header: avatar + name + action */}
      <div className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
          {/* Left: Avatar + Basic */}
          <div className="flex items-start gap-4">
            <img
              src={
                user.image ||
                "https://st5.depositphotos.com/5183619/67992/v/450/depositphotos_679927214-stock-illustration-default-avatar-profile-placeholder-abstract.jpg"
              }
              alt={user.name}
              className="w-24 h-24 rounded-full border border-gray-200 object-cover bg-gray-50"
            />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Lionel Andrés Messi Cuccitini</h1>
              {user.occupation && (
                <p className="text-gray-600 mt-1">{user.occupation}</p>
              )}
            <p className="text-gray-600 mt-1">Gender : {user.gender || "Not provided"}</p>
            </div>
          </div>

          {/* Right: Edit button (desktop) */}
          <div className="hidden sm:block">
             <Dialog></Dialog>
          </div>
        </div>

        {/* Edit button (mobile) */}
        <div className="mt-4 sm:hidden">
          <Dialog></Dialog>
        </div>
      </div>

      {/* Contact Info */}
      <div className="px-6 sm:px-8 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Email */}
          <div className="flex items-start gap-3 p-4 border rounded-lg bg-gray-50">
            <Mail className="h-5 w-5 text-gray-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500">Email</p>
              <a
                href={`mailto:${user.email}`}
                className="text-gray-900 hover:underline break-all"
              >
                {user.email}
              </a>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-3 p-4 border rounded-lg bg-gray-50">
            <Phone className="h-5 w-5 text-gray-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500">Phone</p>
              {user.phone ? (
                <a href={`tel:${user.phone}`} className="text-gray-900 hover:underline">
                  {user.phone}
                </a>
              ) : (
                <span className="text-gray-500">Not provided</span>
              )}
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start gap-3 p-4 border rounded-lg bg-gray-50 sm:col-span-2">
            <MapPin className="h-5 w-5 text-gray-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500">Address</p>
              {user.address ? (
                <span className="text-gray-900">{user.address}</span>
              ) : (
                <span className="text-gray-500">Not provided</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
