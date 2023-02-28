const Navigation = () => {
    return (
            <div className="sticky z-10 top-0 border-b border-[rgb(34,176,196)] bg-gradient-to-b dark:from-[rgb(0,10,22)] from-slate-100 to-white dark:to-black shadow-lg h-16 items-center justify-center">
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
                    Jobs
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
    )
}


export default Navigation