import React from 'react'
import { FaAndroid } from "react-icons/fa6";

const Footer = () => {
  return (
    <section id="footer">
        <div className="flex flex-col items-center justify-center">
            <span>Copyright © EcoCart</span>
            <span>Created by Abinav & Yashvanth</span>
            <span className="flex gap-2 items-center justify-center"><FaAndroid size={54} color={"#3DDC84"}/><p>Android Club WebWorks Hackathon</p></span>
        </div>
    </section>
  )
}

export default Footer
