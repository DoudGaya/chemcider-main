import products from '../assets/products.svg'
const Store = () => {
    return (
        <>
        <section className=' my-10'>
           <div className=" flex w-full items-center justify-center">
           {/* <h2 className='text-2xl font-semibold mb-6'>Our Resource Store for Scientist, Engineers and Manufacturers </h2> */}
           </div>
            <div className=" grid grid-cols-2 gap-x-10  ">
                <div className="h-[400px]  items-center justify-center dark:brightness-50">
                    <img src={products} alt="" className=' w-full h-full ' srcSet="" />
                </div>
                <div className=" px-6">
                    <h2 className=" text-2xl mb-6 font-semibold">Discover the Best in Scientific, Medical, and Industrial Resources at Our Ecommerce Store</h2>
                    <p>
                        Our ecommerce store is the perfect destination for anyone in need of high-quality scientific, 
                        medical, and industrial resources. With a vast selection of products and unbeatable prices, 
                        we are committed to delivering exceptional value to our customers. Our user-friendly website 
                        makes shopping a breeze, and our knowledgeable team is always available to assist you. Plus, 
                        we offer fast shipping and secure payment options to ensure a hassle-free shopping experience. 
                        With regular promotions and discounts, signing up for our newsletter is a great way to stay up-to-date 
                        on our latest offers and products. Trust us to be your go-to source for all your resource needs. 
                        Shop with us today and experience the best of what we have to offer!
                    </p>
                   <div className=" flex my-6">
                   <a href="" className=' py-4 px-6 bg-[rgb(72,149,144)] dark:hover:bg-[rgb(72,149,144)]  text-white font-semibold dark:bg-purple-50/30 rounded-md flex space-x-3 items-center'>
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                        <p>Visit the Store</p>
                    </a>
                   </div>
                  
                </div>
            </div>
        </section>
        </>
    )
}

export default Store