"use client";
import { HandCoins, ShoppingBasket, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import { TypeAnimation } from 'react-type-animation';

const Home = () => {
  return (
    <section id='home'>
        <span className='font-semibold' style={{fontSize:32}}>Welcome to <span style={{color:'green'}}>Eco</span>Cart</span>
        <TypeAnimation
      sequence={[
        'Explore sustainable shopping.',
        1000,
        'Shop for the planet.',
        1000,
        'Join our eco movement.',
        1000,
      ]}
      wrapper="span"
      speed={40}
      style={{ fontSize: '1.2rem', display: 'inline-block' }}
      repeat={Infinity}
    />
    <div className="homebtns">
        <Link className='justify-center homebtn shadow-inner h-14 w-36' href="/order"><ShoppingCart/>Order</Link>
        <Link className='justify-center homebtn shadow-inner h-14 w-36' href="/upload"><HandCoins/>Sell</Link>
    </div>
    </section>
  )
}

export default Home