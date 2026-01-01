import ProfileHeader from "../components/Profile/ProfileHeader";
import PostGrid from "../components/Profile/PostGrid";
import { Grid, Bookmark, Tag } from "lucide-react";

export default function Profile() {
  return (
    <div className="max-w-233.75 mx-auto pt-8 pb-10">
      {/* User Info Section */}
      <ProfileHeader />

      {/* Tabs Section */}
      <div className="border-t border-gray-300 mt-12 flex justify-center space-x-12">
        <div className="flex items-center gap-1 border-t border-black -mt-px py-4 cursor-pointer text-xs font-bold tracking-widest uppercase">
          <Grid size={14} /> POSTS
        </div>
        <div className="flex items-center gap-1 text-gray-400 py-4 cursor-pointer text-xs font-bold tracking-widest uppercase">
          <Bookmark size={14} /> SAVED
        </div>
        <div className="flex items-center gap-1 text-gray-400 py-4 cursor-pointer text-xs font-bold tracking-widest uppercase">
          <Tag size={14} /> TAGGED
        </div>
      </div>

      {/* Photos Grid */}
      <PostGrid />
    </div>
  );
}