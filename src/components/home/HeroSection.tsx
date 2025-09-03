import React from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "../ui/Button";
import TypeIt from "typeit-react";
import education from "../../../public/images/hero/hero_section.jpg";
import { GraduationCap, Heart } from "lucide-react";

const Hero: React.FC = () => {
  return (
    <>
      <section className="relative lg:hidden w-full h-[70vh] overflow-hidden">
        <Image
          src={education}
          alt="Education Empowerment"
          fill
          priority
          sizes="100vh"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-white">
          <TypeIt
            options={{
              speed: 120,
              waitUntilVisible: true,
              lifeLike: true,
              cursor: true,
              cursorChar: "|",
            }}
            className="text-4xl sm:text-5xl font-extrabold text-center mb-3 max-w-[30rem] [&_.ti-cursor]:text-green-400 pt-12 sm:pt-0"
          >
            Empower Your Education <br /> with{" "}
            <span className="text-green-400">Finable today.</span>
          </TypeIt>
          <p className="text-center mb-5 text-white/90  max-w-[25rem] font-medium">
            Welcome to Finable, where your educational dreams become a reality.
            Start your campaign now and connect with generous donors ready to
            support your journey.
          </p>
          <div className="flex gap-3 w-full max-w-xs">
            <Link href="/auth/login">
              <Button
                title="Start Campaign"
                type="button"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg py-3 px-6 shadow-md transition-transform hover:-translate-y-0.5 flex justify-center items-center"
              />
            </Link>
            <Link href="/donate">
              <Button
                title="Donate"
                type="button"
                icon={<Heart className="w-4 h-4" />}
                className="w-full bg-white text-gray-700 border border-green-600 hover:border-green-700 font-semibold rounded-lg py-3 px-6 shadow-md transition-transform hover:-translate-y-0.5 flex justify-center items-center"
              />
            </Link>
          </div>

        </div>
      </section>

      {/* Desktop (lg+): full-bleed background with overlay, keep original content styles */}
      <section className="relative hidden lg:block w-full h-screen overflow-hidden">
        <Image
          src={education}
          alt="Education Empowerment"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-20">
          <TypeIt
            options={{
              speed: 120,
              waitUntilVisible: true,
              lifeLike: true,
              cursor: true,
              cursorChar: "|",
            }}
            className="text-white text-6xl font-extrabold text-center mt-10 mb-6 max-w-[800px] [&_.ti-cursor]:text-green-400"
          >
            Empower Your Education <br /> with{" "}
            <span className="text-green-600">Finable today.</span>
          </TypeIt>
          <p className="text-center mb-6 font-medium text-white/90">
            Welcome to Finable, where your educational dreams become a reality.
            Start your campaign now <br /> and connect with generous donors
            ready to support your journey.
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
                className="ring-1 bg-white ring-green-600 py-[9px] px-6 cursor-pointer shadow-md font-semibold rounded-sm transition-transform hover:-translate-y-1  text-green-600 flex justify-center items-center"
              />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
