import React, { useState } from 'react'

const questions = [
  {
    question: 'What photography services do you offer?',
    answer:
      'We offer a range of photography services, including portraits, events, product photography, and commercial shoots tailored to meet your specific needs.',
  },
  {
    question: 'Can you help with printing my photos?',
    answer:
      'Absolutely! We provide high-quality printing services, offering a variety of print sizes and finishes to showcase your photos beautifully.',
  },
  {
    question: 'What is your filmmaking process?',
    answer:
      'Our filmmaking process involves pre-production planning, shooting, and post-production editing, ensuring that your vision is brought to life effectively.',
  },
  {
    question: 'Do you provide web development services?',
    answer:
      'Yes, we offer web development services to create visually appealing and functional websites, optimized for both desktop and mobile devices.',
  },
  {
    question: 'How long does a typical project take?',
    answer:
      'Project timelines vary based on the complexity and scope. We will provide a detailed timeline during the consultation phase.',
  },
  {
    question: 'Can I request a custom quote?',
    answer:
      'Definitely! We can provide custom quotes based on your specific requirements. Please contact us with your project details for an accurate estimate.',
  },
  {
    question: 'Do you have a portfolio I can view?',
    answer:
      'Yes, we have a portfolio showcasing our work in photography, filmmaking, and web development. You can view it on our website to get a sense of our style and capabilities.',
  },
]

const Faq = () => {
  const [openQuestionIndex, setOpenQuestionIndex] = useState(null)

  const toggleOpen = (index) => {
    setOpenQuestionIndex((prevIndex) => (prevIndex === index ? null : index))
  }

  return (
    <section className='py-5'>
      <div className='mx-auto max-w-7xl'>
        <div className='max-w-xl mx-auto text-center flex flex-col items-center'>
          <h2 className='text-4xl font-bold'>Frequently Asked Questions</h2>
          <div className='h-1 bg-[#F17A28] mt-2 mb-4 rounded w-full'></div>
        </div>

        <div className='w-full mt-8 space-y-4 md:mt-16'>
          {questions.map((item, index) => (
            <div
              key={index}
              className='transition-all duration-200 border border-n-5 rounded-[20px] shadow-lg'
            >
              <button
                type='button'
                className='flex items-center justify-between w-full px-4 py-5 sm:p-6'
                onClick={() => toggleOpen(index)} // Call the toggle function with index
              >
                <span className='flex text-lg font-semibold'>
                  {item.question}
                </span>
                <svg
                  className={`w-7 h-7 transition-transform duration-200 ${
                    openQuestionIndex === index ? 'rotate-0' : 'rotate-180'
                  }`} // Rotate based on state
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M19 9l-7 7-7-7'
                  />
                </svg>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openQuestionIndex === index
                    ? 'max-h-screen opacity-100'
                    : 'max-h-0 opacity-0'
                }`} // Control height and opacity
              >
                <div className='px-4 pb-5 sm:px-6 sm:pb-6 text-n-2'>
                  <p>{item.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Faq
