"use client"
import { Leaf } from "lucide-react";
import { getProviders,signIn, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Image from 'next/image';
import { useRouter } from "next/navigation";


const Login = () => {
    const router = useRouter();
    const {data:session} = useSession();
    const [providers, setProviders] = useState(null);
    
    if(session){
        router.push("/")
    }
  
    useEffect(() => {
      const setUpProviders = async () => {
        const res = await getProviders();
        setProviders(res);
      };
      setUpProviders();
    }, []);
    return <section id='login' className="gap-6">
      <span className="flex items-center justify-center gap-2 font-semibold" style={{fontSize:28}}>Login in <Leaf size={20}/>EcoCart</span>
      {providers && Object.values(providers).map(provider=>(
          <button className="loginbtn shadow-inner" key={provider.id} onClick={()=>signIn(provider.id)}><Image src="/google.png" height={30} width={30}/>Sign In With {provider.name}</button>
  
      ))}
    </section>
  };

export default Login