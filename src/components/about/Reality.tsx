// components/about/CTASection.tsx
import Image from 'next/image';
import young_students from "../../../public/images/service/young_students.jpg";

interface CTASectionProps {
  backgroundImage: string;
}

const CTASection: React.FC<CTASectionProps> = () => {
  return (
    <section className="relative py-4 mx-40 my-16 bg-white ">
      <div className="absolute inset-0 opacity-40">
        <Image
          src={young_students}
          alt="Young students background"
          fill
          className="object-cover rounded-4xl"
          priority={false}
        />
      </div>
      <div className="relative z-10 flex items-center justify-center min-h-[55vh]">
        <div className="max-w-4xl mx-auto text-center text-black">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            Ready to Turn Your <span className='text-green-600'>Dreams</span> into <span className=' text-green-600'>Reality?</span>
          </h2>
          <p className="text-lg mb-9 text-gray-700 font-medium leading-relaxed">
            Join thousands of Nigerians who have successfully funded their projects through Finable
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="ring-1 ring-white py-[9px] bg-green-600 opacity-90 px-6 cursor-pointer shadow-md font-semibold rounded-sm transition-transform hover:-translate-y-1 text-white">
              Start Your Campaign
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
