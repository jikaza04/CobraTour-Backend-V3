import { useState } from "react";
import { Link } from "react-router-dom";
import './Css/General.css';
import AdminLogo from './AdminLogo/admin-logo.svg';
import DashboardIcon from './AdminIcons/Dashboard.svg';
import ContentIcon from './AdminIcons/Content.svg';
import AccountIcon from './AdminIcons/Account.svg';
import LogoutIcon from './AdminIcons/logout.svg';
import './Javascript/navbar.js';

const AdminNavBar = () => {
    const [activeItem, setActiveItem] = useState(null);

    const handleClick = (item) => {
        setActiveItem(item);
    };

    return (
        <header className="inter">
            <nav className="admin-navbar">
                <ul className="admin-ul">
                    <img src={AdminLogo} alt="logo" className="p-2" />
                    <li 
                        className={`p-2 flex items-center gap-1 rounded-2xl hover:bg-admin-hovergray duration-300 ${activeItem === 'dashboard' ? 'bg-admin-hovergray' : ''}`}
                        onClick={() => handleClick('dashboard')}
                    >
                        <img src={DashboardIcon} alt="Dashboard" className="w-5" />
                        <Link to="/adminDashboard">Dashboard</Link>
                    </li>
                    <li 
                        className={`p-2 flex items-center gap-1 rounded-2xl hover:bg-admin-hovergray duration-300 ${activeItem === 'content' ? 'bg-admin-hovergray' : ''}`}
                        onClick={() => handleClick('content')}
                    >
                        <img src={ContentIcon} alt="Content" className="w-5" />
                        <Link to="/adminContent">Content</Link>
                    </li>
                    
                    <li 
                        className={`p-2 flex items-center gap-1 rounded-2xl hover:bg-admin-hovergray duration-300 ${activeItem === 'account' ? 'bg-admin-hovergray' : ''}`}
                        onClick={() => handleClick('account')}
                    >
                        <img src={AccountIcon} alt="Account" className="w-5" />
                        <Link to="/adminAccount">Account</Link>
                    </li>
                    
                    <li 
                        className={` p-2 flex items-center gap-1 rounded-2xl hover:bg-admin-hovergray duration-300 ${activeItem === 'logout' ? 'bg-admin-hovergray' : ''}`}
                        onClick={() => handleClick('logout')}
                    >
                        <img src={LogoutIcon} alt="Logout" className="w-5" />
                        <Link to="/adminLogin">Logout</Link>
                    </li>
                    
                </ul>
            </nav>
        </header>
    );
};

export default AdminNavBar;