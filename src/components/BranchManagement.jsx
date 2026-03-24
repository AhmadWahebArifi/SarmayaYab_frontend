import React, { useMemo, useState } from "react";

const BranchManagement = () => {
  const [activeView, setActiveView] = useState("grid");
  const [region, setRegion] = useState("All Global Sites");

  const stats = useMemo(
    () => [
      {
        title: "Total Active Branches",
        icon: "hub",
        iconClassName: "text-primary",
        value: "24",
        suffix: null,
        delta: "12%",
        deltaIcon: "arrow_upward",
        deltaClassName: "text-tertiary-fixed-dim",
      },
      {
        title: "Average Branch Stock",
        icon: "inventory",
        iconClassName: "text-primary",
        value: "8,420",
        suffix: "SKUs/Site",
      },
      {
        title: "Critical Fulfillment",
        icon: "priority_high",
        iconClassName: "text-error",
        value: "03",
        suffix: "Action Required",
        valueClassName: "text-error",
        suffixClassName: "text-error font-bold",
      },
    ],
    []
  );

  const branches = useMemo(
    () => [
      {
        id: 1,
        name: "Berlin Hub East",
        location: "Friedrichshain, Berlin, DE",
        status: { label: "Active", className: "bg-tertiary-fixed text-on-tertiary-fixed-variant" },
        stockLevel: "12,450",
        requests: "18",
        requestsTone: "text-error",
        manager: "Lukas Meyer",
        managerImg:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuA0mgvk6XAWMglfVMiFcB7cSeTtQ_enSYwQvUzN8jZVmxRwtp1eVtDB4bqF_Wq5sY74aCqESJyOQ4-8cb1oOW4Y3rtqh04fwS313s8wlQUREJRRYusrW3Ra_kODIAI53tb-8RhTDtadsVv7PetPTmiIUANQ3MymdwLCCCOlJxf4HkNq6Wm76tSadv5X8tDXEtqpEjpG_vOqWaSpSJRkwH716SG6Yt2otm6egDbIK41kkIw_wCg37XjIEKFvvZpU-WWINS1Af21BUUYC",
      },
      {
        id: 2,
        name: "London Logistics",
        location: "Canary Wharf, London, UK",
        status: { label: "Active", className: "bg-tertiary-fixed text-on-tertiary-fixed-variant" },
        stockLevel: "8,200",
        requests: "0",
        requestsTone: "text-on-tertiary-container",
        manager: "Sarah Jenkins",
        managerImg:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAPZT-fOYPSlucU3queR0B0ZUoN-WgZ-caI66HSS4yE-vYj90INGxpEDSVlTv674ue996MdQ2X4H6Pkeji4ZEOPe3RDRCvvvtT2utxK10HH9w2Re7x8pWDlIqpNOuMSBWZYKlz7S0H8Mji8feI25FP-qKHodGQxixYLeGtxWE-Rr-sphEbf8l1FhQ81FfvXDzFG0WRt9INKeQUBbrnl2IV_ZHYUb3fWwalSi0Z1E4OkhLkj-u8iCYd6Nh0pMuFwr-cJPHDWpU12Y6_k",
      },
      {
        id: 3,
        name: "Tokyo Distribution",
        location: "Shinjuku, Tokyo, JP",
        status: {
          label: "Critical Stock",
          className: "bg-error-container text-on-error-container",
        },
        stockLevel: "2,100",
        stockTone: "text-error",
        requests: "42",
        requestsTone: "text-error",
        manager: "Kenji Sato",
        managerImg:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCVI_ciYfxXXosS_-tJqLqeObAxPYrZ9JxQD1tH5pIhSRRs_tBBAcHpTOtM4B6aCE4wMD0w9SAk0ISl83u_VGJl7sxygO_QUqmt_yzUdDEI3pgsbjn18GcFFOtgdqKXhbbXj44CadDK55PzJWe0GFvVdmqPuMth8AQlw-e8YmO_buaz07xBXeVoCEp4UNnE_Kfl81OIEhi0wXZQhluBUuubwqxOiLeAn-1ciNxhqVvWUz9uQLZ9DsrUUos3wKAVr5TlJaEefRGrdwXX",
      },
      {
        id: 4,
        name: "New York Hub",
        location: "Manhattan, NY, USA",
        status: { label: "Active", className: "bg-tertiary-fixed text-on-tertiary-fixed-variant" },
        stockLevel: "15,900",
        requests: "5",
        requestsTone: "text-on-surface",
        manager: "Emily Rivera",
        managerImg:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAC3go5mz8I1lVfK5Jl-4IN0z7wzWYG0FfEoIR4GQ0ZhRySvXOtp_q-U0Nkvgse-431MYRmTmvitzuFdnefTZPZBAWIELB5r06Jf28QYg8OkFT8oD8oWc0iw-iok9e-24GcABJcExPnl27imfwPsq_PqzH_xyXLlSukv6LstPzp4zIeuSY42YCuh7TfmHA_6M59_L5mro5QJNNSGI1cY9xG2y9nstuF5pnsFPCknAbn4_LXO-Lexz1P8tb8i8kotZad1egGixrTfNhC",
      },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-surface">
      <header className="sticky top-0 z-40 w-full bg-surface/80 backdrop-blur-md px-8 py-4 flex justify-between items-center border-0">
        <div>
          <h2 className="font-headline font-extrabold text-2xl tracking-tight text-on-surface">
            Branch Management
          </h2>
          <p className="text-on-surface-variant text-sm font-body">
            Global logistics and localized stock control
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative group">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-outline text-sm">
                search
              </span>
            </div>
            <input
              className="bg-surface-container-highest border-none rounded-sm text-sm py-2 pl-10 pr-4 focus:ring-1 focus:ring-primary/10 transition-all w-64 font-body"
              placeholder="Search branches..."
              type="text"
            />
          </div>
          <button className="signature-gradient text-white flex items-center gap-2 px-5 py-2.5 rounded-md font-medium text-sm hover:opacity-90 transition-all shadow-sm">
            <span className="material-symbols-outlined text-lg">add</span>
            <span>Add New Branch</span>
          </button>
        </div>
      </header>

      <div className="p-8 space-y-8">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((s) => (
            <div
              key={s.title}
              className="bg-surface-container-lowest p-6 rounded-md shadow-sm border border-outline-variant/10"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-on-surface-variant text-xs font-bold tracking-wider uppercase font-label">
                  {s.title}
                </span>
                <span
                  className={`material-symbols-outlined ${s.iconClassName || "text-primary"}`}
                >
                  {s.icon}
                </span>
              </div>

              <div className="flex items-baseline gap-2">
                <span
                  className={`text-3xl font-headline font-extrabold ${
                    s.valueClassName || ""
                  }`}
                >
                  {s.value}
                </span>

                {s.delta ? (
                  <span
                    className={`${
                      s.deltaClassName || "text-on-surface-variant"
                    } text-xs font-bold flex items-center`}
                  >
                    <span className="material-symbols-outlined text-xs mr-0.5">
                      {s.deltaIcon}
                    </span>
                    {s.delta}
                  </span>
                ) : null}

                {s.suffix ? (
                  <span
                    className={`${
                      s.suffixClassName || "text-on-surface-variant text-xs font-medium"
                    }`}
                  >
                    {s.suffix}
                  </span>
                ) : null}
              </div>
            </div>
          ))}
        </section>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex gap-1 bg-surface-container p-1 rounded-md">
                <button
                  type="button"
                  onClick={() => setActiveView("grid")}
                  className={
                    activeView === "grid"
                      ? "bg-surface-container-lowest text-primary px-4 py-1.5 rounded-sm text-xs font-bold shadow-sm flex items-center gap-2"
                      : "text-on-surface-variant px-4 py-1.5 rounded-sm text-xs font-bold flex items-center gap-2 hover:bg-surface-container-high transition-all"
                  }
                >
                  <span className="material-symbols-outlined text-sm">grid_view</span>
                  Grid
                </button>
                <button
                  type="button"
                  onClick={() => setActiveView("map")}
                  className={
                    activeView === "map"
                      ? "bg-surface-container-lowest text-primary px-4 py-1.5 rounded-sm text-xs font-bold shadow-sm flex items-center gap-2"
                      : "text-on-surface-variant px-4 py-1.5 rounded-sm text-xs font-bold flex items-center gap-2 hover:bg-surface-container-high transition-all"
                  }
                >
                  <span className="material-symbols-outlined text-sm">map</span>
                  Map View
                </button>
              </div>

              <div className="flex items-center gap-4 text-xs font-medium text-on-surface-variant">
                <span>Filter by Region:</span>
                <select
                  className="bg-transparent border-none focus:ring-0 text-primary font-bold cursor-pointer"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                >
                  <option>All Global Sites</option>
                  <option>North America</option>
                  <option>EMEA</option>
                  <option>APAC</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {branches.map((b) => (
                <div
                  key={b.id}
                  className="bg-surface-container-lowest p-6 rounded-md border border-outline-variant/10 hover:shadow-lg transition-all group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-headline font-bold text-lg group-hover:text-primary-container transition-colors">
                        {b.name}
                      </h3>
                      <p className="text-on-surface-variant text-xs flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">
                          location_on
                        </span>
                        {b.location}
                      </p>
                    </div>
                    <span
                      className={`${b.status.className} px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest`}
                    >
                      {b.status.label}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 my-6">
                    <div className="bg-surface-container-low p-3 rounded-sm">
                      <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-tighter mb-1">
                        Stock Level
                      </p>
                      <p
                        className={`text-lg font-headline font-extrabold ${
                          b.stockTone || ""
                        }`}
                      >
                        {b.stockLevel}
                      </p>
                    </div>
                    <div className="bg-surface-container-low p-3 rounded-sm">
                      <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-tighter mb-1">
                        Requests
                      </p>
                      <p
                        className={`text-lg font-headline font-extrabold ${
                          b.requestsTone || ""
                        }`}
                      >
                        {b.requests}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-surface-container">
                    <div className="flex items-center gap-2">
                      <img
                        alt="Manager"
                        className="w-6 h-6 rounded-full grayscale"
                        src={b.managerImg}
                      />
                      <span className="text-xs font-medium">{b.manager}</span>
                    </div>
                    <button
                      type="button"
                      className="text-primary hover:underline text-xs font-bold flex items-center"
                    >
                      Manage
                      <span className="material-symbols-outlined text-sm ml-1">
                        chevron_right
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 space-y-8">
            <div className="bg-surface-container-lowest rounded-md overflow-hidden shadow-sm border border-outline-variant/10">
              <div className="p-4 bg-surface-container-low flex justify-between items-center">
                <h4 className="font-headline font-bold text-sm">
                  Geospatial Distribution
                </h4>
                <span className="material-symbols-outlined text-sm text-on-surface-variant">
                  open_in_full
                </span>
              </div>

              <div className="h-64 relative bg-slate-200">
                <img
                  alt="Map distribution"
                  className="w-full h-full object-cover grayscale opacity-50"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBg-hnwAjmUG7YhkM9O03BJ5pk6G73BdsHEEEH66HAxbG4iZsbvFkacfdaxlebc4jlD9uy-CD2aj7qkar53wb4gfkuzbxmB7sIBfcGubdvqiHSsGR3dQzcHFw1QFaFzgeq57OVIbbeDR7lkDIkN4EwXZDoehnwvqeR9AfsnRLieqqYKsIkBQhGwefo0Cn_5hizT_ERojcnGTSt_T_Gf09TSxqb7WPHbNTlnvPaTPjRn7poP0ln4YYgIKkPLz9kI3INvWECbiD1inUgQ"
                />
                <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-primary rounded-full ring-4 ring-white shadow-lg"></div>
                <div className="absolute top-1/2 left-2/3 w-3 h-3 bg-error rounded-full ring-4 ring-white animate-pulse shadow-lg"></div>
                <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-primary rounded-full ring-4 ring-white shadow-lg"></div>
              </div>

              <div className="p-4 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-on-surface-variant">North America</span>
                  <span className="font-bold">8 Sites</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-on-surface-variant">Europe</span>
                  <span className="font-bold">12 Sites</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-on-surface-variant">Asia</span>
                  <span className="font-bold">4 Sites</span>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-md shadow-sm border border-outline-variant/10">
              <h4 className="font-headline font-bold text-sm mb-6">
                Recent Branch Activity
              </h4>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="mt-1 w-2 h-2 rounded-full bg-primary flex-shrink-0"></div>
                  <div>
                    <p className="text-xs font-bold">New Branch Authorized</p>
                    <p className="text-[11px] text-on-surface-variant font-body mt-0.5">
                      Singapore Central Hub added to network by Admin.
                    </p>
                    <p className="text-[10px] text-outline mt-1 font-label">
                      2 hours ago
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="mt-1 w-2 h-2 rounded-full bg-error flex-shrink-0"></div>
                  <div>
                    <p className="text-xs font-bold">Alert: Tokyo Critical Stock</p>
                    <p className="text-[11px] text-on-surface-variant font-body mt-0.5">
                      Stock dropped below 15% threshold for 12 SKUs.
                    </p>
                    <p className="text-[10px] text-outline mt-1 font-label">
                      5 hours ago
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="mt-1 w-2 h-2 rounded-full bg-on-tertiary-container flex-shrink-0"></div>
                  <div>
                    <p className="text-xs font-bold">Berlin Audit Completed</p>
                    <p className="text-[11px] text-on-surface-variant font-body mt-0.5">
                      Manager Lukas Meyer verified Q3 stock requests.
                    </p>
                    <p className="text-[10px] text-outline mt-1 font-label">
                      Yesterday
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="w-full mt-8 py-2 text-xs font-bold text-on-surface-variant border border-outline-variant/30 rounded-sm hover:bg-surface-container-low transition-all"
              >
                View Full Audit Log
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchManagement;
