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

export default function Messages() {
  const [activeChat, setActiveChat] = useState(null);

  const notes = [
    { id: 0, user: "Your note", img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop", isMe: true },
    { id: 1, user: "Tushar", note: "Sesh Chithi 🎵", img: "https://i.pravatar.cc/150?u=12" },
    { id: 2, user: "Tuhi Roy", note: "Tune Jo N...", img: "https://i.pravatar.cc/150?u=15" },
    { id: 3, user: "Minati", note: "Kyu Ki...", img: "https://i.pravatar.cc/150?u=20" },
    { id: 4, user: "Rohan", note: "Gym time 😤", img: "https://i.pravatar.cc/150?u=25" },
    { id: 5, user: "Alex", note: "Working...", img: "https://i.pravatar.cc/150?u=26" },
  ];

  const chats = [
    { id: 1, user: "xlr8_or", msg: "sent an attachment.", time: "31m", img: "https://i.pravatar.cc/150?u=30", active: true, unread: true },
    { id: 2, user: "VIPER 🥷", msg: "VIPER sent an attachment.", time: "4h", img: "https://i.pravatar.cc/150?u=32", active: false, unread: false },
    { id: 3, user: "1_x_rajesh_x", msg: "sent an attachment.", time: "11h", img: "https://i.pravatar.cc/150?u=33", active: false, unread: true },
    { id: 4, user: "Sujay Barman", msg: "sent an attachment.", time: "1d", img: "https://i.pravatar.cc/150?u=35", active: false, unread: true },
  ];

  return (
    <div className="flex h-screen bg-(--color-background) text-(--color-foreground) overflow-hidden transition-colors duration-300">
      
      <div className={`w-full md:w-95 border-r border-(--color-border) flex flex-col bg-(--color-background) ${activeChat ? "hidden md:flex" : "flex"}`}>
        
        {/* Header */}
        <div className="h-17.5 flex justify-between items-center px-6 pt-4 pb-2">
          <div className="flex items-center gap-2 font-bold text-xl cursor-pointer">
            xlr8_or <ChevronDown size={18} />
          </div>
          <SquarePen size={24} className="cursor-pointer" />
        </div>

        {/* Tabs (Messages / Requests) */}
        <div className="flex px-5 pb-4 pt-2 gap-6">
          <span className="font-bold text-(--color-foreground) text-base cursor-pointer border-b-2 border-(--color-foreground) pb-1">Messages</span>
          <span className="font-semibold text-gray-500 text-base cursor-pointer hover:text-gray-400 pb-1">Requests</span>
        </div>

        {/* Notes Section (Horizontal Scroll) */}
        {/* FIX 2: Added hide-scrollbar class logic inline via style tag or utility */}
        <div className="flex gap-4 overflow-x-auto px-5 py-2 scrollbar-hide border-b border-transparent min-h-27.5">
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

        {/* Search Bar (Moved below notes as per screenshot flow often varies, but keeps it clean) */}
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

        {/* Chat List */}
        <div className="overflow-y-auto flex-1 custom-scrollbar">
          {chats.map((chat) => (
            <div 
              key={chat.id} 
              onClick={() => setActiveChat(chat)}
              className={`flex items-center gap-3 px-5 py-3 cursor-pointer hover:bg-(--color-chat-received) transition-colors ${activeChat?.id === chat.id ? "bg-(--color-chat-received)" : ""}`}
            >
              <img src={chat.img} alt="user" className="w-14 h-14 rounded-full object-cover" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-(--color-foreground) truncate">{chat.user}</p>
                <div className="flex items-center gap-1">
                  <p className={`text-sm truncate ${chat.unread ? "text-(--color-foreground) font-bold" : "text-gray-500"}`}>
                    {chat.msg}
                  </p>
                  {chat.time && <span className="text-gray-500 text-sm">· {chat.time}</span>}
                </div>
              </div>
              {chat.unread && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full"></div>}
            </div>
          ))}
        </div>
      </div>

      <div className={`flex-1 flex flex-col bg-(--color-background) ${!activeChat ? "hidden md:flex fixed inset-0 z-60 md:static" : "flex fixed inset-0 z-60 bg-(--color-background) md:static"}`}>
        
        {activeChat ? (
          <>
            {/* Header */}
            <div className="h-18.75 flex justify-between items-center px-4 md:px-6 border-b border-(--color-border)">
              <div className="flex items-center gap-3">
                <ArrowLeft onClick={() => setActiveChat(null)} className="md:hidden cursor-pointer mr-1" />
                <div className="relative">
                  <img src={activeChat.img} className="w-10 h-10 rounded-full border border-(--color-border)" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-(--color-background)"></div>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-base">{activeChat.user}</span>
                  <span className="text-xs text-gray-500">Active 7m ago</span>
                </div>
              </div>
              <div className="flex gap-6 text-(--color-foreground)">
                <Phone size={26} className="cursor-pointer hover:opacity-70" />
                <Video size={26} className="cursor-pointer hover:opacity-70" />
                <Info size={26} className="cursor-pointer hover:opacity-70" />
              </div>
            </div>

            {/* Messages Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              <div className="flex justify-center text-xs text-gray-500 my-4">Mon 21:12</div>

              {/* Shared Reel/Post */}
              <div className="flex justify-end">
                 <div className="bg-(--color-chat-received) rounded-2xl overflow-hidden w-70 border border-(--color-border)">
                    <div className="flex items-center gap-2 p-3 border-b border-(--color-border)">
                      <img src="https://i.pravatar.cc/150?u=99" className="w-6 h-6 rounded-full" />
                      <span className="text-sm font-semibold">creative_rexa</span>
                    </div>
                    <div className="h-87.5 bg-gray-900 relative">
                       <img src="https://images.unsplash.com/photo-1633511090164-b43840ea1607?w=500&auto=format&fit=crop&q=60" className="w-full h-full object-cover" />
                    </div>
                    <div className="p-3 bg-(--color-chat-received)">
                      <p className="text-sm font-semibold text-blue-500 cursor-pointer">Check out this design! 🔥</p>
                    </div>
                 </div>
              </div>

              {/* Text Message */}
              <div className="flex justify-end">
                <div className="bg-[#3797f0] text-white px-5 py-3 rounded-3xl rounded-br-md max-w-[70%] text-[15px]">
                  <p>Check out this design! 🔥</p>
                </div>
              </div>
            </div>

            {/* Footer Input */}
            <div className="p-4 bg-(--color-background)">
              <div className="border border-(--color-border) rounded-full flex items-center px-4 py-2 gap-3 bg-(--color-background)">
                <Smile size={24} className="cursor-pointer text-(--color-foreground)" />
                <input 
                  type="text" 
                  placeholder="Message..." 
                  className="flex-1 bg-transparent outline-none text-(--color-foreground) text-base placeholder:text-gray-500"
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