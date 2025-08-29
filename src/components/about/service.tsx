// components/about/ServicesSection.tsx
import { GraduationCap, Heart, Users } from "lucide-react";
import Image from "next/image";
import student_writing from "../../../public/images/service/student_writing.jpg";
import { ServiceGroup } from "@/components/about/types";

interface ServiceCardProps {
  service: ServiceGroup;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg glow-effect opacity-80">
        <style jsx>{`
        .glow-effect {
          box-shadow: 0 2px 20px rgba(16, 185, 129, 0.08);
          transition: all 0.3s ease;
        }
        
        .glow-effect:hover {
          box-shadow: 0 6px 30px rgba(16, 185, 129, 0.15);
          transform: translateY(-2px);
        }
          `}</style>
      <div className="bg-gradient-to-r from-green-400 to-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
        <service.icon className="w-10 h-10 text-white" />
      </div>
      <h3 className="text-2xl font-bold text-black mb-4">{service.title}</h3>
      <p className="text-gray-600 font-medium">{service.desc}</p>
    </div>
  );
};

const ServicesSection: React.FC = () => {
  const services: ServiceGroup[] = [
    {
      icon: GraduationCap,
      title: "Students",
      desc: "Education funding and academic project support",
    },
    {
      icon: Heart,
      title: "Non-Profits",
      desc: "Community projects and meaningful social causes",
    },
    {
      icon: Users,
      title: "Individuals",
      desc: "Personal emergencies and important life events",
    },
  ];

  return (
    <section className="relative py-12 px-4 bg-white">
      <div className="absolute inset-0 opacity-50">
        <Image
          src={student_writing}
          alt="Students background"
          fill
          className="object-cover"
          priority={false}
        />
      </div>
      <div className="relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-10">
            Who We Serve
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
