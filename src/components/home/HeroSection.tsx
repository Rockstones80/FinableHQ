import React from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "../ui/Button";
import TypeIt from "typeit-react";
import education from "../../../public/images/hero/hero_section.jpg";
import { GraduationCap, Heart } from "lucide-react";

const Hero: React.FC = () => {
  return (
    <div className="px-20 py-7">
      <div className="justify-center items-center flex flex-col">
        <TypeIt
          options={{
            speed: 120,
            waitUntilVisible: true,
            lifeLike: true,
            cursor: true,
            cursorChar: "|",
          }}
          className="text-5xl font-extrabold text-center mt-16 mb-8 max-w-[600px] [&_.ti-cursor]:text-green-600"
        >
          Empower Your Education <br /> with{" "}
          <span className="text-green-600">Finable today.</span>
        </TypeIt>
        <p className="text-center mb-6 font-medium text-gray-600">
          Welcome to Finable, where your educational dreams become a reality.
          Start your campaign now <br /> and connect with generous donors ready
          to support your journey.
        </p>
        <div className="flex gap-6 text-sm">
          <Link href="/auth/login">
            <Button
              title="Start Campaign"
              type="button"
              icon={<GraduationCap className="w-4 h-4" />}
              className="bg-primary py-[9px] px-6 text-white bg-green-600 cursor-pointer font-semibold shadow-md rounded-sm transition-transform hover:-translate-y-1 flex justify-center items-center"
            />
          </Link>
          <Link href="/donate">
            <Button
              title="Donate"
              type="button"
              icon={<Heart className="w-4 h-4" />}
              className="ring-1 ring-green-600 py-[9px] px-6 cursor-pointer shadow-md font-semibold rounded-sm transition-transform hover:-translate-y-1 text-gray-600 flex justify-center items-center"
            />
          </Link>
        </div>
        <div className="w-4/5 mt-12">
          <Image
            src={education}
            alt="Education Empowerment"
            className="rounded-sm"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
