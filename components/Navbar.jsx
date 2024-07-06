"use client"
import Link from 'next/link'
import React from 'react'
import { navitems } from './../Schemas/index';
import { signOut, useSession } from 'next-auth/react';
import { Leaf, ShoppingBag, User, Wind } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { DropdownMenu,DropdownMenuContent,DropdownMenuTrigger } from './ui/dropdown-menu';
import Image from 'next/image';

const Navbar = () => {

    const {data:session} = useSession();
    const pathName = usePathname();

  return (
    <>
    {pathName!=="/login" ?
        <nav className='shadow'>
        <Link href="/" className='logo'><span style={{color:'green'}}>Eco</span>Cart</Link>
        <ul className='sm:flex hidden navitems shadow-inner'>
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
                <DropdownMenu>
                    <DropdownMenuTrigger className='outline-none'><span className='loginbtn shadow-inner'><Image src={session.user.image} style={{borderRadius:'50%'}} height={35} width={35}/>{session?.user?.name}</span></DropdownMenuTrigger>
                    <DropdownMenuContent className='p-0 rounded-xl relative top-6 right-1'>
                        <div className='profiledrop'>
                            <Link className='flex items-center gap-2' href="/profile"><User/>My Profile</Link>
                            <button className='flex items-center gap-2' onClick={()=>signOut()}><Wind/>Logout</button>
                        </div>
                        
                    </DropdownMenuContent>
                </DropdownMenu>
            </div> :
            <Link href="/login" className='loginbtn shadow-inner'><Leaf size={18}/>Login</Link>}
        </div>
    </nav> : null}
    </>
  )
}

export default Navbar