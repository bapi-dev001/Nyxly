import { useState, useRef } from "react";
import { 
  X, 
  Image as ImageIcon, 
  ArrowLeft, 
  MapPin, 
  Smile, 
  ChevronDown 
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 1. Handle File Selection
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  };

  // 2. Handle "Share" (Mock function)
  const handleShare = () => {
    setIsLoading(true);
    // Simulate network request
    setTimeout(() => {
      setIsLoading(false);
      navigate("/"); // Go back home after sharing
    }, 2000);
  };

  // 3. Clear selection to go back
  const clearSelection = () => {
    setSelectedFile(null);
    setPreview(null);
  };

  return (
    // Overlay Background (Simulates a Modal)
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      
      {/* Close Button (Top Right) */}
      <button 
        onClick={() => navigate("/")} 
        className="absolute top-4 right-4 text-white hover:opacity-70 z-60"
      >
        <X size={32} />
      </button>

      {/* --- MAIN MODAL CONTAINER --- */}
      <div className="bg-(--color-background) text-(--color-foreground) w-full max-w-100 md:max-w-200 aspect-square md:aspect-auto md:h-[70vh] rounded-xl overflow-hidden shadow-2xl flex flex-col border border-(--color-border) animate-in fade-in zoom-in-95 duration-200">
        
        {/* HEADER */}
        <div className="h-11.25 border-b border-(--color-border) flex justify-between items-center px-4 bg-(--color-background)">
          {selectedFile ? (
            <button onClick={clearSelection} className="hover:opacity-60">
              <ArrowLeft size={24} />
            </button>
          ) : (
            <div className="w-6"></div> // Spacer
          )}
          
          <h1 className="font-semibold text-base">Create new post</h1>
          
          {selectedFile ? (
            <button 
              onClick={handleShare}
              disabled={isLoading}
              className="text-[#0095f6] font-semibold text-sm hover:text-white disabled:opacity-50"
            >
              {isLoading ? "Sharing..." : "Share"}
            </button>
          ) : (
             <div className="w-6"></div> // Spacer
          )}
        </div>

        {/* CONTENT AREA */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* LEFT: IMAGE PREVIEW */}
          {!selectedFile ? (
            // STATE 1: NO FILE SELECTED
            <div className="flex flex-col items-center justify-center h-full w-full p-8 text-center transition-colors">
              <div className="mb-4">
                 <ImageIcon size={64} strokeWidth={1} className="text-(--color-foreground)" />
              </div>
              <h3 className="text-xl font-light mb-4">Drag photos and videos here</h3>
              
              <button 
                onClick={() => fileInputRef.current.click()}
                className="bg-[#0095f6] hover:bg-[#1877f2] text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors"
              >
                Select from computer
              </button>
              
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileSelect} 
                className="hidden" 
                accept="image/*,video/*"
              />
            </div>
          ) : (
            // STATE 2: FILE SELECTED (Split View)
            <>
              {/* IMAGE SIDE (Full width on mobile, 60% on desktop) */}
              <div className="w-full md:w-[60%] h-75 md:h-full bg-black flex items-center justify-center border-b md:border-b-0 md:border-r border-(--color-border)">
                <img src={preview} alt="preview" className="max-h-full max-w-full object-contain" />
              </div>

              {/* CAPTION SIDE (Hidden on mobile usually until next step, but simplified here) */}
              <div className="flex-1 bg-(--color-background) flex flex-col">
                
                {/* User Info */}
                <div className="p-4 flex items-center gap-3">
                  <img 
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" 
                    className="w-8 h-8 rounded-full object-cover" 
                  />
                  <span className="font-semibold text-sm">bapi-dev001</span>
                </div>

                {/* Caption Input */}
                <textarea
                  className="w-full h-37.5 bg-transparent p-4 outline-none resize-none text-sm placeholder:text-gray-500"
                  placeholder="Write a caption..."
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  maxLength={2200}
                ></textarea>

                {/* Tools (Emoji, Location) */}
                <div className="flex justify-between items-center px-4 py-2 border-b border-(--color-border)">
                  <Smile size={20} className="text-gray-400 cursor-pointer hover:text-gray-300" />
                  <span className="text-xs text-gray-500">{caption.length}/2,200</span>
                </div>

                <div className="border-b border-(--color-border)">
                  <div className="flex justify-between items-center p-3 cursor-pointer hover:bg-(--color-chat-received)">
                    <span className="text-sm">Add location</span>
                    <MapPin size={20} className="text-(--color-foreground)" />
                  </div>
                </div>

                <div className="border-b border-(--color-border)">
                  <div className="flex justify-between items-center p-3 cursor-pointer hover:bg-(--color-chat-received)">
                    <span className="text-sm">Accessibility</span>
                    <ChevronDown size={20} className="text-(--color-foreground)" />
                  </div>
                </div>

              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
}