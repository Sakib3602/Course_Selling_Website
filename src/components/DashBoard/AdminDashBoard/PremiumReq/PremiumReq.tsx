
import { Calendar, Clock, Mail, Check} from "lucide-react";
import useAxiosPrivate from "@/url/useAxiosPrivate";
import { useMutation, useQuery } from "@tanstack/react-query";
import moment from "moment";

interface MeetingRequest {
  id: string;
  _id: string;
  email: string;
  meetingReqTime: string;
  topic: string;
  agenda: string;
  date: string;
  time: string;
  ReplyTime: string | null;
}

const PremiumReq = () => {
  const axiosPrivate = useAxiosPrivate();
  const { data, refetch, isLoading } = useQuery<MeetingRequest[]>({
    queryKey: ["premium-requests"],
    queryFn: async () => {
      const response = await axiosPrivate.get("/setMeetings");
      return response.data;
    },
  });
  

  const fil = data?.filter((x)=> x?.ReplyTime === null)

  const handleAccept = (id: string) => {
    console.log("Accepting request with id:", id);

    const updatePayload = {
      ReplyTime: moment().format('MMMM Do YYYY, h:mm:ss a')
    };

    mutationfk.mutate({ id, ReplyTime: updatePayload.ReplyTime });
  };

  const mutationfk = useMutation({
    mutationFn: async ({ id, ReplyTime }: { id: string; ReplyTime: string }) => {
      const resp = await axiosPrivate.put(`/setMeetings/${id}`, { ReplyTime });
      return resp.data;
    },
    onSuccess: () => {
        refetch()
      alert("hoise");
    }
  });

  

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto space-y-8 animate-pulse">
        {/* Header Skeleton */}
        <div className="flex flex-col md:flex-row md:items-center justify-between bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div>
            {/* Title Placeholder */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-200 rounded-md"></div>
              <div className="h-8 w-64 bg-gray-200 rounded-md"></div>
            </div>
            {/* Subtitle Placeholder */}
            <div className="mt-2 h-4 w-48 bg-gray-200 rounded"></div>
          </div>

          {/* Stats Cards Placeholder */}
          <div className="mt-4 md:mt-0 flex gap-4">
            <div className="h-[72px] w-28 bg-gray-200 rounded-lg"></div>
            <div className="h-[72px] w-28 bg-gray-200 rounded-lg"></div>
          </div>
        </div>

        {/* Table Skeleton */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  {["Requester", "Details", "Schedule", "Status", "Action"].map(
                    (_, i) => (
                      <th key={i} className="px-6 py-4">
                        <div className="h-4 w-20 bg-gray-200 rounded"></div>
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {/* Generates 5 skeleton rows */}
                {[...Array(5)].map((_, index) => (
                  <tr key={index}>
                    {/* Requester Column */}
                    <td className="px-6 py-4 align-top">
                      <div className="flex items-center gap-3">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                            <div className="h-3 w-32 bg-gray-200 rounded"></div>
                          </div>
                          <div className="h-2 w-24 bg-gray-200 rounded ml-5"></div>
                        </div>
                      </div>
                    </td>

                    {/* Details Column */}
                    <td className="px-6 py-4 align-top w-1/3">
                      <div className="space-y-2">
                        <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                        <div className="h-3 w-full bg-gray-200 rounded"></div>
                      </div>
                    </td>

                    {/* Schedule Column */}
                    <td className="px-6 py-4 align-top">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-gray-200 rounded"></div>
                          <div className="h-3 w-24 bg-gray-200 rounded"></div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-gray-200 rounded"></div>
                          <div className="h-3 w-16 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                    </td>

                    {/* Status Column */}
                    <td className="px-6 py-4 align-top">
                      <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
                    </td>

                    {/* Action Column */}
                    <td className="px-6 py-4 align-top text-right">
                      <div className="flex flex-col gap-2 items-end">
                        <div className="h-9 w-32 bg-gray-200 rounded-lg"></div>
                        <div className="h-3 w-16 bg-gray-200 rounded mt-1"></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

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
                {fil?.length === 0 ? (
                  <tr>
                    <td className="px-6 py-12 text-center text-gray-400">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Calendar className="w-12 h-12 opacity-20" />
                        <p>No meeting requests found</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  fil?.map((req: MeetingRequest) => (
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
                              onClick={() => handleAccept(req._id)}
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
