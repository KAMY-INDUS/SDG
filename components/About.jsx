"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import Link from "next/link";
import GaugeCircle from "./magicui/gauge-circle";
import { SiNextdotjs } from "react-icons/si";
import OrbitingCircles from "./magicui/orbiting-circles";
import { RiFirebaseFill } from "react-icons/ri";
import { TbBrandThreejs } from "react-icons/tb";
import { RxVercelLogo } from "react-icons/rx";
import { motion } from "framer-motion";

const About = () => {
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);

  useEffect(() => {
    const handleIncrement1 = (prev) => {
      if (prev === 100) {
        return 100;
      }
      return prev + 5;
    };

    const handleIncrement2 = (prev) => {
      if (prev === 80) {
        return 80;
      }
      return prev + 5;
    };

    setValue1(handleIncrement1);
    setValue2(handleIncrement2);
    const interval = setInterval(() => {
      setValue1(handleIncrement1);
      setValue2(handleIncrement2);
    }, 250);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.span style={{ fontSize: 26, fontWeight: 600 }}>About</motion.span>
      <motion.div className="cards">
        <span className="creatorhead">Creators</span>
        <motion.div className="card shadow-lg" initial={{translateY:100,filter:'blur(10px)'}} whileInView={{translateY:0,filter:'blur(0)'}} whileHover={{ scale: 1.05 }}>
          <div className="cardtop">
            <Image
              src="/abiprof.jpg"
              className="userimg"
              height={1000}
              width={1000}
            />
            <div className="flex flex-col">
              <span style={{ fontSize: 20, fontWeight: "bold" }}>
                Abinav Nagarajan
              </span>
              <span style={{ fontSize: 16, fontStyle: "italic" }}>
                23BLC1118
              </span>
            </div>
          </div>
          <span className="flex gap-2 items-center">
            <Phone size={18} />
            <Link href="tel:9150055005">91+ 9150055005</Link>
          </span>
          <span className="flex gap-2 items-center">
            <Mail size={18} />
            <Link href="mailto:abinav.n2023@vitstudent.ac.in">
              abinav.n2023@vitstudent.ac.in
            </Link>
          </span>
        </motion.div>
        <motion.div className="card shadow-lg" initial={{translateY:100,filter:'blur(10px)'}} whileInView={{translateY:0,filter:'blur(0)'}} whileHover={{ scale: 1.05 }}>
          <div className="cardtop">
            <Image
              src="/yashprof.jpg"
              className="userimg"
              height={1000}
              width={1000}
            />
            <div className="flex flex-col">
              <span style={{ fontSize: 20, fontWeight: "bold" }}>
                Yashvanth Karunakaran
              </span>
              <span style={{ fontSize: 16, fontStyle: "italic" }}>
                23BAI1589
              </span>
            </div>
          </div>
          <span className="flex gap-2 items-center">
            <Phone size={18} />
            <Link href="tel:9025242514">91+ 9025242514</Link>
          </span>
          <span className="flex gap-2 items-center">
            <Mail size={18} />
            <Link href="mailto:yashvanth.2023@vitstudent.ac.in">
              yashvanth.2023@vitstudent.ac.in
            </Link>
          </span>
        </motion.div>
      </motion.div>
      <motion.div className="cards">
        <span className="goals">Goals</span>
        <motion.div className="goalcard shadow-lg" initial={{translateY:100,filter:'blur(10px)'}} whileInView={{translateY:0,filter:'blur(0)'}} whileHover={{ scale: 1.05 }}>
          <span className="goalhead">🎯SDG 9</span>
          <div className="goalcon">
            <span style={{ fontSize: 18, fontWeight: "bolder" }}>
              Industry, Innovation and Infrastructure
            </span>
            <span>
              <span className="font-semibold">Establishment:</span> 2015
            </span>
            <span>
              <span className="font-semibold">Mission:</span> Build resilient
              infrastructure, promote inclusive and sustainable industrialization,
              and foster innovation
            </span>
          </div>
        </motion.div>
        <motion.div className="goalcard shadow-lg" initial={{translateY:100,filter:'blur(10px)'}} whileInView={{translateY:0,filter:'blur(0)'}} whileHover={{ scale: 1.05 }}>
          <span className="goalhead">🎯SDG 12</span>
          <div className="goalcon">
            <span style={{ fontSize: 18, fontWeight: "bolder" }}>
              Responsible Consumption & Production
            </span>
            <span>
              <span className="font-semibold">Establishment:</span> 2015
            </span>
            <span>
              <span className="font-semibold">Mission:</span> Ensure sustainable
              consumption and production patterns
            </span>
          </div>
        </motion.div>
      </motion.div>
      <motion.div className="cards">
        <span className="goals">Why EcoCart</span>
        <motion.div className="goalcard shadow-lg" initial={{translateY:100,filter:'blur(10px)'}} whileInView={{translateY:0,filter:'blur(0)'}} whileHover={{ scale: 1.05 }}>
          <span className="goalhead">Eco Friendly</span>
          <GaugeCircle
            max={100}
            min={0}
            value={value1}
            gaugePrimaryColor="lightgreen"
            gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
          />
        </motion.div>
        <motion.div className="goalcard shadow-lg" initial={{translateY:100,filter:'blur(10px)'}} whileInView={{translateY:0,filter:'blur(0)'}} whileHover={{ scale: 1.05 }}>
          <span className="goalhead">Encryption</span>
          <GaugeCircle
            max={100}
            min={0}
            value={value2}
            gaugePrimaryColor="lightgreen"
            gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
          />
        </motion.div>
      </motion.div>
      <motion.div
        className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg  bg-background"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <span
          className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-green to-gray-300 bg-clip-text text-center text-6xl font-semibold leading-none text-transparent dark:from-white dark:to-black"
          style={{ width: "min-content" }}
        >
          Techstack Used
        </span>

        <OrbitingCircles
          className="size-[30px] border bg-transparent"
          duration={20}
          delay={20}
          radius={80}
        >
          <SiNextdotjs size={64} />
        </OrbitingCircles>
        <OrbitingCircles
          className="size-[30px] border-none bg-transparent"
          duration={20}
          delay={10}
          radius={80}
        >
          <RiFirebaseFill size={72} />
        </OrbitingCircles>

        <OrbitingCircles
          className="size-[50px] border bg-transparent"
          radius={190}
          duration={20}
          reverse
        >
          <TbBrandThreejs size={54} />
        </OrbitingCircles>
        <OrbitingCircles
          className="size-[50px] border bg-transparent"
          radius={190}
          duration={20}
          delay={20}
          reverse
        >
          <RxVercelLogo size={54} />
        </OrbitingCircles>
      </motion.div>
    </motion.section>
    
  );
};

export default About;
