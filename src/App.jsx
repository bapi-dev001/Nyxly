import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext"
//  Navigation
import Sidebar from "./components/Navigation/Sidebar";
import MobileNav from "./components/Navigation/MobileNav";
//  Pages
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Messages from "./pages/Messages";
import Search from "./pages/Search";
import Settings from "./pages/Setting";
import CreatePost from "./pages/CreatePost";
import Notifications from "./pages/Notifications";
import Explore from "./pages/Explore";
import Reels from "./pages/Reels";
//  Auth
import Login from "./pages/Auth/Signin";
import Signup from "./pages/Auth/Signup";


const ProtectedRoute = ({ children }) => {
  const { user } = useAuth()
  if(!user) {
    return <Navigate to="/auth/login" replace />
  }
  return children;
}

function App() {

  const location = useLocation();
  // const isAuthPage = location.pathname === "/auth";
  const isAuthPage = location.pathname.startsWith("/auth");

  return (
    <div className="min-h-screen bg-(--color-background) text-(--color-foreground) transition-colors duration-300">
      <div className="flex min-h-screen">
        {!isAuthPage && (
          <div className="hidden md:block">
            <Sidebar />
          </div>
        )}

        <main className={`flex-1 overflow-hidden ${!isAuthPage ? "md:ml-18 xl:ml-60" : ""} pb-16 md:pb-0`}>
          <Routes>
            <Route path="/" element={<ProtectedRoute> <Home/> </ProtectedRoute>} />
            <Route path="/search" element={ <ProtectedRoute> <Search/> </ProtectedRoute> } />
            <Route path="/explore" element={ <ProtectedRoute> <Explore/> </ProtectedRoute> } />
            <Route path="/reels" element={ <ProtectedRoute> <Reels/> </ProtectedRoute> } />
            <Route path="/messages" element={ <ProtectedRoute> <Messages/> </ProtectedRoute> } />
            <Route path="/notifications" element={ <ProtectedRoute> <Notifications/> </ProtectedRoute> } />
            <Route path="/create" element={ <ProtectedRoute> <CreatePost/> </ProtectedRoute> } />
            <Route path="/profile" element={ <ProtectedRoute> <Profile/> </ProtectedRoute> } />
            <Route path="/account/edit" element={ <ProtectedRoute> <Settings/> </ProtectedRoute> } />

            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<Signup />} />
            
            {/* <Route path="*" element={<Navigate to="/" />} /> */}
          </Routes>
        </main>

        {!isAuthPage && <MobileNav />}
      </div>
    </div>
  )
  
}

export default App;