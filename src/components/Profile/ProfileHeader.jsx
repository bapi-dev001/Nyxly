import { Link } from "react-router-dom";

export default function ProfileHeader() {
  return (
    <header className="flex flex-row items-center md:items-start px-4 md:px-0">
      {/* Avatar */}
      <div className="shrink-0 mr-8 md:mr-24">
        <div className="w-20 h-20 md:w-36 md:h-36 rounded-full overflow-hidden border border-gray-200">
          <img 
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150" 
            alt="profile" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Details */}
      <section className="flex-1">
        <div className="flex items-center mb-5 gap-4">
          <h2 className="text-xl font-light">username_here</h2>
          <Link 
            to="/account/edit" 
            className="bg-(--color-chat-received) text-(--color-foreground) border border-(--color-border) px-4 py-1.5 rounded-lg font-semibold text-sm hover:opacity-80 transition-opacity"
          >
            Edit profile
          </Link>
        </div>

        <div className="hidden md:flex mb-5 space-x-10">
          <span><b className="font-semibold">54</b> posts</span>
          <span><b className="font-semibold">1.2k</b> followers</span>
          <span><b className="font-semibold">850</b> following</span>
        </div>

        <div>
          <h1 className="font-semibold text-sm">Full Name</h1>
          <p className="text-sm">Building cool things with React 🚀</p>
          <a href="#" className="text-sm font-semibold text-blue-900">github.com/profile</a>
        </div>
      </section>
    </header>
  );
}