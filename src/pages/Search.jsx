import { useState } from "react";
import { Search as SearchIcon, X, XCircle } from "lucide-react";

export default function Search() {
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState([
    { id: 1, username: "react_official", name: "React", img: "https://i.pravatar.cc/150?u=3" },
    { id: 2, username: "tailwindcss", name: "Tailwind CSS", img: "https://i.pravatar.cc/150?u=4" },
    { id: 3, username: "design_daily", name: "Design Inspiration", img: "https://i.pravatar.cc/150?u=1" },
    { id: 4, username: "web_wizard", name: "Web Dev Tips", img: "https://i.pravatar.cc/150?u=8" },
  ]);

  // Handle removing a single recent item
  const removeRecent = (id) => {
    setRecentSearches(recentSearches.filter((item) => item.id !== id));
  };

  // Clear the input field
  const clearQuery = () => setQuery("");

  return (
    <div className="max-w-150 mx-auto mt-4 min-h-screen text-(--color-foreground)">
      
      {/* 1. Search Header */}
      <div className="px-4 pt-4 pb-6">
        <h1 className="text-2xl font-semibold mb-6 px-2">Search</h1>
        
        {/* Search Input Container */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-4 w-4 text-gray-400 group-focus-within:hidden" />
          </div>
          
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className="block w-full pl-10 pr-10 py-3 bg-(--color-chat-received) border-none rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 placeholder:text-gray-500"
          />

          {/* Clear Input Button (X) */}
          {query && (
            <button 
              onClick={clearQuery}
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400 hover:text-(--color-foreground)"
            >
              <XCircle size={16} fill="currentColor" className="text-gray-300" />
            </button>
          )}
        </div>
      </div>

      <div className="border-t border-(--color-border)"></div>

      {/* 2. Recent Searches Section */}
      <div className="px-4 py-4">
        <div className="flex justify-between items-center mb-4 px-2">
          <h2 className="font-semibold text-base">Recent</h2>
          {recentSearches.length > 0 && (
            <button 
              onClick={() => setRecentSearches([])}
              className="text-blue-500 text-sm font-semibold hover:text-blue-700"
            >
              Clear all
            </button>
          )}
        </div>

        {/* List of Users */}
        <div className="flex flex-col">
          {recentSearches.length === 0 ? (
            <p className="text-gray-500 text-center mt-10 text-sm">No recent searches.</p>
          ) : (
            recentSearches
              .filter(item => item.username.toLowerCase().includes(query.toLowerCase()))
              .map((user) => (
              <div 
                key={user.id} 
                className="flex items-center justify-between p-3 hover:bg-(--color-chat-received) rounded-lg cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <img src={user.img} alt={user.username} className="w-11 h-11 rounded-full border border-(--color-border)" />
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm">{user.username}</span>
                    <span className="text-gray-500 text-sm">{user.name}</span>
                  </div>
                </div>
                
                {/* Delete Button (X) */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation(); // Stop click from triggering user selection
                    removeRecent(user.id);
                  }}
                  className="text-gray-400 hover:text-(--color-foreground) p-2"
                >
                  <X size={20} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}