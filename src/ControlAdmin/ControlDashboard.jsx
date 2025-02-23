
import ControlTotal from './AdminIcons/control-total.svg'
import ControlAdd from './AdminIcons/control-add.svg'
import AddIcon from './AdminIcons/AdminAdd.svg';
import SearchIcon from './AdminIcons/search.svg';
import AccountProfile from './AdminIcons/account-profile.svg'
import HistoryIcon from './AdminIcons/history.svg'
import { useState } from 'react';

function ControlDashboard() {
  const [controlModal, setControlModal] = useState(false);

  const openModal = () =>{
    setControlModal(true)
  };
  const closeModal = () =>{
    setControlModal(false)
  };
  return (
    <>
    <section className="border-none h-screen shadow-box-sec rounded-lg m-3 overflow-hidden">
    <section className="w-full p-5 bg-maroon-custom ">
    <div className="flex flex-row text-white">
    <label className="text-xl font-medium">Control Admin</label>
    </div>
    </section>
    <section className="control-summary-section">
      <div className="control-summary-container">
      <img src={ControlTotal} alt="" />
      <label>Total contributors: </label>
      <span className="text-maroon-custom">00</span>
      </div>
      <div className="control-summary-container cursor-pointer" onClick={openModal}>
      <img src={ControlAdd} alt="" />
      <img src={AddIcon} alt="" />
      <label>Add Contributor </label>
      
      </div>
    </section>
    <section className='control-summary-section'>
      {/* Account */}
      <div className='control-contents h-72'>
        <div className='flex justify-center text-center'>
          <label className='text-xl font-bold mt-5'>Contributors</label>
        </div>
        <form className='control-form'>
        <img src={SearchIcon} alt="search" className='w-9' />
        <input type='search' name='search-admin-account' placeholder='search' />
        </form>
        <div className='control-account-list'>
          <img src={AccountProfile} alt="" />
          <label>Sample Name</label>
        </div>
        <div className='control-account-list'>
          <img src={AccountProfile} alt="" />
          <label>Sample Name</label>
        </div>
        <div className='control-account-list'>
          <img src={AccountProfile} alt="" />
          <label>Sample Name</label>
        </div>
        <div className='control-account-list'>
          <img src={AccountProfile} alt="" />
          <label>Sample Name</label>
        </div>
        <div className='control-account-list'>
          <img src={AccountProfile} alt="" />
          <label>Sample Name</label>
        </div>
        <div className='control-account-list'>
          <img src={AccountProfile} alt="" />
          <label>Sample Name</label>
        </div>
        <div className='control-account-list'>
          <img src={AccountProfile} alt="" />
          <label>Sample Name</label>
        </div>
      </div>
      {/* History */}
      <div className='control-contents h-72'>
      <div className='flex justify-center text-center'>
          <label className='text-xl font-bold mt-5'>History</label>
        </div>
        <form className='control-form'>
        <img src={SearchIcon} alt="search" className='w-9' />
        <input type='search' name='search-admin-history' placeholder='search' />
        </form>
        <div className='control-account-list justify-between'>
          <div className='flex items-center gap-x-5'>
          <img src={HistoryIcon} alt="" />
          <label>Sample Email</label>
          </div>
          <label >02/09/25</label>
          
        </div>
      </div>
    </section>
    {/* Modal*/}
    {controlModal && ( 
    <section className='modal-section overflow-hidden' >
      <div className='modal-control'>
      <img src={ControlAdd} alt="" className='min-w-72 max-w-80 ' />
      <label className='text-2xl font-semibold'>Add Contributor</label>
      <form>
        <label className='font-medium'>Name:</label>
        <input type="text" placeholder='Name' name='contributor name' required />
        <label className='font-medium'>Employee ID:</label>
        <input type="text" placeholder='Employee ID' name='contributor ID' required/>
        <label className='font-medium'>Email:</label>
        <input type="email" placeholder='Email' name='contributor Email' required />
        <label className='font-medium'>Password:</label>
        <input type="password" placeholder='password' name='contributor password' required />
      <div className='flex w-full items-center gap-5 p-2 content-end justify-end'>
        <button type='button' className='bg-admin-hovergray p-2 rounded-md'onClick={closeModal}>Cancel</button>
        <button className='bg-maroon-custom text-white p-2 rounded-md' type='submit' >Submit</button>
      </div>
      </form>
      </div>
    </section>
    )}
    </section>
    
    </>
  )
}

export default ControlDashboard
