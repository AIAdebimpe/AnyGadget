import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import API from './api';

function App() {
  // 1. Reactive buckets to hold our live database assets
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. Fetch the database items when the app boots up
  useEffect(() => {
    const fetchLiveCatalog = async () => {
      try {
        setLoading(true);
        const response = await API.get('/products');
        // Save the array returned by our Express controller into React state
        setProducts(response.data.products);
        setError(null);
      } catch (err) {
        console.error("API Fetch Error:", err);
        setError("Failed to stream live inventory from AnyGadget servers.");
      } finally {
        setLoading(false);
      }
    };

    fetchLiveCatalog();
  }, []);

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

        {/* ⏳ CASE A: Waiting for backend database response */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-slate-500 mt-4 font-medium">Syncing with cloud inventory database...</p>
          </div>
        )}

        {/* ❌ CASE B: Backend server is offline or network broke */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-center font-medium max-w-xl mx-auto">
            {error}
          </div>
        )}

        {/* 📦 CASE C: Database connected perfectly, but your catalog is currently empty */}
        {!loading && !error && products.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300">
            <p className="text-slate-500 font-medium">No active gadgets found in the catalog.</p>
          </div>
        )}

        {/* 🚀 CASE D: Clean delivery of live database items */}
        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product._id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-500 bg-blue-50 px-2.5 py-1 rounded-md">
                    {product.category}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-3 mb-1">{product.name}</h3>
                  <p className="text-xs text-slate-500 mb-4 line-clamp-2">{product.description}</p>
                </div>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
                  {/* Safely format numbers into clean currency strings */}
                  <span className="text-xl font-black text-slate-900">${product.price.toLocaleString()}</span>
                  <button className="bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;