
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, easeIn } from "motion/react"
import Isomap from './Images/isomap.svg'
import DropDown from './Images/dropdown.svg'
import CtLogo from './Images/ct-logo.svg'
import SocialFacebook from './Icons/fb.svg'
import SocialInstagram from './Icons/ig.svg'
import SocialWebsite from './Icons/web.svg'
import { useState } from 'react'
import CoryAI from './Cory'
function ClientHome() {
  const [faq, setfaq] = useState(false)
  const openFaq = ()=>{
    setfaq(prev =>!prev);
   };
   
  return (
    <motion.div
    initial={{y:10, opacity:0}}
    whileInView={{y:0, opacity:1}}
    viewport={{once:true}}
    transition={{duration:0.5, delay:0.2, ease:easeIn}}
    >
    <section className='min-h-screen overflow-hidden  w-full text-white '>
      <div>
        <CoryAI/>
      </div>
      <section className=' home-section-layout'>
        <div className='flex flex-col gap-y-5  mx-10 lg:text-left lg:text-sm/8'>
          <span className='mt-40 lg:mt-0'>
          <h1 className='home-head-text'>Explore Southwestern University<br/> PHINMA Main Campus </h1>
          <p className='lg:text-base'>Welcome to COBRATOUR! Find and explore specific buildings or facilities <br/> at Southwestern University PHINMA Main Campus with ease, making navigation simple and hassle-free for everyone.</p>
          </span>
          <span className='lg:gap-5 my-5 gap-3 flex justify-center lg:justify-start size-full items-center '>
          <Link to='/clientExplore'>
          <button className='home-button-explore'>Explore The Campus</button>
          
          </Link>
          </span>
        </div>
      </section>
      <section className='about-section-layout'>
        
        <div className='home-about-container z-10'>
          <p className=' p-5 font-semibold break-words text-lg/loose lg:text-2xl/loose lg:w-96'>
          <span className='text-light-maroon'>COBRATOUR</span> is a campus navigation website for Southwestern University PHINMA <span className='text-light-maroon'>main campus</span> , helping freshmen or guests easily locate key areas on campus. 
          </p>
        </div>
      <Link to='/clientExplore'>
        <div className='home-about-container cursor-pointer'>
          <p className='lg:text-6xl text-5xl lg:p-0 md:p-0 p-2 lg:w-96 font-bold lg:px-3'>
          Explore with <br/> our <span className='text-light-maroon'> 3D</span> <br/>map
          </p>
          <div className='m-0 p-0 flex justify-end '>
            <img src={Isomap} alt="isomap" className='w-iso h-fit border-none relative left-20 lg:left-10  ' />
          </div>
        </div>
      </Link>
      </section>
      
      <section className='mx-10 my-5 p-5 lg:mx-20 block' id='faq-section'>
        <label className='text-6xl font-bold'>FAQs</label>
          <div className='faq-faqs-container'>
            <div className='flex items-center justify-between'>
            <p className='text-lg'>Does COBRATOUR provide real-time navigation?</p>
            <motion.div
              initial={{rotate:0, opacity:1}}
              animate={{rotate: faq? 180:0}}
              transition={{duration:0.3}}
             
            >
            <img src={DropDown} alt="dropdown" className='min-w-6 max-w-11 cursor-pointer' onClick={openFaq}/>
            </motion.div>
            </div>
            <AnimatePresence>
            {faq && (
            <motion.div
              initial={{height:0, opacity:0}}
              animate={{height: faq? "auto": "0",opacity: faq? "1":"0"}}
              exit={{height:0, opacity:0}}
              transition={{duration:0.3, ease:"easeInOut", delay:faq? 0.1:0}}
              
            >
              
            <span className='p-5 duration-300'>
            <motion.p
              initial={{opacity: 0, y:-10}}
              animate={{opacity: faq? 1: 0, y: faq? 0:-10}}
              transition={{duration:0.3, ease:"easeInOut",delay: faq? 0.2:0}}
            >
            <p className='lg:pr-6 duration-300 '>Simply locate your desired building on the three dimensional map through the Explore/Explore the campus section or enter the name of the building or facility in the search bar through the Gallery section to get its information or details.</p>
            </motion.p>
            </span>
            </motion.div>
            )}
            </AnimatePresence>
          </div>
      </section>
      <footer className='h-full grid lg:grid-cols-3 gap-y-10  justify-center items-start w-full p-10 bg-bg-gray-v2 '>
        <div className='flex flex-col gap-y-3 items-center lg:items-start lg:gap-y-2'>
          <img src={CtLogo} alt="footer-logo" className='max-w-52 min-w-32' />
          <p>Your Companion in Every step!</p>
          <Link to="/clientFeedback">
          <button className='footer-feedback'>Send us a feedback</button>
          </Link>
        </div>
        <div className='flex flex-col items-center gap-y-2 text-center'>
          <label className='text-2xl font-semibold'>Website</label>
          <span className='flex flex-row items-center'>
          <ul className='flex flex-row item items-center gap-5'>
          <li>
                <Link to='/clientFaqs'>Explore</Link>
            </li>
            <li>
                <Link to='/clientGallery'>Gallery</Link>
            </li>
            <li>
                <Link to='/clientFaqs'>FAQS</Link>
            </li>
            
            <li >
                <Link to='/adminLogin'>Admin</Link>
            </li>
          </ul>
          </span>
        </div>
        <div className='footer-socials'>
        <label className='text-2xl font-semibold'>Socials</label>
        <span className='flex justify-center flex-row gap-5 '>
        <img src={SocialFacebook} alt="facebook" className='size-9 pb-2' />
        <img src={SocialInstagram} alt="Instagram"className='size-10 pb-2' />
        <img src={SocialWebsite} alt="Website" className='size-10 pb-2' />
        </span>
        </div>
      </footer>
      
    </section>
    </motion.div>
    
  )
}

export default ClientHome
