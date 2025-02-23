
import DashboardIcon from './AdminIcons/Dashboard.svg';
import AdminLogo from './AdminLogo/admin-logo.svg';
import AccountIcon from './AdminIcons/Account.svg';
import LogoutIcon from './AdminIcons/logout.svg';
import { Link } from 'react-router-dom'
function ControlNavbar() {
  return (
    <>
      <aside>
        <nav className="admin-navbar">
            <ul className="admin-ul">
              <img src={AdminLogo} alt="logo" className="p-2" />
                <li>
                    <img src={DashboardIcon} alt='dahsboard' className="w-5" />
                    <Link to='/controlDashboard'>Dashboard</Link>
                </li>
                
                <li>
                    <img src={AccountIcon} alt='dahsboard' className="w-5" />
                    <Link to='/controlAccount'>Account</Link>
                </li>
                
                <li>
                    <img src={LogoutIcon} alt='dahsboard' className="w-5" />
                    <Link to='/loginControl'>Logout</Link>
                </li>
                
            </ul>
        </nav>

      </aside>
    </>
  )
}

export default ControlNavbar
