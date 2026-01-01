import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Sidebar from "./components/Navigation/Sidebar";
import MobileNav from "./components/Navigation/MobileNav";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import Messages from "./pages/Messages";
import Search from "./pages/Search";
import Settings from "./pages/Setting";

function App() {

  const location = useLocation();
  const isAuthPage = location.pathname === "/auth";

  return (
    <div className="min-h-screen bg-(--color-background) text-(--color-foreground) transition-colors duration-300">
      <div className="flex min-h-screen">
        {!isAuthPage && (
          <div className="hidden md:block">
            <Sidebar />
          </div>
        )}

        <main className={`flex-1 ${!isAuthPage ? "md:ml-18 xl:ml-60" : ""} pb-16 md:pb-0`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={ <Search /> } />
            <Route path="/messages" element={ <Messages /> } />
            <Route path="/profile" element={<Profile />} />
            <Route path="/account/edit" element={ <Settings /> } />
            <Route path="/auth" element={<Auth />} />
            
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        {!isAuthPage && <MobileNav />}
      </div>
    </div>
  )
  
}

export default App;