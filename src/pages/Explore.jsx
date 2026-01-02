import { Search, Heart, MessageCircle, Copy } from "lucide-react";

export default function Explore() {
  // Mock Data
  const posts = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    image: `https://picsum.photos/seed/${i * 123}/600/600`, // Random images
    likes: Math.floor(Math.random() * 5000) + 100,
    comments: Math.floor(Math.random() * 100) + 10,
    type: i % 3 === 2 ? "vertical" : "square", // Every 3rd item is tall
  }));

  return (
    <div className="flex flex-col min-h-screen bg-(--color-background) text-(--color-foreground) pb-20 md:pb-0">
      
      <div className="md:hidden sticky top-0 z-30 bg-(--color-background) p-3">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
          <input 
            type="text" 
            placeholder="Search" 
            className="w-full bg-(--color-chat-received) rounded-lg py-2 pl-10 pr-4 outline-none text-sm placeholder:text-gray-500"
          />
        </div>
      </div>

      <div className="max-w-233.75 mx-auto w-full p-1 md:p-4">
        <div className="grid grid-cols-3 gap-1 md:gap-4 auto-dense">
          {posts.map((post) => (
            <div 
              key={post.id} 
              className={`relative group cursor-pointer overflow-hidden bg-gray-100 ${
                post.type === "vertical" ? "row-span-2" : "row-span-1"
              }`}
            >
              <img 
                src={post.image} 
                alt="explore" 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 text-white font-bold">
                <div className="flex items-center gap-1">
                  <Heart size={20} fill="white" /> {post.likes}
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle size={20} fill="white" /> {post.comments}
                </div>
              </div>

              {post.id % 4 === 0 && (
                 <div className="absolute top-2 right-2 text-white drop-shadow-md">
                    <Copy size={20} className="rotate-90" />
                 </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}