import React, { useEffect, useState } from "react";
import { CheckCircle2, User, Clock, Star, MessageSquare } from "lucide-react";

const CompletedInterviews = () => {
  const [completedSessions, setCompletedSessions] = useState([]);

  // Replace with logged-in professional's name in a real app
  const professionalName = "Sarah Williams";

  useEffect(() => {
    const dummyData = [
      {
        id: 1,
        studentName: "John Doe",
        professionalName: "Sarah Williams",
        feedback: "Very engaging and informative session!",
        rating: 5,
        date: "2025-11-10",
        time: "10:00 AM",
      },
      {
        id: 2,
        studentName: "Emily Ncube",
        professionalName: "David Moyo",
        feedback: "Helpful insights on interview preparation.",
        rating: 4,
        date: "2025-11-08",
        time: "2:30 PM",
      },
      {
        id: 3,
        studentName: "Michael Johnson",
        professionalName: "Sarah Williams",
        feedback: "Got great tips for technical interviews.",
        rating: 5,
        date: "2025-11-07",
        time: "4:00 PM",
      },
      {
        id: 4,
        studentName: "Sipho Dlamini",
        professionalName: "Sarah Williams",
        feedback: "Session went smoothly with useful advice.",
        rating: 4,
        date: "2025-11-05",
        time: "11:00 AM",
      },
    ];

    // Filter sessions only for this professional
    setCompletedSessions(dummyData.filter(s => s.professionalName === professionalName));
  }, []);

  return (
    <section className="p-6 bg-gray-50 dark:bg-slate-900 min-h-screen">
      <div className="mb-6 flex items-center gap-2">
        <CheckCircle2 className="w-6 h-6 text-green-500" />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Completed Interviews
        </h2>
      </div>

      {completedSessions.length === 0 ? (
        <div className="text-center text-gray-600 dark:text-gray-300 text-sm">
          No completed interviews found.
        </div>
      ) : (
        <div className="overflow-x-auto bg-white dark:bg-slate-800 shadow rounded-xl border border-gray-200 dark:border-slate-700">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200">
              <tr>
                <th className="py-3 px-4 text-left">#</th>
                <th className="py-3 px-4 text-left">Student</th>
                <th className="py-3 px-4 text-left">Feedback</th>
                <th className="py-3 px-4 text-left">Rating</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Time</th>
              </tr>
            </thead>

            <tbody>
              {completedSessions.map((session, index) => (
                <tr
                  key={session.id}
                  className="border-b dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/40 transition"
                >
                  {/* Index */}
                  <td className="py-4 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    {index + 1}
                  </td>

                  {/* Student */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2 bg-gray-100 dark:bg-slate-700 p-2 rounded-lg">
                      <User className="w-4 h-4 text-blue-500" />
                      <span className="text-sm text-gray-800 dark:text-gray-200">{session.studentName}</span>
                    </div>
                  </td>

                  {/* Feedback */}
                  <td className="py-4 px-4 text-sm text-gray-700 dark:text-gray-300 max-w-xs">
                    <div className="flex items-start gap-2">
                      <MessageSquare className="w-4 h-4 text-indigo-500 mt-0.5" />
                      <span>{session.feedback}</span>
                    </div>
                  </td>

                  {/* Rating */}
                  <td className="py-4 px-4">
                    <div className="flex gap-1">
                      {[...Array(session.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                  </td>

                  {/* Date */}
                  <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-300">
                    {session.date}
                  </td>

                  {/* Time */}
                  <td className="py-4 px-4 flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300">
                    <Clock className="w-4 h-4 text-green-500" />
                    {session.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default CompletedInterviews;
