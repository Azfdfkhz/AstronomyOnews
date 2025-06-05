import React from 'react'
import gsap from "gsap"
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import AnimatedTitle from './AnimatedTitle';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    useGSAP(() => {
        const clipAnimation = gsap.timeline({
            scrollTrigger: {
                trigger:"#clip",
                start: "center center",
                end: "+=800 center",
                scrub: 0.5,
                pin: true,
                pinSpacing: true,
            }
        });

        clipAnimation.to(".mask-clip-path",{
            width: "100vw",
            height: "100vh",
            borderRadius: 0,
        });
    });

  return (
    <div id='about' className='min-h-screen w-screen bg-violet-200'>
        <div className='relative mb-8 mt-36 flex flex-col items-center gap-5'>
            <p className='font-general text-sm uppercase md:text-[10px]'>
                welcome to space
            </p>

            <AnimatedTitle 
                title="Expl<b>o</b>re the majesty <br />of the<b> M</b>ilky Way galaxy"
                containerClass="mt-5 !text-black text-center"
            />

            <div className='about-subtext'>
                <p>
                    Milky way
                </p>
                <p className='text-gray-500'>
                    Galaxy
                </p>
            </div>
        </div>
        <div id='clip' className='h-dvh w-screen'>
            <div className='mask-clip-path about-image'>
                <img 
                src="img/about.jpg" 
                alt="Bacground"
                className='absolute left-0 top-0 w-full h-full object-cover'
                />
            </div>

        </div>
    </div>
  )
}

export default About
