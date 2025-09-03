// components/about/CTASection.tsx
import Image from 'next/image';
import young_students from "../../../public/images/service/young_students.jpg";

interface CTASectionProps {
  backgroundImage: string;
}

const CTASection: React.FC<CTASectionProps> = () => {
  return (
    <section className="relative py-4 lg:mx-40 md:mx-10 mx-6 my-16 bg-white">
      <div className="absolute inset-0 opacity-40">
        <Image
          src={young_students}
          alt="Young students background"
          fill
          className="object-cover rounded-4xl lg:rounded-4xl md:rounded-3xl rounded-2xl"
          priority={false}
        />
      </div>
      
      {/* Desktop View - Original Layout */}
      <div className="hidden lg:block relative z-10">
        <div className="flex items-center justify-center min-h-[45vh]">
          <div className="max-w-4xl mx-auto text-center text-black">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Ready to Turn Your <span className='text-green-600'>Dreams</span> into <span className=' text-green-600'>Reality?</span>
            </h2>
            <p className="text-lg mb-9 text-gray-700 font-medium leading-relaxed">
              Join thousands of Nigerians who have successfully funded their projects through Finable
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="ring-1 ring-white py-[9px] px-6 cursor-pointer shadow-md font-semibold rounded-sm transition-transform hover:-translate-y-1 text-white">
                Start Your Campaign
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tablet View - Adjusted Layout */}
      <div className="hidden md:block lg:hidden relative z-10">
        <div className="flex items-center justify-center min-h-[30vh] px-8">
          <div className="max-w-3xl mx-auto text-center text-black">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
              Ready to Turn Your <span className='text-green-600'>Dreams</span> into <span className=' text-green-600'>Reality?</span>
            </h2>
            <p className="text-base mb-8 text-gray-700 font-medium leading-relaxed">
              Join thousands of Nigerians who have successfully funded their projects through Finable
            </p>
            <div className="flex justify-center">
              <button className="ring-1 ring-white py-3 px-8 cursor-pointer shadow-md font-semibold rounded-sm transition-transform hover:-translate-y-1 text-white hover:bg-white/10">
                Start Your Campaign
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View - Compact Layout */}
      <div className="md:hidden relative z-10">
        <div className="flex items-center justify-center min-h-[45vh] px-4">
          <div className="w-full text-center text-black">
            <h2 className="text-3xl sm:text-3xl font-extrabold mb-4 leading-tight">
              Ready to Turn Your <br className="sm:hidden" />
              <span className='text-green-600'>Dreams</span> into <br className="sm:hidden" />
              <span className=' text-green-600'>Reality?</span>
            </h2>
            <p className="text-sm mb-8 text-gray-700 font-medium leading-relaxed px-2">
              Join thousands of Nigerians who have successfully funded their projects through Finable
            </p>
            <div className="flex justify-center">
              <button className="ring-1 ring-white py-3 px-6 cursor-pointer shadow-md font-semibold rounded-sm transition-transform hover:-translate-y-1 text-white hover:bg-white/10  max-w-xs">
                Start Your Campaign
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;