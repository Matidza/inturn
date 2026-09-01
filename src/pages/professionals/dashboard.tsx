const Dashboard = () => {
  return (
    <div className="space-y-6">
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-gray-500 text-sm">Sessions</p>
          <h2 className="text-2xl font-bold">24</h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-gray-500 text-sm">Earnings</p>
          <h2 className="text-2xl font-bold">R12,400</h2>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-gray-500 text-sm">Rating</p>
          <h2 className="text-2xl font-bold">4.8 ⭐</h2>
        </div>

      </div>

      {/* Activity */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="font-semibold mb-3">Recent Activity</h3>

        <ul className="space-y-2 text-sm text-gray-600">
          <li>✔ Completed interview with John</li>
          <li>💰 Earned R300</li>
          <li>📅 New booking scheduled</li>
        </ul>
      </div>

    </div>
  );
};

export default Dashboard;