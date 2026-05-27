import React, { useEffect, useState } from "react";
import { User, Clock, Video, XCircle, RefreshCw } from "lucide-react";

const ScheduledInterviews = () => {
  const [interviews, setInterviews] = useState([]);

  // Replace with logged-in professional's name in a real app
  const professionalName = "Sarah Williams";

  useEffect(() => {
    const dummyData = [
      {
        id: 1,
        studentName: "John Doe",
        professionalName: "Sarah Williams",
        sessionTopic: "Mock Technical Interview",
        date: "2025-11-20",
        time: "10:00 AM",
        zoomLink: "https://zoom.us/j/1234567890",
      },
      {
        id: 2,
        studentName: "Michael Johnson",
        professionalName: "Sarah Williams",
        sessionTopic: "Career Growth Discussion",
        date: "2025-11-21",
        time: "2:00 PM",
        zoomLink: "https://zoom.us/j/9876543210",
      },
    ];

    setInterviews(dummyData.filter((i) => i.professionalName === professionalName));
  }, []);

  const handleCancel = (id) => {
    if (!window.confirm("Are you sure you want to cancel this session?")) return;

    setInterviews((prev) => prev.filter((i) => i.id !== id));
  };

  const handleReschedule = (id) => {
    const newDate = prompt("Enter new date (YYYY-MM-DD):");
    const newTime = prompt("Enter new time (e.g., 3:00 PM):");

    if (newDate && newTime) {
      setInterviews((prev) =>
        prev.map((i) => (i.id === id ? { ...i, date: newDate, time: newTime } : i))
      );
    }
  };

  return (
    <section className="p-6 bg-gray-50 dark:bg-slate-900 min-h-screen">
      <div className="mb-6 flex items-center gap-2">
        <Clock className="w-6 h-6 text-blue-500" />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Scheduled Interviews
        </h2>
      </div>

      {interviews.length === 0 ? (
        <div className="text-center text-gray-600 dark:text-gray-300 text-sm">
          No scheduled interviews found.
        </div>
      ) : (
        <div className="overflow-x-auto bg-white dark:bg-slate-800 shadow rounded-xl border border-gray-200 dark:border-slate-700">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200">
              <tr>
                <th className="py-3 px-4 text-left">#</th>
                <th className="py-3 px-4 text-left">Student</th>
                {/* <th className="py-3 px-4 text-left">Topic</th> */}
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Time</th>
                <th className="py-3 px-4 text-left">Actions</th>
                {/* <th className="py-3 px-4 text-left">Cancel</th> */}
              </tr>
            </thead>

            <tbody>
              {interviews.map((interview, index) => (
                <tr
                  key={interview.id}
                  className="border-b dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/40 transition"
                >
                  <td className="py-4 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    {index + 1}
                  </td>

                  {/* Student */}
                  <td className="py-4 px-4 flex items-center gap-2">
                    <User className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-gray-800 dark:text-gray-200">
                      {interview.studentName}
                    </span>
                  </td>

                  {/* Topic
                  <td className="py-4 px-4 text-sm text-gray-700 dark:text-gray-300">
                    {interview.sessionTopic}
                  </td> */}

                  {/* Date */}
                  <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-300">
                    {interview.date}
                  </td>

                  {/* Time */}
                  <td className="py-4 px-4 flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300">
                    <Clock className="w-4 h-4 text-green-500" />
                    {interview.time}
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-4 flex items-center gap-3">
                    <a
                      href={interview.zoomLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <Video className="w-4 h-4" /> Join
                    </a>
                    <button
                      onClick={() => handleReschedule(interview.id)}
                      className="flex items-center gap-1 text-sm text-yellow-600 dark:text-yellow-400 hover:underline"
                    >
                      <RefreshCw className="w-4 h-4" /> Reschedule
                    </button>
                  </td>

                  {/* Cancel */}
                  <td className="py-4 px-4">
                    <button
                      onClick={() => handleCancel(interview.id)}
                      className="flex items-center gap-1 text-sm text-red-600 dark:text-red-400 hover:underline"
                    >
                      <XCircle className="w-4 h-4" /> Cancel
                    </button>
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

export default ScheduledInterviews;
