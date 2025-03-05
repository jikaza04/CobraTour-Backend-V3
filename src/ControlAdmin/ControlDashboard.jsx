
import ControlTotal from './AdminIcons/control-total.svg'
import ControlAdd from './AdminIcons/control-add.svg'
import AddIcon from './AdminIcons/AdminAdd.svg';
import SearchIcon from './AdminIcons/search.svg';
import AccountProfile from './AdminIcons/account-profile.svg'
import HistoryIcon from './AdminIcons/history.svg'
import HistoryModal from './AdminIcons/historyModal.svg'
import { useState } from 'react';
import StatusHistory from './StatusHistory'
import { motion } from 'motion/react';

function ControlDashboard() {
  const [controlModal, setControlModal] = useState(false);

  const openModal = () =>{
    setControlModal(true)
  };
  const closeModal = () =>{
    setControlModal(false)
  };

  const [accountView, setAccountView] = useState(false);

  const openAccountView = () =>{
    setAccountView(true)
  };
  const closeAccountView = () =>{
    setAccountView(false)
  };
  const [historyModal, setHistoryModal] = useState(false);

  const openHistoryModal = () =>{
    setHistoryModal(true)
  };
  const closeHistoryModal = () =>{
    setHistoryModal(false)
  }
  return (
    <motion.div
    initial={{y:100, opacity:0}}
    animate={{y:0, opacity:1}}
    transition={{duration:0.5, delay:0.2}}
    >
    <section className="border-none lg:h-screen shadow-box-sec rounded-lg m-3 overflow-hidden">
    <section className="w-full p-5 bg-maroon-custom ">
    <div className="flex flex-row justify-between text-white">
    <label className="text-xl font-medium">Control Admin</label>
    
    </div>
    </section>
    <section className="control-summary-section">
      <div className="control-summary-container">
      <img src={ControlTotal} alt="" className='lg:size-auto size-28 ' />
      <label>Total contributors: </label>
      <span className="text-maroon-custom">00</span>
      </div>
      <div className="control-summary-container cursor-pointer" onClick={openModal}>
      <img src={ControlAdd} alt="" className='lg:size-auto size-28 '/>
      <img src={AddIcon} alt="" className='lg:size-auto size-8 '/>
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
        <div className='control-account-list' onClick={openAccountView}>
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
      {/* History List Ni Aejay*/}
      <div className='control-contents h-72' >
      <div className='flex justify-center text-center'>
          <label className='text-xl font-bold mt-5'>History</label>
        </div>
        <form className='control-form'>
        <img src={SearchIcon} alt="search" className='w-9' />
        <input type='search' name='search-admin-history' placeholder='search' />
        </form>
        <div className='control-account-list justify-between'onClick={openHistoryModal}>
          <div className='flex items-center gap-x-5'>
          <img src={HistoryIcon} alt="" />
          <label>Sample Email</label>
          </div>
          <div className='flex flex-col items-center justify-stretch text-center mx-1'>
          <StatusHistory status="Removed"/>
          <label >02/09/27</label>
          </div>
        </div>
      </div>
    </section>
    {/* Modal*/}
    {controlModal && ( 
    <motion.div
    initial={{opacity:0}}
    animate={{opacity:1}}
    transition={{duration:0.5}}
    >
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
    </motion.div>
    )}
    {/*Account View ni Aejay*/}
    {accountView&&(
      <motion.div
      initial={{opacity:0}}
      animate={{opacity:1}}
      transition={{duration:0.5}}
      style={{zIndex:1000}}
      >
    <section className='modal-section overflow-hidden'> 
    <div className='modal-control'>
      <article className='flex flex-col items-center'>
      <div className='control-profile '>
        <img src={ControlTotal} alt=""  />
      </div>
        <label className='text-lg font-semibold'>Sample Name</label>
        <label className='text-sm'>05-2324-008906</label>
      </article>
      <form>
        <label>Name:</label>
        <input type="text" name='Admin-Name' placeholder='Name' required />
        <label>Employee ID:</label>
        <input type="text" name='Admin-ID' placeholder='Employee ID' required/>
        <label>Email:</label>
        <input type="email" name='Admin-Email' placeholder='Email' required/>
        <label>Password:</label>
        <input type="password" name='Admin-password' placeholder='Password' required/>
        <div className='flex w-full items-center gap-5 p-2 content-end justify-between'>
        <button type='button' className='bg-admin-hovergray p-2 rounded-md' onClick={closeAccountView}>Cancel</button>
        <div className='flex flex-row gap-3'>
          <button className='bg-maroon-custom text-white p-2 rounded-md' type='submit' onClick={openAccountView} >Submit</button>
          <button className='bg-maroon-custom text-white p-2 rounded-md' type='button' >Remove</button>
        </div>
      </div>
      </form>
      
    </div>
    </section>
    </motion.div>
    )}
    {/*History Modal ni Aejay*/}
    {historyModal && (
      <motion.div
      initial={{opacity:0}}
      animate={{opacity:1}}
      transition={{duration:0.5}}
      >
    <section className='modal-section overflow-hidden'>
      <div className='modal-control'> 
        <img src={HistoryModal} alt="" className='size-64' />
        <label className='text-2xl font-semibold'>History</label>
        <article className='grid grid-cols-2 text-sm lg:text-xl lg:grid-cols-3 size-full justify-evenly break-before-all items-start'>
          <ul className='flex flex-col items-center'>
            <label className='font-semibold text-lg'>Date</label>
            <li>02/24/25</li>
          </ul>
          <ul className='flex flex-col items-center'>
            <label className='font-semibold text-lg'>Employee ID</label>
            <li>05-2324-008906</li>
          </ul>
          <ul className='flex flex-col items-center'>
            <label className='font-semibold text-lg'>Name</label>
            <li>Ivan Dale Clarion</li>
          </ul>
          <ul className='flex flex-col items-center'>
            <label className='font-semibold text-lg'>Email</label>
            <li>ivje.clarion.swu@phinmaed.com</li>
          </ul>
          <ul className='flex flex-col items-center'>
            
            <label className='font-semibold text-lg'>Status</label>
            <span className='flex flex-row gap-2'>
            <StatusHistory status='Updated'/>
            </span>
          </ul>
          
        </article>
        <div className='flex w-full items-center gap-3 p-2 content-end justify-end'>
        <button type='button' className='bg-admin-hovergray p-2 rounded-md' onClick={closeHistoryModal}>Cancel</button>
          <button className='bg-maroon-custom text-white p-2 rounded-md' type='button' >Remove</button>
      </div>
        </div> 
    </section>
    </motion.div>
    )}
    </section>
    </motion.div>
  )
}

export default ControlDashboard
