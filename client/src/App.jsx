import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import API from './api';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // New track: Keep an eye on what collection category the user is viewing
  const [activeCategory, setActiveCategory] = useState('All');

  // Re-run this effect block whenever the user changes the activeCategory value!
  useEffect(() => {
    const fetchLiveCatalog = async () => {
      try {
        setLoading(true);
        
        // Build the query parameter line (e.g., /products?category=laptops)
        let endpoint = '/products';
        if (activeCategory !== 'All') {
          endpoint = `/products?category=${activeCategory.toLowerCase()}`;
        }

        const response = await API.get(endpoint);
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
  }, [activeCategory]); // ◄── Re-trigger the API stream whenever this tracking variable shifts

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased">
      {/* Feed Category parameters down as reactive props */}
      <Navbar setActiveCategory={setActiveCategory} activeCategory={activeCategory} />

      {/* Hero Spotlight Section */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white py-16 px-4 text-center shadow-inner">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Upgrade Your Digital Ecosystem
          </h1>
          <p className="text-lg text-slate-300 mb-6">
            Explore the latest high-performance laptops and smartphones curated specifically for power users.
          </p>
          <div className="flex justify-center gap-3">
            <span className="bg-slate-800/80 backdrop-blur text-blue-400 border border-slate-700/50 text-xs font-semibold px-4 py-2 rounded-full shadow-sm">
              Showing Segment: <span className="text-white capitalize font-bold">{activeCategory}</span>
            </span>
          </div>
        </div>
      </header>

      {/* Main Catalog Showcase Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-8 capitalize">
          Current {activeCategory} Collections
        </h2>

        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-slate-500 mt-4 font-medium">Filtering database records...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-center font-medium max-w-xl mx-auto">
            {error}
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300 max-w-xl mx-auto">
            <p className="text-slate-500 font-medium mb-1">No gadgets match this category yet.</p>
            <p className="text-xs text-slate-400">Use Postman to upload an item with a category value of "{activeCategory.toLowerCase()}".</p>
          </div>
        )}

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