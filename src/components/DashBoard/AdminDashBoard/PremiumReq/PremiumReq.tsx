import React, { useState } from "react";
import { Calendar, Clock, Mail, Check, Trash2 } from "lucide-react";
import useAxiosPrivate from "@/url/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";

const PremiumReq = () => {
  const axiosPrivate = useAxiosPrivate()
  const {data, refetch , isLoading} = useQuery({
    queryKey: ['premium-requests'],
    queryFn: async () => {
      const response = await axiosPrivate.get('/setMeetings');
      return response.data;
    },
  })
  console.log(data)
  const [requests, setRequests] = useState([
    {
      id: 1,
      name: "John Doe",
      topic: "Project Alpha",
      agenda: "Discuss Q1 Goals",
      reqTime: "2023-10-27 09:00 AM",
      fixDate: "2023-10-30",
      fixTime: "14:00",
      email: "john.doe@example.com",
      status: "pending",
    },
    {
      id: 2,
      name: "Jane Smith",
      topic: "Budget Review",
      agenda: "Approve Q4 Budget",
      reqTime: "2023-10-27 10:30 AM",
      fixDate: "2023-11-01",
      fixTime: "11:00",
      email: "jane.smith@example.com",
      status: "pending",
    },
  ]);

  const handleAccept = (id) => {
    setRequests(
      requests.map((req) =>
        req.id === id ? { ...req, status: "accepted" } : req
      )
    );
  };

  const handleDelete = (id) => {
    setRequests(requests.filter((req) => req.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Calendar className="w-8 h-8 text-black" />
              Meeting Schedule Manager
            </h1>
            <p className="text-gray-500 mt-1">
              Track and manage incoming meeting requests
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-4">
            <div className="text-center px-4 py-2 bg-blue-50 rounded-lg">
              <span className="block text-2xl font-bold text-blue-600">
                {data?.filter((r) => r.ReplyTime === null).length}
              </span>
              <span className="text-xs text-blue-600 font-medium uppercase tracking-wider">
                Pending
              </span>
            </div>
            <div className="text-center px-4 py-2 bg-green-50 rounded-lg">
              <span className="block text-2xl font-bold text-green-600">
                {data?.filter((r) => r.ReplyTime !== null).length}
              </span>
              <span className="text-xs text-green-600 font-medium uppercase tracking-wider">
                Accepted
              </span>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                  <th className="px-6 py-4">Requester</th>
                  <th className="px-6 py-4">Details</th>
                  <th className="px-6 py-4">Schedule</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data?.length === 0 ? (
                  <tr>
                    <td className="px-6 py-12 text-center text-gray-400">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Calendar className="w-12 h-12 opacity-20" />
                        <p>No meeting requests found</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  data?.map((req) => (
                    <tr
                      key={req.id}
                      className="hover:bg-gray-50/50 transition-colors group"
                    >
                      <td className="px-6 py-4 align-top">
                        <div className="flex items-center gap-3">
                          
                          <div>
                            
                            <div className="text-sm text-gray-500 flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {req.email}
                            </div>
                            <div className="text-xs text-gray-400 mt-1">
                              Req: {req.meetingReqTime}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 align-top">
                        <div className="space-y-1">
                          <div className="font-medium text-gray-900">
                            {req.topic}
                          </div>
                          <p className="text-sm text-gray-600 line-clamp-2 max-w-xs">
                            {req.agenda}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 align-top whitespace-nowrap">
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-2 text-gray-700">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            {req.date}
                          </div>
                          <div className="flex items-center gap-2 text-gray-700">
                            <Clock className="w-4 h-4 text-gray-400" />
                            {req.time}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 align-top">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                          ${
                            req.ReplyTime !== null
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                            {req.ReplyTime !== null ? "accepted" : "pending"}
                        </span>
                      </td>
                      <td className="px-6 py-4 align-top text-right">
                        <div className="flex flex-col gap-2 items-end">
                          {req.ReplyTime === null ? (
                            <button
                              onClick={() => handleAccept(req.id)}
                              className="w-full sm:w-auto bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm hover:shadow active:scale-95 flex items-center justify-center gap-2"
                            >
                              <Check className="w-4 h-4" />
                              Accept Request
                            </button>
                          ) : (
                            <button
                              disabled
                              className="w-full sm:w-auto bg-gray-100 text-gray-400 px-4 py-2 rounded-lg text-sm font-medium cursor-not-allowed flex items-center justify-center gap-2"
                            >
                              <Check className="w-4 h-4" />
                              Accepted
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(req.id)}
                            className="text-xs text-red-500 hover:text-red-700 hover:underline flex items-center gap-1 ml-auto"
                          >
                            <Trash2 className="w-3 h-3" />
                            Remove
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumReq;
