"use client"
import { collection, deleteDoc, doc, onSnapshot, query } from 'firebase/firestore';
import { Mail, Trash2, User } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { firestore } from './../firebaseConfig';

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) return;
    
    const userPostsRef = collection(firestore, "products");
    const q = query(userPostsRef);
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedPosts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(fetchedPosts);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching posts: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [session]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleDelete = async (id) => {
    try {
      const postRef = doc(firestore, "products", id);
      await deleteDoc(postRef);
    } catch (error) {
      console.error("Error deleting post: ", error);
    }
  }

  const filteredPosts = posts.filter(post => post.username === session?.user?.name);

  return (
    <section id='profile'>
      <span className='font-bold' style={{ fontSize: 24 }}>My Profile</span>
      <Image src={session?.user?.image} height={2000} width={2000} className='logimage' />
      <div className="userprofcon">
        <span className="font-bold flex gap-2 items-center justify-center" style={{ fontSize: 24 }}><User size={28} />{session?.user?.name}</span>
        <span className="font-medium flex gap-2 items-center justify-center" style={{ fontSize: 20 }}><Mail />{session?.user?.email}</span>
      </div>
      {filteredPosts.length > 0 ? <div className="flex flex-col items-center justify-center">
        <span style={{ paddingBottom: 20, fontSize: 18, fontWeight: 'bold' }}>Your Sales History</span>
        <table>
          <thead>
            <tr>
              <th style={{ padding: 5 }} className="w-4 shadow-inner rounded-md">S.No</th>
              <th style={{ padding: 5 }} className="w-4 shadow-inner rounded-md">Name</th>
              <th style={{ padding: 5 }} className="w-4 shadow-inner rounded-md">Category</th>
              <th style={{ padding: 5 }} className="w-4 shadow-inner rounded-md">Price</th>
              <th style={{ padding: 5 }} className="w-4 shadow-inner rounded-md">Likes</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts.map((post, index) =>
              <tr key={index}>
                <td style={{ fontSize: 14, padding: 5, textAlign: 'center', backgroundColor: 'whitesmoke' }} className="shadow-inner">{index + 1}</td>
                <td style={{ fontSize: 14, padding: 5, textAlign: 'center', backgroundColor: 'whitesmoke' }} className="shadow-inner">{post.name}</td>
                <td style={{ fontSize: 14, padding: 5, textAlign: 'center', backgroundColor: 'whitesmoke' }} className="shadow-inner">{post.category}</td>
                <td style={{ fontSize: 14, padding: 5, textAlign: 'center', backgroundColor: 'whitesmoke' }} className="shadow-inner">{post.price}</td>
                <td style={{ fontSize: 14, padding: 5, textAlign: 'center', backgroundColor: 'whitesmoke' }} className="shadow-inner">{post.likes}</td>
                <td style={{ fontSize: 14, padding: 5, textAlign: 'center', backgroundColor: 'whitesmoke', cursor: 'pointer' }} className="shadow-inner m-auto " onClick={() => handleDelete(post.id)}><Trash2 color='orangered' /></td>
              </tr>
            )}
          </tbody>
        </table>
      </div> : <span>You have not sold anything</span>}
    </section>
  )
}

export default Profile
