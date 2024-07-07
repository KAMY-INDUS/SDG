"use client"
import Image from "next/image";
import Home from './../components/Home';
import About from './../components/About';
import ProductsComponent from './../components/productComponent';
import Video from './../components/Video';
import { useEffect, useState } from "react";
import Load from './../components/Load';
import Footer from './../components/Footer';

export default function page() {
  const [loader,setLoader]=useState(false);
  useEffect(()=>{
    const fetchLoad=()=>{
        setTimeout(()=>{
            setLoader(true);
        },1000)
    }
    fetchLoad();
  },[])
  return (
    <>
    {loader?<>
    <Home />
    <About/>
    <ProductsComponent />
    <Video/>
    <Footer /></>:<Load/>}
    </>
  );
}
