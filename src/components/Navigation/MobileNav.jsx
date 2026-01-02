import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Search, 
  PlusSquare, 
  Film,
} from "lucide-react";

export default function MobileNav() {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path) => currentPath === path;

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full h-15 bg-(--color-background) border-t border-(--color-border) flex justify-around items-center z-50 px-2 pb-safe">
      
      <Link to="/" className="p-2">
        <Home 
          size={24} 
          className={`transition-all ${isActive("/") ? "stroke-[3px] scale-105" : "text-gray-500 stroke-[2px]"}`} 
        />
      </Link>
      <Link to="/search" className="p-2">
        <Search 
          size={24} 
          className={`transition-all ${isActive("/search") ? "stroke-[3px] scale-105" : "text-gray-500 stroke-[2px]"}`} 
        />
      </Link>
      <Link to="/create" className="p-2">
        <PlusSquare 
          size={24} 
          className={`transition-all ${isActive("/create") ? "stroke-[3px] scale-105" : "text-gray-500 stroke-[2px]"}`} 
        />
      </Link>
      <Link to="/reels" className="p-2">
        <Film 
          size={24} 
          className={`transition-all ${isActive("/reels") ? "stroke-[3px] scale-105" : "text-gray-500 stroke-[2px]"}`} 
        />
      </Link>
      <Link to="/profile" className="p-2">
        <div className={`rounded-full p-px ${isActive("/profile") ? "border-2 border-(--color-foreground)" : "border border-transparent"}`}>
          <img 
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" 
            alt="Profile" 
            className="w-6 h-6 rounded-full object-cover"
          />
        </div>
      </Link>

    </div>
  );
}