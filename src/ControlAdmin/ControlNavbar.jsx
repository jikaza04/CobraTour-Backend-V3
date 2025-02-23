import DashboardIcon from './AdminIcons/Dashboard.svg';
import AdminLogo from './AdminLogo/admin-logo.svg';
import AccountIcon from './AdminIcons/Account.svg';
import LogoutIcon from './AdminIcons/logout.svg';
import { Link } from 'react-router-dom';
import HmaburgerIcon from './AdminIcons/hamburger.svg';
import { useState, useEffect } from 'react';


function ControlNavbar() {
  const [openNav, setOpenNav] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 1023);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 1023);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    
      <aside className="z-bring-front">
        
        {isMobileView && (
          <div className="general-nav" onClick={() => setOpenNav((prev) => !prev)}>
            <img src={HmaburgerIcon} alt="Menu" className="lg:hidden" />
          </div>
        )}

        
        {(openNav || !isMobileView) && (
          
          
            <nav className="admin-navbar">
              <ul className="admin-ul">
                <img src={AdminLogo} alt="logo" className="p-2" />

                <li>
                  <img src={DashboardIcon} alt="dashboard" className="w-5" />
                  <Link to="/controlDashboard">Dashboard</Link>
                </li>

                <li>
                  <img src={AccountIcon} alt="account" className="w-5" />
                  <Link to="/controlAccount">Account</Link>
                </li>

                <li className="absolute bottom-5">
                  <img src={LogoutIcon} alt="logout" className="w-5" />
                  <Link to="/loginControl">Logout</Link>
                </li>
              </ul>
            </nav>
          
        )}
      </aside>
  );
}

export default ControlNavbar;
