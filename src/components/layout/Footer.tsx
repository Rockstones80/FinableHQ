import Image from "next/image";
import Link from "next/link";
// import Button from "../ui/Button";
import instagram from "../../../public/images/Footer/instagram.svg";
import x from "../../../public/images/Footer/x.svg";
import youtube from "../../../public/images/Footer/youtube.svg";

const sections = [
  {
    title: "Fundraise",
    items: [
      { name: "How to start a campaign", link: "/how-it-works" },
      { name: "Fundraising categories", link: "/browse" },
      { name: "Blog", link: "/blog" },
    ],
  },
  {
    title: "Donate",
    items: [
      { name: "Explore campaigns", link: "/browse" },
      { name: "Newsroom", link: "/about" },
    ],
  },
  {
    title: "About",
    items: [
      { name: "About Finable", link: "/about" },
      { name: "Pricing", link: "/pricing" },
      { name: "Terms and conditions", link: "/about" },
    ],
  },
];

const items = [
  {
    name: "Instagram",
    icon: instagram,
    link: "https://instagram.com",
  },
  {
    name: "X (Twitter)",
    icon: x,
    link: "https://twitter.com",
  },
  {
    name: "YouTube",
    icon: youtube,
    link: "https://youtube.com",
  },
];

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-bl from-green-50 to-white font-sans text-green-500 px-2">
      <div className="max-w-[1200px] flex flex-col lg:flex-row mx-auto border-b-1 border-gray-800 pb-6 pt-10 gap-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-14 flex-1">
          {sections.map((section, index) => (
            <div key={index}>
              <h6 className="font-bold font-sans pt-2 mb-3 text-xl">
                {section.title}
              </h6>
              <ul>
                {section.items.map((item, i) => (
                  <li key={i}>
                    <Link
                      href={item.link}
                      className="py-1 text-green-700 hover:text-gray-600 duration-300 cursor-pointer transition-colors text-[16px] block"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="lg:ml-auto pt-4 lg:pt-2 min-w-fit flex flex-col justify-end items-end">
          <p className="font-bold ">
            Subscribe to our newsletter to stay updated
          </p>

          <form className="text-gray-800 flex flex-col py-1 sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter email address"
              className="flex-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
            <button
              type="submit"
              className="p-1 px-6 bg-green-500 text-white rounded-md hover:bg-green-700 transition-colors duration-300 font-semibold"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="flex flex-col max-w-[1240px] px-2 pt-4 pb-8 mx-auto justify-between sm:flex-row items-center">
        <p className="py-2 text-sm font-medium text-gray-600">
          © 2025 Finable. All rights reserved.
        </p>
        <div className="flex gap-3">
          {items.map((socialIcon, i) => (
            <a
              key={i}
              href={socialIcon.link}
              className="py-2 px-2 hover:opacity-70 transition-opacity duration-300"
              aria-label={`Visit our ${socialIcon.name} page`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
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
