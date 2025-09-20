import {  Sparkles, ArrowRight , Linkedin, Twitter, Github} from 'lucide-react';
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { features, quickActions } from "../utils/Data.jsx";
import Footer from '../components/Footer.jsx';
import {useNavigate} from "react-router-dom"

export default function LandingPage() {

const navigate = useNavigate();
  // Framer Motion variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.12, duration: 0.7, type: "spring" }
    })
  };

  return (
    <div className="bg-gradient-to-b from-[#0b0a09] via-[#342e24] to-[#0a0a0a] text-white min-h-screen flex flex-col relative overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="flex-1 flex flex-col justify-center items-center text-center pt-24 pb-12 px-4 relative z-10">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-7xl gap-2 font-black mb-6 leading-tight"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <span className="block bg-gradient-to-r from-white via-gray-100 to-gray-200 bg-clip-text text-transparent mb-2">
            Chat & Code with AI 
          </span>
          & Friends
          <span className="inline-block mt-4">
            <Sparkles className="w-10 h-10 text-[#D97757] animate-pulse drop-shadow-2xl" />
          </span>
        </motion.h1>
        <motion.p
          className="text-lg md:text-2xl max-w-3xl mx-auto mb-8 text-gray-200 font-light"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          custom={2}
        >
          Code, chat, and collaborate with your AI teammate. Build smarter, ship faster — all in one place.
        </motion.p>
        <motion.div
          className="flex items-center justify-center mb-10"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          custom={3}
        >
          <div className="px-5 py-2 bg-white/10 backdrop-blur-md border border-[#D97757]/30 text-[#D97757] rounded-2xl text-xs font-medium flex items-center gap-2 shadow-xl hover:shadow-[#D97757]/20 hover:bg-white/20 transition-all duration-300">
            <Sparkles className="w-4 h-4 animate-pulse" />
            Powered by Google Gemini AI
          </div>
        </motion.div>
        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 w-full max-w-lg mx-auto justify-center mb-12"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          custom={4}
        >
          <button onClick={()=>navigate('/login')} className="group relative px-8 py-4 text-lg font-bold rounded-2xl text-white bg-gradient-to-r from-[#D97757] to-orange-400 hover:from-orange-400 hover:to-[#D97757] transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-[#D97757]/40 flex items-center justify-center gap-3 focus:outline-none focus:ring-2 focus:ring-[#D97757]/40">
            Get Started
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
          <a
            href="https://github.com/iamJ3/Chat2Code"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 text-lg font-bold rounded-2xl bg-white/10 border border-white/20 text-white hover:bg-[#D97757]/20 hover:border-[#D97757]/40 transition-all duration-300 flex items-center justify-center gap-3 transform hover:scale-105 shadow-xl focus:outline-none focus:ring-2 focus:ring-[#D97757]/40"
          >
            View on GitHub <Github/>
          </a>
        </motion.div>
        {/* Quick Actions */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          custom={5}
        >
          {quickActions.map((action, idx) => (
            <motion.div
              key={idx}
              className="group flex flex-col items-center gap-2 p-4 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/10 hover:bg-[#D97757]/10 hover:border-[#D97757]/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl cursor-pointer"
              whileHover={{ scale: 1.07 }}
              tabIndex={0}
              aria-label={action.label}
            >
              <div className="group-hover:scale-110 transition-transform duration-300">
                {action.icon}
              </div>
              <span className="text-sm font-medium text-center">{action.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-20 lg:py-24 relative z-10">
        <motion.div
          className="text-center mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
            Explore Our Features
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-[#D97757] to-orange-400 rounded-full mx-auto"></div>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              className={`group relative rounded-2xl p-8 flex flex-col items-center text-center space-y-6 shadow-2xl border border-white/10 hover:border-[#D97757]/30 transition-all duration-500 transform hover:scale-105 hover:shadow-3xl backdrop-blur-lg bg-gradient-to-br ${feature.gradient} hover:bg-[#D97757]/10 cursor-pointer`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              custom={idx + 1}
              tabIndex={0}
              aria-label={feature.title}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/3 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500"></div>
              <div className="relative z-10 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
              <p className="text-gray-300 text-base leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-20 z-10">
        <motion.div
          className="text-center mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl md:text-4xl font-black mb-4 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
            How It Works
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-[#D97757] to-orange-400 rounded-full mx-auto"></div>
        </motion.div>
        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-8">
          {[
            { step: "1", title: "Sign Up", desc: "Create your free account and join the community." },
            { step: "2", title: "Start a Chat or Project", desc: "Open a chat, invite collaborators, and start building together." },
            { step: "3", title: "Build and Chat", desc: "Use AI for guide, debug and generate your code faster than ever." }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              className="flex-1 relative group"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              custom={idx + 1}
              tabIndex={0}
              aria-label={item.title}
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center h-full border border-white/10 hover:border-[#D97757]/30 hover:bg-[#D97757]/10 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl cursor-pointer">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#D97757] to-orange-400 rounded-full text-2xl font-bold mb-6 shadow-xl">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">{item.title}</h3>
                <p className="text-gray-300 text-base leading-relaxed">{item.desc}</p>
              </div>
              {/* Connection line for desktop */}
              {idx < 2 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-[#D97757] to-orange-400 transform -translate-y-1/2 opacity-60"></div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
     <Footer/>
    </div>
  );
}