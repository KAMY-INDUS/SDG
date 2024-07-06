import React, { useState } from 'react';
import { ref as storageRef, uploadBytes, getDownloadURL, ref } from 'firebase/storage';
import { v4 } from 'uuid';
import { useSession } from "next-auth/react";
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { database, firestore, storage } from './../app/api/firebase/route';
import { BadgeIndianRupee, SquareGanttChart, SquarePen } from 'lucide-react';


const FileUpload = () => {
  const [detail,setDetail] = useState({name:"",desc:"",category:"",price:0})
  const [img, setImg] = useState("");
  const value = collection(database,"products");
  const { data: session } = useSession();

  const handleChange = (e) =>{
    setDetail({...detail,[e.target.name]:e.target.value});
  }

  const handleImageUpload = (e) =>{
    const imgRef = ref(storage,`images/${v4()}`);
    uploadBytes(imgRef,e.target.files[0]).then(data=>{
      getDownloadURL(data.ref).then(value=>{
        setImg(value);
      })
    })
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();
    if(img){
      await addDoc(value,{
        name:detail.name,
        desc:detail.desc,
        category:detail.category,
        price:detail.price,
        likes:0,
        image:img,
        username:session?.user?.name,
        email:session?.user?.email
      });
      setDetail({name:"",desc:"",category:"",price:0});
      setImg('');
    }else{
      alert("Image is Still Uploading. Please Wait...")
    }
  }

  if (session) {
    return (
      <div className='form shadow-inner'>
        <h2 style={{ fontSize: 24,fontWeight:'bold' }}>Upload Product Details</h2>
        <form onSubmit={handleSubmit} className='itemform'>
          <div className='input'>
            <SquareGanttChart />
            <input type="text" name="name" id="itemName" value={detail.name} onChange={handleChange} required  placeholder='Product Name' />
          </div>
          <div className='input'>
            <input type="file" id="itemImage" onChange={handleImageUpload} accept="image/*" required />
          </div>
          <div className='input'>
            <SquarePen className='relative -top-9'/>
            <textarea name='desc' rows={4} id="description" value={detail.desc} onChange={handleChange} required  placeholder='Product Description' />
          </div>
          <div className='input'>
            <BadgeIndianRupee />
            <input name="price" type="text" id="price" value={detail.price===0?"":detail.price} onChange={handleChange} required  placeholder='Product Price' />
          </div>
          <div>
            <select className="input" id="typeOfSelling"  name="category" value={detail.category} onChange={handleChange} required >
              <option value="" disabled>Select Product Category</option>
              <option value="recyclable-waste">Recyclable Waste</option>
              <option value="recycled-product">Recycled Product</option>
            </select>
          </div>
          <button type="submit" className='shadow-inner formsubmitbtn' >Upload</button>
        </form>
        {img && (
          <div style={{ marginTop: '20px' }}>
            <h3>Uploaded Image Preview:</h3>
            <img src={img} alt="Uploaded Item" style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '8px' }} />
          </div>
        )}
      </div>
    );
  } else {
    return <h1>Please log in to upload items</h1>;
  }
};

export default FileUpload;
