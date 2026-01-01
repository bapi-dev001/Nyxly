import { useState } from "react";
import { 
  User, 
  Lock, 
  Bell, 
  Shield, 
  HelpCircle, 
  Monitor,
  ChevronRight 
} from "lucide-react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("edit_profile");

  // Settings Menu Items
  const menuItems = [
    { id: "edit_profile", label: "Edit profile", icon: User },
    { id: "privacy", label: "Privacy and security", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "devices", label: "Devices & permissions", icon: Monitor },
    { id: "help", label: "Help", icon: HelpCircle },
  ];

  return (
    <div className="max-w-233.75 mx-auto mt-8 mb-8 border border-(--color-border) bg-(--color-background) text-(--color-foreground) rounded-lg shadow-sm overflow-hidden flex flex-col md:flex-row min-h-150">
      
      {/* --- LEFT SIDE: MENU --- */}
      <div className="w-full md:w-62.5 border-r border-(--color-border) flex flex-col">
        
        {/* Meta Accounts Center Banner (Optional "Same to Same" detail) */}
        <div className="p-5 border-b border-(--color-border) mx-4 mt-2 mb-2">
          <h3 className="font-bold text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-pink-600 mb-1">
            Meta
          </h3>
          <p className="font-bold text-lg leading-none">Accounts Center</p>
          <p className="text-xs text-gray-500 mt-2">Manage your connected experiences and account settings across Meta technologies.</p>
        </div>

        {/* Menu Links */}
        <div className="flex-1 py-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-6 py-4 text-sm hover:bg-(--color-chat-received) transition-colors border-l-2 ${
                activeTab === item.id 
                  ? "border-(--color-foreground) font-semibold bg-(--color-chat-received)" 
                  : "border-transparent"
              }`}
            >
              <div className="flex items-center gap-3">
                 {/* Icon hidden on Desktop usually, but good for mobile responsiveness */}
                 <item.icon size={20} className="" />
                 <span>{item.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* --- RIGHT SIDE: CONTENT FORM --- */}
      <div className="flex-1 p-4 md:p-10">
        
        {/* Dynamic Header */}
        <h2 className="text-2xl font-light mb-8 md:mb-10 capitalize">
          {menuItems.find(i => i.id === activeTab)?.label.replace("_", " ")}
        </h2>

        {/* EDIT PROFILE FORM */}
        {activeTab === "edit_profile" && (
          <form className="max-w-125" onSubmit={(e) => e.preventDefault()}>
            
            {/* 1. Change Avatar Section */}
            <div className="flex items-center gap-6 mb-8 bg-(--color-chat-received) p-4 rounded-xl">
              <img 
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" 
                alt="profile" 
                className="w-14 h-14 rounded-full"
              />
              <div>
                <p className="font-bold text-base">username_here</p>
                <button className="text-blue-500 text-sm font-semibold hover:text-blue-700">
                  Change profile photo
                </button>
              </div>
            </div>

            {/* 2. Form Inputs */}
            <div className="space-y-6">
              
              {/* Name */}
              <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-8">
                <label className="md:w-32 font-semibold text-base md:text-right mt-2">Name</label>
                <div className="flex-1">
                  <input 
                    type="text" 
                    defaultValue="John Doe"
                    className="w-full border border-(--color-border) bg-transparent rounded-lg px-3 py-2 text-sm focus:border-gray-500 outline-none"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Help people discover your account by using the name you're known by: either your full name, nickname, or business name.
                  </p>
                </div>
              </div>

              {/* Username */}
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
                <label className="md:w-32 font-semibold text-base md:text-right">Username</label>
                <div className="flex-1">
                  <input 
                    type="text" 
                    defaultValue="username_here"
                    className="w-full border border-(--color-border) bg-transparent rounded-lg px-3 py-2 text-sm focus:border-gray-500 outline-none"
                  />
                </div>
              </div>

              {/* Bio */}
              <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-8">
                <label className="md:w-32 font-semibold text-base md:text-right mt-2">Bio</label>
                <div className="flex-1">
                  <textarea 
                    rows="3"
                    defaultValue="Building cool things with React 🚀"
                    className="w-full border border-(--color-border) bg-transparent rounded-lg px-3 py-2 text-sm focus:border-gray-500 outline-none"
                  />
                  <p className="text-xs text-gray-500 mt-2 font-bold">0 / 150</p>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex md:justify-end mt-8">
                 <button className="bg-[#0095f6] hover:bg-[#1877f2] text-white px-6 py-2 rounded-lg font-semibold text-sm transition-colors">
                   Submit
                 </button>
              </div>

            </div>
          </form>
        )}

        {/* Placeholder for other tabs */}
        {activeTab !== "edit_profile" && (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
             <Shield size={48} className="mb-4 opacity-50" />
             <p>This section is under construction.</p>
          </div>
        )}
      </div>
    </div>
  );
}