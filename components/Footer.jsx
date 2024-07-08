import React from 'react'
import { FaAndroid } from "react-icons/fa6";

const Footer = () => {
  return (
    <section id="footer">
        <div className="flex flex-col items-center justify-center">
            <span><FaAndroid size={54} color={"#3DDC84"}/></span>
            <span>Copyright © EcoCart</span>
            <span>Created by Abinav & Yashvanth</span>
        </div>
    </section>
  )
}

export default Footer
