import Section from '../components/Section'

const AboutUs = () => {
  return (
    <>
      <div className={`pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden`}>
        <Section
          className='pt-[8rem] -mt-[5.25rem] min-h-screen'
          crosses
          crossesOffset='lg:translate-y-[5.25rem]'
          customPaddings
        >
          <div className='container'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
              <div className='flex flex-col'>
                <h2 className='text-4xl font-bold'>
                  <span className='text-[#F17A28]'> Pixel </span> Creative
                  Agency
                </h2>
                <div className='w-[420px] h-1 bg-[#F17A28] mt-2 mb-4'></div>
                <p className='leading-8 mt-4 text-lg text-n-2'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
                  delectus consectetur alias magni. Recusandae, nemo architecto
                  provident maiores beatae esse rem porro nesciunt officia
                  suscipit iure mollitia inventore sequi officiis.
                </p>
              </div>

              <iframe
                src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12983.930370880267!2d6.1731097!3d35.5541321!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12f41158da88865b%3A0xf23a3bf30fc4c9fc!2sPixel%20Creative%20Agency!5e0!3m2!1sfr!2sdz!4v1728480388311!5m2!1sfr!2sdz'
                title='Maps Localisation'
                className='rounded-md h-[500px] w-full'
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
              ></iframe>
            </div>
          </div>
        </Section>
      </div>
    </>
  )
}

export default AboutUs
