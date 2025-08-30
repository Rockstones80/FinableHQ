import { HelpCircle, Mail } from "lucide-react";
import Button from "../ui/Button";

interface FAQ {
  question: string;
  answer: string;
}

const FAQSection: React.FC = () => {
  const faqs: FAQ[] = [
    {
      question: "How long does it take to get approved?",
      answer:
        "Most campaigns are reviewed and approved within 24-48 hours. We work quickly while ensuring quality.",
    },
    {
      question: "What happens if my campaign doesn't reach its goal?",
      answer:
        "With flexible funding, you keep whatever you raise. With all-or-nothing funding, donations are refunded if you don't hit your target.",
    },
    {
      question: "Are there any fees?",
      answer:
        "We charge a small platform fee (2.9% + processing fees) only when you successfully receive donations. No hidden costs.",
    },
    {
      question: "How do I know donations are going to real people?",
      answer:
        "All campaigners verify their identity with BVN or student ID. We also manually review every campaign before approval.",
    },
  ];

  return (
    <>
      <style jsx>{`
        .glow-effect {
          box-shadow: 0 4px 20px rgba(16, 185, 129, 0.08);
          transition: all 0.3s ease;
        }

        .glow-effect:hover {
          box-shadow: 0 8px 30px rgba(16, 185, 129, 0.15);
          transform: translateY(-2px);
        }
      `}</style>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-4">
              Frequently Asked{" "}
              <span className=" text-green-600">Questions</span>
            </h2>
            <p className="text-gray-600 font-medium">
              Get quick answers to common questions
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg glow-effect"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-2 rounded-full flex-shrink-0">
                    <HelpCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-black mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600 mb-6 font-medium">
              Still have questions?
            </p>
            <div className=" flex justify-center items-center">
              <Button
                type="button"
                title="Contact Support"
                icon={<Mail className="w-5 h-5" />}
                className="flex py-[8px] px-6 text-white bg-green-600 cursor-pointer shadow-md rounded-sm transition-transform hover:-translate-y-1 font-semibold"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQSection;
