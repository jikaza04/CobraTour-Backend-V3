
import LoginImage from "./AdminImages/LoginImage.jpg"
import AdminLogo from './AdminLogo/admin-logo.svg';
import SwitchIcon from './AdminIcons/switchicon.svg';
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";

function ControlLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/controlDashboard");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
      console.error(err);
    }
  };
  
  return (
    <>
    <motion.div
    initial={{opacity:0 }}
    animate={{opacity:1}}
    transition={{duration:0.5, delay:0.2}}
    >
        <section className="control-login w-screen">
            <img src={LoginImage} alt="Login Image" className="login-image"/>
            
            <div className="login-container">
              <form className="flex flex-col justify-center" onSubmit={handleLogin}>
                <img src={AdminLogo} alt="Cobratour Logo"/>
                <span className="text-center">
                <label className="font-semibold text-xl">CONTROL ADMIN</label>
                </span>
                <span className="flex flex-col size-full gap-2 my-5">
                <input type="email" placeholder="Email" className="login-input" onChange={(e) => setEmail(e.target.value)} required/>
                <input type="password" placeholder="Password" className="login-input" onChange={(e) => setPassword(e.target.value)} required/>
                <input  type="submit" placeholder="Password" value="LOGIN" className="login-submit" />
                <button type="button" className="border-maroon-custom border p-1 rounded-md duration-300 hover:bg-maroon-custom hover:text-white">
                    Forgot Password
              </button>
            

              <Link to ="/controlDashboard"><button className="border-maroon-custom border p-1 rounded-md duration-300 hover:bg-maroon-custom hover:text-white w-full">Demo Login</button></Link>
              </span>

              <span className="text-xs break-words">
                {error && <p className="text-maroon-custom text-center">{error}</p>}
              </span>
              
              <div className="flex justify-between"> 
              </div>
              </form>
              <Link to="/adminLogin">
              <div className="flex flex-row absolute bottom-0  left-0 m-5 items-center gap-2 cursor-pointer">
                    <img src={SwitchIcon} alt="" className="control-switch-icon" />
                    <h1 className="border-b border-maroon-custom">Admin</h1>
              </div>
              </Link>
            </div>
          
        </section>
        </motion.div>
        </>
        
  )
}

export default ControlLogin
