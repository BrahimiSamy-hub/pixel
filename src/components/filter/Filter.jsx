import { useState } from 'react'
import { Accordion, AccordionItem as Item } from '@szhsin/react-accordion'
import chevron from '../../assets/chevron-down.svg'
import { useTranslation } from 'react-i18next'

const subcategories = {
  visualIdentity: ['logo', 'visitCards', 'sac', 'habillage', 'tshirt', 'flyer'],
  graphicDesign: ['books', 'menu', 'socialMediaPosts'],
  video: ['voixOff', 'reel', 'cinematographie', 'spotPublicitaire'],
  photo: ['shooting', 'product'],
  packaging: ['etiquette', 'emballage'],
  apps: ['webApp', 'appMobile', 'gestionaire', 'ecommerce'],
  printing: ['tableaux', 'wall', 'certificatInvitation', 'vitrine', 'frigo'],
  weedingP: ['ecommerce', 'blogs', 'portfolios'],
}

const AccordionItem = ({ header, children, ...rest }) => (
  <Item
    {...rest}
    header={({ state: { isEnter } }) => (
      <>
        {header}
        <img
          className={`ml-auto transition-transform duration-200 ease-out ${
            isEnter && 'rotate-180'
          }`}
          src={chevron}
          alt='Chevron'
          loading='lazy'
        />
      </>
    )}
    className='border-b border-n-5'
    buttonProps={{
      className: 'flex w-full p-4 text-left',
    }}
    contentProps={{
      className: 'transition-height duration-200 ease-out',
    }}
    panelProps={{ className: '' }}
  >
    {children}
  </Item>
)

export default function Filter({ setSelectedSubcategory }) {
  const { t } = useTranslation()
  const [activeItem, setActiveItem] = useState(null)

  const handleItemClick = (item) => {
    setSelectedSubcategory(item)
    setActiveItem(item)
  }

  return (
    <div
      className='sticky top-20 border-t border-n-5 mt-16 w-72'
      // data-aos='fade-up'
    >
      <Accordion transition transitionTimeout={200}>
        {Object.entries(subcategories).map(([category, items]) => (
          <AccordionItem
            key={category}
            header={<h2 className='font-bold text-xl'>{t(category)}</h2>}
          >
            <ul>
              {items.map((item, index) => (
                <li
                  key={index}
                  className={`text-white font-bold mb-4 hover:cursor-pointer hover:opacity-50 pl-4 h-14 items-center flex rounded-r ${
                    activeItem === item ? ' bg-[#F17A28] text-white' : ''
                  }`}
                  onClick={() => handleItemClick(item)}
                >
                  {t(item)}
                </li>
              ))}
            </ul>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
