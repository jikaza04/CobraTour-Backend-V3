import { Routes, Route, useLocation } from 'react-router-dom';
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
import ControlNavBar from './ControlAdmin/ControlNavbar'
import ControlDashboard from './ControlAdmin/ControlDashboard'
import ControlAccount from './ControlAdmin/ControlAccount'
import ControlLogin from './ControlAdmin/ControlLogin'

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/adminLogin';
  const isClientPage = location.pathname.startsWith('/client') || location.pathname === '/';
  const isAdminPage = location.pathname.startsWith('/admin') && !isLoginPage;
  const isControlAdmin = location.pathname.startsWith('/control') 

  return (
    <div className={isClientPage ? 'client-background' : ''}>
      <div className="flex justify-between">
     
        {isClientPage && <ClientNavBar />}

       {isControlAdmin && <ControlNavBar/>}
        {isAdminPage && <AdminNavBar />}

        <section className={isLoginPage ? 'w-full' :isControlAdmin? "w-4/5":  isClientPage  ? 'w-full' : 'w-4/5'  }>
          <Routes>
            {/* Default Route ni Aejay */}
            <Route path="/" element={<ClientHome />} />

            {/* Client Routes ni Aejay */}
            <Route path="/clientHome" element={<ClientHome />} />
            <Route path="/clientGallery" element={<ClientGallery />} />
            <Route path="/clientFeedback" element={<ClientFeedback />} />
            <Route path="/clientFaqs" element={<ClientFaqs />} />
            <Route path="/clientExplore" element={<ClientExplore />} />

            {/* Admin Routes ni Aejay */}
            <Route path="/adminDashboard" element={<AdminDashboard />} />
            <Route path="/adminContent" element={<AdminContent />} />
            <Route path="/adminAccount" element={<AdminAccount />} />
            <Route path="/adminLogin" element={<AdminLogin />} />
            {/* Error Page ni Aejay*/}
            <Route path='*' element={<ErrorPage/>}/>
            {/* Control Admin ni Aejay */}
            <Route path='/controlDashboard' element={<ControlDashboard/>}/>
            <Route path ='/controlAccount' element={<ControlAccount/>}/>
            <Route path = '/loginControl' element={<ControlLogin/>}/>
          </Routes>
        </section>
      </div>
    </div>
  );
}

export default App;