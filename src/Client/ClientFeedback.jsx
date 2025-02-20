import { useState } from 'react'
import DropDown from './Images/dropdown.svg'
import { easeIn } from 'motion/react';
import { motion } from 'motion/react';
function ClientFeedback() {
  const [isDropDownEnabled, setIsDropdownEnabled] = useState(false);
  const [dropDown, setDropDown] = useState (false);
  const openDropdown = ()=>{
    setDropDown(prev => !prev)
  }
  return (
    <motion.div
    initial={{y:10, opacity:0}}
    whileInView={{y:0, opacity:1}}
    viewport={{once:true}}
    transition={{duration:0.5, delay:0.2, ease:easeIn}}
    >
  <section className='h-screen  min-screen-full flex flex-col justify-center '>
    <section className="  mx-10 items-center text-white">
      <div className="justify-start items-center w-full">
        <label className="font-bold text-5xl">Send a Feedback</label>
        <form className="feedback-form">
          <div className='flex-col lg:flex-row  flex gap-5'>
          <button type="button" className={isDropDownEnabled? "disabled":"button-feedback"} onClick={()=>setIsDropdownEnabled(false) } >Website</button>
          <button type="button" className={isDropDownEnabled? "button-feedback" : "disabled"} onClick={()=>setIsDropdownEnabled(true)} >Campus</button>
        <span>
          <button 
          onClick={openDropdown}
          type="button" 
          id="dropdown" 
          className={isDropDownEnabled? "button-feedback flex items-center duration-300": " disabled flex items-center duration-300"} 
          disabled={!isDropDownEnabled} >
            Location
            <img src={DropDown} alt="dropdown" className='w-8' />
          </button>
          {dropDown || isDropDownEnabled && (
          <div className='absolute  my-2 w-36 h-36 overflow-auto break-words flex flex-col bg-bg-gray-v2 shadow-xl p-2 rounded-lg'>
            <ul className='dropdown-choice'>
              <li>Phinmahall</li>
              <li>Merlo</li>
              <li>Dent</li>
              <li>Marketing</li>
              <li>i miss you</li>
            </ul>
          </div>
          )}
          </span>
          </div>
          <input type='email' name='email' placeholder='Email' required />
          <textarea placeholder='Feedback' required/>
          <div className='flex justify-end'>
          <button type='submit' className="button-feedback">Submit</button>
          </div>
        </form>
      </div>
    </section> 
    </section>
    </motion.div>
  )
}

export default ClientFeedback
