import vwr from '../../assets/partners/vwr.jpg'
import agilent from '../../assets/partners/agilent.png'
import biobase from '../../assets/partners/biobase.png'
import bruker from '../../assets/partners/bruker.jpg'



interface PartnerData {
    id: number
    img: string
    altText: string
    url: string
  }
  
const partners: PartnerData[] = [
    {
        id: 1,
        img: vwr,
        altText: 'VWR',
        url: '',
    },

    {
        id: 2,
        img: bruker,
        altText: 'Bruker',
        url: 'https://www.bruker.com/',
    },

    {
        id: 3,
        img: agilent,
        altText: 'Agilent',
        url: 'https://www.agilent.com/',
    },

    {
        id: 4,
        img: biobase,
        altText: 'Biobase',
        url: 'https://www.biobase.cc/',
    },

]


const Partner = ( {partners}: any ) => {
    return (
        <>
         <a href={partners.url} className="h-[120px] flex dark:brightness-50 items-center rounded-2xl hover:scale-105 transition-all ease-in-out justify-center bg-white overflow-hidden p-4  ">
            <img src={partners.img} alt={partners.altText} className=" object-contain object-center" />
        </a>
        </>
    )
}


const data = partners.map( ( items ) => {
    return <Partner partners={items} key={items.id} />
})

const Partners = () => {
    return (
        <>
          <div className=" my-10 flex flex-col items-center w-full">
                    <p className=' text-lg font-semibold'>Our Partners and Suppliers</p>
                    <div className="grid w-full grid-cols-1 md:grid-cols-4 sm:grid-cols-2 sm:gap-x-4 md:gap-x-4 p-10 gap-y-4 md:gap-y-2">
                       {data}
                    </div>
            </div>
        </>
    )
}


export default Partners