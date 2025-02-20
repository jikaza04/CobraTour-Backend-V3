
import { Link } from 'react-router-dom'
function ControlNavbar() {
  return (
    <>
      <aside>
        <nav className="admin-navbar">
            <ul className="admin-ul">
                <li>
                    <Link to='/controlDashboard'>Dashboard</Link>
                </li>
                <li>
                    <Link to='/controlAccount'>Account</Link>
                </li>
                <li>
                    <Link to='/controlLogout'>Logout</Link>
                </li>
            </ul>
        </nav>

      </aside>
    </>
  )
}

export default ControlNavbar
