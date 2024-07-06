import React from 'react'
import Image from 'next/image';
import { Mail, Phone } from 'lucide-react';
import Link from 'next/link';

const About = () => {
  return (
    <section id='about'>
        <span style={{fontSize:26,fontWeight:600}}>About</span>
        <div className="cards">
            <span className='creatorhead'>Creators</span>
            <div className="card shadow-lg">
                <div className="cardtop">
                    <Image src="/abiprof.jpg" className="userimg" height={1000} width={1000}/>
                    <div className='flex flex-col'>
                        <span style={{fontSize:20,fontWeight:'bold'}}>Abinav Nagarajan</span>
                        <span style={{fontSize:16,fontStyle:'italic'}}>23BLC1118</span>
                    </div>
                </div>
                <span className='flex gap-2 items-center'><Phone size={18}/><Link href="tel:9150055005">91+ 9150055005</Link></span>
                <span className='flex gap-2 items-center'><Mail size={18}/><Link href="mailto:abinav.n2023@vitstudent.ac.in">abinav.n2023@vitstudent.ac.in</Link></span>
            </div>
            <div className="card shadow-lg">
                <div className="cardtop">
                    <Image src="/yashprof.jpg" className="userimg" height={1000} width={1000}/>
                    <div className='flex flex-col'>
                        <span style={{fontSize:20,fontWeight:'bold'}}>Yashvanth Karunakaran</span>
                        <span style={{fontSize:16,fontStyle:'italic'}}>23BAI1589</span>
                    </div>
                </div>
                <span className='flex gap-2 items-center'><Phone size={18}/><Link href="tel:9025242514">91+ 9025242514</Link></span>
                <span className='flex gap-2 items-center'><Mail size={18}/><Link href="mailto:yashvanth.2023@vitstudent.ac.in">yashvanth.2023@vitstudent.ac.in</Link></span>
            </div>
        </div>
        <div className="cards">
            <span className='goals'>Goals</span>
            <div className="goalcard shadow-lg">
                <span className='goalhead'>🎯SDG 9</span>
                <div className="goalcon">
                    <span style={{fontSize:18,fontWeight:'bolder'}}>Industry, Innovation and Infrastructure</span>
                    <span><span className='font-semibold'>Establishment:</span> 2015</span>
                    <span><span className='font-semibold'>Mission:</span> Build resilient infrastructure, promote inclusive and sustainable industrialization, and foster innovation</span>
                </div>
            </div>
            <div className="goalcard shadow-lg">
                <span className='goalhead'>🎯SDG 12</span>
                <div className="goalcon">
                    <span style={{fontSize:18,fontWeight:'bolder'}}>Responsible Consumption & Production</span>
                    <span ><span className='font-semibold'>Establishment:</span> 2015</span>
                    <span><span className='font-semibold'>Mission:</span> Ensure sustainable consumption and production patterns</span>
                </div>
            </div>
        </div>
    </section>
  )
}

export default About