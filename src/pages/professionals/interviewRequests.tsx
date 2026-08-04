// import React, { useEffect, useState } from "react";
// import { Calendar, User, Check, X } from "lucide-react";

// const InterviewRequest = () => {
//   const [requests, setRequests] = useState([]);
//   const [selectedStudent, setSelectedStudent] = useState(null); // For modal

//   const professionalName = "Sarah Williams";

//   useEffect(() => {
//     const dummyData = [
//   {
//     id: 1,
//     studentName: "John Doe",
//     professionalName: "Sarah Williams",
//     sessionTopic: "Mock Technical Interview",
//     profile: {
//       email: "john@example.com",
//       phone: "082-123-4567",
//       cv: "Link to CV.pdf",
//       bio: "Computer Science student with 2 years of internship experience.",
//       image: "https://randomuser.me/api/portraits/men/32.jpg",
//     },
//   },
//   {
//     id: 2,
//     studentName: "Emily Ncube",
//     professionalName: "David Moyo",
//     sessionTopic: "Behavioral Interview Prep",
//     profile: {
//       email: "emily@example.com",
//       phone: "083-987-6543",
//       cv: "Link to CV.pdf",
//       bio: "Final-year IT student with strong communication skills.",
//       image: "https://randomuser.me/api/portraits/women/44.jpg",
//     },
//   },
//   {
//     id: 3,
//     studentName: "Michael Johnson",
//     professionalName: "Sarah Williams",
//     sessionTopic: "Career Growth Discussion",
//     profile: {
//       email: "michael@example.com",
//       phone: "084-456-7890",
//       cv: "Link to CV.pdf",
//       bio: "Software Engineering student interested in web development.",
//       image: "https://randomuser.me/api/portraits/men/56.jpg",
//     },
//   },
//   {
//     id: 4,
//     studentName: "Sipho Dlamini",
//     professionalName: "Sarah Williams",
//     sessionTopic: "Software Engineering Interview",
//     profile: {
//       email: "sipho@example.com",
//       phone: "081-234-5678",
//       cv: "Link to CV.pdf",
//       bio: "IT student passionate about AI and machine learning.",
//       image: "https://randomuser.me/api/portraits/men/78.jpg",
//     },
//   },
// ];


//     setRequests(dummyData.filter((r) => r.professionalName === professionalName));
//   }, []);

//   const handleAccept = (id) => alert(`Interview request ${id} accepted!`);
//   const handleReject = (id) => {
//     if (!window.confirm("Are you sure you want to reject this request?")) return;
//     setRequests((prev) => prev.filter((r) => r.id !== id));
//   };

//   return (
//     <section className="p-6 bg-gray-50 dark:bg-slate-900 min-h-screen">
//       <div className="mb-6 flex items-center gap-2">
//         <Calendar className="w-6 h-6 text-blue-500" />
//         <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
//           Interview Requests
//         </h2>
//       </div>

//       {requests.length === 0 ? (
//         <div className="text-center text-gray-600 dark:text-gray-300 text-sm">
//           No interview requests found.
//         </div>
//       ) : (
//         <div className="overflow-x-auto bg-white dark:bg-slate-800 shadow rounded-xl border border-gray-200 dark:border-slate-700">
//           <table className="w-full border-collapse">
//             <thead className="bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200">
//               <tr>
//                 <th className="py-3 px-4 text-left">#</th>
//                 <th className="py-3 px-4 text-left">Student</th>
//                 <th className="py-3 px-4 text-left">Topic</th>
//                 <th className="py-3 px-4 text-left">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {requests.map((request, index) => (
//                 <tr
//                   key={request.id}
//                   className="border-b dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/40 transition cursor-pointer"
//                   onClick={() => setSelectedStudent(request)}
//                 >
//                   <td className="py-4 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
//                     {index + 1}
//                   </td>

//                   <td className="py-4 px-4">
//                     <div className="flex items-center gap-2 bg-gray-100 dark:bg-slate-700 p-2 rounded-lg">
//                       <User className="w-4 h-4 text-blue-500" />
//                       <span className="text-sm text-gray-800 dark:text-gray-200">
//                         {request.studentName}
//                       </span>
//                     </div>
//                   </td>

//                   <td className="py-4 px-4 text-sm text-gray-700 dark:text-gray-300">
//                     {request.sessionTopic}
//                   </td>

//                   <td className="py-4 px-4 flex items-center gap-3">
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handleAccept(request.id);
//                       }}
//                       className="flex items-center gap-1 text-white bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 px-3 py-1 rounded-lg text-sm font-medium transition"
//                     >
//                       <Check className="w-4 h-4" /> Accept
//                     </button>
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handleReject(request.id);
//                       }}
//                       className="flex items-center gap-1 text-white bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 px-3 py-1 rounded-lg text-sm font-medium transition"
//                     >
//                       <X className="w-4 h-4" /> Reject
//                     </button>
//                   </td>

//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Modal */}
//       {selectedStudent && (
//   <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//     <div className="bg-white dark:bg-slate-800 rounded-xl p-6 max-w-md w-full relative">
//       <button
//         onClick={() => setSelectedStudent(null)}
//         className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
//       >
//         X
//       </button>

//       {/* Student Image */}
//       <div className="flex justify-center mb-4">
//         <img
//           src={selectedStudent.profile.image} // image URL
//           alt={selectedStudent.studentName}
//           className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600"
//         />
//       </div>

//       <h3 className="text-xl font-bold mb-2 text-center">{selectedStudent.studentName}</h3>

//       <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
//         <strong>Email:</strong> {selectedStudent.profile.email}
//       </p>
//       <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
//         <strong>Phone:</strong> {selectedStudent.profile.phone}
//       </p>
//       <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
//         <strong>Bio:</strong> {selectedStudent.profile.bio}
//       </p>
//       <p className="text-sm text-blue-500 hover:underline">
//         <strong>CV:</strong> {selectedStudent.profile.cv}
//       </p>
//     </div>
//   </div>
// )}

//     </section>
//   );
// };

// export default InterviewRequest;






import React, { useEffect, useState } from "react";
import { Calendar, User, Check, X } from "lucide-react";

interface StudentProfile {
  email: string;
  phone: string;
  cv: string;
  bio: string;
  image: string;
}

interface InterviewRequestType {
  id: number;
  studentName: string;
  professionalName: string;
  sessionTopic: string;
  profile: StudentProfile;
}

const InterviewRequest = () => {
  const [requests, setRequests] = useState<InterviewRequestType[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<InterviewRequestType | null>(null); // For modal

  const professionalName = "Sarah Williams";

  useEffect(() => {
    const dummyData: InterviewRequestType[] = [
      {
        id: 1,
        studentName: "John Doe",
        professionalName: "Sarah Williams",
        sessionTopic: "Mock Technical Interview",
        profile: {
          email: "john@example.com",
          phone: "082-123-4567",
          cv: "Link to CV.pdf",
          bio: "Computer Science student with 2 years of internship experience.",
          image: "https://randomuser.me/api/portraits/men/32.jpg",
        },
      },
      {
        id: 2,
        studentName: "Emily Ncube",
        professionalName: "David Moyo",
        sessionTopic: "Behavioral Interview Prep",
        profile: {
          email: "emily@example.com",
          phone: "083-987-6543",
          cv: "Link to CV.pdf",
          bio: "Final-year IT student with strong communication skills.",
          image: "https://randomuser.me/api/portraits/women/44.jpg",
        },
      },
      {
        id: 3,
        studentName: "Michael Johnson",
        professionalName: "Sarah Williams",
        sessionTopic: "Career Growth Discussion",
        profile: {
          email: "michael@example.com",
          phone: "084-456-7890",
          cv: "Link to CV.pdf",
          bio: "Software Engineering student interested in web development.",
          image: "https://randomuser.me/api/portraits/men/56.jpg",
        },
      },
      {
        id: 4,
        studentName: "Sipho Dlamini",
        professionalName: "Sarah Williams",
        sessionTopic: "Software Engineering Interview",
        profile: {
          email: "sipho@example.com",
          phone: "081-234-5678",
          cv: "Link to CV.pdf",
          bio: "IT student passionate about AI and machine learning.",
          image: "https://randomuser.me/api/portraits/men/78.jpg",
        },
      },
    ];

    setRequests(dummyData.filter((r) => r.professionalName === professionalName));
  }, []);

  const handleAccept = (id: number) => alert(`Interview request ${id} accepted!`);
  const handleReject = (id: number) => {
    if (!window.confirm("Are you sure you want to reject this request?")) return;
    setRequests((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <section className="p-6 bg-gray-50 dark:bg-slate-900 min-h-screen">
      <div className="mb-6 flex items-center gap-2">
        <Calendar className="w-6 h-6 text-blue-500" />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Interview Requests
        </h2>
      </div>

      {requests.length === 0 ? (
        <div className="text-center text-gray-600 dark:text-gray-300 text-sm">
          No interview requests found.
        </div>
      ) : (
        <div className="overflow-x-auto bg-white dark:bg-slate-800 shadow rounded-xl border border-gray-200 dark:border-slate-700">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200">
              <tr>
                <th className="py-3 px-4 text-left">#</th>
                <th className="py-3 px-4 text-left">Student</th>
                <th className="py-3 px-4 text-left">Topic</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {requests.map((request, index) => (
                <tr
                  key={request.id}
                  className="border-b dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/40 transition cursor-pointer"
                  onClick={() => setSelectedStudent(request)}
                >
                  <td className="py-4 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    {index + 1}
                  </td>

                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2 bg-gray-100 dark:bg-slate-700 p-2 rounded-lg">
                      <User className="w-4 h-4 text-blue-500" />
                      <span className="text-sm text-gray-800 dark:text-gray-200">
                        {request.studentName}
                      </span>
                    </div>
                  </td>

                  <td className="py-4 px-4 text-sm text-gray-700 dark:text-gray-300">
                    {request.sessionTopic}
                  </td>

                  <td className="py-4 px-4 flex items-center gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAccept(request.id);
                      }}
                      className="flex items-center gap-1 text-white bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 px-3 py-1 rounded-lg text-sm font-medium transition"
                    >
                      <Check className="w-4 h-4" /> Accept
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReject(request.id);
                      }}
                      className="flex items-center gap-1 text-white bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 px-3 py-1 rounded-lg text-sm font-medium transition"
                    >
                      <X className="w-4 h-4" /> Reject
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 max-w-md w-full relative">
            <button
              onClick={() => setSelectedStudent(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              X
            </button>

            {/* Student Image */}
            <div className="flex justify-center mb-4">
              <img
                src={selectedStudent.profile.image} // image URL
                alt={selectedStudent.studentName}
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600"
              />
            </div>

            <h3 className="text-xl font-bold mb-2 text-center">{selectedStudent.studentName}</h3>

            <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
              <strong>Email:</strong> {selectedStudent.profile.email}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
              <strong>Phone:</strong> {selectedStudent.profile.phone}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
              <strong>Bio:</strong> {selectedStudent.profile.bio}
            </p>
            <p className="text-sm text-blue-500 hover:underline">
              <strong>CV:</strong> {selectedStudent.profile.cv}
            </p>
          </div>
        </div>
      )}

    </section>
  );
};

export default InterviewRequest;