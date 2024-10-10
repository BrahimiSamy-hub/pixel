const ServiceCard = ({ icon, imgURL, label, subtext }) => {
  return (
    <div className='flex-1 sm:w-[350px] sm:min-w-[350px] w-full rounded-[20px] px-10 py-10 hover:scale-95 duration-700 transition-transform border border-n-5'>
      <div className='w-11 h-11 flex justify-center items-center bg-[#F17A28] rounded-full'>
        {icon ? (
          icon
        ) : (
          <img
            src={imgURL}
            alt={label}
            width={24}
            height={24}
            draggable='false'
          />
        )}
      </div>
      <h3 className='mt-5 font-palanquin text-3xl leading-normal font-bold'>
        {label}
      </h3>
      <p className='mt-3 break-words font-montserrat text-xl leading-normal text-n-2'>
        {subtext}
      </p>
    </div>
  )
}

export default ServiceCard
