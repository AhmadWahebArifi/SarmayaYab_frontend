import React, { useMemo, useState } from "react";

const StockRequests = () => {
  const [activeTab, setActiveTab] = useState("All Requests");
  const [expandedRequestId, setExpandedRequestId] = useState("SR-9421");

  const tabs = useMemo(
    () => [
      "All Requests",
      "Pending",
      "Approved",
      "Dispatched",
      "Delivered",
      "Rejected",
    ],
    []
  );

  const requests = useMemo(
    () => [
      {
        id: "SR-9421",
        branch: "North London Distribution Hub",
        date: "Oct 24, 2023",
        totalItems: 142,
        status: {
          label: "Pending",
          className: "bg-amber-100 text-amber-800",
        },
        actions: [
          { icon: "visibility", title: "View" },
          { icon: "edit", title: "Edit" },
        ],
        details: {
          lineItems: [
            {
              icon: "inventory",
              name: 'MacBook Pro M3 Max - 14"',
              sku: "LPT-APL-M3-14",
              qty: "12 Units",
              inStock: "In Stock: 45",
            },
            {
              icon: "headphones",
              name: "Studio Headphones Pro",
              sku: "AUD-HP-PR-02",
              qty: "30 Units",
              inStock: "In Stock: 120",
            },
          ],
          summary: {
            subtotal: "£42,500.00",
            weight: "24.5 kg",
            total: "£42,500.00",
          },
        },
      },
      {
        id: "SR-9388",
        branch: "Berlin Mitte Concept Store",
        date: "Oct 23, 2023",
        totalItems: 56,
        status: {
          label: "Dispatched",
          className: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
        },
        actions: [
          { icon: "visibility", title: "View" },
          { icon: "local_shipping", title: "Track" },
        ],
      },
      {
        id: "SR-9350",
        branch: "NYC Midtown Flagship",
        date: "Oct 22, 2023",
        totalItems: 210,
        status: {
          label: "Delivered",
          className: "bg-on-tertiary-container/20 text-on-tertiary-container",
        },
        actions: [
          { icon: "visibility", title: "View" },
          { icon: "receipt_long", title: "Receipt" },
        ],
      },
      {
        id: "SR-9321",
        branch: "Tokyo Ginza Boutique",
        date: "Oct 21, 2023",
        totalItems: 12,
        status: {
          label: "Rejected",
          className: "bg-error-container text-on-error-container",
        },
        actions: [
          { icon: "visibility", title: "View" },
          { icon: "info", title: "Info" },
        ],
      },
    ],
    []
  );

  const toggleExpanded = (id) => {
    setExpandedRequestId((cur) => (cur === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-surface font-body text-on-surface antialiased">
      <header className="sticky top-0 w-full z-40 bg-surface/80 backdrop-blur-md flex justify-between items-center px-8 py-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative w-full max-w-md">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-sm">
              search
            </span>
            <input
              className="w-full bg-surface-container-highest border-none rounded-sm py-2 pl-10 pr-4 text-sm focus:ring-1 focus:ring-primary/20 placeholder:text-outline"
              placeholder="Search requests, branches or SKUs..."
              type="text"
            />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button className="text-on-surface-variant hover:text-on-surface transition-colors relative">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full border-2 border-white"></span>
          </button>
          <button className="text-on-surface-variant hover:text-on-surface transition-colors">
            <span className="material-symbols-outlined">help_outline</span>
          </button>

          <div className="flex items-center gap-3 pl-4 border-l border-surface-container-high">
            <div className="text-right">
              <p className="text-xs font-bold text-on-surface">Alex Rivera</p>
              <p className="text-[10px] text-outline">Warehouse Admin</p>
            </div>
            <img
              alt="User Profile Avatar"
              className="w-8 h-8 rounded-full border border-surface-container-high"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdsWUDj8mjvztjUf23V-jZkZT-3rdaN9F10xvoZZAac_-yZiMKEz2Yx5_ExShG10CCO7wYP2j7RcMEUmRes3xtfqTf3PKQ3NcsRBgeBZFrW3_xZ0FYAZl9fkNcdHhWxFtLDqdqSL5JG8DLUWzhxWYN3uH_SpigdLDsw7eMOHxQBMDN2TB6NY5q0pkGsZfROKS6dzOYTd_CoodLio6Vw8IgPiF9j_EyUWa5zk9xpsWO2w6EKsuNkQlsvR3OtkoqbLVF0VlVDoRmccpl"
            />
          </div>
        </div>
      </header>

      <main className="p-8 space-y-10">
        <section>
          <header className="mb-8">
            <h2 className="font-headline font-extrabold text-3xl text-on-surface tracking-tight">
              Stock Requests
            </h2>
            <p className="text-on-surface-variant mt-1 font-body">
              Manage and fulfill inventory distribution across global branches.
            </p>
          </header>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div className="flex items-center bg-surface-container-low p-1 rounded-lg overflow-x-auto hide-scrollbar">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={
                    activeTab === tab
                      ? "px-5 py-2 text-sm font-semibold text-primary bg-surface-container-lowest shadow-sm rounded-md transition-all"
                      : "px-5 py-2 text-sm font-medium text-on-surface-variant hover:text-primary transition-colors"
                  }
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button className="px-4 py-2 text-sm font-medium text-on-secondary-container bg-secondary-container rounded-md hover:bg-opacity-80 transition-all flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">block</span>
                Bulk Reject
              </button>
              <button className="px-4 py-2 text-sm font-semibold text-on-primary signature-gradient rounded-md hover:opacity-90 transition-all flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">
                  check_circle
                </span>
                Bulk Approve
              </button>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-surface-container-low">
                    <th className="p-4 text-left w-12">
                      <input
                        className="rounded-sm border-outline-variant text-primary focus:ring-primary/20"
                        type="checkbox"
                      />
                    </th>
                    <th className="p-4 text-left font-label text-[10px] uppercase tracking-wider text-outline font-bold">
                      Request ID
                    </th>
                    <th className="p-4 text-left font-label text-[10px] uppercase tracking-wider text-outline font-bold">
                      Requesting Branch
                    </th>
                    <th className="p-4 text-left font-label text-[10px] uppercase tracking-wider text-outline font-bold">
                      Date
                    </th>
                    <th className="p-4 text-right font-label text-[10px] uppercase tracking-wider text-outline font-bold">
                      Total Items
                    </th>
                    <th className="p-4 text-center font-label text-[10px] uppercase tracking-wider text-outline font-bold">
                      Status
                    </th>
                    <th className="p-4 text-right font-label text-[10px] uppercase tracking-wider text-outline font-bold">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y-0">
                  {requests.map((r) => {
                    const isExpanded = expandedRequestId === r.id;

                    return (
                      <React.Fragment key={r.id}>
                        <tr
                          className="group hover:bg-surface-container-low transition-colors cursor-pointer"
                          onClick={() => toggleExpanded(r.id)}
                        >
                          <td
                            className="p-4 text-left"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <input
                              className="rounded-sm border-outline-variant text-primary focus:ring-primary/20"
                              type="checkbox"
                            />
                          </td>
                          <td className="p-4 font-body font-semibold text-on-surface">
                            #{r.id}
                          </td>
                          <td className="p-4 font-body text-on-surface-variant">
                            {r.branch}
                          </td>
                          <td className="p-4 font-body text-on-surface-variant">
                            {r.date}
                          </td>
                          <td className="p-4 font-body text-right tabular-nums text-on-surface">
                            {r.totalItems}
                          </td>
                          <td className="p-4 text-center">
                            <span
                              className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight ${r.status.className}`}
                            >
                              {r.status.label}
                            </span>
                          </td>
                          <td
                            className="p-4 text-right space-x-2"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {r.actions.map((a) => (
                              <button
                                key={a.icon}
                                className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-md transition-all"
                                title={a.title}
                              >
                                <span className="material-symbols-outlined">
                                  {a.icon}
                                </span>
                              </button>
                            ))}
                          </td>
                        </tr>

                        {isExpanded && r.details ? (
                          <tr className="bg-surface-container-low/50">
                            <td className="p-6" colSpan={7}>
                              <div className="bg-surface-container-lowest rounded-lg p-6 flex flex-col md:flex-row gap-8 shadow-sm">
                                <div className="flex-1">
                                  <h4 className="text-xs font-bold uppercase tracking-widest text-outline mb-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm">
                                      list_alt
                                    </span>
                                    Requested Line Items
                                  </h4>

                                  <div className="space-y-3">
                                    {r.details.lineItems.map((li) => (
                                      <div
                                        key={li.sku}
                                        className="flex items-center justify-between p-3 rounded-md border border-outline-variant/20 hover:border-outline-variant/50 transition-all"
                                      >
                                        <div className="flex items-center gap-4">
                                          <div className="w-10 h-10 bg-surface-container-low rounded-sm flex items-center justify-center">
                                            <span className="material-symbols-outlined text-on-surface-variant">
                                              {li.icon}
                                            </span>
                                          </div>
                                          <div>
                                            <p className="text-sm font-semibold">
                                              {li.name}
                                            </p>
                                            <p className="text-[10px] text-outline">
                                              SKU: {li.sku}
                                            </p>
                                          </div>
                                        </div>

                                        <div className="text-right">
                                          <p className="text-sm font-bold tabular-nums">
                                            {li.qty}
                                          </p>
                                          <p className="text-[10px] text-tertiary-fixed-dim font-semibold">
                                            {li.inStock}
                                          </p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                <div className="w-full md:w-72 border-l border-outline-variant/10 pl-0 md:pl-8 flex flex-col justify-between">
                                  <div>
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-outline mb-4">
                                      Request Summary
                                    </h4>
                                    <div className="space-y-2">
                                      <div className="flex justify-between text-xs">
                                        <span className="text-on-surface-variant">
                                          Subtotal
                                        </span>
                                        <span className="font-bold tabular-nums">
                                          {r.details.summary.subtotal}
                                        </span>
                                      </div>
                                      <div className="flex justify-between text-xs">
                                        <span className="text-on-surface-variant">
                                          Estimated Weight
                                        </span>
                                        <span className="font-bold tabular-nums">
                                          {r.details.summary.weight}
                                        </span>
                                      </div>
                                      <div className="pt-2 mt-2 border-t border-outline-variant/10 flex justify-between text-sm">
                                        <span className="font-bold">
                                          Total Allocation
                                        </span>
                                        <span className="font-black tabular-nums">
                                          {r.details.summary.total}
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="mt-8 flex gap-2">
                                    <button className="flex-1 px-3 py-2 text-xs font-bold text-on-error-container bg-error-container rounded-sm hover:opacity-80 transition-all">
                                      Reject
                                    </button>
                                    <button className="signature-gradient text-on-primary px-4 py-2 text-xs font-bold rounded-sm flex items-center justify-center gap-2">
                                      Approve &amp; Allocate
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ) : null}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="p-4 flex items-center justify-between border-t border-surface-container-high bg-surface-container-lowest">
              <p className="text-xs text-on-surface-variant">
                Showing <span className="font-bold text-on-surface">1 - 10</span>{" "}
                of <span className="font-bold text-on-surface">248</span> results
              </p>
              <div className="flex items-center gap-1">
                <button
                  className="p-1 rounded-md text-on-surface-variant hover:bg-surface-container-low disabled:opacity-30"
                  disabled
                >
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button className="w-8 h-8 rounded-md bg-primary text-on-primary text-xs font-bold">
                  1
                </button>
                <button className="w-8 h-8 rounded-md text-on-surface-variant hover:bg-surface-container-low text-xs font-medium">
                  2
                </button>
                <button className="w-8 h-8 rounded-md text-on-surface-variant hover:bg-surface-container-low text-xs font-medium">
                  3
                </button>
                <span className="px-2 text-outline">...</span>
                <button className="w-8 h-8 rounded-md text-on-surface-variant hover:bg-surface-container-low text-xs font-medium">
                  25
                </button>
                <button className="p-1 rounded-md text-on-surface-variant hover:bg-surface-container-low">
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-surface-container-low rounded-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-headline font-bold text-xl">
                  Allocation Accuracy
                </h3>
                <p className="text-sm text-on-surface-variant">
                  Real-time fulfillment vs request volume
                </p>
              </div>
              <button className="text-xs font-bold text-primary underline underline-offset-4">
                Download PDF Report
              </button>
            </div>

            <div className="h-48 flex items-end justify-between gap-4 px-4">
              {["Mon", "Tue", "Wed", "Thu", "Fri"].map((d, idx) => {
                const heights = [75, 50, 83, 66, 95];
                const h = heights[idx];

                return (
                  <div
                    key={d}
                    className="flex-1 bg-primary/10 rounded-t-sm relative group"
                  >
                    {d === "Mon" ? (
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-primary text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        85% Filled
                      </div>
                    ) : null}
                    <div
                      className="bg-primary w-full rounded-t-sm"
                      style={{ height: `${h}%` }}
                    ></div>
                    <p className="text-[10px] text-center mt-2 font-bold uppercase tracking-tighter">
                      {d}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-primary-container rounded-xl p-8 text-on-primary shadow-xl flex flex-col justify-between">
            <div>
              <span className="material-symbols-outlined text-4xl mb-4">
                bolt
              </span>
              <h3 className="font-headline font-bold text-2xl tracking-tight leading-tight">
                Priority <br />Distribution
              </h3>
              <p className="text-on-primary-container mt-4 text-sm leading-relaxed">
                3 High-priority requests from the Tokyo branch require immediate
                attention before EOD.
              </p>
            </div>
            <button className="mt-8 w-full bg-white text-primary font-bold py-3 rounded-md text-sm hover:bg-opacity-90 transition-all">
              View Priority Queue
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default StockRequests;
