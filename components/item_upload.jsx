"use client";
import React, { useState } from 'react';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import { useSession } from "next-auth/react";
import {doc,setDoc,serverTimestamp, addDoc,collection,getDoc} from 'firebase/firestore'
import { firestore,imgDb } from './../app/api/firebase/route';

const FileUpload = () => {
    const [imgname, setImgname] = useState('');
    const [img, setImg] = useState(null);
    const [imgurl, setUrl] = useState('');  
    const [description, setDescription] = useState(''); 
    const send = async () => {
    const uniqueImgName = v4();
    setImgname(uniqueImgName);
    const imgRef = storageRef(imageDb, 'files/' + uniqueImgName);
    const username=session.user.name;
    await uploadBytes(imgRef, img);
    const url = await getDownloadURL(imgRef);
    setUrl(url); 
    const userUploadsRef = collection(firestore,'/users/'+username+'/posts');
    const data={
    img : url,
    likes :0,
    comment : 0,
    timestamp: serverTimestamp(),
    username: session.user.name,
    description : "Noting interestinhello"
  }
  try {
    await addDoc(userUploadsRef, data);
  } catch (error) {
    throw(error)
  }
    
  };

  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        <input type="file" onChange={(e) => { setImg(e.target.files[0]); }} />
        <button onClick={send}>Upload</button>
        <p>{imgurl}</p>
      </div>
    );
  } else {
    return <h1>Hello</h1>;
  }
};

export default FileUpload;
