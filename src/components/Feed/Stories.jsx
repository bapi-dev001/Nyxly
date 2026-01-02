import { useEffect, useRef } from "react";

export default function Stories() {
  const scrollRef = useRef(null);

  const users = [
    { id: 1, name: "your_story", img: "https://i.pravatar.cc/150?u=9" },
    { id: 2, name: "coder_1", img: "https://i.pravatar.cc/150?u=12" },
    { id: 3, name: "alex_v", img: "https://i.pravatar.cc/150?u=15" },
    { id: 4, name: "react_js", img: "https://i.pravatar.cc/150?u=20" },
    { id: 5, name: "tailwind", img: "https://i.pravatar.cc/150?u=25" },
    { id: 6, name: "lucide", img: "https://i.pravatar.cc/150?u=30" },
    { id: 7, name: "daily_dev", img: "https://i.pravatar.cc/150?u=31" },
    { id: 8, name: "web_design", img: "https://i.pravatar.cc/150?u=32" },
    { id: 9, name: "frontend", img: "https://i.pravatar.cc/150?u=33" },
    { id: 10, name: "backend", img: "https://i.pravatar.cc/150?u=34" },
  ];

  return (
    <>
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="relative w-full max-w-[100vw] py-1 md:py-6 overflow-hidden">
       
        <div 
          ref={scrollRef}
          className="flex gap-3 md:gap-5 overflow-x-auto px-4 hide-scrollbar snap-x snap-mandatory touch-pan-x w-full"
        >
          {users.map((user) => (
            
            <div key={user.id} className="flex flex-col items-center cursor-pointer shrink-0 snap-center group">
              
              <div className="w-16 h-16 md:w-18.5 md:h-18.5 rounded-full bg-linear-to-tr from-yellow-400 to-fuchsia-600 p-0.5 transition-transform group-hover:scale-105 duration-200">
                <div className="bg-(--color-background) p-0.5 rounded-full w-full h-full">
                  <img 
                    src={user.img} 
                    className="rounded-full w-full h-full object-cover" 
                    alt={user.name} 
                  />
                </div>
              </div>

              <p className="text-[11px] md:text-xs w-16 truncate text-center mt-1 text-(--color-foreground)">
                {user.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}