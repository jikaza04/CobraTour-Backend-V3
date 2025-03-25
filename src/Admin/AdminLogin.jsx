import LoginImage from "./AdminImages/LoginImage.jpg";
import AdminLogo from './AdminLogo/admin-logo.svg';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SwitchIcon from '../ControlAdmin/AdminIcons/switchicon.svg';
import { useState } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth, db } from "../config/firebase"; // Assuming you have a Firestore instance
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs, updateDoc } from "firebase/firestore";
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // Sign in the user with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Query Firestore for the contributor's email
      const q = query(collection(db, "Contributors"), where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // If a matching contributor is found, store contributor's info in local storage
        const contributor = querySnapshot.docs[0].data();
        contributor.password = password; // Update the password in the contributor object
        localStorage.setItem('contributor', JSON.stringify(contributor));

        // Update the Firestore document with the new password
        const docRef = querySnapshot.docs[0].ref;
        await updateDoc(docRef, {
          password: password
        });

        navigate("/adminDashboard");
      } else {
        setError("No such account existed.");
      }
    } catch (err) {
      setError("Invalid email or password. Please try again.");
      console.error(err);
    }
  };

  const handleForgotPassword = async () => {
    setError("");
    setMessage("");
    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent. Please check your inbox.");
    } catch (err) {
      setError("Failed to send password reset email. Please try again.");
      console.error(err);
    }
  };

  const toggleShowPassword = () => setShowPassword(!showPassword); // Toggle function

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <section className="login-section">
          <img src={LoginImage} alt="Login Image" className="login-image" />
          <div className="login-container">
            <form className="flex flex-col" onSubmit={handleLogin}>
              <img src={AdminLogo} alt="Cobratour Logo" />
              <span className="text-center">
                <label className="font-semibold text-xl">ADMIN</label>
              </span>
              <span className="flex flex-col size-full gap-2 my-5">
                <input
                  type="email"
                  placeholder="Email"
                  className="login-input"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="login-input"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <span
                    className="absolute right-3 top-3 cursor-pointer"
                    onClick={toggleShowPassword}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                <input
                  type="submit"
                  placeholder="Password"
                  value="LOGIN"
                  className="login-submit"
                />
                <button
                  type="button"
                  className="border-maroon-custom border p-1 rounded-md duration-300 hover:bg-maroon-custom hover:text-white"
                  onClick={handleForgotPassword}
                >
                  Forgot Password
                </button>
              </span>
              <span className="text-xs break-words">
                {error && <p className="text-maroon-custom text-center">{error}</p>}
                {message && <p className="text-green-500 text-center">{message}</p>}
              </span>
            </form>
            <Link to="/loginControl">
              <div className="flex flex-row absolute bottom-0 right-0 m-5 items-center gap-2 cursor-pointer">
                <img src={SwitchIcon} alt="" className="control-switch-icon" />
                <h1 className="border-b border-maroon-custom">Control Admin</h1>
              </div>
            </Link>
          </div>
        </section>
      </motion.div>
    </>
  );
}

export default AdminLogin;
