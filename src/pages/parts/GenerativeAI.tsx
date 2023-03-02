import openai from '../../assets/openai.png'


const aitexts = [
    {
        id: 1,
        title: 'Get AI support with our AI model ',
        description: 'We offers engineers and scientists a powerful tool for getting instant solutions to technical problems using ChatGPT, an intelligent language model trained by OpenAI. The platform is designed to provide accurate responses to technical questions and is accessible from anywhere. We are committed to providing reliable and trustworthy information, and our language model is constantly updated with the latest data. With ChatGPT, you can get the answers you need quickly and efficiently.'
    },

    {
        id: 1,
        title: 'Generate visual results with DALL-E',
        description: 'We offers engineers and scientists the ability to generate visually stunning images using DALL-E, a powerful image generation model developed by OpenAI. Our platform provides an easy-to-use and efficient interface for generating unique and complex images that can enhance technical work. DALL-E is trained on a vast dataset and constantly improving to meet the needs of the scientific community. With just a few clicks, users can customize their images to match their needs, making DALL-E an essential tool for enhancing visual communication in engineering and science.'
    }
]

const AIS = ({ items }: any) => {
    return (
        <div className=" flex flex-col gap-y-10 md:gap-y-0 md:px-4 rounded-lg">   
           <div className=" flex flex-col md:h-[320px] md:justify-center space-y-4">
           <h2 className=' text-lg font-bold'>{items.title}</h2>
            <p className=' leading-8'>{ items.description }</p>
           </div>
           <div className=" py-4 flex w-full">
           <a href="" className=' px-6 w-full md:w-1/2 py-4 bg-slate-200 hover:bg-slate-300 flex items-center space-x-4 rounded-lg'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
                <p>Check it out </p>
            </a>
           </div>
        </div>
    )
}



const aicontents = aitexts.map( items => <AIS items={items} />)

const GenAI = () => {
    return (
        <>
        <div className=" md:px-2 py-10 px-8 my-6">
             <div className=" text-2xl space-x-5 border-b-2 border-slate-500 py-2 max-w-max font-semibold flex">
               <span className=' text-[rgb(14,132,100)]'>Generative AIs by</span>
               <img src={openai} alt="" className='h-8' srcSet="" />
            </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 py-6 gap-x-6 gap-y-2">
                {aicontents}
             </div>
        
        </div>
        </>
    )
}


export default GenAI