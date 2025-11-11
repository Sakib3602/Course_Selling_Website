
const ProfileA= () => {
    return (
        <div>
             <main className="flex-1 overflow-auto bg-gray-50 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-black text-balance">Welcome to Admin Panel</h2>
              <p className="text-gray-600 mt-2">Manage your business with our premium admin dashboard</p>
            </div>

            {/* Content Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Total Users", value: "2,450", color: "bg-blue-50", icon: "👥" },
                { title: "Orders", value: "1,240", color: "bg-green-50", icon: "📦" },
                { title: "Support Requests", value: "320", color: "bg-purple-50", icon: "💰" },
                { title: "Growth", value: "12.5%", color: "bg-orange-50", icon: "📈" },
              ].map((card, index) => (
                <div
                  key={index}
                  className={`${card.color} rounded-lg p-6 border border-gray-200 hover:shadow-lg transition`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">{card.title}</p>
                      <p className="text-2xl font-bold text-black mt-2">{card.value}</p>
                    </div>
                    <span className="text-3xl">{card.icon}</span>
                  </div>
                </div>
              ))}
            </div>

            
          </div>
        </main>
            
        </div>
    );
};

export default ProfileA;