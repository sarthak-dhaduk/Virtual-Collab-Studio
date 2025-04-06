import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import SearchBar from "./ui/SearchBar";
import Footer from "./ui/Footer";
import JoinModal from "./modals/JoinModal";
import AddPostModal from "./modals/AddPosts";
import CreateRoom from "./modals/CreateRoom";
import ProfileSetting from "./modals/ProfileSetting";
import AddReview from "./modals/AddReview";
import "bootstrap/dist/css/bootstrap.min.css";

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
        <div className="dashboard-container d-flex">
            <Sidebar isSidebarVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />
            <div className={`main-content ${isSidebarVisible ? "expanded" : "collapsed"}`}>
                <SearchBar isSidebarVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />
                {children}
                <AddPostModal />
                <JoinModal />
                <CreateRoom />
                <ProfileSetting />
                <AddReview />
                <Footer />
            </div>
        </div>
    );
};

export default MainContent;