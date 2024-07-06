import { ListFilter } from 'lucide-react'
import React from 'react'

const Order = () => {
  return (
    <section id='order'>
        <span className='font-semibold' style={{fontSize:26}}>Order</span>
        <div>
            <span className='flex justify-center items-center gap-2 shadow-inner p-2 rounded-md' style={{backgroundColor:'whitesmoke'}}><ListFilter size={18}/>Filter</span>
        </div>
    </section>
  )
}

export default Order