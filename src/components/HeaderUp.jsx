import { MdEmail, MdCall } from 'react-icons/md'
import { FaLocationDot } from 'react-icons/fa6'
import { FaFacebookF, FaTiktok, FaInstagram } from 'react-icons/fa'

const HeaderUp = () => {
  return (
    <div className='px-4 py-3 lg:px-7.5 xl:px-10 max-lg:py-2 border-b border-b-[#26242C] w-full'>
      <div className='flex justify-between items-center'>
        <div className='flex justify-between w-full '>
          <div className='flex gap-20 '>
            <div className='flex gap-2 items-center max-sm:hidden'>
              <FaLocationDot size={25} color='#f17a28' />
              <span>75 Rue Benflis - BATNA</span>
            </div>
            <div className='flex gap-2 items-center max-sm:hidden'>
              <MdEmail size={25} color='#f17a28' />
              <span>contact@pixeldz.store</span>
            </div>
            <div className='flex gap-2 items-center '>
              <MdCall size={25} color='#f17a28' />
              <span>(+213) 770 69 69 82</span>
            </div>
          </div>
          <div className='flex gap-5 items-center justify-center'>
            <a href='https://www.instagram.com/_pixeldz' target='_blank'>
              <FaInstagram size={30} className='p-1 hover:text-[#F17A28]' />
            </a>
            <a
              href='https://www.tiktok.com/@pixel.creativeagency'
              target='_blank'
            >
              <FaTiktok size={30} className='p-1 hover:text-[#F17A28]' />
            </a>
            <a
              href='https://www.facebook.com/pixel.lab.3110?mibextid=LQQJ4d'
              target='_blank'
            >
              <FaFacebookF size={30} className='p-1 hover:text-[#F17A28]' />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeaderUp
