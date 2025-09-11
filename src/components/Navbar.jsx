import { Bot, Menu, X } from 'lucide-react'
import React, { useState } from 'react'

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="w-full flex items-center justify-between px-4 sm:px-8 py-4 fixed top-0 left-0 z-50 backdrop-blur-xl bg-black/30 border-b border-white/10">
      {/* Logo */}
      <div className="flex items-center gap-3 group cursor-pointer">
        <div className="relative">
          <Bot className="w-8 h-8 text-[#D97757] group-hover:scale-110 transition-all duration-300" />
          <div className="absolute inset-0 bg-[#D97757]/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
          Chat<span className="text-[#D97757]">2</span>Code
        </span>
      </div>

      {/* Desktop Buttons */}
      <div className="hidden sm:flex gap-3">
        <button className="px-4 py-2 rounded-2xl bg-white/10 border border-white/10 text-white font-medium hover:bg-[#D97757]/20 hover:border-[#D97757]/40 transition-all duration-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#D97757]/40">
          <a href="/login">Login</a>
        </button>
        <button className="px-4 py-2 rounded-2xl bg-gradient-to-r from-[#D97757] to-orange-400 text-white font-medium shadow-lg hover:shadow-[#D97757]/30 transition-all duration-300 transform hover:scale-105 text-sm focus:outline-none focus:ring-2 focus:ring-[#D97757]/40">
           <a href="/register">Sign Up</a>
        </button>
      </div>

      {/* Mobile Hamburger */}
      <button
        className="sm:hidden p-2 rounded-lg hover:bg-white/10 transition"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
      >
        {mobileOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
      </button>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="absolute top-full left-0 w-full bg-black/90 backdrop-blur-xl border-b border-white/10 flex flex-col items-center gap-2 py-4 sm:hidden z-50 animate-fade-in-down">
          <button className="w-11/12 px-4 py-3 rounded-2xl bg-white/10 border border-white/10 text-white font-medium hover:bg-[#D97757]/20 hover:border-[#D97757]/40 transition-all duration-300 text-base focus:outline-none focus:ring-2 focus:ring-[#D97757]/40">
          <a href="/login">Login</a>
          </button>
          <button className="w-11/12 px-4 py-3 rounded-2xl bg-gradient-to-r from-[#D97757] to-orange-400 text-white font-medium shadow-lg hover:shadow-[#D97757]/30 transition-all duration-300 transform hover:scale-105 text-base focus:outline-none focus:ring-2 focus:ring-[#D97757]/40">
          <a href="/register">Sign Up</a>
          </button>
        </div>
      )}
    </nav>
  )
}

export default Navbar