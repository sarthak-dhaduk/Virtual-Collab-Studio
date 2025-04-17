import React, { useState, useEffect } from 'react';
import Input from '../../components/ui/input';
import Correct from '../../assets/img/Correct.svg';
import { useNavigate, useLocation } from 'react-router-dom';

const SearchBar = ({ isSidebarVisible, toggleSidebar }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    // Initialize search query from URL
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const query = searchParams.get('search') || '';
        setSearchQuery(query);
    }, [location.search]);

    const handleSearch = () => {
        if (!searchQuery.trim()) {
            // If search is empty, navigate to blog page without search parameter
            window.location.href = '/blog';
            return;
        }
        // Navigate to blog page with search query and reload
        window.location.href = `/blog?search=${encodeURIComponent(searchQuery)}`;
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="card p-3 shadow-sm d-flex flex-row align-items-center">
            <div className="flex-grow-1 me-2">
                <Input
                    type="text"
                    name="search"
                    placeholder="Search for coding solutions, examples, or insights..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="custom-input w-100"
                />
            </div>
            <div className="d-flex justify-content-end align-items-end" style={{ marginTop:'-6px'}}>
                <button 
                    className="btn bg-dark border-0 btn-primary me-2" 
                    style={{ marginTop:'-5px', borderRadius: '12px' }}
                    onClick={handleSearch}
                >
                    <img src={Correct} alt="Search" style={{ padding: '4px', width: '24px', height: '24px' }} className="w-auto h-auto" />
                </button>
                <button 
                    className="btn bg-dark border-0 btn-primary sidebar-toggle-btn" 
                    style={{borderRadius: '12px', position: 'relative', zIndex: 1060 }} 
                    onClick={toggleSidebar}
                >
                    {isSidebarVisible ? <i className="bi bi-layout-sidebar-inset" style={{ padding: '4px', fontSize: '22px' }}></i> : <i className="bi bi-layout-sidebar-inset-reverse" style={{ padding: '4px', fontSize: '22px' }}></i>}
                </button>
            </div>
        </div>
    );
};

export default SearchBar;