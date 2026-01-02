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
    if (videoRef.current) videoRef.current.play().catch(() => {});
  }, []);

  return (
    <div className="relative h-screen w-full md:w-100 mx-auto snap-start flex items-center justify-center bg-black border-x border-gray-800">
      
      <div className="relative w-full h-full md:h-[95%] md:rounded-lg overflow-hidden cursor-pointer" onClick={togglePlay}>
        <video
          ref={videoRef}
          src={data.url}
          className="w-full h-full object-cover"
          loop
          muted={isMuted}
          playsInline
        />
        
        <button onClick={(e) => { e.stopPropagation(); toggleMute(); }} className="absolute top-4 right-4 bg-black/50 p-2 rounded-full backdrop-blur-sm z-20">
           {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
        
        <div className="absolute bottom-0 left-0 w-full p-4 bg-linear-to-t from-black/80 to-transparent pt-20 z-10">
          <div className="flex items-center gap-3 mb-3">
             <img src={data.avatar} className="w-8 h-8 rounded-full border border-white" />
             <span className="font-semibold text-sm hover:underline cursor-pointer">{data.user}</span>
             <button className="border border-white/50 text-white text-xs px-2 py-1 rounded-md font-semibold backdrop-blur-sm">Follow</button>
          </div>
          <p className="text-sm mb-3 line-clamp-2">{data.caption}</p>
          <div className="flex items-center gap-2 text-xs opacity-90 overflow-hidden">
             <Music2 size={12} />
             <div className="whitespace-nowrap animate-marquee">{data.audio} • Original Audio</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 right-2 md:-right-16 flex flex-col items-center gap-6 z-20 md:pb-10">
        
        {/* Like */}
        <div className="flex flex-col items-center gap-1">
          <button onClick={() => setLiked(!liked)} className="transition-transform active:scale-75">
            <Heart size={28} className={liked ? "fill-red-500 text-red-500" : "text-white"} />
          </button>
          <span className="text-xs font-medium">{data.likes}</span>
        </div>

        <div className="flex flex-col items-center gap-1">
           <MessageCircle size={28} />
           <span className="text-xs font-medium">{data.comments}</span>
        </div>
        <div className="flex flex-col items-center gap-1">
           <Send size={28} className="-rotate-45 mb-1" />
        </div>

        <MoreHorizontal size={28} />
        <div className="w-8 h-8 rounded-md border-2 border-white overflow-hidden mt-2">
           <img src={data.avatar} className="w-full h-full object-cover" />
        </div>
      </div>

    </div>
  );
}