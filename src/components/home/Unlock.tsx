"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "../ui/Button";
// import { GraduationCap, Users } from "lucide-react";
import graduating_picture from "../../../public/images/Unlock/graduating_picture.jpg";

const Unlock = () => {
  return (
    <div className="bg-gradient-to-br from-green-50 to-white relative overflow-hidden mb-10">


      <div className=" px-20 flex justify-center items-center gap-16 mt-10 mb-10">
        <div className=" flex flex-col justify-center gap-8  w-1/2">
            <p className="font-extrabold text-5xl">Unlock Opportunities: <br /> Benefits for <span className="text-green-600">Students</span> and <span className="text-green-600"> Donors</span></p>
            <p className="text-gray-600 font-medium">Finable enables students to achieve their educational aspirations by linking them with generous benefactors. Donors not only impact students&apos; lives positively but also have the opportunity to receive tax advantages for their donations.</p>
            <div className=" flex gap-6 justify-start items-center font-semibold ">
                <Link href="/auth/login">
                <Button
                className=" text-gray-600"
                >
                  Learn More
                </Button>
                </Link>
            <div className="flex justify-center items-end gap-2 cursor-pointer text-sm">
                <Link href="/donate">
                <Button
                  className=" text-gray-600 "
                >
                  Sign Up
                </Button>
                </Link>
                <div className=" animate-pulse">
                
                </div>
            </div>
            </div>
        </div>


        <div className="w-1/2 h-1/2 ml-auto">
            <Image src={graduating_picture} alt="graduating picture" className="object-cover rounded-2xl w-full h-96 shadow-xl"/>
          </div>
    </div>
    </div>
  );
};

export default Unlock;