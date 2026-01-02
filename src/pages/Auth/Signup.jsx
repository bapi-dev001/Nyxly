import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  CheckCircle, 
  ChevronLeft, 
  ShieldCheck 
} from "lucide-react";

export default function Signup() {

  const navigate = useNavigate();
  const { register } = useAuth();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    fullName: "",
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!formData.email) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
    }, 1500);
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(3);
    }, 1500);
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const result = await register(
      formData.username, 
      formData.fullName, 
      formData.email, 
      formData.password
    );

    setIsLoading(false);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }
  };

  const progress = (step / 3) * 100;

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-[#050505] relative overflow-hidden transition-colors duration-500">
      
      <div className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-purple-300/40 dark:bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-125 h-125 bg-blue-300/40 dark:bg-blue-600/20 rounded-full blur-[120px]" />

      <div className="relative z-10 w-full max-w-105 mx-4">

        <div className="bg-white/70 dark:bg-white/5 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-2xl rounded-3xl overflow-hidden p-8 transition-all duration-300">
          
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              {step > 1 ? (
                <button onClick={() => setStep(step - 1)} className="p-2 -ml-2 rounded-full hover:bg-gray-200/50 dark:hover:bg-white/10 transition-colors">
                  <ChevronLeft size={24} className="text-gray-700 dark:text-white" />
                </button>
              ) : (
                <div className="w-6" />
              )}

              <div className="flex flex-col items-end">
                <span className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">
                  Step {step} of 3
                </span>
                <div className="w-24 h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-linear-to-r from-purple-500 to-blue-500 transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight mb-2">
              {step === 1 && "Let's Get Started"}
              {step === 2 && "Verify Identity"}
              {step === 3 && "Complete Profile"}
            </h1>

            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm text-center">
                {error}
              </div>
            )}

            <p className="text-sm text-gray-500 dark:text-gray-400">
              {step === 1 && "Enter your email to begin your journey."}
              {step === 2 && `We sent a code to ${formData.email}`}
              {step === 3 && "Choose how you appear to others."}
            </p>
          </div>

          {step === 1 && (
            <form onSubmit={handleEmailSubmit} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">Email or Phone</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-purple-500 transition-colors" size={20} />
                  <input 
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-gray-900 dark:text-white outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder:text-gray-400"
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={!formData.email || isLoading}
                className="w-full bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2 group transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Continue <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleOtpSubmit} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-500/20 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <ShieldCheck size={32} />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">Confirmation Code</label>
                <input 
                  type="text"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  placeholder="X X X X X X"
                  className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl py-3.5 text-center text-2xl tracking-[0.5em] font-bold text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-300 dark:placeholder:text-gray-600"
                  maxLength={6}
                />
              </div>

              <button 
                type="submit"
                disabled={!formData.otp || isLoading}
                className="w-full bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 group transition-all disabled:opacity-50"
              >
                {isLoading ? "Verifying..." : "Verify Code"}
              </button>

              <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                Didn't receive it? <button type="button" onClick={() => setStep(1)} className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Resend</button>
              </p>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleFinalSubmit} className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              
              <div className="relative group">
                <User className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-purple-500 transition-colors" size={20} />
                <input 
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-gray-900 dark:text-white outline-none focus:border-purple-500 transition-all placeholder:text-gray-400"
                />
              </div>

              <div className="relative group">
                <span className="absolute left-4 top-3.5 text-gray-400 font-bold group-focus-within:text-purple-500 transition-colors">@</span>
                <input 
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-gray-900 dark:text-white outline-none focus:border-purple-500 transition-all placeholder:text-gray-400"
                />
                {formData.username.length > 3 && (
                  <CheckCircle size={18} className="absolute right-4 top-4 text-green-500" />
                )}
              </div>

              <div className="relative group">
                <Lock className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-purple-500 transition-colors" size={20} />
                <input 
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-gray-900 dark:text-white outline-none focus:border-purple-500 transition-all placeholder:text-gray-400"
                />
              </div>

              <div className="pt-2">
                <button 
                  type="submit"
                  disabled={!formData.fullName || !formData.password || isLoading}
                  className="w-full bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2 group transition-all disabled:opacity-50"
                >
                  {isLoading ? "Creating Account..." : "Complete Signup"}
                </button>
              </div>

              <p className="text-xs text-center text-gray-400 dark:text-gray-500 mt-4 leading-relaxed px-2">
                By signing up, you agree to our Terms, Privacy Policy and Cookies Policy.
              </p>
            </form>
          )}

        </div>

        <div className="mt-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Already have an account?
            <Link 
              to="/auth/login"
              className="ml-2 text-purple-600 dark:text-purple-400 font-bold hover:underline transition-all"
            >
              Log In
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}