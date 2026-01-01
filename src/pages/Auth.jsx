import { useState } from "react";
import { Instagram, Mail, Lock, User, ArrowRight } from "lucide-react";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#050505] relative overflow-hidden">
      {/* Creative Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-purple-600/30 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-125 h-125 bg-blue-600/20 rounded-full blur-[120px]" />

      {/* Main Glass Card */}
      <div className="relative z-10 w-full max-w-100 p-8 mx-4 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
        
        {/* Logo Area */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-linear-to-tr from-yellow-400 via-red-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 rotate-12 shadow-lg">
            <Instagram className="text-white w-10 h-10 -rotate-12" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            {isLogin ? "Welcome Back" : "Join the Club"}
          </h1>
          <p className="text-gray-400 text-sm mt-2 text-center">
            {isLogin ? "Enter your credentials to access your feed" : "Create an account to start sharing moments"}
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          {!isLogin && (
            <div className="relative group">
              <User className="absolute left-3 top-3 text-gray-500 group-focus-within:text-purple-500 transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Full Name" 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all"
              />
            </div>
          )}

          <div className="relative group">
            <Mail className="absolute left-3 top-3 text-gray-500 group-focus-within:text-purple-500 transition-colors" size={20} />
            <input 
              type="email" 
              placeholder="Email address" 
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all"
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-3 top-3 text-gray-500 group-focus-within:text-purple-500 transition-colors" size={20} />
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all"
            />
          </div>

          <button className="w-full bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-3 rounded-xl mt-4 flex items-center justify-center gap-2 group transition-all">
            {isLogin ? "Sign In" : "Create Account"}
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        {/* Toggle link */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-purple-400 font-bold hover:underline"
            >
              {isLogin ? "Sign Up" : "Log In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}