"use client";
import Link from 'next/link';
import React from 'react';
import { navitems } from './../Schemas/index';
import { signOut, useSession } from 'next-auth/react';
import { Leaf, ShoppingBag, User, Wind } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from './ui/dropdown-menu';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Navbar = () => {
    const { data: session } = useSession();
    const pathName = usePathname();

    return (
        <>
            {pathName !== "/login" ? (
                <nav className='shadow'>
                    <Link href="/" className='logo'>
                        <motion.span style={{ color: 'green', display: 'inline-block' }} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}>Eco</motion.span>
                        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>Cart</motion.span>
                    </Link>
                    <ul className='sm:flex hidden navitems shadow-inner'>
                        {navitems.map((navitem, i) => (
                            <motion.li key={i} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <Link href={navitem.path}>{navitem.name}</Link>
                            </motion.li>
                        ))}
                    </ul>
                    <div className="navside">
                        {session?.user ? (
                            <div className='flex items-center justify-center gap-6'>
                                <Link href="/cart" className='flex gap-2'><ShoppingBag />0</Link>
                                <DropdownMenu>
                                    <DropdownMenuTrigger className='outline-none'>
                                        <motion.span className='loginbtn shadow-inner' whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                            <Image src={session.user.image} style={{ borderRadius: '50%' }} height={35} width={35} />
                                            {session?.user?.name}
                                        </motion.span>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className='p-0 rounded-xl relative top-6 right-1'>
                                        <div className='profiledrop'>
                                            <Link className='flex items-center gap-2' href="/profile"><User />My Profile</Link>
                                            <button className='flex items-center gap-2' onClick={() => signOut()}><Wind />Logout</button>
                                        </div>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        ) : (
                            <Link href="/login" className='loginbtn shadow-inner'><Leaf size={18} />Login</Link>
                        )}
                    </div>
                </nav>
            ) : null}
        </>
    );
};

export default Navbar;
