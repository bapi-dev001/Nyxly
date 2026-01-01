import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Search, 
  Compass, 
  Film, 
  MessageCircle, 
  Heart, 
  PlusSquare, 
  Menu, 
  Instagram, 
  Moon, 
  Sun, 
  Settings, 
  Activity, 
  Bookmark, 
  LogOut 
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext.jsx";
import CreativeNyxlyNIcon from "../../icons/svgicon/Nyxlyicon.jsx";

// 1. Reusable Nav Item Component
const SidebarItem = ({ icon: Icon, label, to, active }) => {
  return (
    <Link 
      to={to} 
      className="flex items-center p-3 my-1 cursor-pointer hover:bg-(--color-chat-received) rounded-xl transition-all duration-200 group"
    >
      <div className="relative">
        <Icon 
          size={24} 
          className={`group-hover:scale-110 transition-transform duration-200 ${active ? "stroke-[3px]" : "stroke-[2px]"}`} 
        />
        {label === "Messages" && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center border-2 border-(--color-background)">
            3
          </span>
        )}
      </div>
      <span className={`ml-4 text-[16px] hidden xl:block ${active ? "font-bold" : "font-normal"}`}>
        {label}
      </span>
    </Link>
  );
};

export default function Sidebar() {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const { isDark, toggleTheme } = useTheme();

  return (
    <>
      <div className="fixed left-0 top-0 h-screen border-r border-(--color-border) bg-(--color-background) text-(--color-foreground) p-3 flex flex-col w-18 xl:w-60 transition-colors duration-300 z-50">
        
        <Link to="/" className="mb-8 px-3 pt-6 block">
          {/* <img 
            src="https://www.logo.wine/a/logo/Instagram/Instagram-Wordmark-Logo.wine.svg" 
            className={`w-28 hidden xl:block ${isDark ? "invert" : ""}`} 
            alt="Instagram" 
          />
          <Instagram className="w-7 h-7 xl:hidden" /> */}
          <CreativeNyxlyNIcon />
        </Link>

        <nav className="flex-1 overflow-y-auto scrollbar-hide space-y-1">
          <SidebarItem icon={Home} label="Home" to="/" active={currentPath === "/"} />
          <SidebarItem icon={Search} label="Search" to="/search" active={currentPath === "/search"} />
          <SidebarItem icon={Compass} label="Explore" to="/explore" active={currentPath === "/explore"} />
          <SidebarItem icon={Film} label="Reels" to="/reels" active={currentPath === "/reels"} />
          <SidebarItem icon={MessageCircle} label="Messages" to="/messages" active={currentPath === "/messages"} />
          <SidebarItem icon={Heart} label="Notifications" to="/notifications" active={currentPath === "/notifications"} />
          <SidebarItem icon={PlusSquare} label="Create" to="/create" active={currentPath === "/create"} />
          
          <Link to="/profile" className="flex items-center p-3 my-1 cursor-pointer hover:bg-(--color-chat-received) rounded-xl transition-all group">
            <div className={`w-6 h-6 rounded-full overflow-hidden border ${currentPath === "/profile" ? "border-ar(--color-foreground) border-2" : "border-(--color-border)"}`}>
              <img 
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className={`ml-4 text-[16px] hidden xl:block ${currentPath === "/profile" ? "font-bold" : "font-normal"}`}>
              Profile
            </span>
          </Link>
        </nav>

        <div className="mt-auto relative">
          
          {isMoreOpen && (
            <div className="absolute bottom-16 left-0 w-64 bg-(--color-background) border border-(--color-border) shadow-2xl rounded-2xl overflow-hidden z-50 p-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
              
              <Link 
                to="/account/edit" 
                className="flex items-center w-full p-4 hover:bg-(--color-chat-received) rounded-lg transition-colors text-sm"
                onClick={() => setIsMoreOpen(false)} // Close menu on click
              >
                <Settings size={18} className="mr-3" /> 
                Settings
              </Link>
              
              <button className="flex items-center w-full p-4 hover:bg-(--color-chat-received) rounded-lg transition-colors text-sm">
                <Activity size={18} className="mr-3" /> Your activity
              </button>
              
              <button className="flex items-center w-full p-4 hover:bg-(--color-chat-received) rounded-lg transition-colors text-sm">
                <Bookmark size={18} className="mr-3" /> Saved
              </button>
              
              <button 
                onClick={toggleTheme}
                className="flex items-center w-full p-4 hover:bg-(--color-chat-received) rounded-lg transition-colors text-sm border-t border-(--color-border) mt-1"
              >
                {isDark ? <Sun size={18} className="mr-3 text-yellow-500" /> : <Moon size={18} className="mr-3" />}
                Switch appearance
              </button>
              
              <button className="flex items-center w-full p-4 hover:bg-(--color-chat-received) rounded-lg transition-colors text-sm border-t border-(--color-border) mt-1 text-red-500">
                <LogOut size={18} className="mr-3" /> Log out
              </button>
            </div>
          )}

          <button 
            onClick={() => setIsMoreOpen(!isMoreOpen)}
            className={`flex items-center w-full p-3 my-2 cursor-pointer hover:bg-(--color-chat-received) rounded-xl transition-all ${isMoreOpen ? "font-bold bg-(--color-chat-received)" : ""}`}
          >
            <Menu size={24} className={`transition-transform ${isMoreOpen ? "stroke-[3px]" : "stroke-[2px]"}`} />
            <span className="ml-4 text-[16px] hidden xl:block">More</span>
          </button>
        </div>
      </div>

      {isMoreOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/0" 
          onClick={() => setIsMoreOpen(false)}
        />
      )}
    </>
  );
}