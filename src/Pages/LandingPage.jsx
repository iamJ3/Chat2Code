import React from "react";
import { Link } from "react-router-dom";
import { 
  Bot, Users, ShieldCheck, Sparkles, ArrowRight, TerminalSquare, Linkedin, Twitter 
} from 'lucide-react';

export default function LandingPage() {
  const quickActions = [
    { icon: <Sparkles className="w-7 h-7 text-yellow-400" />, label: "Generate Code" },
    { icon: <Bot className="w-7 h-7 text-purple-400" />, label: "Chat with AI" },
    { icon: <TerminalSquare className="w-7 h-7 text-blue-400" />, label: "Run Code" },
    { icon: <Users className="w-7 h-7 text-pink-400" />, label: "Talk to Friends" },
  ];

  const features = [
    {
      title: "AI Code Generation",
      desc: "Let AI (powered by Google Gemini) write code for you, from snippets to full modules. Save time and focus on what matters.",
      icon: <Sparkles className="w-12 h-12 text-yellow-400" />,
      bg: "bg-gradient-to-br from-yellow-900/20 to-yellow-800/10",
      section: "AI Code Generation"
    },
    {
      title: "Talk to AI, Instantly",
      desc: "Ask questions, get explanations, and brainstorm ideas with your AI assistant, right in your workspace. Powered by Gemini.",
      icon: <Bot className="w-12 h-12 text-purple-400" />,
      bg: "bg-gradient-to-br from-purple-900/20 to-purple-800/10",
      section: "AI Chat Assistant"
    },
    {
      title: "Run & Test Code in Browser",
      desc: "No setup needed. Instantly run and test your code in a secure, isolated environment.",
      icon: <TerminalSquare className="w-12 h-12 text-blue-400" />,
      bg: "bg-gradient-to-br from-blue-900/20 to-blue-800/10",
      section: "Run & Test Code"
    },
    {
      title: "Collaborate with Friends & AI",
      desc: "Invite friends, pair-program, and chat with AI together. The ultimate team coding experience.",
      icon: <Users className="w-12 h-12 text-pink-400" />,
      bg: "bg-gradient-to-br from-pink-900/20 to-pink-800/10",
      section: "Real-Time Collaboration"
    },
    {
      title: "Secure & Private",
      desc: "Your conversations and code are always encrypted and safe. Privacy is our top priority.",
      icon: <ShieldCheck className="w-12 h-12 text-green-400" />,
      bg: "bg-gradient-to-br from-green-900/20 to-green-800/10",
      section: "Security & Privacy"
    },
    {
      title: "Multi-Modal Support",
      desc: "Chat, code, and collaborate with support for text, code, and more—all in one place.",
      icon: <Sparkles className="w-12 h-12 text-cyan-400" />,
      bg: "bg-gradient-to-br from-cyan-900/20 to-cyan-800/10",
      section: "Multi-Modal Experience"
    },
  ];

  return (
    <div className="bg-gradient-to-b from-[#0f0f15] via-[#151520] to-[#0a0a0f] text-white min-h-screen flex flex-col relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400/30 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-blue-400/40 rounded-full animate-pulse delay-700"></div>
        <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-yellow-400/20 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-pink-400/30 rounded-full animate-pulse delay-300"></div>
      </div>

      {/* Enhanced Navbar */}
      <nav className="w-full flex items-center justify-between px-8 py-5 fixed top-0 left-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10 shadow-2xl">
        <div className="flex items-center gap-3 group">
          <div className="relative">
            <Bot className="w-9 h-9 text-purple-400 group-hover:text-purple-300 transition-colors duration-300" />
            <div className="absolute inset-0 bg-purple-400/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Chat<span className="text-purple-400">2</span>Code
          </span>
        </div>
        <div className="flex gap-4">
          <Link
            to="/login"
            className="px-6 py-2.5 rounded-xl bg-transparent border border-purple-500/50 text-purple-300 font-semibold hover:bg-purple-600/20 hover:border-purple-400 transition-all duration-300 backdrop-blur-sm"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-purple-500 to-blue-500 hover:from-purple-500 hover:to-blue-400 text-white font-semibold shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Enhanced Hero Section */}
      <section className="flex-1 flex flex-col justify-center items-center text-center pt-32 pb-16 relative">
        {/* Background glow effect */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-600/20 via-blue-500/20 to-pink-500/20 rounded-full blur-3xl opacity-30"></div>
        
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 flex items-center justify-center gap-3 leading-tight">
            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              Chat & Code with Friends.
            </span>
            <span className="text-purple-500 flex items-center">
              <Sparkles className="ml-3 w-10 h-10 text-yellow-400 animate-pulse drop-shadow-lg" />
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-12 text-gray-300 leading-relaxed font-light">
            Code, chat, and collaborate with your AI teammate. Build smarter, ship faster — all in one place.
          </p>
          
          {/* Enhanced Gemini badge */}
          <div className="flex items-center justify-center mb-10">
            <div className="px-5 py-2.5 bg-gradient-to-r from-cyan-900/40 to-blue-900/40 backdrop-blur-sm border border-cyan-500/30 text-cyan-300 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg hover:shadow-cyan-500/20 transition-all duration-300">
              <Sparkles className="w-4 h-4 animate-pulse" />
              Powered by Google Gemini AI
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-5 w-full max-w-lg mx-auto justify-center">
            <Link
              to="/register"
              className="group relative px-8 py-4 text-lg font-semibold rounded-2xl text-white cursor-pointer bg-gradient-to-r from-purple-600 via-purple-500 to-blue-500 hover:from-purple-500 hover:to-blue-400 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl hover:shadow-purple-500/30 flex items-center justify-center gap-3"
            >
              Get Started 
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300"></div>
            </Link>
            <a
              href="https://github.com/iamJ3/Chat2Code"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 text-lg font-semibold rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 hover:border-white/30 transition-all duration-300 flex items-center justify-center gap-3 transform hover:scale-105 shadow-lg"
            >
              View on GitHub
            </a>
          </div>
          
          {/* Enhanced Quick Actions */}
          <div className="flex flex-wrap justify-center gap-4 mt-16">
            {quickActions.map((action, idx) => (
              <div
                key={idx}
                className="group flex items-center gap-3 px-6 py-4 bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg border border-white/10 text-base font-medium hover:bg-white/20 hover:border-white/30 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                <div className="group-hover:scale-110 transition-transform duration-300">
                  {action.icon}
                </div>
                <span>{action.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 border-t border-white/10 relative">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Explore Our Features
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={`group relative rounded-3xl p-8 flex flex-col items-center text-center space-y-6 shadow-xl border border-white/10 hover:border-white/20 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl backdrop-blur-sm ${feature.bg}`}
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500"></div>
              
              <div className="relative z-10 group-hover:scale-110 transition-transform duration-300 mb-2">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">{feature.title}</h3>
              <p className="text-gray-300 text-base leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Enhanced How It Works Section */}
      <section className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            How It Works
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto"></div>
        </div>
        
        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-8">
          {[
            { step: "1", title: "Sign Up", desc: "Create your free account and join the community." },
            { step: "2", title: "Start a Chat or Project", desc: "Open a chat, invite collaborators, and start building together." },
            { step: "3", title: "Build and Chat", desc: "Use AI for guide, debug and generate your code faster than ever." }
          ].map((item, idx) => (
            <div key={idx} className="flex-1 relative group">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-8 text-center h-full border border-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-2xl font-bold mb-6 shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">{item.title}</h3>
                <p className="text-gray-300 leading-relaxed">{item.desc}</p>
              </div>
              
              {/* Connection line for desktop */}
              {idx < 2 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transform -translate-y-1/2"></div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="w-full py-10 border-t border-white/10 text-center text-gray-400 mt-auto relative backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col items-center gap-4">
            <span className="text-sm">&copy; {new Date().getFullYear()} Chat2Code. All rights reserved.</span>
            <span className="text-sm">
              Made by{' '}
              <a 
                href="https://www.linkedin.com/in/jatin-sharma-x/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-purple-400 hover:text-purple-300 transition-colors duration-300 font-medium"
              >
                Jatin Sharma
              </a>
              {' '}with <span className="text-red-500 animate-pulse">❤️</span>
            </span>
            
            <div className="flex gap-6 mt-4">
              <a 
                href="https://x.com/iamj3dev" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl" 
                aria-label="X (Twitter)"
              >
                <Twitter className="w-5 h-5 text-gray-400 hover:text-purple-400 transition-colors duration-300" />
              </a>
              <a 
                href="https://www.linkedin.com/in/jatin-sharma-x/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl" 
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-gray-400 hover:text-purple-400 transition-colors duration-300" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Custom animation delays */}
      <style jsx>{`
        .delay-300 { animation-delay: 0.3s; }
        .delay-700 { animation-delay: 0.7s; }
        .delay-1000 { animation-delay: 1s; }
      `}</style>
    </div>
  );
}