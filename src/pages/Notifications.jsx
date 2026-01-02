import { useState } from "react";
import { 
  Heart, 
  UserPlus, 
  MessageCircle, 
  ChevronRight 
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Notifications() {
  // Mock Data organized by Time Sections
  const notifications = [
    {
      title: "New",
      data: [
        { id: 1, type: "follow", user: "design_daily", avatar: "https://i.pravatar.cc/150?u=1", time: "10s", isFollowing: false },
        { id: 2, type: "like", user: "alex_dev", avatar: "https://i.pravatar.cc/150?u=2", text: "liked your photo.", postImg: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100", time: "5m" },
      ]
    },
    {
      title: "Today",
      data: [
        { id: 3, type: "comment", user: "react_js", avatar: "https://i.pravatar.cc/150?u=3", text: "mentioned you in a comment: @bapi-dev001 nice work!", postImg: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=100", time: "2h" },
        { id: 4, type: "follow", user: "ui_ux_pro", avatar: "https://i.pravatar.cc/150?u=4", time: "5h", isFollowing: true },
      ]
    },
    {
      title: "This Week",
      data: [
        { id: 5, type: "like", user: "startuplife", avatar: "https://i.pravatar.cc/150?u=5", text: "liked your reel.", postImg: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=100", time: "2d" },
        { id: 6, type: "follow", user: "python_guru", avatar: "https://i.pravatar.cc/150?u=6", time: "3d", isFollowing: false },
        { id: 7, type: "like", user: "code_mario", avatar: "https://i.pravatar.cc/150?u=7", text: "liked your photo.", postImg: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100", time: "4d" },
      ]
    },
    {
      title: "Earlier",
      data: [
        { id: 8, type: "follow", user: "fullstack_sam", avatar: "https://i.pravatar.cc/150?u=8", time: "1w", isFollowing: true },
        { id: 9, type: "comment", user: "web_wizard", avatar: "https://i.pravatar.cc/150?u=9", text: "commented: Great setup! 🔥", postImg: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=100", time: "2w" },
      ]
    }
  ];

  // State to handle Follow/Following toggles
  const [localNotifications, setLocalNotifications] = useState(notifications);

  const toggleFollow = (sectionIndex, itemIndex) => {
    const newNotifications = [...localNotifications];
    const item = newNotifications[sectionIndex].data[itemIndex];
    item.isFollowing = !item.isFollowing;
    setLocalNotifications(newNotifications);
  };

  return (
    <div className="flex flex-col min-h-screen bg-(--color-background) text-(--color-foreground) pb-20 md:pb-0">
      
      {/* --- HEADER --- */}
      <div className="sticky top-0 z-30 bg-(--color-background) border-b border-(--color-border) px-4 h-15 flex items-center">
        <h1 className="text-xl font-bold">Notifications</h1>
      </div>

      <div className="w-full max-w-150 mx-auto">
        
        {/* 1. FOLLOW REQUESTS (Standard Instagram Feature) */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-(--color-border) cursor-pointer hover:bg-(--color-chat-received) transition-colors">
            <div className="flex items-center gap-4">
                <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center border border-(--color-border)">
                         <UserPlus size={20} className="text-(--color-foreground)" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-(--color-background)">
                        2
                    </div>
                </div>
                <div>
                    <h3 className="font-semibold text-sm">Follow requests</h3>
                    <p className="text-gray-500 text-xs">Approve or ignore requests</p>
                </div>
            </div>
            <ChevronRight size={20} className="text-gray-500" />
        </div>

        {/* 2. NOTIFICATION LIST GROUPED BY TIME */}
        <div className="flex flex-col">
            {localNotifications.map((section, sIndex) => (
                <div key={sIndex} className="flex flex-col">
                    {/* Time Section Title */}
                    <div className="px-5 py-4">
                        <h2 className="font-bold text-base">{section.title}</h2>
                    </div>

                    {/* List Items */}
                    {section.data.map((item, iIndex) => (
                        <div 
                           key={item.id} 
                           className="flex items-center justify-between px-5 py-3 hover:bg-(--color-chat-received) transition-colors cursor-pointer"
                        >
                            {/* Left: Avatar & Text */}
                            <div className="flex items-center gap-3 flex-1 pr-4">
                                <Link to="/profile">
                                    <img src={item.avatar} alt={item.user} className="w-11 h-11 rounded-full object-cover border border-(--color-border)" />
                                </Link>
                                <div className="text-sm leading-tight">
                                    <span className="font-semibold mr-1 cursor-pointer hover:text-gray-400">{item.user}</span>
                                    <span>{item.type === 'follow' ? 'started following you.' : item.text}</span>
                                    <span className="text-gray-500 ml-1 text-xs">{item.time}</span>
                                </div>
                            </div>

                            {/* Right: Action (Button or Image) */}
                            <div>
                                {item.type === 'follow' ? (
                                    <button 
                                        onClick={() => toggleFollow(sIndex, iIndex)}
                                        className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
                                            item.isFollowing 
                                            ? "bg-(--color-chat-received) text-(--color-foreground) border border-(--color-border)" 
                                            : "bg-[#0095f6] text-white hover:bg-[#1877f2]"
                                        }`}
                                    >
                                        {item.isFollowing ? "Following" : "Follow"}
                                    </button>
                                ) : (
                                    <div className="w-11 h-11 bg-gray-800 rounded-md overflow-hidden border border-(--color-border)">
                                        <img src={item.postImg} alt="post" className="w-full h-full object-cover" />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>

        {/* End of list spacer */}
        <div className="py-10 text-center text-gray-500 text-sm">
            That's all for now
        </div>

      </div>
    </div>
  );
}