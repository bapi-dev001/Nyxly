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
  ArrowLeft 
} from "lucide-react";

export default function Messages() {
  const [activeChat, setActiveChat] = useState(null);

  const chats = [
    { id: 1, user: "design_daily", msg: "Sent you a post", time: "1h", img: "https://i.pravatar.cc/150?u=1", active: true },
    { id: 2, user: "alex_dev", msg: "Let's collab on this!", time: "5h", img: "https://i.pravatar.cc/150?u=2", active: false },
    { id: 3, user: "react_official", msg: "New update is out 🚀", time: "1d", img: "https://i.pravatar.cc/150?u=3", active: false },
  ];

  return (
    <div className="flex h-[calc(100vh-8rem)] md:h-[calc(100vh-2rem)] max-w-233.75 mx-auto mt-4 border border-(--color-border) bg-(--color-background) rounded-lg overflow-hidden shadow-sm text-(--color-foreground)">
      
      {/* --- LEFT SIDE: INBOX --- */}
      <div className={`w-full md:87.5 border-r border-(--color-border) flex flex-col ${activeChat ? "hidden md:flex" : "flex"}`}>
        
        {/* Header */}
        <div className="h-15 flex justify-between items-center px-5 border-b border-(--color-border)">
          <div className="flex items-center gap-1 font-bold text-lg cursor-pointer">
            username_here <ChevronDown size={16} />
          </div>
          <SquarePen size={24} className="cursor-pointer hover:opacity-50" />
        </div>

        {/* Tabs */}
        <div className="flex justify-between px-4 pt-4 pb-2 font-semibold text-sm border-b border-(--color-border)">
          <span className="border-b-2 border-(--color-foreground) pb-2 cursor-pointer w-1/2 text-center">Primary</span>
          <span className="text-gray-400 pb-2 cursor-pointer w-1/2 text-center hover:text-(--color-foreground)">General</span>
        </div>

        {/* List */}
        <div className="overflow-y-auto flex-1">
          {chats.map((chat) => (
            <div 
              key={chat.id} 
              onClick={() => setActiveChat(chat)}
              className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-(--color-chat-received) transition-colors ${activeChat?.id === chat.id ? "bg-(--color-chat-received)" : ""}`}
            >
              <img src={chat.img} alt="user" className="w-14 h-14 rounded-full object-cover" />
              <div className="flex-1">
                <p className="font-semibold text-sm">{chat.user}</p>
                <p className="text-gray-500 text-sm truncate">
                  {chat.msg} · <span className="text-xs text-gray-400">{chat.time}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- RIGHT SIDE: CHAT WINDOW --- */}
      {/* FIX: 'fixed inset-0 z-[60]' makes it full screen on mobile, covering the bottom nav */}
      <div className={`flex-col ${!activeChat ? "hidden md:flex" : "flex fixed inset-0 z-60 bg-(--color-background) md:static md:flex-1"}`}>
        
        {activeChat ? (
          <>
            {/* Chat Header */}
            <div className="h-15 flex justify-between items-center px-4 md:px-6 border-b border-(--color-border)">
              <div className="flex items-center gap-3">
                <ArrowLeft 
                  onClick={() => setActiveChat(null)} 
                  className="md:hidden cursor-pointer mr-2" 
                />
                <img src={activeChat.img} className="w-8 h-8 rounded-full" />
                <span className="font-bold">{activeChat.user}</span>
              </div>
              <div className="flex gap-4">
                <Phone size={24} className="cursor-pointer" />
                <Video size={24} className="cursor-pointer" />
                <Info size={24} className="cursor-pointer" />
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              <div className="flex gap-2 mb-4">
                <img src={activeChat.img} className="w-7 h-7 rounded-full mt-auto" />
                <div className="bg-transparent border border-(--color-border) px-4 py-2 rounded-2xl rounded-bl-none max-w-[75%]">
                  <p className="text-sm">Hey! Are you working on that React clone? 👨‍💻</p>
                </div>
              </div>

              <div className="flex justify-end mb-4">
                <div className="bg-[#3797f0] text-white px-4 py-2 rounded-2xl rounded-br-none max-w-[75%]">
                  <p className="text-sm">Yeah! It's coming along nicely.</p>
                </div>
              </div>
            </div>

            {/* Input Area */}
            {/* pb-4 added for mobile safe area */}
            <div className="p-4 bg-(--color-background) pb-8 md:pb-4">
              <div className="border border-(--color-border) rounded-full flex items-center p-2 px-4 gap-3">
                <Smile size={24} className="cursor-pointer text-gray-500" />
                <input 
                  type="text" 
                  placeholder="Message..." 
                  className="flex-1 bg-transparent outline-none text-sm placeholder:text-gray-500"
                />
                <ImageIcon size={24} className="cursor-pointer text-gray-500 hidden sm:block" />
                <Heart size={24} className="cursor-pointer text-gray-500" />
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
            <div className="w-24 h-24 border-2 border-(--color-foreground) rounded-full flex items-center justify-center mb-4">
               <span className="text-4xl">⚡️</span>
            </div>
            <h2 className="text-xl font-light mb-2">Your Messages</h2>
            <p className="text-gray-400 text-sm mb-4">Send private photos and messages to a friend.</p>
            <button className="bg-[#0095f6] text-white px-4 py-2 rounded-lg font-semibold text-sm">
              Send Message
            </button>
          </div>
        )}
      </div>
    </div>
  );
}