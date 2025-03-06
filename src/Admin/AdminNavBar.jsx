    import { useEffect, useState } from "react";
    import { Link,useNavigate } from "react-router-dom";
    import { auth } from "../config/firebase";
    import { signOut } from "firebase/auth";
    import './Css/General.css';
    import AdminLogo from './AdminLogo/admin-logo.svg';
    import DashboardIcon from './AdminIcons/Dashboard.svg';
    import ContentIcon from './AdminIcons/Content.svg';
    import AccountIcon from './AdminIcons/Account.svg';
    import LogoutIcon from './AdminIcons/logout.svg';
    import HamburgerIcon from "./AdminIcons/hamburger.svg";

    const AdminNavBar = () => {
        const [activeItem, setActiveItem] = useState(null);
        const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 1023);
        const [openNav, setOpenNav] = useState(false);
        const navigate = useNavigate();
        const handleClick = (item) => {
            setActiveItem(item);
        };

        useEffect(() => {
            const handleResize = () => {
                setIsMobileView(window.innerWidth <= 1023);
            };

            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }, []);

        const handleLogout = async()=>{
            try{
            await signOut(auth);
            localStorage.clear();
            sessionStorage.clear();
            navigate('/adminLogin');
        }catch (error){
            console.log("Error",error);
        }
    };
        return (
            <header className="inter ">
                {isMobileView && (
                    <div className="general-nav" onClick={() => setOpenNav((prev) => !prev)}>
                        <img src={HamburgerIcon} alt="Menu" className="lg:hidden" />
                    </div>
                )}
                {(openNav || !isMobileView) && (
                    <nav className="admin-navbar">
                        <ul className="admin-ul">
                            <img src={AdminLogo} alt="logo" className="p-2" />
                            <li 
                                className={`p-2 flex items-center gap-1 rounded-2xl hover:bg-admin-hovergray duration-300 ${activeItem === 'dashboard' ? 'bg-admin-hovergray' : ''}`}
                                onClick={() => handleClick('dashboard')}
                            >
                                <Link to="/adminDashboard" className="flex items-center gap-1">
                                    <img src={DashboardIcon} alt="Dashboard" className="w-5" />
                                    Dashboard
                                </Link>
                            </li>
                            <li 
                                className={`p-2 flex items-center gap-1 rounded-2xl hover:bg-admin-hovergray duration-300 ${activeItem === 'content' ? 'bg-admin-hovergray' : ''}`}
                                onClick={() => handleClick('content')}
                            >
                                <Link to="/adminContent" className="flex items-center gap-1">
                                    <img src={ContentIcon} alt="Content" className="w-5" />
                                    Content
                                </Link>
                            </li>
                            <li 
                                className={`p-2 flex items-center gap-1 rounded-2xl hover:bg-admin-hovergray duration-300 ${activeItem === 'account' ? 'bg-admin-hovergray' : ''}`}
                                onClick={() => handleClick('account')}
                            >
                                <Link to="/adminAccount" className="flex items-center gap-1">
                                    <img src={AccountIcon} alt="Account" className="w-5" />
                                    Account
                                </Link>
                            </li>
                            <li 
                                className="absolute bottom-5 p-2 flex items-center gap-1 rounded-2xl hover:bg-admin-hovergray duration-300"
                            >
                                <button onClick={handleLogout} className="flex items-center gap-1 ">
                                    <img src={LogoutIcon} alt="Logout" className="w-5" />
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </nav>
                )}
            </header>
        );
    };

    export default AdminNavBar;