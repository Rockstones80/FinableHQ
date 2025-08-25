"use client";

import React from "react";
import Image from "next/image";
import easy_setup from "../../../public/images/Discover/easy_setup.jpeg";
import secure_payment from "../../../public/images/Discover/secure_payment.jpeg";
import transparent_donation from "../../../public/images/Discover/transparent_donation.jpeg";

const features = [
  {
    image: easy_setup,
    name: "Easy campaign setup",
    description:
      "Start your campaign in just a few minutes with our intuitive setup process",
  },
  {
    image: transparent_donation,
    name: "Transparent donation tracking",
    description:
      "Track every donation with real-time reporting and complete transparency",
  },
  {
    image: secure_payment,
    name: "Secure payment system",
    description:
      "Experience peace of mind with our robust, encrypted payment system",
  },
];

const Discover: React.FC = () => {
  return (
    <div className=" px-20 flex flex-col justify-center items-center my-16">
      <div className=" text-center">
        <p className="text-5xl font-extrabold mb-4">
          Discover the Features of{" "}
          <span className="text-green-600">Finable</span>
        </p>
        <p className=" font-medium text-gray-600 mb-16">
          Finable offers innovative solutions to help students secure funding
          for their education. Our <br /> platform is designed to make the
          fundraising process seamless and effective.
        </p>
      </div>

      <div className="flex justify-between gap-12">
        <ul className="flex justify-between gap-12">
          {features.map((feature, index) => {
            return (
              <li key={index} className="">
                <div className="py-4 px-2 h-full w-full max-w-80 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 pb-10 ">
                  <div className="h-52 mb-8 rounded-t-lg ">
                    <Image
                      src={feature.image}
                      alt={feature.name}
                      className=" w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="font-extrabold text-2xl text-center pb-2 text-gray-800">
                    {feature.name}
                  </h3>
                  <p className="text-sm text-center text-gray-600 leading-relaxed font-medium px-5">
                    {feature.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Discover;
