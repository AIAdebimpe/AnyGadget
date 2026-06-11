import React from 'react';
import Navbar from './components/Navbar';

function App() {
  // Temporary mock data to test out our custom responsive visual styles
  const mockProducts = [
    { id: 1, name: "MacBook Pro 16", price: "$2,499", category: "Laptops", spec: "M3 Max / 36GB" },
    { id: 2, name: "iPhone 15 Pro Max", price: "$1,199", category: "Smartphones", spec: "256GB / Titanium" },
    { id: 3, name: "Galaxy S24 Ultra", price: "$1,299", category: "Smartphones", spec: "512GB / AI Camera" },
    { id: 4, name: "Dell XPS 15", price: "$1,899", category: "Laptops", spec: "Intel i9 / 32GB" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased">
      {/* Dynamic Header Component */}
      <Navbar />

      {/* Hero Spotlight Section */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white py-16 px-4 text-center shadow-inner">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Upgrade Your Digital Ecosystem
          </h1>
          <p className="text-lg text-slate-300 mb-6">
            Explore the latest high-performance laptops and smartphones curated specifically for power users.
          </p>
          <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-blue-500/20">
            Browse Live Inventory
          </button>
        </div>
      </header>

      {/* Main Catalog Showcase Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-8">
          Featured Premium Gadgets
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockProducts.map((product) => (
            <div key={product.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-500 bg-blue-50 px-2.5 py-1 rounded-md">
                  {product.category}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-3 mb-1">{product.name}</h3>
                <p className="text-xs text-slate-500 mb-4">{product.spec}</p>
              </div>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
                <span className="text-xl font-black text-slate-900">{product.price}</span>
                <button className="bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;