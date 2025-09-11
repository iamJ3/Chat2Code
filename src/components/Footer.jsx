import { Linkedin, Twitter,Github } from 'lucide-react'
import React from 'react'

const Footer = () => {
  return (
    <div> <footer className="w-full py-10 border-t border-white/10 text-center text-gray-400 mt-auto relative backdrop-blur-lg bg-white/5 z-10">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-col items-center gap-6">
            <span className="text-sm font-medium">&copy; {new Date().getFullYear()} Chat2Code. All rights reserved.</span>
            <span className="text-sm">
              Made by{' '}
              <a
                href="https://x.com/Nitaj333"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D97757] hover:text-orange-400 transition-colors duration-300 font-semibold focus:outline-none focus:underline"
              >
                Jatin Sharma
              </a>
            </span>
            <div className="flex gap-6 mt-2">
              <a
                href="https://x.com/Nitaj333"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-white/10 hover:bg-[#D97757]/10 border border-white/10 hover:border-[#D97757]/20 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#D97757]/30"
                aria-label="X (Twitter)"
              >
                <Twitter className="w-5 h-5 text-gray-400 hover:text-[#D97757] transition-colors duration-300" />
              </a>
              <a
                href="https://www.linkedin.com/in/jatin-sharma69/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-white/10 hover:bg-[#D97757]/10 border border-white/10 hover:border-[#D97757]/20 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#D97757]/30"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-gray-400 hover:text-[#D97757] transition-colors duration-300" />
              </a>
              <a
                href="https://github.com/iamJ3"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-white/10 hover:bg-[#D97757]/10 border border-white/10 hover:border-[#D97757]/20 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#D97757]/30"
                aria-label="Github"
              >
                <Github className="w-5 h-5 text-gray-400 hover:text-[#D97757] transition-colors duration-300" />
              </a>
            </div>
          </div>
        </div>
      </footer></div>
  )
}

export default Footer