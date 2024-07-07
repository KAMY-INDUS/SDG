"use client"
import React, { useEffect, useState } from 'react'

const Load = () => {
    const [disappear,setDisappear]=useState(false);
    useEffect(()=>{
        const fetchLoad=()=>{
            setTimeout(()=>{
                setDisappear(true);
            },1500)
        }
        fetchLoad();
    },[])
  return (
    <div className="loadsrc">
        <div className="loadcon">
        <div className="vechicle">
            {disappear?<span style={{fontWeight:"700"}}>E C O</span>:<span className='veh'>ECO</span>}
            {disappear?null:<span className='icle'>NOMY</span>}
        </div>
        {disappear?null:<span className='plus'>+</span>}
        <div className="communicate">
               {disappear?null:<span className='commu'>SHOPPING</span>}
         {disappear?<span style={{fontWeight:"700"}}>C A R T</span>:<span className='nicate'>CART</span>}
        </div>
        </div>
    </div>
  )
}

export default Load