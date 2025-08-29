// components/about/MissionVisionSection.tsx
import { Target, Eye } from 'lucide-react';

interface MissionVisionCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const MissionVisionCard: React.FC<MissionVisionCardProps> = ({ icon: Icon, title, description }) => {
  return (
    <div className="bg-white rounded-3xl p-10 shadow-lg glow-effect group hover:scale-100 transition-transform duration-300">
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
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-gradient-to-br from-green-400 to-green-600 w-14 h-14 rounded-xl flex items-center justify-center group-hover:rotate-5 transition-transform duration-300">
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-black">{title}</h2>
      </div>
      <p className="text-justify leading-relaxed text-gray-700 font-medium">{description}</p>
    </div>
  );
};

const MissionVisionSection: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10">
          <MissionVisionCard
            icon={Target}
            title="Our Mission"
            description="To empower individuals and organizations in Nigeria to bring their ideas, causes, and innovations to life by providing a transparent, secure, and community-driven crowdfunding platform."
          />
          <MissionVisionCard
            icon={Eye}
            title="Our Vision"
            description="To be Africa's most trusted and impactful crowdfunding ecosystem — bridging the gap between dreams and resources, one campaign at a time."
          />
        </div>
      </div>
    </section>
  );
};

export default MissionVisionSection;