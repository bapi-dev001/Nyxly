export default function PostGrid() {
  // Dummy data for the grid
  const posts = Array(9).fill("https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=400");

  return (
    <div className="grid grid-cols-3 gap-1 md:gap-8">
      {posts.map((src, index) => (
        <div key={index} className="relative aspect-square group cursor-pointer">
          <img src={src} alt="post" className="w-full h-full object-cover" />
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200 text-white">
            <div className="flex space-x-6 font-bold">
              <span>❤️ 240</span>
              <span>💬 12</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}