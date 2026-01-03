import { useEffect, useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { Settings, Grid, Bookmark, Users, Heart, Camera, } from "lucide-react";
import { Link } from "react-router-dom";


export default function Profile() {
  const { user, setUser } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef(null)

  // 2. Fetch User's Posts from Backend
  useEffect(() => {
    const fetchPosts = async () => {
      if (!user) return;
      try {
        const { data } = await axios.get(`https://nyxlyapi.onrender.com/api/posts/user/${user._id}`);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [user]);

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const token = JSON.parse(localStorage.getItem("userInfo")).token;

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post('https://nyxlyapi.onrender.com/api/users/profile/photo', formData, config);

      const updatedUser = { ...data, token }; 
      localStorage.setItem("userInfo", JSON.stringify(updatedUser));
      setUser(updatedUser);

    } catch (error) {
      console.error("Error uploading photo:", error);
    }
  };

  if (!user) return null; // Safety check

  return (
    <div className="flex-1 min-h-screen bg-(--color-background) text---color-chat-received p-4 md:p-8 ml-0">
      
      {/* --- PROFILE HEADER --- */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
          
          {/* Avatar */}
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-linear-to-tr from-yellow-400 via-red-500 to-purple-600 p-0.5 relative cursor-pointer" 
              onClick={() => fileInputRef.current.click()}
          >
            <div className="w-full h-full rounded-full bg-black p-1">
              <img 
                src={user.avatar || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"} 
                alt="profile" 
                className="w-full h-full rounded-full object-cover bg-(--color-background) hover:bg-gray-600"
              />
            </div>
            <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <Camera className="text-(--color-chat-received)" size={32} />
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handlePhotoChange} 
              className="hidden hover:block" 
              accept="image/*"
            />
          </div>

          {/* User Info */}
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
            
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-xl md:text-2xl font-normal">{user.username}</h1> {/* Real Username */}
              <div className="flex gap-2">
                <button className="px-4 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-semibold transition-colors">
                  Edit Profile
                </button>
                {/* <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg">
                  <Settings size={20} />
                </button> */}
                <Link className="p-2 bg-white/10 hover:bg-white/20 rounded-lg" to="/account/edit">
                  <Settings size={20} />
                </Link>
              </div>
            </div>

            <div className="flex gap-8 mb-4 text-sm md:text-base">
              <div><span className="font-bold">{posts.length}</span> posts</div> {/* Real Post Count */}
              <div><span className="font-bold">0</span> followers</div>
              <div><span className="font-bold">0</span> following</div>
            </div>

            <div className="space-y-1">
              <p className="font-bold">{user.fullName}</p> {/* Real Full Name */}
              <p className="text-sm text-gray-300 whitespace-pre-line">
                {user.bio || "No bio yet."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- TABS --- */}
      <div className="max-w-4xl mx-auto border-t border-white/20 mb-4">
        <div className="flex justify-center gap-12">
          <button className="flex items-center gap-2 py-4 border-t border-white -mt-px text-xs font-bold tracking-widest">
            <Grid size={12} /> POSTS
          </button>
          <button className="flex items-center gap-2 py-4 text-gray-500 text-xs font-bold tracking-widest">
            <Bookmark size={12} /> SAVED
          </button>
          <button className="flex items-center gap-2 py-4 text-gray-500 text-xs font-bold tracking-widest">
            <Users size={12} /> TAGGED
          </button>
        </div>
      </div>

      {/* --- POSTS GRID --- */}
      <div className="max-w-4xl mx-auto grid grid-cols-3 gap-1 md:gap-2">
        {loading ? (
            <div className="col-span-3 text-center py-10 text-gray-500">Loading posts...</div>
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className="relative group aspect-square bg-gray-900 cursor-pointer overflow-hidden">
              <img 
                src={post.image} 
                alt="Post" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 text-white font-bold">
                <div className="flex items-center gap-2">
                  <Heart fill="white" size={20} /> {post.likes.length}
                </div>
              </div>
            </div>
          ))
        ) : (
          /* Empty State */
          <div className="col-span-3 flex flex-col items-center justify-center py-20 text-gray-500">
            <div className="w-16 h-16 border-2 border-white/20 rounded-full flex items-center justify-center mb-4">
              <Settings size={32} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No Posts Yet</h3>
            <p className="text-sm">When you create a post, it will appear here.</p>
          </div>
        )}
      </div>

    </div>
  );
}