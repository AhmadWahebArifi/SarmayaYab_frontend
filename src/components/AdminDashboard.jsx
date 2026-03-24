import React from "react";

const AdminDashboard = () => {
  // KPI Stats Data
  const kpiStats = [
    {
      title: "Total Warehouse Stock",
      value: "142,805",
      subtitle: "Units across 12 sectors",
      change: "+12%",
      icon: "inventory",
      iconBg: "bg-secondary-container",
      iconColor: "text-on-secondary-container",
      cardBg: "bg-surface-container-lowest",
      trendColor: "text-on-tertiary-container",
    },
    {
      title: "Low-Stock Alert",
      value: "24",
      subtitle: "SKUs below safety threshold",
      icon: "warning",
      iconBg: "bg-error",
      iconColor: "text-white",
      cardBg: "bg-error-container",
      isCritical: true,
      badge: "CRITICAL",
    },
    {
      title: "Pending Requests",
      value: "18",
      subtitle: "Awaiting admin approval",
      icon: "assignment_late",
      iconBg: "bg-primary-fixed",
      iconColor: "text-on-primary-fixed",
      cardBg: "bg-surface-container-lowest",
    },
    {
      title: "Active Branches",
      value: "32",
      subtitle: "Operational distribution points",
      icon: "hub",
      iconBg: "bg-tertiary-fixed",
      iconColor: "text-on-tertiary-fixed-variant",
      cardBg: "bg-surface-container-lowest",
    },
  ];

  // Stock Movement Data
  const stockMovementData = [
    { month: "JAN", incoming: 60, outgoing: 45 },
    { month: "FEB", incoming: 75, outgoing: 65 },
    { month: "MAR", incoming: 40, outgoing: 80 },
    { month: "APR", incoming: 90, outgoing: 55 },
    { month: "MAY", incoming: 65, outgoing: 40 },
    { month: "JUN", incoming: 85, outgoing: 70 },
  ];

  // Critical Stock Items
  const criticalStock = [
    {
      name: "Aero-Max X12",
      sku: "FTW-8829",
      quantity: 4,
      isCritical: true,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop",
    },
    {
      name: "V-Pulse Tracker",
      sku: "EL-4022",
      quantity: 12,
      isCritical: true,
      image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=100&h=100&fit=crop",
    },
    {
      name: "SoundPhase Z",
      sku: "AU-9901",
      quantity: 15,
      isCritical: true,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop",
    },
    {
      name: "Omni-Shade Elite",
      sku: "AC-2210",
      quantity: 28,
      isWarning: true,
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=100&h=100&fit=crop",
    },
  ];

  // Pending Requests
  const pendingRequests = [
    {
      id: 1,
      origin: "North London Hub",
      item: "Industrial Filter XL-90",
      quantity: "500 units",
      priority: "Urgent",
      status: "Pending",
    },
    {
      id: 2,
      origin: "Berlin West District",
      item: "Fiber Optic Cable 10m",
      quantity: "1,200 units",
      priority: "Normal",
      status: "Pending",
    },
    {
      id: 3,
      origin: "Tokyo Port Logistics",
      item: "Hydraulic Seal Kit B",
      quantity: "85 units",
      priority: "Medium",
      status: "Pending",
    },
  ];

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "Urgent":
        return "bg-error-container text-on-error-container";
      case "Medium":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-surface-container text-on-surface-variant";
    }
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-8">
      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {kpiStats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.cardBg} p-6 rounded-lg shadow-sm flex flex-col justify-between group hover:bg-surface-container-low transition-colors duration-300 ${
              stat.isCritical ? "border-l-4 border-error" : ""
            }`}
          >
            <div className="flex justify-between items-start">
              <div className={`p-2 ${stat.iconBg} rounded-lg ${stat.iconColor}`}>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: stat.isCritical ? "'FILL' 1" : "'FILL' 0" }}>
                  {stat.icon}
                </span>
              </div>
              {stat.isCritical ? (
                <span className="text-on-error-container text-[10px] font-black tracking-tighter bg-white/50 px-2 py-1 rounded">
                  {stat.badge}
                </span>
              ) : stat.change ? (
                <span className={`${stat.trendColor} text-xs font-bold flex items-center`}>
                  <span className="material-symbols-outlined text-xs mr-1">trending_up</span>
                  {stat.change}
                </span>
              ) : null}
            </div>
            <div className="mt-4">
              <p className={`text-[10px] uppercase tracking-wider font-semibold ${stat.isCritical ? "text-on-error-container" : "text-outline"}`}>
                {stat.title}
              </p>
              <h3 className={`text-3xl font-headline font-extrabold mt-1 ${stat.isCritical ? "text-on-error-container" : "text-on-surface"}`}>
                {stat.value}
              </h3>
              <p className={`text-xs mt-2 ${stat.isCritical ? "text-on-error-container/80 font-medium" : "text-on-surface-variant"}`}>
                {stat.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-12 gap-8">
        {/* Stock Movement Bar Chart */}
        <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest p-8 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h4 className="font-headline font-bold text-xl text-on-surface">Monthly Stock Movement</h4>
              <p className="text-sm text-outline">Incoming vs Outgoing supply chain volume</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary"></span>
                <span className="text-xs font-medium text-outline">Incoming</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-secondary-fixed-dim"></span>
                <span className="text-xs font-medium text-outline">Outgoing</span>
              </div>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="h-64 flex items-end justify-between gap-4 px-4">
            {stockMovementData.map((data, index) => (
              <div key={index} className="flex-1 flex gap-1 items-end h-full">
                <div className="flex-1 bg-primary rounded-t-sm transition-all hover:opacity-80" style={{ height: `${data.incoming}%` }}></div>
                <div className="flex-1 bg-secondary-fixed-dim rounded-t-sm transition-all hover:opacity-80" style={{ height: `${data.outgoing}%` }}></div>
              </div>
            ))}
          </div>
          <div className="flex justify-between px-4 mt-4 border-t border-outline-variant pt-4">
            {stockMovementData.map((data, index) => (
              <span key={index} className="text-[10px] font-bold text-outline">{data.month}</span>
            ))}
          </div>
        </div>

        {/* Critical Stock List */}
        <div className="col-span-12 lg:col-span-4 bg-surface-container-low p-8 rounded-lg">
          <div className="mb-6">
            <h4 className="font-headline font-bold text-xl text-on-surface">Critical Stock</h4>
            <p className="text-sm text-outline">Top 5 priority replenishment items</p>
          </div>
          <div className="space-y-4">
            {criticalStock.map((item, index) => (
              <div key={index} className="bg-surface-container-lowest p-4 rounded-md shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 bg-surface rounded flex items-center justify-center overflow-hidden">
                  <img alt={item.name} className="object-cover w-full h-full" src={item.image} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-on-surface">{item.name}</p>
                  <p className="text-[10px] text-outline">SKU: {item.sku}</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-black ${item.isCritical ? "text-error" : item.isWarning ? "text-secondary" : "text-on-surface"}`}>
                    {item.quantity.toString().padStart(2, "0")}
                  </p>
                  <p className="text-[10px] text-outline font-medium">LEFT</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 border border-outline-variant text-sm font-bold text-on-surface hover:bg-surface-container-high transition-colors rounded-md">
            View Full Alert List
          </button>
        </div>
      </div>

      {/* Pending Requests Table */}
      <section className="bg-surface-container-lowest p-8 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h4 className="font-headline font-bold text-xl text-on-surface">Recent Stock Requests</h4>
            <p className="text-sm text-outline">Inter-branch transfers and replenishment needs</p>
          </div>
          <button className="text-primary font-bold text-sm flex items-center hover:underline">
            View History
            <span className="material-symbols-outlined text-sm ml-1">chevron_right</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-y-3">
            <thead>
              <tr className="text-[10px] text-outline uppercase tracking-wider">
                <th className="pb-4 pl-4 font-bold">Origin Branch</th>
                <th className="pb-4 font-bold">Inventory Item</th>
                <th className="pb-4 font-bold">Quantity</th>
                <th className="pb-4 font-bold">Priority</th>
                <th className="pb-4 font-bold">Status</th>
                <th className="pb-4 pr-4 text-right font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingRequests.map((request) => (
                <tr key={request.id} className="hover:bg-surface-container-low transition-colors group">
                  <td className="py-4 pl-4 rounded-l-md font-medium text-on-surface">{request.origin}</td>
                  <td className="py-4 font-medium text-on-surface">{request.item}</td>
                  <td className="py-4 text-sm font-mono text-outline">{request.quantity}</td>
                  <td className="py-4">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${getPriorityStyle(request.priority)}`}>
                      {request.priority}
                    </span>
                  </td>
                  <td className="py-4">
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-secondary-container text-on-secondary-container uppercase">
                      {request.status}
                    </span>
                  </td>
                  <td className="py-4 pr-4 rounded-r-md text-right">
                    <div className="flex justify-end gap-2">
                      <button className="px-3 py-1.5 bg-on-tertiary-container text-white text-[10px] font-bold rounded-md shadow-sm hover:opacity-90">
                        Approve
                      </button>
                      <button className="px-3 py-1.5 bg-surface-container-high text-on-surface-variant text-[10px] font-bold rounded-md hover:bg-error-container hover:text-error transition-colors">
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
