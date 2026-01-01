import Stories from "../components/Feed/Stories";
import Post from "../components/Feed/Post";
import Suggestions from "../components/Feed/Post"; // We'll create this or mock it

export default function Home() {
  return (
    <div className="flex justify-center gap-10 pt-8">
      {/* Left Side: Stories and Feed */}
      <section className="max-w-117.5 w-full">
        <Stories />
        
        <div className="flex flex-col gap-4 mt-8">
          {/* Mapping through dummy posts */}
          <Post 
            username="design_master" 
            userImage="https://i.pravatar.cc/150?u=1" 
            postImage="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800" 
            caption="Clean lines and minimal vibes. #design #react" 
            likes="1,240"
          />
          <Post 
            username="travel_bug" 
            userImage="https://i.pravatar.cc/150?u=2" 
            postImage="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800" 
            caption="Missing the ocean breeze today. 🌊" 
            likes="892"
          />
        </div>
      </section>

      {/* Right Side: Suggestions (Hidden on smaller screens) */}
      <section className="hidden lg:block w-[320px]">
        <Suggestions />
      </section>
    </div>
  );
}