import ErrorImage from "./Images/ErrorPageIcon.svg"
import { Link } from 'react-router-dom';
function ErrorPage() {
  return (
    <section className="w-screen bg-white gap-y-5 h-screen justify-center flex flex-col items-center">
    
      <img src={ErrorImage} alt="" />
      <label className="text-2xl font-bold">This page does not exist</label>
      <p className="text-base font-semibold">Please try refreshing this page</p>
      <Link to="/clientHome">
      <button className="button-feedback text-white">Back To Home</button>
      </Link>
    
    </section>
  )
}

export default ErrorPage
