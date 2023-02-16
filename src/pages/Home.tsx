import { useState } from 'react'
import homeBannerIMG from '../assets/dark.jpg'
import Community from './Community'

interface HomeDetails {
  id: number
  title: string
  description: string
}


const details: HomeDetails[] = [
  {
    id: 1,
    title: 'Quality Products for scientific and technological product development and research',
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

const Details = ({ items }:any) => {
  return (
    <>
       <details className='flex  dark:open:bg-black open:bg-slate-50 space-y-4 open:shadow-lg open:backdrop-blur-md p-6 open:rounded-lg'>
        <summary className=' cursor-pointer selection:bg-none open:bg-yellow-300 flex items-center space-x-2'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
      </svg>
          <h3>{items.title}</h3>
        </summary>
        <div className="">
            <p>{items.description}</p>
        </div>
     </details>
    </>
  )
}

const benefits = details.map((items) => {
  return <Details items={items} key={items.id} />
})


function Home() {

  return (
    <>
  <div className="flex flex-col  dark:bg-[#000A16] text-slate-900 dark:text-slate-100 w-full">

  <div className=" grid grid-cols-2 gap-x-6  mx-auto">
      {/* THE HOME PAGE HERE... */}
      <div className=" dark:bg-[#000A16] text-slate-900 dark:text-slate-100 ">
      <div className="w-full h-full">
      <div className="h-screen flex pt-[50px] px-[60px]">
      
      <div className= "flex space-y-6 flex-col">
      <div className="">
        <small className='text-gray-400'>Welcome</small>
        <h1 className=' dark:text-slate-100 text-4xl font-semibold'>Chemcider Inc</h1>
        <p className=' dark:text-slate-100 tracking-wide text-lg'>Science Technology and Engineering</p>
      </div>

        <div className="h-[300px] rounded-lg overflow-hidden">
          <img src={homeBannerIMG} alt="" className='  object-cover w-full h-full ' />
        </div>


      <div className="dark:text-slate-100">
        <h2 className=' text-2xl font-semibold '>Your Ultimate Destination for Scientific and Engineering Solutions</h2>
        {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat quisquam porro eos rerum ex illo eaque ab animi optio inventore deserunt tempore temporibus, labore earum amet consequuntur expedita itaque explicabo.</p> */}
        <p className=' my-6'>
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
      <div className=" pt-[60px] w-[700px]  flex flex-col space-y-4">
        <h1 className=' text-2xl'>Available Solutions</h1>

       <div className="grid grid-cols-3 gap-2 px-6">
        <a href='' className=" dark:bg-slate-900 dark:hover:bg-black bg-slate-200 hover:bg-white py-4 px-6 rounded-lg flex space-x-3">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
        <span className=' text-sm'>Join Our Community </span>
        </a>
        <a href='' className=" dark:bg-slate-900 dark:hover:bg-black bg-slate-200 hover:bg-white py-4 px-6 rounded-lg flex space-x-3">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
        </svg>

          <span className=' text-sm'>Visit Store</span>
        </a>
        <a href='' className=" dark:bg-slate-900 dark:hover:bg-black bg-slate-200 hover:bg-white py-4 px-6 rounded-lg flex space-x-3">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5" />
        </svg>
          <span className=' text-sm'>Quick Order</span>
        </a>
       </div>
          {benefits}
      </div>
      {/* END OF THE HomeS WINDOWS */}

  </div>

  <div className=" bg-gradient-to-b from-transparent to-white dark:to-black shadow-lg h-16 items-center justify-center">
  <div className="w-[1400px] mx-auto flex justify-between h-full items-center">
      <div className="">
        <a href="" className='font-bold px-3 '>
        Chemcider Inc
        </a>
      </div>

      <ul className='flex flex-row space-x-6 '>
          <li>
            <a href="" className=" flex hover:underline px-4">
            Home
            </a>
          </li>
          <li>
            <a href="" className=" flex hover:underline px-4">
            About
            </a>
          </li>
          <li>
            <a href="" className=" flex hover:underline px-4">
            Community
            </a>
          </li>
          <li>
            <a href="" className="flex hover:underline px-4">
            Store
            </a>
          </li>
        <li>
          <a href="" className="flex hover:underline px-4">
            Generative AI
          </a>
        </li>
      </ul>

      </div>
  </div>
   <Community />
   <div className="">
    
   </div>
  </div>
    </>
  )
}

export default Home
