"use client"
import Link from 'next/link'
import React from 'react'
import { navitems } from './../Schemas/index';
import { signOut, useSession } from 'next-auth/react';
import { Leaf, ShoppingBag, Wind } from 'lucide-react';
import { usePathname } from 'next/navigation';

const Navbar = () => {

    const {data:session} = useSession();
    const pathName = usePathname();

  return (
    <>
    {pathName!=="/login" ?<nav className='shadow'>
        <Link href="/" className='logo'><span style={{color:'green'}}>Eco</span>Cart</Link>
        <ul className='navitems shadow-inner'>
            {
                navitems.map((navitem,i)=>(
                    <li className="navitem" key={i}>
                        <Link href={navitem.link}>{navitem.name}</Link>
                    </li>
                ))
            }
        </ul>
        <div className="navside">
            {session?.user ?
            <div className='flex items-center justify-center gap-6'>
                <span className='flex gap-2'><ShoppingBag/>0</span>
                <button className='loginbtn shadow-inner' onClick={()=>signOut()}>Logout<Wind/></button>
            </div> :
            <Link href="/login" className='loginbtn shadow-inner'><Leaf size={18}/>Login</Link>}
        </div>
    </nav> : null}
    </>
  )
}

export default Navbar