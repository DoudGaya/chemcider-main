
interface Jobs {
    id: number
    link: string
    size: string
    logo: string
}

const jobs = [
    {
        id: 1,
        link: '#',
        size: 'big',
        logo: 'Sweden Jobs'
    },

    {
        id: 1,
        link: '#',
        size: 'small',
        logo: 'Vanhack'
    },

    {
        id: 1,
        link: '#',
        size: 'big',
        logo: 'LinkedIn'
    },

    {
        id: 1,
        link: '#',
        size: 'big',
        logo: 'Flex Jobs'
    },

    {
        id: 1,
        link: '#',
        size: 'big',
        logo: 'RemoteOK'
    },
    {
        id: 1,
        link: '#',
        size: 'big',
        logo: 'Upwork'
    },
]


const JobsCard = ( { jobs}: any ) => {
    return (
        <>
        <a href="" className={`bg-slate-500 px-6 p-4 hover:bg-slate-700 hover:text-slate-400`}>
            { jobs.logo}
        </a>
        </>
    )
}

const jobbings = jobs.map(sobs => <JobsCard key={sobs.id} jobs={sobs} />)

const Jobs = () => {
    return (
        <div className=" py-10 flex flex-col space-y-6">
           <div className=" flex w-full items-center flex-col">
            <h3 className=" text-2xl font-bold text-white mx-auto">International Jobs</h3>
                <p className=" text-white mx-auto">Get access to quality international Jobs with our partners </p>
           </div>
            <div className="grid grid-cols-6 gap-2">
                {jobbings}
            </div>
        </div>
    )
}

export default Jobs