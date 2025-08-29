import React from 'react';
import Button from "../ui/Button";

const sections = [
  {
    title: "About",
    items: [
      "About us",
      "Terms and conditions",
      "Pricing",
      "Partner with us",
      "Our mission",
    ],
  },
  {
    title: "Get started",
    items: ["Start a campaign", "Login", "Explore campaigns", "Safe giving"],
  },
  {
    title: "Resources",
    items: [
      "How it works",
      "FAQs",
      "Get Help",
      "Contact us",
      "Report an issue",
    ],
  },
];

const items = [
  {
    name: "Instagram",
    icon: "/images/Footer/instagram.svg",
    link: "https://instagram.com",
  },
  {
    name: "X (Twitter)",
    icon: "/images/Footer/x.svg",
    link: "https://twitter.com",
  },
  {
    name: "YouTube",
    icon: "/images/Footer/youtube.svg",
    link: "https://youtube.com",
  },
];

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-bl from-green-50 to-white font-sans text-green-500 px-2">
      <div className="max-w-[1240px] flex flex-col lg:flex-row mx-auto border-b-2 border-gray-600 py-8 gap-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 flex-1">
          {sections.map((section, index) => (
            <div key={index}>
              <h6 className="font-bold font-sans uppercase pt-2 mb-3">{section.title}</h6>
              <ul>
                {section.items.map((item, i) => (
                  <li
                    key={i}
                    className="py-1 text-green-700 hover:text-black duration-300 cursor-pointer transition-colors"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="lg:ml-auto pt-4 lg:pt-2 min-w-fit">
          <div className="text-green-500 text-2xl cursor-pointer font-sans font-bold mb-4">
            Finable
          </div>
          <div className="mb-5 py-1 w-full">
            <Button>Start a campaign</Button>
          </div>
          <p className="font-bold mb-3">Subscribe to our newsletter to stay updated</p>
          
          <form className="text-gray-800 flex flex-col py-2 sm:flex-row gap-2">
            <input 
              type="email" 
              placeholder="Enter email address" 
              className="flex-1 p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" 
              required
            />
            <button 
              type="submit"
              className="p-3 px-6 bg-green-500 text-white rounded-md hover:bg-green-700 transition-colors duration-300 font-semibold"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      
      <div className="flex flex-col max-w-[1240px] px-2 py-4 mx-auto justify-between sm:flex-row text-gray-500 items-center">
        <p className="py-2">
          © 2025 Finable. All rights reserved.
        </p>
        <div className="flex gap-4">
          {items.map((socialIcon, i) => (
            <a 
              key={i} 
              href={socialIcon.link} 
              className="py-2 px-2 hover:opacity-70 transition-opacity duration-300"
              aria-label={`Visit our ${socialIcon.name} page`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img 
                alt={`${socialIcon.name} icon`} 
                src={socialIcon.icon} 
                className="w-6 h-6"
              />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;