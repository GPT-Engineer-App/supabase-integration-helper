import React from 'react';
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
import Settings from "./pages/Settings.jsx";
import ProfilesPage from "./pages/ProfilesPage.jsx";
import DetectionsPage from "./pages/DetectionsPage.jsx";

const queryClient = new QueryClient();

export const navItems = [
  {
    title: "Home",
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
    title: "Settings",
    to: "/settings",
    icon: <Home className="h-4 w-4" />,
  },
  {
    title: "Profiles",
    to: "/profiles",
    icon: <Home className="h-4 w-4" />,
  },
  {
    title: "Detections",
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
              <Route path="settings" element={<Settings />} />
              <Route path="profiles" element={<ProfilesPage />} />
              <Route path="detections" element={<DetectionsPage />} />
            </Route>
          </Routes>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;