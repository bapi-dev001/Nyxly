import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight, LogIn } from "lucide-react";
import { useAuth } from "../../context/AuthContext"
import { useState } from "react";

export default function Login() {

  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handelSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const result = await login(email, password);
    if(result.success){
      navigate('/');
    } else {
      setError(result.message);
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-[#050505] relative overflow-hidden transition-colors duration-500">
      
      <div className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-purple-300/40 dark:bg-purple-600/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-125 h-125 bg-blue-300/40 dark:bg-blue-600/20 rounded-full blur-[120px]" />

      <div className="relative z-10 w-full max-w-105 mx-4">
        
        <div className="bg-white/70 dark:bg-white/5 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-2xl rounded-3xl overflow-hidden p-8">

          <div className="mb-10 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-linear-to-tr from-purple-600 to-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-purple-500/30">
                <LogIn size={24} />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight mb-2">
              Welcome Back
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your credentials to access your account.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handelSubmit}>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-purple-500 transition-colors" size={20} />
                <input 
                  type="email"
                  placeholder="name@example.com"
                  className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-gray-900 dark:text-white outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder:text-gray-400"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Password</label>
                <a href="#" className="text-xs text-purple-600 dark:text-purple-400 font-bold hover:underline">Forgot?</a>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-purple-500 transition-colors" size={20} />
                <input 
                  type="password"
                  placeholder="Enter your password"
                  className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-gray-900 dark:text-white outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder:text-gray-400"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2 group transition-all"
            >
              Sign In <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>

          </form>

        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Don't have an account?
            <Link 
              to="/auth/signup"
              className="ml-2 text-purple-600 dark:text-purple-400 font-bold hover:underline transition-all"
            >
              Create Account
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}