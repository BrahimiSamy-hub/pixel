import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

const Faq = () => {
  const { t } = useTranslation()
  const [openQuestionIndex, setOpenQuestionIndex] = useState(null)

  const toggleOpen = (index) => {
    setOpenQuestionIndex((prevIndex) => (prevIndex === index ? null : index))
  }

  const questions = t('faq.questions', { returnObjects: true })

  return (
    <section className='py-5'>
      <div className='mx-auto max-w-7xl'>
        <div className='mx-auto text-center flex flex-col items-center'>
          <h2 className='text-4xl font-bold'>{t('faq.title')}</h2>
          <div className='h-1 bg-[#F17A28] mt-2 mb-4 rounded max-w-xl w-1/6'></div>
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
                onClick={() => toggleOpen(index)}
              >
                <span className='flex text-lg font-semibold'>
                  {item.question}
                </span>
                <svg
                  className={`w-7 h-7 transition-transform duration-200 ${
                    openQuestionIndex === index ? 'rotate-0' : 'rotate-180'
                  }`}
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
                }`}
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
