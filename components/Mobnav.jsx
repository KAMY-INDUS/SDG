"use client"
import { House, Info, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Mobnav = () => {

  const pathName = usePathname();

  return (
    <>
    {pathName!=="/login" && <div className="mobnav">
        <Link href="home"><span className="flex flex-col items-center justify-center"><House/>Home</span></Link>
        <Link href="about"><span className="flex flex-col items-center justify-center"><Info/>About</span></Link>
        <Link href="/order"><span className="flex flex-col items-center justify-center"><ShoppingCart/>Order</span></Link>
    </div>}
    </>
  )
}

export default Mobnav