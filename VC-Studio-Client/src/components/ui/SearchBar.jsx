import React, { useState } from 'react';
import Input from '../../components/ui/input';
import Correct from '../../assets/img/Correct.svg'; 

const SearchBar = ({ isSidebarVisible, toggleSidebar }) => {
    const [form, setForm] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <div className="card p-3 shadow-sm d-flex flex-row align-items-center">
            {/* Add flex-grow-1 and w-100 classes */}
            <div className="flex-grow-1 me-2">
                <Input
                    type="email"
                    name="email"
                    placeholder="Search for coding solutions, examples, or insights..."
                    value={form.email}
                    onChange={handleChange}
                    className="custom-input w-100" // Add w-100 for full width
                />
            </div>
            <div className="d-flex justify-content-end align-items-end" style={{ marginTop:'-6px'}}>
                <button className="btn bg-dark border-0 btn-primary me-2" style={{ marginTop:'-5px', borderRadius: '12px' }}>
                    <img src={Correct} alt="Main Logo" style={{ padding: '4px', width: '24px', height: '24px' }} className="w-auto h-auto" />
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