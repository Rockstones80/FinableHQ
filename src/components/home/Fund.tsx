import FAQList from './Faq'

const Challenge: React.FC = () => {
  return (
    <div className=' py-10'> 
        <p className=' text-center text-5xl font-black mb-8'>Funding Your <span className=' text-green-600'> Education </span> Made <br /> Easy</p>
        <p className='font-medium text-gray-600 text-lg text-center mb-8'>Creating a campaign on Finable is simple and straightforward. Just share your story,<br /> set a funding goal, and invite supporters to help you achieve your educational dreams.</p>

    <div className=' flex justify-between px-20'>
        <div className='w-2/5'>
         <p className='text-green-600 text-6xl font-extrabold'> FAQs ;</p>
           
         </div>

         <div className=' w-3/5'>
            <FAQList />
            <div>
            </div>
         </div>
        </div>
    </div>
      
  )
}

export default Challenge