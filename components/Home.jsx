"use client";
import { userdb } from '@/app/api/firebase/route';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { HandCoins, ShoppingBasket, ShoppingCart } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import NumberTicker from './magicui/number-ticker';
import Image from 'next/image';
import FallingLeaves from './Fallingleaves';

const Home = () => {

  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      const userProfileRef = doc(userdb, 'users', session.user.name, 'profile', 'info');

      const addUser = async () => {
        try {
          const docSnap = await getDoc(userProfileRef);

          if (!docSnap.exists()) {
            console.log('No such document! Adding user profile...');
            await setDoc(userProfileRef, {
              name: session.user.name,
              email: session.user.email,
              likes: [],
              cart: [],
            });
            console.log('User profile added successfully');
          } else {
            console.log('User profile already exists');
          }
        } catch (error) {
          console.error('Error adding user profile: ', error);
        }
      };
      addUser();
    }
  }, [session]);

  return (
    <section id='home'>
      <FallingLeaves/>
      <Image src="/bg.avif" height={100000} width={100000} className="homebg"/>
      <span className='font-semibold' style={{ fontSize: 32 }}>
        Welcome to <span style={{ color: 'green' }}>Eco</span>Cart
      </span>
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
        <Link className='justify-center homebtn shadow-inner h-14 w-36' href="/order">
          <ShoppingCart />Order
        </Link>
        <Link className='justify-center homebtn shadow-inner h-14 w-36' href="/upload">
          <HandCoins />Sell
        </Link>
      </div>
      <div className="homecount">
        <span style={{ fontWeight: 'bold' }}>Customers <NumberTicker value={20} />+</span>
        <span style={{ fontWeight: 'bold' }}>Products <NumberTicker value={50} />+</span>
      </div>
    </section>
  );
};

export default Home;
