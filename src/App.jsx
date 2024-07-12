import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home } from "lucide-react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./layouts/default"; // available: default, navbar, sidebar
import Index from "./pages/Index.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";
import Settings from "./pages/Settings.jsx"; // Import the new Settings page
import ProfilesPage from "./pages/ProfilesPage.jsx"; // Import the new ProfilesPage
import DetectionsPage from "./pages/DetectionsPage.jsx"; // Import the new DetectionsPage

const queryClient = new QueryClient();

export const navItems = [
  {
    title: "Home", // Feel free to change this to your liking
    to: "/",
    icon: <Home className="h-4 w-4" />,
  },
  {
    title: "Login",
    to: "/login",
    icon: <Home className="h-4 w-4" />,
  },
  {
    title: "Register",
    to: "/register",
    icon: <Home className="h-4 w-4" />,
  },
  {
    title: "Profile",
    to: "/profile",
    icon: <Home className="h-4 w-4" />,
  },
  {
    title: "Settings", // Add Settings to the navigation items
    to: "/settings",
    icon: <Home className="h-4 w-4" />,
  },
  {
    title: "Profiles", // Add Profiles to the navigation items
    to: "/profiles",
    icon: <Home className="h-4 w-4" />,
  },
  {
    title: "Detections", // Add Detections to the navigation items
    to: "/detections",
    icon: <Home className="h-4 w-4" />,
  },
];

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Index />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="profile" element={<Profile />} />
              <Route path="settings" element={<Settings />} /> {/* Add the new Settings route */}
              <Route path="profiles" element={<ProfilesPage />} /> {/* Add the new ProfilesPage route */}
              <Route path="detections" element={<DetectionsPage />} /> {/* Add the new DetectionsPage route */}
              {/* Add more routes here as needed */}
            </Route>
          </Routes>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;