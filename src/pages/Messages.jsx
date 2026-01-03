import { useEffect, useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import io from "socket.io-client";
import axios from "axios";
import { 
  SquarePen, ChevronDown, Phone, Video, Info, Smile, 
  Image as ImageIcon, Heart, ArrowLeft, Search, Mic, Plus, Loader2
} from "lucide-react";

const ENDPOINT = "https://nyxly-api.onrender.com";
var socket;

export default function Messages() {
  const { user } = useAuth();
  
  // --- STATES ---
  const [activeChat, setActiveChat] = useState(null);
  const [chatList, setChatList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingChats, setLoadingChats] = useState(false);
  
  const [messageText, setMessageText] = useState(""); 
  const [messages, setMessages] = useState([]);
  const [socketConnected, setSocketConnected] = useState(false);
  const scrollRef = useRef(); 

  // --- 1. CONNECT SOCKET ---
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    return () => socket.disconnect();
  }, [user]);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoadingChats(true);
      try {
        const token = JSON.parse(localStorage.getItem("userInfo")).token;
        const config = { headers: { Authorization: `Bearer ${token}` } };
        
        // Fetch users based on search query
        const { data } = await axios.get(`${ENDPOINT}api/users?search=${searchQuery}`, config);
        setChatList(data);
      } catch (error) {
        console.error("Error fetching users", error);
      } finally {
        setLoadingChats(false);
      }
    };

    // Debounce search (wait 300ms after typing)
    const delayDebounceFn = setTimeout(() => {
      fetchUsers();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]); // Run whenever searchQuery changes

  // --- 3. SOCKET MESSAGE LISTENER ---
  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (activeChat && activeChat._id === newMessageReceived.sender._id) {
        setMessages((prev) => [...prev, newMessageReceived]);
      }
    });
  }, [activeChat]);

  // --- 4. SCROLL TO BOTTOM ---
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // --- 5. SEND MESSAGE ---
  const sendMessage = async () => {
    if (!messageText.trim()) return;

    const newMessageData = {
      _id: Date.now(),
      sender: user,
      content: messageText,
      chat: { users: [activeChat] },
      receiverId: activeChat._id,
      createdAt: new Date().toISOString(),
      isMe: true 
    };

    setMessages([...messages, newMessageData]);
    setMessageText("");
    socket.emit("new message", newMessageData);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="flex h-[calc(100vh-60px)] md:h-screen bg-(--color-background) text-(--color-foreground) overflow-hidden">
      
      {/* --- SIDEBAR --- */}
      <div className={`
        flex-col border-r border-(--color-border) bg-(--color-background)
        ${activeChat ? "hidden md:flex" : "flex w-full"} 
        md:w-18 lg:w-99
      `}>
        <div className="h-18.75 flex items-center justify-between md:justify-center lg:justify-between px-6 md:px-2 lg:px-6 pt-4 pb-2">
          <div className="flex md:hidden lg:flex items-center gap-2 font-bold text-xl">
            {user?.username} <ChevronDown size={18} />
          </div>
          <SquarePen size={24} className="cursor-pointer" />
        </div>
        
        {/* Search Box */}
        <div className="block md:hidden lg:block px-5 py-2">
           <div className="relative">
             <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
             <input 
               type="text" 
               placeholder="Search people..." 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full bg-(--color-chat-received) text-(--color-foreground) rounded-lg py-2 pl-10 pr-4 outline-none placeholder:text-gray-500 text-sm" 
             />
           </div>
        </div>
        
        <div className="block md:hidden lg:block px-5 pb-2 mt-2">
          <span className="font-bold text-(--color-foreground) text-base border-b-2 border-(--color-foreground) pb-1">All Users</span>
        </div>

        {/* --- DYNAMIC USER LIST --- */}
        <div className="overflow-y-auto flex-1 custom-scrollbar flex flex-col mt-2 lg:mt-0">
          {loadingChats ? (
            <div className="flex justify-center mt-10"><Loader2 className="animate-spin" /></div>
          ) : chatList.length > 0 ? (
            chatList.map((chatUser) => (
              <div 
                key={chatUser._id} 
                onClick={() => {
                   setActiveChat(chatUser); // Set Real User as Active
                   setMessages([]); // Reset chat for new user
                }}
                className={`
                  flex items-center gap-3 cursor-pointer transition-colors relative group w-full
                  py-3 px-5 md:px-2 lg:px-5 md:justify-center lg:justify-start
                  ${activeChat?._id === chatUser._id ? "bg-(--color-chat-received)" : "hover:bg-(--color-chat-received)"}
                `}
              >
                <div className="relative shrink-0">
                  <img 
                    src={chatUser.avatar || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"} 
                    alt="user" 
                    className="w-14 h-14 rounded-full object-cover border border-(--color-border)" 
                  />
                </div>
                <div className="flex-1 min-w-0 md:hidden lg:block">
                  <p className="font-semibold text-sm text-(--color-foreground) truncate">{chatUser.username}</p>
                  <p className="text-sm text-gray-500 truncate">{chatUser.fullName}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 mt-10 text-sm">No users found</div>
          )}
        </div>
      </div>

      {/* --- CHAT AREA --- */}
      <div className={`flex-1 flex flex-col bg-(--color-background) ${!activeChat ? "hidden md:flex" : "flex fixed inset-0 z-60 md:static bg-(--color-background)"}`}>
        
        {activeChat ? (
          <>
            {/* Header */}
            <div className="h-18.75 flex justify-between items-center px-4 md:px-6 border-b border-(--color-border)">
              <div className="flex items-center gap-3">
                <ArrowLeft onClick={() => setActiveChat(null)} className="md:hidden cursor-pointer mr-1" />
                <div className="relative">
                  <img src={activeChat.avatar || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"} className="w-10 h-10 rounded-full border border-(--color-border)" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-(--color-background)"></div>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-base">{activeChat.username}</span>
                  <span className="text-xs text-gray-500">Active now</span>
                </div>
              </div>
              <div className="flex gap-6 text-(--color-foreground)">
                <Phone size={26} className="cursor-pointer hover:opacity-70" />
                <Video size={26} className="cursor-pointer hover:opacity-70" />
                <Info size={26} className="cursor-pointer hover:opacity-70" />
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
               {messages.length === 0 && <div className="text-center text-gray-500 mt-10">Start a conversation with {activeChat.username}</div>}
               
               {messages.map((msg, index) => (
                <div key={index} className={`flex w-full ${msg.isMe || msg.sender._id === user._id ? "justify-end" : "justify-start"}`}>
                  <div className={`px-5 py-3 rounded-3xl text-[15px] max-w-[70%] wrap-break-word ${
                    msg.isMe || msg.sender._id === user._id 
                      ? "bg-[#3797f0] text-white rounded-br-md" 
                      : "bg-(--color-chat-received) text-(--color-foreground) rounded-bl-md border border-(--color-border)"
                  }`}>
                    <p>{msg.content}</p>
                  </div>
                </div>
              ))}
              <div ref={scrollRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-(--color-background)">
              <div className="border border-(--color-border) bg-(--color-chat-received) rounded-full flex items-center px-4 py-2 gap-3">
                <Smile size={22} className="text-(--color-foreground) cursor-pointer" />
                <input 
                  type="text" 
                  placeholder="Message..." 
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent outline-none text-(--color-foreground) text-[15px] placeholder:text-gray-500 py-1.5" 
                />
                {messageText.trim().length > 0 ? (
                  <button onClick={sendMessage} className="text-[#0095f6] font-semibold text-sm hover:text-white transition-colors">Send</button>
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
          /* Empty State */
          <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
            <div className="w-24 h-24 border-2 border-(--color-foreground) rounded-full flex items-center justify-center mb-4"><span className="text-4xl">⚡️</span></div>
            <h2 className="text-xl font-light mb-2">Your Messages</h2>
            <p className="text-gray-500 text-sm mb-4">Search for a user to start chatting.</p>
          </div>
        )}
      </div>
    </div>
  );
}