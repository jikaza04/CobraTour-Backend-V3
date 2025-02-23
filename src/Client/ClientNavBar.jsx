import { Link } from "react-router-dom";
import CtLogo from './Images/ct-logo.svg';
import MenuBar from './Icons/hamburger.svg';
import { useState, useEffect } from "react";
import { AnimatePresence, easeOut, motion } from 'motion/react';

function ClientNavBar() {
  const [isMenuBar, setIsMenuBar] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth >=200 && window.innerWidth <= 1023);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth >=200 &&window.innerWidth <= 1023);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const openMenu = () => {
    if (isMobileView) {
      setIsMenuBar(prev => !prev);
    }
  };

  return (
    <nav className="client-nav z-50">
      <div className="px-2 flex w-full items-center justify-between gap-2 mx-2 lg:mx-5 lg:w-auto">
        <Link to="/clientHome" className="text-3xl">
          <img src={CtLogo} alt="logo" className="h-full w-44" />
        </Link>
        {isMobileView && (
          <img src={MenuBar} alt="" className="lg:hidden " onClick={openMenu} />
        )}
      </div>
      {(isMenuBar || !isMobileView) && (
        <AnimatePresence>
        <motion.div
        initial ={{height:0, opacity:0}}
        animate = {{height: openMenu?  "auto": 0, opacity: openMenu? 1:0 }}
        exit={{height:0, opacity:0}}
        transition={{duration:0.3, ease:easeOut}}
        >
        
        <ul>
          <li>
            <Link to='/clientExplore'>Explore</Link>
          </li>
          <li>
            <Link to='/clientGallery'>Gallery</Link>
          </li>
          <li>
            <Link to='/clientFeedback'>Feedback</Link>
          </li>
          <li>
            <Link to='/adminLogin'>Admin</Link>
          </li>
        </ul>
        </motion.div>
        </AnimatePresence>
      )}
    </nav>
  );
}

export default ClientNavBar;