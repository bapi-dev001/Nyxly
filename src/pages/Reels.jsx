import { useState, useRef, useEffect } from "react";
import { 
  Heart, 
  MessageCircle, 
  Send, 
  MoreHorizontal, 
  Music2, 
  Volume2, 
  VolumeX 
} from "lucide-react";

export default function Reels() {
  const [isMuted, setIsMuted] = useState(true);

  const reels = [
    {
      id: 1,
      url: "https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-sign-1232-large.mp4",
      user: "neon_vibes",
      avatar: "https://i.pravatar.cc/150?u=10",
      caption: "Late night city lights 🌃 #city #vibes",
      likes: "45.2K",
      comments: "1,203",
      audio: "Original Audio - neon_vibes"
    },
    {
      id: 2,
      url: "https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4",
      user: "nature_lover",
      avatar: "https://i.pravatar.cc/150?u=20",
      caption: "Spring is here! 🌸 #nature #bloom",
      likes: "120K",
      comments: "3,500",
      audio: "Spring Waltz - Chopin"
    },
    {
      id: 3,
      url: "https://assets.mixkit.co/videos/preview/mixkit-mother-with-her-little-daughter-eating-a-marshmallow-in-nature-39764-large.mp4",
      user: "family_time",
      avatar: "https://i.pravatar.cc/150?u=30",
      caption: "Sweet moments ❤️ #family",
      likes: "8.5K",
      comments: "200",
      audio: "Sweet Child O' Mine"
    }
  ];

  return (
    <div className="h-screen w-full bg-black text-white overflow-y-scroll snap-y snap-mandatory hide-scrollbar">
      {reels.map((reel) => (
        <ReelItem key={reel.id} data={reel} isMuted={isMuted} toggleMute={() => setIsMuted(!isMuted)} />
      ))}
    </div>
  );
}

function ReelItem({ data, isMuted, toggleMute }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [liked, setLiked] = useState(false);

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (videoRef.current) {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => setIsPlaying(false));
        }
    }
  }, []);

  return (
    <div className="relative h-screen w-full md:w-100 mx-auto snap-start flex items-center justify-center bg-black">
      
      <div className="relative w-full h-full md:h-[95%] md:rounded-xl overflow-hidden cursor-pointer shadow-lg border-x border-gray-800" onClick={togglePlay}>
        <video
          ref={videoRef}
          src={data.url}
          className="w-full h-full object-cover"
          loop
          muted={isMuted}
          playsInline
        />
        
        {/* Mute Button */}
        <button onClick={(e) => { e.stopPropagation(); toggleMute(); }} className="absolute top-4 right-4 bg-black/50 p-2 rounded-full backdrop-blur-sm z-30 hover:bg-black/70 transition">
           {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
        
        <div className="absolute left-0 w-full p-4 bg-linear-to-t from-black/80 via-black/40 to-transparent pt-20 z-10 bottom-15 md:bottom-0 transition-all">
          <div className="flex items-center gap-3 mb-3">
             <img src={data.avatar} className="w-9 h-9 rounded-full border border-white/50" />
             <span className="font-semibold text-sm hover:underline cursor-pointer text-white drop-shadow-md">{data.user}</span>
             <button className="border border-white/60 text-white text-xs px-2.5 py-1 rounded-md font-semibold backdrop-blur-md hover:bg-white/20 transition">Follow</button>
          </div>
          <p className="text-sm mb-3 line-clamp-2 drop-shadow-sm">{data.caption}</p>
          <div className="flex items-center gap-2 text-xs opacity-90">
             <Music2 size={13} />
             <div className="whitespace-nowrap">{data.audio}</div>
          </div>
        </div>
      </div>

      <div className="absolute right-2 md:-right-20 flex flex-col items-center gap-6 z-20 bottom-20 md:bottom-4 transition-all">
        
        <div className="flex flex-col items-center gap-1">
          <button onClick={() => setLiked(!liked)} className="transition-transform active:scale-75 hover:scale-110">
            <Heart size={28} className={`drop-shadow-lg ${liked ? "fill-red-500 text-red-500" : "text-white"}`} />
          </button>
          <span className="text-xs font-medium drop-shadow-md">{data.likes}</span>
        </div>

        <div className="flex flex-col items-center gap-1">
           <button className="hover:opacity-80 transition active:scale-90">
             <MessageCircle size={28} className="text-white drop-shadow-lg" />
           </button>
           <span className="text-xs font-medium drop-shadow-md">{data.comments}</span>
        </div>

        <button className="hover:opacity-80 transition active:scale-90">
           <Send size={28} className="-rotate-45 mb-1 text-white drop-shadow-lg" />
        </button>

        <button className="hover:opacity-80 transition">
           <MoreHorizontal size={28} className="text-white drop-shadow-lg" />
        </button>

        <div className="w-8 h-8 rounded-md border-2 border-white overflow-hidden mt-2 animate-[spin_4s_linear_infinite]">
           <img src={data.avatar} className="w-full h-full object-cover" />
        </div>
      </div>

    </div>
  );
}