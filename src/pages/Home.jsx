import { Link } from "react-router-dom";
import { Heart, MessageCircle } from "lucide-react";
import Stories from "../components/Feed/Stories";
import Post from "../components/Feed/Post";
import CreativeNyxlyNIcon from "../icons/svgicon/Nyxlyicon";

export default function Home() {
  const posts = [
    {
      id: 1,
      username: "design_master",
      userImage: "https://i.pravatar.cc/150?u=12",
      postImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
      likes: 1240,
      caption: "Clean lines and minimal vibes. #design #react",
      time: "2 HOURS AGO"
    },
    {
      id: 2,
      username: "travel_bug",
      userImage: "https://i.pravatar.cc/150?u=20",
      postImage: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop",
      likes: 856,
      caption: "Switzerland is unreal! 🏔️ #travel #wanderlust",
      time: "5 HOURS AGO"
    },
    {
      id: 3,
      username: "code_ninja",
      userImage: "https://i.pravatar.cc/150?u=30",
      postImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop",
      likes: 2300,
      caption: "Late night coding session. ☕️ #developer #setup",
      time: "1 DAY AGO"
    }
  ];

  return (
    <div className="flex justify-center min-h-screen bg-(--color-background) text-(--color-foreground)">
      
      <div className="w-full max-w-157.5">
        
        <div className="md:hidden sticky top-0 z-40 bg-(--color-background)/80 backdrop-blur-md border-b border-(--color-border) px-4 py-2 flex justify-between items-center h-15">
          {/* <img 
            src="https://www.logo.wine/a/logo/Instagram/Instagram-Wordmark-Logo.wine.svg" 
            className="h-8 invert dark:invert-0"
            alt="Instagram" 
          /> */}
          <CreativeNyxlyNIcon />
          
          <div className="flex items-center gap-5">
            <Link to="/notifications" className="hover:opacity-60 transition-opacity">
              <Heart size={26} />
            </Link>
            <Link to="/messages" className="relative hover:opacity-60 transition-opacity">
              <MessageCircle size={26} />
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white border-2 border-(--color-background)">
                3
              </span>
            </Link>
          </div>
        </div>

        {/* 2. STORIES SECTION */}
        <div className="pt-2 pb-2">
          <Stories />
        </div>

        {/* 3. POSTS FEED */}
        <div className="flex flex-col gap-4 pb-20 md:pb-4">
          {posts.map(post => (
            <Post 
              key={post.id}
              username={post.username}
              userImage={post.userImage}
              postImage={post.postImage}
              likes={post.likes}
              caption={post.caption}
              time={post.time}
            />
          ))}
        </div>
      </div>

      {/* --- RIGHT SIDEBAR (Desktop Only) --- */}
      {/* Just like real Instagram, this shows suggested users on large screens */}
      <div className="hidden lg:block w-[320px] pl-16 pt-8">
        
        {/* My Profile Mini */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3 cursor-pointer">
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" className="w-11 h-11 rounded-full" />
            <div>
              <p className="font-semibold text-sm">bapi-dev001</p>
              <p className="text-gray-500 text-sm">Bapi Developer</p>
            </div>
          </div>
          <button className="text-blue-500 text-xs font-bold hover:text-blue-700">Switch</button>
        </div>

        {/* Suggestions Header */}
        <div className="flex justify-between mb-4">
          <p className="text-gray-500 font-bold text-sm">Suggested for you</p>
          <button className="text-xs font-bold hover:opacity-50">See All</button>
        </div>

        {/* Suggested Users List */}
        <div className="space-y-3">
          {[1, 2, 3, 4].map((_, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={`https://i.pravatar.cc/150?u=${50+i}`} className="w-8 h-8 rounded-full" />
                <div>
                  <p className="font-semibold text-xs hover:underline cursor-pointer">suggested_user_{i}</p>
                  <p className="text-gray-500 text-[10px]">Followed by user_x</p>
                </div>
              </div>
              <button className="text-blue-500 text-xs font-bold hover:text-blue-700">Follow</button>
            </div>
          ))}
        </div>
        
        {/* Footer Links */}
        <div className="mt-8 flex flex-wrap gap-x-2 gap-y-1 text-xs text-gray-400">
           <span>About</span> · <span>Help</span> · <span>Press</span> · <span>API</span> · <span>Jobs</span> · <span>Privacy</span> · <span>Terms</span>
        </div>
        <div className="mt-4 text-xs text-gray-400 uppercase">
          © 2026 INSTAGRAM FROM META
        </div>

      </div>

    </div>
  );
}