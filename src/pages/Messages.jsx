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
  const [messageText, setMessageText] = useState(""); // <--- 1. NEW STATE FOR INPUT

  // 1. NOTES DATA
  const notes = [
    { id: 0, user: "Your note", img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop", isMe: true },
    { id: 1, user: "Tushar", note: "Sesh Chithi 🎵", img: "https://i.pravatar.cc/150?u=12" },
    { id: 2, user: "Tuhi Roy", note: "Tune Jo N...", img: "https://i.pravatar.cc/150?u=15" },
    { id: 3, user: "Minati", note: "Kyu Ki...", img: "https://i.pravatar.cc/150?u=20" },
  ];

  // 2. CHAT LIST DATA
  const chats = [
    { id: 1, user: "xlr8_or", msg: "sent an attachment.", time: "31m", img: "https://i.pravatar.cc/150?u=30", active: true, unread: true },
    { id: 2, user: "VIPER 🥷", msg: "VIPER sent an attachment.", time: "4h", img: "https://i.pravatar.cc/150?u=32", active: false, unread: false },
    { id: 3, user: "1_x_rajesh_x", msg: "sent an attachment.", time: "11h", img: "https://i.pravatar.cc/150?u=33", active: false, unread: true },
    { id: 4, user: "Sujay Barman", msg: "sent an attachment.", time: "1d", img: "https://i.pravatar.cc/150?u=35", active: false, unread: true },
  ];

  // 3. MESSAGE HISTORY
  const messageHistory = {
    1: [
      { id: 1, type: 'text', text: "Bro, did you see the new update?", isMe: false, time: "10:00 AM" },
      { id: 2, type: 'reel', img: "https://images.unsplash.com/photo-1633511090164-b43840ea1607?w=500", user: "creative_rexa", isMe: false },
      { id: 3, type: 'text', text: "1 saal barbad 😂", isMe: true, replyTo: "xlr8_or" }
    ],
    2: [
      { id: 1, type: 'text', text: "Project submit kar diya?", isMe: false, time: "Yesterday" },
      { id: 2, type: 'text', text: "Ha bhai, kal raat ko hi.", isMe: true }
    ],
    3: [
      { id: 1, type: 'text', text: "Hello!", isMe: false },
      { id: 2, type: 'post', img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400", user: "memes_dunia", isMe: true }
    ],
    4: [
       { id: 1, type: 'text', text: "Gym chalega aaj?", isMe: false },
       { id: 2, type: 'text', text: "Nahi bhai, aaj rest day hai.", isMe: true }
    ]
  };

  const currentMessages = activeChat ? messageHistory[activeChat.id] || [] : [];

  return (
    <div className="flex h-[calc(100vh-60px)] md:h-screen bg-(--color-background) text-(--color-foreground) overflow-hidden transition-colors duration-300">
      
      <div className={`
        flex-col border-r border-(--color-border) bg-(--color-background) transition-all duration-300
        ${activeChat ? "hidden md:flex" : "flex w-full"} 
        md:w-18 lg:w-99
      `}>
        <div className="h-18.75] flex items-center justify-between md:justify-center lg:justify-between px-6 md:px-2 lg:px-6 pt-4 pb-2">
          <div className="flex md:hidden lg:flex items-center gap-2 font-bold text-xl cursor-pointer">
            xlr8_or <ChevronDown size={18} />
          </div>
          <SquarePen size={24} className="cursor-pointer" />
        </div>
        
        <div className="block md:hidden lg:block">
           <div className="px-5 py-2">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
              <input type="text" placeholder="Search" className="w-full bg-(--color-chat-received) text-(--color-foreground) rounded-lg py-2 pl-10 pr-4 outline-none placeholder:text-gray-500 text-sm" />
            </div>
          </div>
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
          <div className="flex px-5 pb-2 mt-2 gap-6">
            <span className="font-bold text-(--color-foreground) text-base cursor-pointer border-b-2 border-(--color-foreground) pb-1">Messages</span>
            <span className="font-semibold text-gray-500 text-base cursor-pointer hover:text-gray-400 pb-1">Requests</span>
          </div>
        </div>

        <div className="overflow-y-auto flex-1 custom-scrollbar flex flex-col mt-2 lg:mt-0">
          {chats.map((chat) => (
            <div 
              key={chat.id} 
              onClick={() => setActiveChat(chat)}
              className={`
                flex items-center gap-3 cursor-pointer transition-colors relative group w-full
                py-3 px-5 md:px-2 lg:px-5 md:justify-center lg:justify-start
                ${activeChat?.id === chat.id ? "bg-(--color-chat-received)" : "hover:bg-(--color-chat-received)"}
              `}
            >
              <div className="relative shrink-0">
                <img src={chat.img} alt="user" className="w-14 h-14 rounded-full object-cover border border-(--color-border)" />
                {chat.active && <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-(--color-background)"></div>}
              </div>
              <div className="flex-1 min-w-0 md:hidden lg:block">
                <p className="font-semibold text-sm text-(--color-foreground) truncate">{chat.user}</p>
                <div className="flex items-center gap-1">
                  <p className={`text-sm truncate ${chat.unread ? "text-(--color-foreground) font-bold" : "text-gray-500"}`}>{chat.msg}</p>
                  {chat.time && <span className="text-gray-500 text-sm">· {chat.time}</span>}
                </div>
              </div>
              {chat.unread && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full md:hidden lg:block"></div>}
            </div>
          ))}
        </div>
      </div>

      <div className={`flex-1 flex flex-col bg-(--color-background) ${!activeChat ? "hidden md:flex" : "flex fixed inset-0 z-60 md:static bg-(--color-background)"}`}>
        
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
                  <span className="text-xs text-gray-500">Active now</span>
                </div>
              </div>
              <div className="flex gap-6 text-(--color-foreground)">
                <Phone size={26} className="cursor-pointer hover:opacity-70" />
                <Video size={26} className="cursor-pointer hover:opacity-70" />
                <Info size={26} className="cursor-pointer hover:opacity-70" />
              </div>
            </div>

            {/* Messages Area (Unchanged) */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {currentMessages.length > 0 && (
                <div className="flex justify-center text-xs text-gray-500 my-4">Today</div>
              )}
              {currentMessages.map((msg) => (
                <div key={msg.id} className={`flex w-full ${msg.isMe ? "justify-end" : "justify-start"}`}>
                  {(msg.type === 'reel' || msg.type === 'post') && (
                    <div className="relative">
                      {msg.replyTo && (
                        <div className="flex justify-end mb-1 mr-1">
                          <p className="text-[11px] text-gray-400">You replied to <span className="font-bold">{msg.replyTo}</span></p>
                        </div>
                      )}
                      <div className="bg-(--color-chat-received) rounded-2xl overflow-hidden w-65 border border-(--color-border)">
                        <div className="flex items-center gap-2 p-3 border-b border-(--color-border)/50">
                          <img src="https://i.pravatar.cc/150?u=99" className="w-6 h-6 rounded-full" />
                          <span className="text-sm font-semibold">{msg.user}</span>
                        </div>
                        <div className="h-80 bg-gray-900 relative">
                           <img src={msg.img} className="w-full h-full object-cover opacity-90" />
                        </div>
                        <div className="p-3 bg-(--color-chat-received)">
                          <p className="text-sm font-semibold text-blue-500 cursor-pointer hover:underline">Watch reel</p>
                        </div>
                      </div>
                      <div className={`absolute -bottom-2 ${msg.isMe ? "-left-2" : "-right-2"} bg-(--color-chat-received) rounded-full p-1 border-2 border-(--color-background) shadow-sm text-xs`}>
                        😂
                      </div>
                    </div>
                  )}
                  {msg.type === 'text' && (
                    <div className="relative max-w-[70%]">
                      {msg.replyTo && (
                         <div className="flex justify-end mb-1 mr-1">
                            <p className="text-[11px] text-gray-400">You replied to <span className="font-bold">{msg.replyTo}</span></p>
                         </div>
                      )}
                      <div className={`px-5 py-3 rounded-3xl text-[15px] ${msg.isMe ? "bg-[#3797f0] text-white rounded-br-md" : "bg-(--color-chat-received) text-(--color-foreground) rounded-bl-md border border-(--color-border)"}`}>
                        <p>{msg.text}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="p-4 bg-(--color-background)">
              <div className="border border-(--color-border) bg-(--color-chat-received) rounded-full flex items-center px-4 py-2 gap-3">
                <Smile size={22} className="text-(--color-foreground) cursor-pointer" />
                
                <input 
                  type="text" 
                  placeholder="Message..." 
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-(--color-foreground) text-[15px] placeholder:text-gray-500 py-1.5" 
                />

                {messageText.trim().length > 0 ? (
                  <button className="text-[#0095f6] font-semibold text-sm hover:text-white transition-colors">
                    Send
                  </button>
                ) : (
                  <>
                    <Mic size={24} className="cursor-pointer text-(--color-foreground) hover:opacity-70" />
                    <ImageIcon size={24} className="cursor-pointer text-(--color-foreground) hover:opacity-70" />
                    <Heart size={24} className="cursor-pointer text-(--color-foreground) hover:opacity-70" />
                  </>
                )}

              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
            <div className="w-24 h-24 border-2 border-(--color-foreground) rounded-full flex items-center justify-center mb-4"><span className="text-4xl">⚡️</span></div>
            <h2 className="text-xl font-light mb-2">Your Messages</h2>
            <p className="text-gray-500 text-sm mb-4">Send private photos and messages to a friend.</p>
            <button className="bg-[#3797f0] text-white px-4 py-2 rounded-lg font-semibold text-sm">Send Message</button>
          </div>
        )}
      </div>
    </div>
  );
}