import SampleProfile from './AdminImages/ivan.jpeg'
import { useState } from 'react'
function AdminAccount() {
  const [newUserName, setNewUserName] = useState(false);

  const openNewuserName = () => setNewUserName(true);
  const closeNewUsername = (e)=> {
    if (e.target.id === 'new-username') setNewUserName(false);
  };
  const [newPassword, setNewPassword] = useState (false);

  const openNewPassword = () => setNewPassword(true);
  const closeNewPassword =(e) => {
    if (e.target.id === 'new-password') setNewPassword(false);

  };
  return (
    <>
    <section className="header-margin inter">
    
    <label className="text-4xl font-semibold">Account</label>
    <section className="flex justify-between items-center py-5 gap-5">
      <span className='flex items-center gap-5'>
        <div className='profile-container'>
        <img src={SampleProfile} alt="Profile"/>
        </div>
        <span className='flex flex-col gap-2'>
        <h1 className='profile-label'>Sample Name</h1>
        <h1>CobraTour Admin</h1>
      </span>
    </span>
        <button className='button-dashboard '>Change Picture</button>
    </section>
    <section className='account-container'>
      <div className='flex justify-between items-center my-3'>
        <span className='block'>
          <h1 className='account-label'>Username:</h1>
          <label className='text-maroon-custom'>Sample Username</label>
          {newUserName && (
          <form className='flex flex-col it' id='new-username'>
            <label className='text-maroon-custom'>Change Username:</label>
            <input type="text" name="newUserName" placeholder='New Username' className='modal-input'/>
            <span className='flex flex-row gap-2 items-center justify-end my-2'>
              <button  onClick={closeNewUsername} className='account-cancel'>Cancel</button>
              <input type='submit' name='newusername' className='account-submit'></input>
            </span>
          </form>
          )}
        </span>
          <button onClick={openNewuserName} className='button-dashboard '>Edit Username</button>
        </div>
          <div className='flex justify-between items-center my-3'>
            <span className='block'>
            <h1 className='account-label'>Password:</h1>
            <label className='text-maroon-custom'>*******</label>
            {newPassword && ( 
            <form className='flex flex-col' id='new-password'>
            <label className='text-maroon-custom'>Change Password:</label>
            <input type="password" name="newPassword" placeholder='New Password' className='modal-input'/>
            <span className='flex flex-row gap-2 items-center justify-end my-2'>
              <button onClick={closeNewPassword} className='account-cancel'>Cancel</button>
              <input type='submit' name='newusername' className='account-submit'></input>
            </span>
          </form>
          )}
        </span>
            <button onClick={openNewPassword} className='button-dashboard '>Edit Password</button>
      </div>
    </section>
    </section>
    </>
  )
}

export default AdminAccount
