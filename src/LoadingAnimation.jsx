import React from 'react'
import {motion} from 'framer-motion'
function LoadingAnimation() {
    
  return (
    <>
    <motion.div
    initial={{opacity:0}}
    animate={{opacity:1}}
    exit={{opacity:0}}
    transition={{duration:0.3,delay:0.2}}
    >
      <section className='z-bring-front flex flex-row  my-5 w-screen  justify-center items-center'>
        <div className='border-b-4 bg-white gap-x-5 top-10 absolute right-5 h-28 px-10 py-5 rounded-xl justify-center items-center shadow-box-sec overflow-hidden  border-light-maroon flex'>
            <span className='loader'></span>
            <label className='text-xl font-bold'>Loading</label>
        </div>
      </section>
    </motion.div>
    </>
  )
}

export default LoadingAnimation
