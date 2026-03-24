import React from "react";

const ProductCatalog = () => {
  const products = [
    {
      id: 1,
      icon: "devices",
      name: 'UltraBook Pro 14"',
      subtitle: "Silver Finish",
      sku: "UB-PRO-14-SLV",
      category: "Electronics",
      supplier: "Apex Systems",
      purchase: "$840.00",
      selling: "$1,299.00",
      qty: "142",
      qtyTone: "normal",
    },
    {
      id: 2,
      icon: "chair",
      name: "ErgoDesk Task Chair",
      subtitle: "Midnight Mesh",
      sku: "FRN-ERG-01",
      category: "Furniture",
      supplier: "Comfort Dynamics",
      purchase: "$185.00",
      selling: "$349.99",
      qty: "8",
      qtyTone: "critical",
    },
    {
      id: 3,
      icon: "bolt",
      name: "PowerLink 20k Hub",
      subtitle: "Anodized Black",
      sku: "PWR-LNK-HUB20",
      category: "Electronics",
      supplier: "Nexus Logistics",
      purchase: "$42.50",
      selling: "$89.00",
      qty: "2,410",
      qtyTone: "normal",
    },
    {
      id: 4,
      icon: "square_foot",
      name: "Precision Level Tool",
      subtitle: "Industrial Grade",
      sku: "HDW-LEV-32",
      category: "Hardware",
      supplier: "BuildMaster Inc",
      purchase: "$12.20",
      selling: "$24.95",
      qty: "85",
      qtyTone: "normal",
    },
  ];

  return (
    <div className="min-h-screen bg-surface">
      <header className="sticky top-0 w-full z-40 bg-surface/80 backdrop-blur-md flex justify-between items-center px-8 py-4">
        <div className="flex items-center gap-4">
          <h2 className="font-headline font-bold text-2xl tracking-tight text-on-surface">
            Product Catalog
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-sm">
              search
            </span>
            <input
              className="bg-surface-container-highest border-none rounded-sm py-2 pl-10 pr-4 text-sm w-64 focus:ring-1 focus:ring-primary/20 placeholder:text-outline-variant"
              placeholder="Global Search..."
              type="text"
            />
          </div>
          <button className="p-2 hover:bg-surface-container-low rounded-full transition-colors relative">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
          </button>
          <button className="p-2 hover:bg-surface-container-low rounded-full transition-colors">
            <span className="material-symbols-outlined">help_outline</span>
          </button>
        </div>
      </header>

      <div className="px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="md:col-span-2 bg-surface-container-lowest p-6 rounded-lg border border-outline-variant/10 flex flex-col justify-between overflow-hidden relative group">
            <div className="z-10">
              <p className="text-[10px] font-medium text-outline uppercase tracking-widest mb-1">
                Total Inventory Value
              </p>
              <h3 className="text-4xl font-headline font-extrabold text-on-surface">
                $1,284,592.00
              </h3>
              <div className="mt-4 flex items-center gap-2">
                <span className="flex items-center text-on-tertiary-container text-xs font-bold bg-tertiary-fixed/20 px-2 py-1 rounded-full">
                  <span className="material-symbols-outlined text-xs mr-1">
                    trending_up
                  </span>
                  +12.4%
                </span>
                <span className="text-xs text-outline">vs last month</span>
              </div>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-5 transition-transform group-hover:scale-110">
              <span className="material-symbols-outlined text-9xl">payments</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-6 rounded-lg border border-outline-variant/10">
            <p className="text-[10px] font-medium text-outline uppercase tracking-widest mb-1">
              Total SKUs
            </p>
            <h3 className="text-3xl font-headline font-bold text-on-surface">
              12,482
            </h3>
            <p className="text-xs text-outline mt-2">Active across 8 regions</p>
          </div>

          <div className="bg-surface-container-lowest p-6 rounded-lg border border-outline-variant/10">
            <p className="text-[10px] font-medium text-outline uppercase tracking-widest mb-1">
              Low Stock Alerts
            </p>
            <h3 className="text-3xl font-headline font-bold text-error">42</h3>
            <button className="text-xs font-bold text-primary mt-2 flex items-center hover:underline">
              Review Now
              <span className="material-symbols-outlined text-xs ml-1">
                arrow_forward
              </span>
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 bg-surface-container-low p-4 rounded-lg">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <select className="appearance-none bg-surface-container-lowest border-none rounded-md py-2 pl-4 pr-10 text-xs font-medium focus:ring-1 focus:ring-primary/20 text-on-surface">
                <option>Category: All</option>
                <option>Electronics</option>
                <option>Hardware</option>
                <option>Furniture</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-sm pointer-events-none">
                expand_more
              </span>
            </div>

            <div className="relative">
              <select className="appearance-none bg-surface-container-lowest border-none rounded-md py-2 pl-4 pr-10 text-xs font-medium focus:ring-1 focus:ring-primary/20 text-on-surface">
                <option>Supplier: All</option>
                <option>Apex Corp</option>
                <option>Nexus Logistics</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-sm pointer-events-none">
                expand_more
              </span>
            </div>

            <div className="relative">
              <select className="appearance-none bg-surface-container-lowest border-none rounded-md py-2 pl-4 pr-10 text-xs font-medium focus:ring-1 focus:ring-primary/20 text-on-surface">
                <option>Stock Level: All</option>
                <option>Critical (&lt;10)</option>
                <option>Healthy</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-sm pointer-events-none">
                expand_more
              </span>
            </div>
          </div>

          <button className="signature-gradient text-on-primary px-6 py-2.5 rounded-md text-sm font-bold flex items-center gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-black/10">
            <span className="material-symbols-outlined text-sm">add</span>
            Add New Product
          </button>
        </div>

        <div className="bg-surface-container-lowest rounded-lg border border-outline-variant/10 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-container">
              <tr>
                <th className="px-6 py-4 text-[10px] font-bold text-outline uppercase tracking-widest">
                  Product Name
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-outline uppercase tracking-widest">
                  SKU
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-outline uppercase tracking-widest">
                  Category
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-outline uppercase tracking-widest">
                  Supplier
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-outline uppercase tracking-widest text-right">
                  Purchase
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-outline uppercase tracking-widest text-right">
                  Selling
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-outline uppercase tracking-widest text-right">
                  Qty
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-outline uppercase tracking-widest text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-surface-container-low transition-colors group"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-surface-container-high rounded-md flex items-center justify-center">
                        <span className="material-symbols-outlined text-outline">
                          {product.icon}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-on-surface text-sm">
                          {product.name}
                        </p>
                        <p className="text-[10px] text-outline">
                          {product.subtitle}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm font-mono text-outline">
                    {product.sku}
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container uppercase">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-sm">{product.supplier}</td>
                  <td className="px-6 py-5 text-sm text-right font-medium tabular-nums">
                    {product.purchase}
                  </td>
                  <td className="px-6 py-5 text-sm text-right font-bold tabular-nums">
                    {product.selling}
                  </td>
                  <td
                    className={`px-6 py-5 text-sm text-right tabular-nums ${
                      product.qtyTone === "critical"
                        ? "text-error font-bold"
                        : "text-on-surface"
                    }`}
                  >
                    {product.qty}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex justify-center items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        className="p-2 hover:bg-surface-container-highest rounded-md text-on-surface-variant transition-colors"
                        title="View"
                      >
                        <span className="material-symbols-outlined text-sm">
                          visibility
                        </span>
                      </button>
                      <button
                        className="p-2 hover:bg-surface-container-highest rounded-md text-on-surface-variant transition-colors"
                        title="Edit"
                      >
                        <span className="material-symbols-outlined text-sm">
                          edit
                        </span>
                      </button>
                      <button
                        className="p-2 hover:bg-error-container/20 rounded-md text-error transition-colors"
                        title="Delete"
                      >
                        <span className="material-symbols-outlined text-sm">
                          delete
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="px-6 py-4 bg-surface-container-low flex items-center justify-between">
            <span className="text-xs text-outline font-medium">
              Showing 1 to 4 of 42 entries
            </span>
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-outline-variant/30 rounded-md text-xs font-medium bg-surface-container-lowest text-outline hover:bg-surface-container-high transition-colors">
                Previous
              </button>
              <button className="px-3 py-1 bg-primary text-on-primary rounded-md text-xs font-bold">
                1
              </button>
              <button className="px-3 py-1 border border-outline-variant/30 rounded-md text-xs font-medium bg-surface-container-lowest text-on-surface hover:bg-surface-container-high transition-colors">
                2
              </button>
              <button className="px-3 py-1 border border-outline-variant/30 rounded-md text-xs font-medium bg-surface-container-lowest text-on-surface hover:bg-surface-container-high transition-colors">
                3
              </button>
              <button className="px-3 py-1 border border-outline-variant/30 rounded-md text-xs font-medium bg-surface-container-lowest text-outline hover:bg-surface-container-high transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCatalog;
