import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from "lucide-react";

export default function Post({ username, userImage, postImage, caption, likes }) {
  return (
    <div className="bg-(--color-background) text-(---color-foreground) border border-(--color-border) rounded-lg mb-4">
      {/* Header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-3">
          <img src={userImage} className="w-8 h-8 rounded-full object-cover" alt={username} />
          <span className="font-semibold text-sm hover:text-gray-500 cursor-pointer">{username}</span>
        </div>
        <MoreHorizontal className="cursor-pointer" size={20} />
      </div>

      {/* Image */}
      <div className="aspect-square bg-(--color-background) text-(--color-foreground">
        <img src={postImage} className="w-full h-full object-cover" alt="post content" />
      </div>

      {/* Actions */}
      <div className="p-3">
        <div className="flex justify-between items-center mb-2">
          <div className="flex gap-4">
            <Heart className="hover:text-gray-500 cursor-pointer" size={24} />
            <MessageCircle className="hover:text-gray-500 cursor-pointer" size={24} />
            <Send className="hover:text-gray-500 cursor-pointer" size={24} />
          </div>
          <Bookmark className="hover:text-gray-500 cursor-pointer" size={24} />
        </div>
        
        {/* Likes and Caption */}
        <p className="font-bold text-sm mb-1">{likes} likes</p>
        <p className="text-sm">
          <span className="font-bold mr-2">{username}</span>
          {caption}
        </p>
        <p className="text-gray-400 text-xs mt-2 uppercase">2 hours ago</p>
      </div>

      {/* Comment Input */}
      <div className="p-3 border-t border-(--color-border) flex items-center justify-between">
        <input 
          type="text" 
          placeholder="Add a comment..." 
          className="text-sm w-full outline-none"
        />
        <button className="text-blue-500 font-semibold text-sm ml-2">Post</button>
      </div>
    </div>
  );
}