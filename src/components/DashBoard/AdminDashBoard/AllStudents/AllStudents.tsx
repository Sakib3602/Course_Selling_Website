import useAxiosPrivate from "@/url/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";

const AllStudents = () => {
  const axiosSec = useAxiosPrivate();
  const { data, isLoading } = useQuery({
    queryKey: ["all-students"],
    queryFn: async () => {
      const res = await axiosSec.get("/allStudents");
      return res.data;
    },
  });
  console.log("All Students Data:", data);

  const uniqueEmails : string[] = [];

  data?.forEach((item : { personalEmail: string }) => {
    if (!uniqueEmails.includes(item.personalEmail)) {
      uniqueEmails.push(item.personalEmail);
    }
  });

  console.log("Unique Emails:", uniqueEmails);

  if (isLoading) {
    return <div>Loading...</div>;
  }



  return (
    <div>
      <div>
        <h2 className="text-2xl font-semibold mb-4 px-10">All Students</h2>
      </div>
      <div className="flex flex-wrap gap-4 p-4 justify-center">
        {data.map((x) => (
          // THE CARD
          <div
            key={x?._id}
            className="w-64 bg-white rounded-lg shadow-md p-6 flex flex-col items-center border border-gray-200"
          >
            <img
              src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmRLRMXynnc7D6-xfdpeaoEUeon2FaU0XtPg&s'
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover mb-4 bg-gray-200"
            />
            <span className="text-gray-700 font-medium">{x.personEmail}</span>
            <span className="text-gray-700 font-medium">{x?.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllStudents;
