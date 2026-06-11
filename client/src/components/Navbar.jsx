import React from 'react';

export default function Navbar({ setActiveCategory, activeCategory }) {
  const categories = ['All', 'Smartphones', 'Laptops'];

  return (
    <nav className="bg-slate-900 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Brand Title */}
          <div className="flex-shrink-0" onClick={() => setActiveCategory('All')}>
            <span className="text-2xl font-black tracking-wider text-blue-400 cursor-pointer">
              Any<span className="text-white">Gadget</span>
            </span>
          </div>

          {/* Dynamic Interactive Navigation Links */}
          <div className="hidden md:flex space-x-8 font-medium">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`transition-colors capitalize ${
                  (activeCategory === cat) ? 'text-blue-400 font-bold' : 'text-slate-300 hover:text-blue-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Action Buttons (Cart / Profile) */}
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-slate-300 hover:text-white transition-colors">
              🛒 <span className="absolute -top-1 -right-1 bg-blue-500 text-xs text-white rounded-full h-4 w-4 flex items-center justify-center font-bold">0</span>
            </button>
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-lg text-sm font-semibold transition-all shadow-sm">
              Login
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}