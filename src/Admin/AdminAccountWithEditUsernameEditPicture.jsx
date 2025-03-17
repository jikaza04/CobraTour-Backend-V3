import SampleProfile from './AdminImages/ivan.jpeg'
import { useState, useEffect } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
import { db, auth } from '../config/firebase'; // Import Firestore instance and auth
import { updateDoc, getDocs, collection, query, where } from 'firebase/firestore';
import { updateEmail, updatePassword, sendEmailVerification } from 'firebase/auth';

function AdminAccount() {
  const [newUserName, setNewUserName] = useState(false);
  const [newPassword, setNewPassword] = useState(false);
  const [contributor, setContributor] = useState({});
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showCurrentPassword, setShowCurrentPassword] = useState(false); // State to toggle current password visibility
  const [newEmail, setNewEmail] = useState('');
  const [newPass, setNewPass] = useState('');
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility
  const [verificationSent, setVerificationSent] = useState(false); // State to track email verification

  useEffect(() => {
    const storedContributor = JSON.parse(localStorage.getItem('contributor'));
    if (storedContributor) {
      setContributor(storedContributor);
      console.log('Contributor loaded from localStorage:', storedContributor);
    } else {
      console.error('No contributor found in localStorage');
    }
  }, []);

  const openNewuserName = () => setNewUserName(true);
  const closeNewUsername = () => {
    setNewUserName(false);
    setNewEmail('');
  };

  const openNewPassword = () => setNewPassword(true);
  const closeNewPassword = () => {
    setNewPassword(false);
    setNewPass('');
  };

  const toggleShowPassword = () => setShowPassword(!showPassword); // Toggle function
  const toggleShowCurrentPassword = () => setShowCurrentPassword(!showCurrentPassword); // Toggle function for current password

  const handleUsernameSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      if (user) {
        if (!user.emailVerified) {
          await sendEmailVerification(user);
          setVerificationSent(true);
          return;
        }
        await updateEmail(user, newEmail);
        const q = query(collection(db, 'Contributors'), where('userId', '==', contributor.userId));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const docRef = querySnapshot.docs[0].ref;
          await updateDoc(docRef, {
            email: newEmail
          });
          setContributor({ ...contributor, email: newEmail });
          localStorage.setItem('contributor', JSON.stringify({ ...contributor, email: newEmail }));
          setNewUserName(false);
          setShowPopup(true); // Show popup
          setTimeout(() => setShowPopup(false), 3000); // Hide popup after 3 seconds
        } else {
          console.error('No such document!');
        }
      }
    } catch (error) {
      console.error('Error updating username: ', error);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      if (user) {
        await updatePassword(user, newPass);
        const q = query(collection(db, 'Contributors'), where('userId', '==', contributor.userId));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const docRef = querySnapshot.docs[0].ref;
          await updateDoc(docRef, {
            password: newPass
          });
          setContributor({ ...contributor, password: newPass });
          localStorage.setItem('contributor', JSON.stringify({ ...contributor, password: newPass }));
          setNewPassword(false);
          setShowPopup(true); // Show popup
          setTimeout(() => setShowPopup(false), 3000); // Hide popup after 3 seconds
        } else {
          console.error('No such document!');
        }
      }
    } catch (error) {
      console.error('Error updating password: ', error);
    }
  };

  return (
    <>
      <section className="header-margin inter">
        <label className="text-4xl font-semibold">Account</label>
        <section className="flex flex-col lg:flex-row justify-between items-center py-5 gap-5">
          <span className='flex items-center gap-5'>
            <div className='profile-container'>
              <img src={SampleProfile} alt="Profile" />
            </div>
            <span className='flex flex-col gap-2'>
              <h1 className='profile-label'>{contributor.name || 'Sample Name'}</h1>
              <h1 className='lg:text-base text-xs'>CobraTour Admin</h1>
            </span>
          </span>
          <button className='button-dashboard'>Change Picture</button>
        </section>
        <section className='account-container'>
          <div className='flex flex-col lg:flex-row lg:justify-between items-start lg:items-center my-3'>
            <span className='block'>
              <h1 className='account-label'>Email:</h1>
              <label className='text-maroon-custom'>{contributor.email || 'Sample Username'}</label>
              {newUserName && (
                <form className='flex flex-col it' id='new-username' onSubmit={handleUsernameSubmit}>
                  <label className='text-maroon-custom'>Change Username:</label>
                  <input
                    type="email"
                    name="newUserName"
                    placeholder='New Username'
                    className='modal-input'
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    required
                  />
                  <span className='flex flex-row gap-2 items-center justify-end my-2'>
                    <button type='button' onClick={closeNewUsername} className='account-cancel'>Cancel</button>
                    <input type='submit' name='newusername' className='account-submit'></input>
                  </span>
                </form>
              )}
              {verificationSent && (
                <p className="text-maroon-custom">Please verify your email before changing it.</p>
              )}
            </span>
            <button onClick={openNewuserName} className='button-dashboard'>Edit Username</button>
          </div>
          <div className='flex flex-col lg:flex-row lg:justify-between items-start lg:items-center my-3'>
            <span className='block'>
              <h1 className='account-label'>Password:</h1>
              <div className='relative'>
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  value={contributor.password || '*******'}
                  className='modal-input'
                  readOnly
                />
                <span
                  className='absolute right-3 top-3 cursor-pointer'
                  onClick={toggleShowCurrentPassword}
                >
                  {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {newPassword && (
                <form className='flex flex-col' id='new-password' onSubmit={handlePasswordSubmit}>
                  <label className='text-maroon-custom'>Change Password:</label>
                  <div className='relative'>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="newPassword"
                      placeholder='New Password'
                      className='modal-input'
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      required
                    />
                    <span
                      className='absolute right-3 top-3 cursor-pointer'
                      onClick={toggleShowPassword}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                  <span className='flex flex-row gap-2 items-center justify-end my-2'>
                    <button type='button' onClick={closeNewPassword} className='account-cancel'>Cancel</button>
                    <input type='submit' name='newpassword' className='account-submit'></input>
                  </span>
                </form>
              )}
            </span>
            <button onClick={openNewPassword} className='button-dashboard'>Edit Password</button>
          </div>
        </section>
      </section>
      {showPopup && (
        <div className="popup">
          <p>Changes have been saved!</p>
        </div>
      )}
    </>
  )
}

export default AdminAccount;
