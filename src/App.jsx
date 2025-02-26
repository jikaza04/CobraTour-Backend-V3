import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AdminNavBar from './Admin/AdminNavBar';
import AdminDashboard from './Admin/AdminDashboard';
import AdminContent from './Admin/AdminContent';
import AdminAccount from './Admin/AdminAccount';
import AdminLogin from './Admin/AdminLogin';
import ClientNavBar from './Client/ClientNavBar';
import ClientHome from './Client/ClientHome';
import ClientGallery from './Client/ClientGallery';
import ClientFeedback from './Client/ClientFeedback';
import ClientFaqs from './Client/ClientFaqs';
import ClientExplore from './Client/ClientExplore';
import ErrorPage from './ErrorPage';
import ControlNavBar from './ControlAdmin/ControlNavbar';
import ControlDashboard from './ControlAdmin/ControlDashboard';
import ControlAccount from './ControlAdmin/ControlAccount';
import ControlLogin from './ControlAdmin/ControlLogin';

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/adminLogin';
  const isClientPage = location.pathname.startsWith('/client') || location.pathname === '/';
  const isAdminPage = location.pathname.startsWith('/admin') && !isLoginPage;
  const isControlAdmin = location.pathname.startsWith('/control');

 
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 1023);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 1023);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={isClientPage ? 'client-background' : ''}>
      <div className="flex lg:justify-between">
        {isClientPage && <ClientNavBar />}
        {isControlAdmin && <ControlNavBar />}
        {isAdminPage && <AdminNavBar />}

        <section
          className={isLoginPage ? 'w-full' : isControlAdmin ? 'w-4/5' :isAdminPage? "lg:w-4/5 w-full" : isClientPage ? 'w-full' : 'w-4/5'}
          style={{ width: isMobileView && isControlAdmin ? '100vw' : '' }}
        >
          <Routes>
            {/* Default Route */}
            <Route path="/" element={<ClientHome />} />

            {/* Client Routes */}
            <Route path="/clientHome" element={<ClientHome />} />
            <Route path="/clientGallery" element={<ClientGallery />} />
            <Route path="/clientFeedback" element={<ClientFeedback />} />
            <Route path="/clientFaqs" element={<ClientFaqs />} />
            <Route path="/clientExplore" element={<ClientExplore />} />

            {/* Admin Routes */}
            <Route path="/adminDashboard" element={<AdminDashboard />} />
            <Route path="/adminContent" element={<AdminContent />} />
            <Route path="/adminAccount" element={<AdminAccount />} />
            <Route path="/adminLogin" element={<AdminLogin />} />

            {/* Control Admin Routes */}
            <Route path="/controlDashboard" element={<ControlDashboard />} />
            <Route path="/controlAccount" element={<ControlAccount />} />
            <Route path="/loginControl" element={<ControlLogin />} />

            {/* Error Page */}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </section>
      </div>
    </div>
  );
}

export default App;
