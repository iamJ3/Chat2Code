import { 
  Bot, Users, ShieldCheck, Sparkles, ArrowRight, TerminalSquare, Linkedin, Twitter 
} from 'lucide-react';

const quickActions = [
    { icon: <Sparkles className="w-6 h-6 text-[#D97757]" />, label: "Generate Code" },
    { icon: <Bot className="w-6 h-6 text-[#D97757]" />, label: "Chat with AI" },
    { icon: <TerminalSquare className="w-6 h-6 text-[#D97757]" />, label: "Run Code" },
    { icon: <Users className="w-6 h-6 text-[#D97757]" />, label: "Talk to Friends" },
  ];

  const features = [
    {
      title: "AI Code Generation",
      desc: "Let AI (powered by Google Gemini) write code for you, from snippets to full modules. Save time and focus on what matters.",
      icon: <Sparkles className="w-10 h-10 text-[#D97757]" />,
      gradient: "from-[#D97757]/10 to-[#D97757]/5"
    },
    {
      title: "Talk to AI, Instantly",
      desc: "Ask questions, get explanations, and brainstorm ideas with your AI assistant, right in your workspace. Powered by Gemini.",
      icon: <Bot className="w-10 h-10 text-[#D97757]" />,
      gradient: "from-[#D97757]/10 to-[#D97757]/5"
    },
    {
      title: "Run & Test JS Code in Browser",
      desc: "No setup needed. Instantly run and test your code in a secure, isolated environment.",
      icon: <TerminalSquare className="w-10 h-10 text-[#D97757]" />,
      gradient: "from-[#D97757]/10 to-[#D97757]/5"
    },
    {
      title: "Collaborate with Friends & AI",
      desc: "Invite friends, pair-program, and chat with AI together. The ultimate team coding experience.",
      icon: <Users className="w-10 h-10 text-[#D97757]" />,
      gradient: "from-[#D97757]/10 to-[#D97757]/5"
    },
    {
      title: "Secure & Private",
      desc: "Your conversations and code are always encrypted and safe. Privacy is our top priority.",
      icon: <ShieldCheck className="w-10 h-10 text-[#D97757]" />,
      gradient: "from-[#D97757]/10 to-[#D97757]/5"
    },
    {
      title: "Multi-Modal Support",
      desc: "Chat, code, and collaborate with support for text, code, and more—all in one place.",
      icon: <Sparkles className="w-10 h-10 text-[#D97757]" />,
      gradient: "from-[#D97757]/10 to-[#D97757]/5"
    },
  ];
 export { quickActions, features };