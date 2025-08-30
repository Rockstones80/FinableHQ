'use client'
import { useState, useRef, useEffect, Dispatch, SetStateAction } from 'react';
import { SlArrowDown } from "react-icons/sl";

interface FAQData {
  id: number;
  question: string;
  answer: string;
  isOpen: boolean;
}

interface FAQItemProps {
  id: number;
  question: string;
  answer: string;
  isOpen: boolean;
  setData: Dispatch<SetStateAction<FAQData[]>>;
}

const FAQItem: React.FC<FAQItemProps> = ({ id, question, answer, isOpen, setData }) => {
  const [contentHeight, setContentHeight] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [answer]);

  const handleToggle = (): void => {
    setData((prevData: FAQData[]) =>
      prevData.map((accordion) => ({
        ...accordion,
        isOpen: accordion.id === id ? !isOpen : false
      }))
    );
  };

  return (
    <div className="mb-4">
      <button
        className="flex w-full justify-between items-center py-4 bg-white border-b border-black"
        onClick={handleToggle}
      >
        <span className="text-lg font-medium text-black">{question}</span>
        <SlArrowDown
          className={`transform transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: isOpen ? `${contentHeight}px` : '0' }}
      >
        <div className="py-4 font-medium text-gray-600">
          {answer}
        </div>
      </div>
    </div>
  );
};

const FAQList: React.FC = () => {
  const [data, setData] = useState<FAQData[]>([
    {
      id: 1,
      question: "How to Create Your Campaign",
      answer: "Start by signing up and filling out your campaign details.",
      isOpen: false
    },
    {
      id: 2,
      question: "How to Donate to Campaigns",
      answer: "Browse campaigns and choose one that resonates with you.",
      isOpen: false
    },
    {
      id: 3,
      question: "Understanding Fund Distribution",
      answer: "Funds are securely transferred to students once goals are met.",
      isOpen: false
    },
  ]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="space-y-4">
        {data.map((faq: FAQData) => (
          <FAQItem
            key={faq.id}
            {...faq}
            setData={setData}
          />
        ))}
      </div>
    </div>
  );
};

export default FAQList;