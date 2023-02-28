

interface FooterLinks {
    id: number
    link: string
    name: string
}

const footerLinks: FooterLinks[] = [
    {
        id: 1,
        link: '#',
        name: 'Generative AI'
    },

    {
        id: 2,
        link: '#',
        name: 'Jobs Portal'
    },

    {
        id: 3,
        link: '#',
        name: 'Community'
    },
    {
        id: 3,
        link: '#',
        name: 'Chemcider Store'
    },
]

const ProductsLinks = ({ items }: any) => {
    return (
        <a href={items.link} className=" bg-slate-600 transform hover:bg-slate-700 ease-in-out duration-100 py-2  px-6">
            {items.name}
        </a>
    )
}

const urls = footerLinks.map( (items )  => <ProductsLinks key={items.id} items={items} />)

const Footer = () => {
    return (
        <div className=" grid grid-cols-4">
            <div className=" text-slate-200 flex flex-col border-r pr-6">
                <h3 className=" text-lg font-semibold">About Us</h3>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime, ad officiis deserunt tenetur placeat nam, sint voluptatum, facilis inventore dolorem dicta vero quae. Corrupti sint maxime doloribus quaerat, numquam voluptatum!</p>
            </div>
            <div className=" text-slate-200 flex flex-col border-r space-y-3 px-6">
            <h3 className=" text-lg font-semibold">Products</h3>
                {urls}
            </div>
            <div className=" text-slate-200 flex flex-col border-r px-4">
                <h3 className=" text-lg font-semibold">Sitemap</h3>
                <ul className=" flex flex-col space-y-2 my-2">
                    <li className=" w-full ">
                        <a href="" className=" hover:underline">Home</a>
                    </li>

                    <li className=" w-full ">
                        <a href="" className=" hover:underline">Jobs</a>
                    </li>
                    
                    <li className=" w-full ">
                        <a href="" className=" hover:underline">Generative AIs</a>
                    </li>
                    
                    <li className=" w-full ">
                        <a href="" className=" hover:underline">Store</a>
                    </li>

                </ul>
            </div>
            <div className=" text-slate-200 flex flex-col px-4">
                <h3 className=" text-lg font-semibold">Contact</h3>
                <form action="" className=" flex space-y-2 flex-col my-2">
                    <input type="text" className=" w-full bg-slate-500 py-2 px-4 placeholder:text-slate-300 outline-none border border-slate-400 " placeholder="Email" />
                    <input type="text" className=" w-full bg-slate-500 py-2 px-4 placeholder:text-slate-300 outline-none border border-slate-400 " placeholder="Name" />
                    <textarea className=" w-full bg-slate-500 py-2 px-4 placeholder:text-slate-300 outline-none border border-slate-400 h-[100px] " placeholder="Message" ></textarea>
                    <button className=" bg-[rgb(72,149,144)] w-full py-2 ">Send Us a Message</button>
                </form>
            </div>
            footer here
        </div>
    )
}

export default Footer