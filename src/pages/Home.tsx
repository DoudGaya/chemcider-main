import { useState } from 'react'
import homeBannerIMG from '../assets/dark.jpg'
import Community from './Community'
import Footer from './parts/Footer'
import GenAI from './parts/GenerativeAI'
import Jobs from './parts/Jobs'
import Navigation from './parts/Navigations'
import Partners from './parts/Partners'
import Company from './parts/TheCompany'
import Store from './Store'
import Modal from '../Modal'
import Details from './HomeDetails'
import ClickAwayListener from 'react-click-away-listener';






// INTERFACES
interface HomeDetails {
  id: number
  title: string
  description: string
}

interface ModalFunc {
  closeModal: () => void
}

// variables and arrays 
const details: HomeDetails[] = [
  {
    id: 1,
    title: 'Resource for product development and research',
    description:' Our extensive product catalog features only the best products from leading manufacturers. You can trust that our products will meet your high standards for quality and performance.'
  },

  {
    id: 2,
    title: 'Access to the large scientific community',
    description: "We believe that connections are key to success in any field, and that's especially true in science and engineering. That's why we're dedicated to providing you with opportunities to connect with other scientists and engineers from around the world."
  },

  {
    id: 3,
    title: 'Support from experts across the world',
    description: "Our team of experts is always available to answer your questions and help you find the products and connections you need to succeed. Whether you need help selecting the right product, or advice on the latest advancements in your field, we're here to help."
  },

  {
    id: 4,
    title: 'Cutting-Edge Information',
    description: " Stay up-to-date with the latest scientific and engineering news and trends with our blog and newsletter. Our experts will provide insights, analysis, and advice on the topics that matter most to you."
  },
]


const benefits = details.map((items) => {
  return <Details items={items} key={items.id} />
})


function Home() {
  const [modal, setModal] = useState<boolean>(true);



  const closeModal = (): any => {
    return setModal(false)
  }
  
  const openModal = (): any => {
    return setModal(true)
  }


  const clickAway = () => {
    return setModal(false)
  }

  return (
  <>
 <div className=" flex flex-col relative ">

 <div className="  fixed md:hidden z-50 px-6  py-6 bottom-0 w-full ">
    <div className=" flex justify-between items-center bg-[rgb(21,113,173)] drop-shadow-xl rounded-lg px-4 py-3">
      <a href="" className=' flex space-x-3 items-center'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 stroke-slate-100 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
        </svg>
        <p className=' text-xl text-white'>Jobs</p>

      </a>
      <div className="">
        <button className=' p-3'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 stroke-slate-100 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>
    </div>
  </div>

  { modal ? 

<ClickAwayListener onClickAway={clickAway}>
  <div className=" w-full z-50 flex items-center px-6 h-screen justify-center fixed">
    <Modal closeModal={closeModal} />
  </div>
</ClickAwayListener>


  : '' }


  <div className="flex flex-col  dark:bg-[#000A16] text-slate-900 dark:text-slate-100 w-full">
  <div className=" grid md:grid-cols-2  grid-cols-1 md:gap-x-6 md:gap-y-0  mx-auto">
      {/* THE HOME PAGE HERE... */}
      <div className=" dark:bg-[#000A16] text-slate-900 dark:text-slate-100 ">
        <div className="w-full h-full">
          
          <div className="h-screen flex pt-[50px] px-10 md:px-[60px]">
      
          <div className= "flex w-full space-y-6 flex-col">
          <div className=" w-full">
            <small className='text-gray-400'>Welcome</small>
            <h1 className=' dark:text-slate-100 text-4xl font-semibold'>Chemcider Inc</h1>
            <p className=' dark:text-slate-100 tracking-wide text-lg'>Science Technology and Engineering</p>
          </div>

          <div className="h-[300px] rounded-lg overflow-hidden">
            <img src={homeBannerIMG} alt="" className='  object-cover w-full h-full ' />
          </div>
      <div className="dark:text-slate-100">
        <h2 className=' text-2xl text-start font-semibold '>Your Ultimate Destination for Scientific and Engineering Solutions</h2>
        <p className=' my-6 text-lg'>
            Our mission is to provide scientists and engineers with access to quality products and connections that will help 
            them advance their research and projects. 
            Whether you're looking for cutting-edge technology, trusted suppliers, or like-minded peers, we've got you covered.
        </p>
      </div>
      </div>

      
      </div>
    </div>
      </div>
      {/* THE PAGE */}

      {/* THE HomeS SECTION */}
      <div className=" md:pt-[60px] items-center px-4 md:px-0 md:items-start lg:w-[700px] flex flex-col space-y-4">
        <h1 className=' text-2xl'>Available Solutions</h1>

       <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-4 md:gap-4 px-6 md:px-0">
            <a href='' className=" dark:bg-slate-900 dark:hover:bg-black bg-slate-200 hover:bg-white py-6 md:py-4 px-6 rounded-lg flex space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 flex-none h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
            </svg>
            <span className=' text-lg md:text-sm'>Join Our Community </span>
            </a>
            <a href='' className=" dark:bg-slate-900 dark:hover:bg-black bg-slate-200 hover:bg-white py-6 md:py-4 px-6 rounded-lg flex space-x-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 flex-none h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
              <span className=' text-lg md:text-sm'>Visit Store</span>
            </a>
            <a href='' className=" dark:bg-slate-900 dark:hover:bg-black bg-slate-200 hover:bg-white py-6 md:py-4 px-6 rounded-lg flex space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 flex-none h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5" />
            </svg>
              <span className=' text-lg md:text-sm'>Quick Order</span>
            </a>
          </div>
         <div className=" w-full">
         {benefits}
         </div>
      </div>
      {/* END OF THE HomeS WINDOWS */}

  </div>
    <Navigation />
    {/* the community */}
      <section className=' bg-slate-200 dark:bg-black'>
        <div className=" md:w-full lg:w-[1200px] mx-auto">
            <Community openModal={openModal} />
          </div>
      </section>
    {/* end of community */}

     {/* PARTNERS */}
     <section className=' bg-slate-900'>
          <div className=' md:w-full lg:w-[1200px] mx-auto'>
           <Jobs />
          </div>
      </section>
      {/* END OF PARTNERS */}

       {/* PARTNERS */}
     <section className='' id='#genai'>
          <div className=' md:w-full lg:w-[1200px] mx-auto'>
           <GenAI openModal={openModal} />
          </div>
      </section>
      {/* END OF PARTNERS */}

      {/* THE STORE */}
      <section className=' bg-slate-200 w-full dark:bg-black py-10'>
        <div className=" md:w-full lg:w-[1200px] mx-auto ">
            <Store />
          </div>
      </section>
      {/* END OF STORE */}

      {/* PARTNERS */}
        <section className=''>
          <div className=' md:w-full lg:w-[1200px] mx-auto'>
            <Partners />
          </div>
        </section>

        {/* END OF PARTNERS */}

        <section className=' py-10 bg-slate-900  '>
          <div className=' mx-auto md:w-full lg:w-[1400px] '>
            <Footer />
          </div>
        </section> 
  </div>

  
 </div>
    </>
  )
}

export default Home
