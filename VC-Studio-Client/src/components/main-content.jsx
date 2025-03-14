import React, { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import SearchBar from "./ui/SearchBar";
import Footer from "./ui/Footer";
import JoinModal from "./modals/JoinModal";
import AddPostModal from "./modals/AddPosts";
import CreateRoom from "./modals/CreateRoom";
import ProfileSetting from "./modals/ProfileSetting";
import AddReview from "./modals/AddReview";


const MainContent = ({ children }) => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth > 768);

    useEffect(() => {
        const handleResize = () => {
            setIsSidebarVisible(window.innerWidth > 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const toggleSidebar = () => {
        setIsSidebarVisible((prev) => !prev);
    };

    return (
        <div className="dashboard-container">
            <Sidebar isSidebarVisible={isSidebarVisible} />
            <div className="main-content">
                <SearchBar isSidebarVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />
                {children}
                <AddPostModal />
                <JoinModal />
                <CreateRoom />
                <ProfileSetting />
                <AddReview />
                
            </div>
        </div>
    );
};

export default MainContent;
