import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main"
import "./App.css";
// import {handlePost as Post} from "./components/Navbar";
import CreatePost from "./components/CreatePost.jsx"

export default function App({handlePost}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Sync theme with data-theme attribute
  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [darkMode]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Initially closed as requested
  const [toggle ,setToggle]=useState(false);

  function handlePost(){
    setToggle(true)
  }

  const toggleSidebar = () => {
    console.log("Toggle clicked, new state:", !isSidebarOpen);
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const goHome = () => console.log("Navigating to Home");
  const goCreate = () => console.log("Navigating to Create Post");

  return (
    <div className={`app-container ${darkMode ? "dark" : "light"}`}>
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onToggleSidebar={toggleSidebar}
        onGoHome={goHome}
        handlePost={handlePost}

      />
      <div className="main-layout">
        <Sidebar isOpen={isSidebarOpen} />
        {toggle ?<CreatePost/>:<Main/>}
        {/* <Main/> */}
      </div>
    </div>
  );
}