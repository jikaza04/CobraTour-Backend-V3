import LoginImage from "./AdminImages/LoginImage.jpg"
import AdminLogo from './AdminLogo/admin-logo.svg';
function AdminLogin() {
  return (
    <>
    <section className="login-section">
        <img src={LoginImage} alt="Login Image" className="login-image"/>
        <div className="login-container">
          <form className="flex flex-col">
            <img src={AdminLogo} alt="Cobratour Logo"/>
            <span className="text-center">
            <label className="font-semibold text-3xl">ADMIN</label>
            </span>
            <span className="flex flex-col size-full gap-2 my-5">
            <input type="email" placeholder="Email" className="login-input"required/>
            <input type="email" placeholder="Password" className="login-input" required/>
            <input  type="submit" placeholder="Password" value="LOGIN" className="login-submit" />
          </span>
          <div className="flex justify-between">
            <button type="button" className="border-b border-maroon-custom hover:text-maroon-custom duration-300">
              Control Admin
            </button>
              <button type="button" className="border-b border-maroon-custom hover:text-maroon-custom duration-300">
                Forgot Password
              </button>
          </div>
          </form>
        
        </div>
      
    </section>
    </>
  )
}

export default AdminLogin
