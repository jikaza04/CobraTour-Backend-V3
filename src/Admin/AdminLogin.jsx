import LoginImage from "./AdminImages/LoginImage.jpg"
import AdminLogo from './AdminLogo/admin-logo.svg';
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import SwitchIcon from '../ControlAdmin/AdminIcons/switchicon.svg';
function AdminLogin() {
  return (
    <>
    <motion.div
    initial={{opacity:0 }}
    animate={{opacity:1}}
    transition={{duration:0.5, delay:0.2}}
    >
    <section className="login-section">
        <img src={LoginImage} alt="Login Image" className="login-image"/>
        <div className="login-container">
          <form className="flex flex-col">
            <img src={AdminLogo} alt="Cobratour Logo"/>
            <span className="text-center">
            <label className="font-semibold text-xl">ADMIN</label>
            </span>
            <span className="flex flex-col size-full gap-2 my-5">
            <input type="email" placeholder="Email" className="login-input"required/>
            <input type="email" placeholder="Password" className="login-input" required/>
            <input  type="submit" placeholder="Password" value="LOGIN" className="login-submit" />
            <button type="button" className="border-maroon-custom border p-1 rounded-md duration-300 hover:bg-maroon-custom hover:text-white">
                    Forgot Password
            </button>
          </span>
          </form>
          <Link to="/loginControl">
              <div className="flex flex-row absolute bottom-0  right-0 m-5 items-center gap-2 cursor-pointer">
                    <img src={SwitchIcon} alt="" className="control-switch-icon" />
                    <h1 className="border-b border-maroon-custom">Control Admin</h1>
              </div>
          </Link>
        </div>
      
    </section>
    </motion.div>
    </>
  )
}

export default AdminLogin
