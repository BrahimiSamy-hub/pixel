import TagLine from './Tagline'
import { forwardRef } from 'react'

const Heading = forwardRef(({ className, title, text, tag }, ref) => {
  return (
    <div
      ref={ref}
      className={`${className} max-w-[50rem] mx-auto mb-12 lg:mb-20 md:text-center`}
    >
      {title && (
        <>
          <h2 className='h1'>{title}</h2>
          {/* Orange line below the title */}
          {/* <div className='max-w-56 h-1 rounded bg-orange-500 mt-2 mx-auto' /> */}
        </>
      )}
      {tag && <TagLine className='mt-4 md:justify-center'>{tag}</TagLine>}
      {text && <p className='body-2 mt-4 text-n-4'>{text}</p>}
    </div>
  )
})

Heading.displayName = 'Heading'

export default Heading
