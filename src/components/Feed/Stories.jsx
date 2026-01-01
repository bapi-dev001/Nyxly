export default function Stories() {
  const users = [
    { id: 1, name: "your_story", img: "https://i.pravatar.cc/150?u=9" },
    { id: 2, name: "coder_1", img: "https://i.pravatar.cc/150?u=12" },
    { id: 3, name: "alex_v", img: "https://i.pravatar.cc/150?u=15" },
    { id: 4, name: "react_js", img: "https://i.pravatar.cc/150?u=20" },
    { id: 5, name: "tailwind", img: "https://i.pravatar.cc/150?u=25" },
    { id: 6, name: "lucide", img: "https://i.pravatar.cc/150?u=30" },
  ];

  return (
    <div className="flex space-x-4 p-4 rounded-lg overflow-x-auto scrollbar-hide">
      {users.map((user) => (
        <div key={user.id} className="flex flex-col items-center cursor-pointer group">
          {/* Gradient Border Circle */}
          <div className="w-16 h-16 rounded-full bg-linear-to-tr from-yellow-400 to-fuchsia-600 p-0.5">
            <div className="bg-white p-0.5 rounded-full">
              <img src={user.img} className="rounded-full w-full h-full object-cover" alt={user.name} />
            </div>
          </div>
          <p className="text-xs w-16 truncate text-center mt-1">{user.name}</p>
        </div>
      ))}
    </div>
  );
}