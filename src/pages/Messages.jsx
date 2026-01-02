import { useState } from "react";
import { 
  SquarePen, 
  ChevronDown, 
  Phone, 
  Video, 
  Info, 
  Smile, 
  Image as ImageIcon, 
  Heart,
  ArrowLeft,
  Search,
  Mic,
  Plus
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Messages() {
  // State for active chat
  const [activeChat, setActiveChat] = useState({ 
    id: 1, 
    user: "xlr8_or", 
    img: "https://i.pravatar.cc/150?u=30", 
    status: "Active 1m ago" 
  });

  // Dummy Data
  const notes = [
    { id: 0, user: "Your note", img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop", isMe: true },
    { id: 1, user: "Tushar", note: "Sesh Chithi 🎵", img: "https://i.pravatar.cc/150?u=12" },
    { id: 2, user: "Tuhi Roy", note: "Tune Jo N...", img: "https://i.pravatar.cc/150?u=15" },
    { id: 3, user: "Minati", note: "Kyu Ki...", img: "https://i.pravatar.cc/150?u=20" },
  ];

  const chats = [
    { id: 1, user: "xlr8_or", msg: "sent an attachment.", time: "31m", img: "https://i.pravatar.cc/150?u=30", active: true, unread: true },
    { id: 2, user: "VIPER 🥷", msg: "VIPER sent an attachment.", time: "4h", img: "https://i.pravatar.cc/150?u=32", active: false, unread: false },
    { id: 3, user: "1_x_rajesh_x", msg: "sent an attachment.", time: "11h", img: "https://i.pravatar.cc/150?u=33", active: false, unread: true },
    { id: 4, user: "Sujay Barman", msg: "sent an attachment.", time: "1d", img: "https://i.pravatar.cc/150?u=35", active: false, unread: true },
    { id: 5, user: "alone lover r15", msg: "Active 12m ago", time: "", img: "https://i.pravatar.cc/150?u=36", active: false, unread: false },
    { id: 6, user: "Subhankar", msg: "You sent an attachment.", time: "1d", img: "https://i.pravatar.cc/150?u=40", active: false, unread: false },
  ];

  return (
    <div className="flex h-[calc(100vh-60px)] md:h-screen bg-(--color-background) text-(--color-foreground) overflow-hidden transition-colors duration-300">
      
      <div className={`
        flex-col border-r border-(--color-border) bg-(--color-background) transition-all duration-300
        ${activeChat ? "hidden md:flex" : "flex w-full"} 
        md:w-22.5 lg:w-99
      `}>
        
        <div className="h-17.5 flex items-center justify-center lg:justify-between px-2 lg:px-6 pt-4 pb-2">
          <div className="hidden lg:flex items-center gap-2 font-bold text-xl cursor-pointer">
            bapi_dev001 <ChevronDown size={18} />
          </div>
          <SquarePen size={24} className="cursor-pointer" />
        </div>

        {/* SEARCH & NOTES (Hidden on Tablet, Visible on Desktop) */}
        <div className="hidden lg:block">
           {/* Search */}
           <div className="px-5 py-2">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
              <input 
                type="text" 
                placeholder="Search" 
                className="w-full bg-(--color-chat-received) text-(--color-foreground) rounded-lg py-2 pl-10 pr-4 outline-none placeholder:text-gray-500 text-sm"
              />
            </div>
          </div>

          {/* Horizontal Notes */}
          <div className="flex gap-4 overflow-x-auto px-5 py-4 scrollbar-hide">
            <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; }`}</style>
            {notes.map((note) => (
              <div key={note.id} className="flex flex-col items-center shrink-0 cursor-pointer w-17.5">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full overflow-hidden border border-(--color-border) bg-(--color-chat-received)">
                    <img src={note.img} className="w-full h-full object-cover opacity-90" alt={note.user} />
                  </div>
                  {note.isMe ? (
                    <div className="absolute top-0 right-0 bg-(--color-chat-received) rounded-full p-1 border-2 border-(--color-background)">
                      <Plus size={14} className="text-(--color-foreground)" />
                    </div>
                  ) : (
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-(--color-background)/90 backdrop-blur-sm px-2 py-1 rounded-xl text-[10px] whitespace-nowrap max-w-20 truncate text-center border border-(--color-border) shadow-sm z-10">
                      {note.note}
                    </div>
                  )}
                </div>
                <span className="text-xs text-gray-500 mt-1 truncate w-full text-center">{note.user}</span>
              </div>
            ))}
          </div>

          {/* Desktop Tabs */}
          <div className="flex px-5 pb-2 mt-2">
            <span className="font-bold text-(--color-foreground) text-base mr-6 cursor-pointer">Messages</span>
            <span className="font-semibold text-gray-500 text-base cursor-pointer hover:text-gray-400">Requests</span>
          </div>
        </div>

        {/* CHAT LIST (Adapts to Screen Size) */}
        <div className="overflow-y-auto flex-1 custom-scrollbar flex flex-col items-center lg:items-stretch mt-2 lg:mt-0">
          {chats.map((chat) => (
            <div 
              key={chat.id} 
              onClick={() => setActiveChat(chat)}
              className={`
                flex items-center gap-3 cursor-pointer transition-colors relative group
                p-2 lg:px-5 lg:py-3 rounded-lg lg:rounded-none
                ${activeChat?.id === chat.id ? "bg-(--color-chat-received)" : "hover:bg-(--color-chat-received)"}
              `}
            >
              {/* Avatar */}
              <div className="relative">
                <img src={chat.img} alt="user" className="w-12 h-12 lg:w-14 lg:h-14 rounded-full object-cover border border-(--color-border)" />
                {chat.active && (
                   <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-(--color-background)"></div>
                )}
              </div>

              {/* Text Info (Visible ONLY on Desktop/Mobile List) */}
              <div className="hidden lg:block flex-1 min-w-0">
                <p className="font-semibold text-sm text-(--color-foreground) truncate">{chat.user}</p>
                <div className="flex items-center gap-1">
                  <p className={`text-sm truncate ${chat.unread ? "text-(--color-foreground) font-bold" : "text-gray-500"}`}>
                    {chat.msg}
                  </p>
                  {chat.time && <span className="text-gray-500 text-sm">· {chat.time}</span>}
                </div>
              </div>
              
              {/* Unread Dot */}
              {chat.unread && <div className="hidden lg:block w-2.5 h-2.5 bg-blue-500 rounded-full"></div>}
            </div>
          ))}
        </div>
      </div>


      {/* --- RIGHT SIDE: CHAT WINDOW --- */}
      <div className={`flex-1 flex flex-col bg-(--color-background) relative ${!activeChat ? "hidden md:flex" : "flex"}`}>
        
        {activeChat ? (
          <>
            {/* Header */}
            <div className="h-18.5 flex justify-between items-center px-4 border-b border-(--color-border) bg-(--color-background) z-10">
              <div className="flex items-center gap-3">
                <Link to="/" className="md:hidden" onClick={() => setActiveChat(null)}>
                  <ArrowLeft className="text-(--color-foreground)" />
                </Link>
                <div className="relative">
                  <img src={activeChat.img} className="w-10 h-10 rounded-full border border-(--color-border)" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-(--color-background)"></div>
                </div>
                <div>
                  <h3 className="font-bold text-sm text-(--color-foreground) flex items-center gap-1">
                    {activeChat.user} <Heart size={12} className="fill-red-500 text-red-500" />
                  </h3>
                  <p className="text-xs text-gray-500">Active 1h ago</p>
                </div>
              </div>
              <div className="flex gap-5 text-(--color-foreground)">
                <Phone size={26} className="cursor-pointer hover:opacity-70" />
                <Video size={26} className="cursor-pointer hover:opacity-70" />
                <Info size={26} className="cursor-pointer hover:opacity-70" />
              </div>
            </div>

            {/* Messages Feed */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-(--color-background)">
              
              <div className="flex justify-center">
                <span className="text-gray-500 text-xs">Wed 13:08</span>
              </div>

              {/* RECEIVED: REEL (Based on screenshot) */}
              <div className="flex justify-end">
                <div className="relative group">
                  <div className="flex justify-end mb-1 mr-1">
                     <p className="text-[11px] text-gray-400">You replied to <span className="font-bold">{activeChat.user}</span></p>
                  </div>
                  
                  {/* Reel Card */}
                  <div className="w-50 h-75 rounded-2xl overflow-hidden relative border border-(--color-border) bg-black">
                     <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400" className="w-full h-full object-cover opacity-80" />
                     <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center">
                           <Video className="fill-white text-white" size={20} />
                        </div>
                     </div>
                     <div className="absolute top-3 right-3"><Video size={16} className="text-white" /></div>
                  </div>

                  {/* Reaction */}
                  <div className="absolute -bottom-2 -left-2 bg-(--color-chat-received) rounded-full p-1 border-2 border-(--color-background) text-sm shadow-sm">
                    😂
                  </div>
                </div>
              </div>

              {/* RECEIVED: TEXT Message */}
              <div className="flex justify-end">
                 <div className="bg-[#3797f0] text-white px-5 py-3 rounded-3xl rounded-br-md max-w-[70%] text-[15px] relative">
                    <p>1 saal barbad</p>
                    <div className="absolute -bottom-2 -left-2 bg-(--color-chat-received) rounded-full p-1 border-2 border-(--color-background) text-xs shadow-sm">
                      😂
                    </div>
                 </div>
              </div>

              {/* SENT: Vertical Shared Post */}
              <div className="flex justify-start items-end gap-2">
                 <img src={activeChat.img} className="w-7 h-7 rounded-full mb-4 border border-(--color-border)" />
                 <div className="w-62.5 rounded-2xl overflow-hidden border border-(--color-border) bg-black">
                    <div className="h-100">
                       <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400" className="w-full h-full object-cover" />
                    </div>
                 </div>
              </div>
            </div>

            {/* Input Area (Floating on Tablet/Desktop, Fixed on Mobile) */}
            <div className="p-4 bg-(--color-background)">
              <div className="bg-(--color-chat-received) rounded-full flex items-center px-4 py-2 gap-3 border border-(--color-border)">
                <div className="p-1.5 bg-gray-500/20 rounded-full cursor-pointer hover:bg-gray-500/30">
                   <Smile size={22} className="text-(--color-foreground)" />
                </div>
                <input 
                  type="text" 
                  placeholder="Message..." 
                  className="flex-1 bg-transparent outline-none text-(--color-foreground) text-[15px] placeholder:text-gray-500"
                />
                <Mic size={24} className="cursor-pointer text-(--color-foreground) hover:opacity-70" />
                <ImageIcon size={24} className="cursor-pointer text-(--color-foreground) hover:opacity-70" />
                <Heart size={24} className="cursor-pointer text-(--color-foreground) hover:opacity-70" />
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 border-2 border-(--color-foreground) rounded-full flex items-center justify-center mb-4">
               <span className="text-4xl">⚡️</span>
            </div>
            <h2 className="text-xl font-light mb-2">Your Messages</h2>
            <p className="text-gray-500 text-sm mb-4">Send private photos and messages to a friend.</p>
            <button className="bg-[#3797f0] text-white px-4 py-2 rounded-lg font-semibold text-sm">
              Send Message
            </button>
          </div>
        )}
      </div>
    </div>
  );
}