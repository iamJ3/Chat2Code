import { Bot } from 'lucide-react'

const Navbar = () => {
  return (
    <div>
        <nav className="w-full flex items-center justify-between px-4 sm:px-8 py-4 fixed top-0 left-0 z-50 backdrop-blur-xl bg-black/30 border-b border-white/10">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="relative">
            <Bot className="w-8 h-8 text-[#D97757] group-hover:scale-110 transition-all duration-300" />
            <div className="absolute inset-0 bg-[#D97757]/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
            Chat<span className="text-[#D97757]">2</span>Code
          </span>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-2xl bg-white/10 border border-white/10 text-white font-medium hover:bg-[#D97757]/20 hover:border-[#D97757]/40 transition-all duration-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#D97757]/40">
            Login
          </button>
          <button className="px-4 py-2 rounded-2xl bg-gradient-to-r from-[#D97757] to-orange-400 text-white font-medium shadow-lg hover:shadow-[#D97757]/30 transition-all duration-300 transform hover:scale-105 text-sm focus:outline-none focus:ring-2 focus:ring-[#D97757]/40">
            Sign Up
          </button>
        </div>
      </nav>
    </div>
  )
}

export default Navbar