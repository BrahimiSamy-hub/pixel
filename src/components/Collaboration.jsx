import { brainwaveSymbol, check, p } from '../assets'
import { collabApps, collabContent, collabText } from '../constants'
import Button from './Button'
import Section from './Section'
import { LeftCurve, RightCurve } from './design/Collaboration'
import { Link } from 'react-router-dom'

const Collaboration = () => {
  return (
    <Section crosses id='portfolio'>
      <div className='container lg:flex'>
        <div className='max-w-[25rem] flex flex-col' data-aos='fade-up'>
          <h2 className='h2 mb-4 md:mb-8 '>Our Portfolio</h2>
          <ul className='max-w-[22rem] mb-10 md:mb-14 grid grid-cols-4 gap-1'>
            {collabContent.map((item) => (
              <li className='mb-3 py-3 col-span-2 ' key={item.id}>
                <div className='flex items-center '>
                  <img
                    src={check}
                    width={24}
                    height={24}
                    alt='check'
                    loading='lazy'
                  />
                  <h6 className='body-2 ml-5'>{item.title}</h6>
                </div>
              </li>
            ))}
          </ul>
          <Link to='/portfolio'>
            <Button className='w-44'>Portfolio</Button>
          </Link>
        </div>

        <div className='lg:ml-auto xl:w-[38rem] mt-20' data-aos='zoom-in'>
          <div className='relative left-1/2 flex w-[20rem] aspect-square border border-n-6 rounded-full -translate-x-1/2 scale:75 md:scale-100'>
            <div className='flex w-60 aspect-square m-auto border border-n-6 rounded-full'>
              <div className='w-[6rem] aspect-square m-auto p-[0.2rem] bg-[#F18A27] rounded-full'>
                <div className='flex items-center justify-center w-full h-full bg-n-8 rounded-full'>
                  <img
                    src={p}
                    width={50}
                    height={50}
                    alt='pixel'
                    loading='lazy'
                  />
                </div>
              </div>
            </div>

            <ul>
              {collabApps.map((app, index) => (
                <li
                  key={app.id}
                  className={`absolute top-0 left-1/2 h-1/2 -ml-[1.6rem] origin-bottom rotate-${
                    index * 45
                  }`}
                >
                  <div
                    className={`relative -top-[1.6rem] flex w-[3.2rem] h-[3.2rem] bg-n-7 border border-n-1/15 rounded-xl -rotate-${
                      index * 45
                    }`}
                  >
                    <img
                      loading='lazy'
                      className='m-auto'
                      width={35}
                      height={35}
                      alt={app.title}
                      src={app.icon}
                    />
                  </div>
                </li>
              ))}
            </ul>

            <LeftCurve />
            <RightCurve />
          </div>
        </div>
      </div>
    </Section>
  )
}

export default Collaboration
