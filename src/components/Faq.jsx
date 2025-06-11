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
    <section className='py-10 mb-20'>
      <div className='mx-auto max-w-6xl'>
        {/* Header Section */}
        <div className='mx-auto text-center flex flex-col items-center mb-16'>
          <div className='relative'>
            <h2 className='text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#F17A28] via-[#FF6B35] to-[#F17A28] bg-clip-text text-transparent'>
              {t('faq.title')}
            </h2>
            <div className='absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#F17A28] to-[#FF6B35] rounded-full'></div>
          </div>
          <p className='mt-8 text-lg text-n-3 max-w-2xl leading-relaxed'>
            Find answers to commonly asked questions about our services and
            processes
          </p>
        </div>

        {/* FAQ Items */}
        <div className='space-y-6'>
          {questions.map((item, index) => (
            <div
              key={index}
              className={`group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-n-6 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-[#F17A28]/10 hover:border-[#F17A28]/30 ${
                openQuestionIndex === index
                  ? 'shadow-2xl shadow-[#F17A28]/20 border-[#F17A28]/50 bg-gradient-to-br from-[#F17A28]/5 to-[#FF6B35]/5'
                  : ''
              }`}
            >
              {/* Animated Background Gradient */}
              <div className='absolute inset-0 bg-gradient-to-r from-[#F17A28]/0 via-[#F17A28]/5 to-[#FF6B35]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>

              <button
                type='button'
                className='relative flex items-center justify-between w-full px-6 py-6 sm:px-8 sm:py-7 text-left focus:outline-none focus:ring-2 focus:ring-[#F17A28]/50 focus:ring-offset-2 focus:ring-offset-transparent'
                onClick={() => toggleOpen(index)}
              >
                <div className='flex items-center space-x-4'>
                  {/* Question Icon */}
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      openQuestionIndex === index
                        ? 'bg-gradient-to-r from-[#F17A28] to-[#FF6B35] text-white shadow-lg shadow-[#F17A28]/30'
                        : 'bg-n-6 text-n-3 group-hover:bg-[#F17A28]/20 group-hover:text-[#F17A28]'
                    }`}
                  >
                    <svg
                      className='w-5 h-5'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path
                        fillRule='evenodd'
                        d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </div>

                  {/* Question Text */}
                  <span
                    className={`text-lg lg:text-xl font-semibold transition-colors duration-300 ${
                      openQuestionIndex === index
                        ? 'text-white'
                        : 'text-n-1 group-hover:text-[#F17A28]'
                    }`}
                  >
                    {item.question}
                  </span>
                </div>

                {/* Expand/Collapse Icon */}
                <div
                  className={`flex-shrink-0 ml-4 transition-all duration-500 ${
                    openQuestionIndex === index
                      ? 'rotate-180 text-[#F17A28]'
                      : 'rotate-0 text-n-3 group-hover:text-[#F17A28]'
                  }`}
                >
                  <svg
                    className='w-6 h-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M19 9l-7 7-7-7'
                    />
                  </svg>
                </div>
              </button>

              {/* Answer Section */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openQuestionIndex === index
                    ? 'max-h-96 opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className='px-6 pb-6 sm:px-8 sm:pb-8'>
                  <div className='pl-14 pr-4'>
                    <div className='w-full h-px bg-gradient-to-r from-[#F17A28]/30 to-transparent mb-4'></div>
                    <p className='text-n-2 leading-relaxed text-base lg:text-lg'>
                      {item.answer}
                    </p>
                  </div>
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
