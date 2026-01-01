import { useRef, useState, useEffect } from 'react';

import { 
  Home, Search, Compass, Film, MessageCircle, Heart, 
  PlusSquare, Menu, Instagram, Settings, Activity, 
  Bookmark, Moon, AlertCircle, LogOut 
} from 'lucide-react';

const navItems = [
    { name: 'Home', icon: <Home size={26} /> },
    { name: 'Profile', icon: <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" className="w-6 h-6 rounded-full border border-gray-200" alt="me" /> },
    { name: 'Search', icon: <Search size={26} /> },
    { name: 'Explore', icon: <Compass size={26} /> },
    { name: 'Reels', icon: <Film size={26} /> },
    { name: 'Messages', icon: <MessageCircle size={26} />, badge: 3 },
    { name: 'Notifications', icon: <Heart size={26} /> },
    { name: 'Create', icon: <PlusSquare size={26} /> },
];

const Sidebar = () => {
    const [active, setActive] = useState('Home');
    const [isMoreOpen, setIsMoreOpen] = useState(false);
    const moreMenuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (moreMenuRef.current && !moreMenuRef.current.contains(event.target)) {
            setIsMoreOpen(false);
          }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
      }, []);

    return (
        <>
            <aside className="h-screen hidden sm:flex flex-col border-r border-gray-200 bg-white transition-all duration-300 xl:w-61 w-18 p-3 pb-5 sticky top-0 z-40">
        
            {/* Instagram Logo */}
            <div className="mb-8 px-3 pt-6 cursor-pointer">
            <div className="hidden xl:block">
                <h1 className="text-xl font-bold italic tracking-tighter select-none">Instagram</h1>
            </div>
            <div className="xl:hidden flex justify-center">
                <Instagram size={24} />
            </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 space-y-1">
            {navItems.map((item) => (
                <button
                key={item.name}
                onClick={() => setActive(item.name)}
                className="w-full group flex items-center p-3 rounded-lg hover:bg-black/5 transition-all active:scale-95 relative"
                >
                <div className={`transition-transform duration-200 group-hover:scale-110 ${active === item.name ? 'scale-105' : ''}`}>
                    <span className={active === item.name ? 'text-black [&>svg]:stroke-[3px]' : 'text-gray-900'}>
                    {item.icon}
                    </span>
                    {item.badge && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white">
                        {item.badge}
                    </span>
                    )}
                </div>
                <span className={`ml-4 text-[16px] hidden xl:block ${active === item.name ? 'font-bold' : 'font-normal'}`}>
                    {item.name}
                </span>
                </button>
            ))}
            </nav>

            {/* --- THE MORE BUTTON & POPUP --- */}
            <div className="relative" ref={moreMenuRef}>
            {isMoreOpen && (
                <div className="absolute bottom-full left-0 mb-4 w-66.5 bg-[#262626] text-white rounded-2xl shadow-2xl py-2 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
                <MenuOption icon={<Settings size={18} />} label="Settings" />
                <MenuOption icon={<Activity size={18} />} label="Your activity" />
                <MenuOption icon={<Bookmark size={18} />} label="Saved" />
                <MenuOption icon={<Moon size={18} />} label="Switch appearance" />
                <MenuOption icon={<AlertCircle size={18} />} label="Report a problem" />
                <div className="h-1.5 bg-[#363636] my-2" />
                <MenuOption label="Switch accounts" noIcon />
                <div className="h-px bg-[#363636] my-0" />
                <MenuOption label="Log out" noIcon />
                </div>
            )}

            <button 
                onClick={() => setIsMoreOpen(!isMoreOpen)}
                className="flex items-center p-3 rounded-lg hover:bg-black/5 transition-all w-full group"
            >
                <Menu size={24} className={`transition-transform group-hover:scale-110 ${isMoreOpen ? 'stroke-[3px]' : ''}`} />
                <span className={`ml-4 text-[16px] hidden xl:block ${isMoreOpen ? 'font-bold' : 'font-normal'}`}>More</span>
            </button>
            </div>
        </aside>
        <nav className="sm:hidden fixed bottom-0 left-0 right-0 h-12.5 bg-white border-t border-gray-200 flex justify-around items-center px-2 z-50">
                <Home size={24} onClick={() => setActive('Home')} className={active === 'Home' ? 'stroke-[3px]' : ''} />
                <Search size={24} />
                <PlusSquare size={24} />
                <Film size={24} />
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" className="w-6 h-6 rounded-full" alt="me" />
              </nav>
        </>
    )
}

const MenuOption = ({ icon, label, noIcon = false }) => (
  <button className="flex items-center w-full px-4 py-3 hover:bg-[#3c3c3c] transition-colors text-[14px] leading-tight">
    {!noIcon && <span className="mr-3">{icon}</span>}
    <span className="flex-1 text-left">{label}</span>
  </button>
);

export default Sidebar;