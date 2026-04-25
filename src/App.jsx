import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main"
import Login_Signup from "./components/Login_Signup.jsx"
import "./App.css";
// import {handlePost as Post} from "./components/Navbar";
import CreatePost from "./components/CreatePost.jsx"

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [isLog, setIsLog] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [darkMode]);

  function handleLog() {
    setIsLog(true);
  }

  function handlePost() {
    setToggle(true);
  }

  const toggleSidebar = () => {
    console.log("Toggle clicked, new state:", !isSidebarOpen);
    setIsSidebarOpen(!isSidebarOpen);
  };

  const goHome = () => setToggle(false);

  return (
    <div className={`app-container ${darkMode ? "dark" : "light"}`}>
      {!isLog && <Login_Signup handleLog={handleLog} />}
      {isLog && (
        <Navbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onToggleSidebar={toggleSidebar}
          onGoHome={goHome}
          handlePost={handlePost}
        />
      )}
      {isLog && (
        <div className="main-layout">
          <Sidebar isOpen={isSidebarOpen} />
          {toggle ? <CreatePost /> : <Main searchQuery={searchQuery} />}
        </div>
      )}
    </div>
  );
}