import { Home, Compass, Film, PlusSquare, MessageCircle } from "lucide-react";

export default function MobileNav() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-(--color-background) text-(--color-foreground) border-t border-(--color-border) px-5 py-4 flex justify-between items-center z-50">
      <Home className="w-7 h-7" />
      <Compass className="w-7 h-7" />
      <Film className="w-7 h-7" />
      <PlusSquare className="w-7 h-7" />
      <MessageCircle className="w-7 h-7" />
      <div className="w-7 h-7 rounded-full bg-(--color-chat-received) border border-(--color-border)" />
    </div>
  );
}