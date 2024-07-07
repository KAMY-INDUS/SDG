import React from 'react'
import { Dialog,DialogTrigger,DialogContent } from './ui/dialog';
import { Github, Linkedin, UserPlus } from 'lucide-react'
import Link from 'next/link';

const Followus = () => {
  return (
    <Dialog>
        <DialogTrigger>
            <span className='followbtn'><UserPlus/>Follow us</span>
        </DialogTrigger>
        <DialogContent className='p-0'>
            <div className='dialog'>            
            <div className="dialogitem">
                <span className='font-bold' style={{fontSize:22}}>Follow Abinav</span>
                <div className="followitems">
                    <Link href='https://github.com/NAbinav' className="followitem" style={{backgroundColor:'black',color:'white'}}><Github/>Follow on Github</Link>
                    <Link href="https://www.linkedin.com/in/abinav-n-abb995292/" className="followitem" style={{backgroundColor:'#0072b1',color:'white'}}><Linkedin/>Follow on LinkedIn</Link>
                </div>
            </div>
            <div className='dialogitem'>
                <span className='font-bold' style={{fontSize:22}}>Follow Yashvanth</span>
                <div className="followitems">
                    <Link href='https://github.com/Yashvanthk05' className="followitem" style={{backgroundColor:'black',color:'white'}}><Github/>Follow on Github</Link>
                    <Link href="https://www.linkedin.com/in/yashvanth-karunakaran-35288828b/" className="followitem"  style={{backgroundColor:'#0072b1',color:'white'}}><Linkedin/>Follow on LinkedIn</Link>
                </div>
            </div>
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default Followus