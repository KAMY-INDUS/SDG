"use client";

import { userdb, firestore } from '@/firebaseConfig';
import { collection, doc, onSnapshot, query } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { IndianRupee, Trash2 } from 'lucide-react';
import Image from 'next/image';

const Cartpage = () => {
  const [posts, setPosts] = useState([]);
  const [userCart, setUserCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) return;

    const userRef = doc(userdb, 'users', session.user.name, 'profile', 'info');
    const userPostsRef = collection(firestore, 'products');
    const q = query(userPostsRef);

    const unsubscribePosts = onSnapshot(q, (querySnapshot) => {
      const fetchedPosts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(fetchedPosts);
    }, (error) => {
      console.error('Error fetching posts: ', error);
    });

    const unsubscribeUser = onSnapshot(userRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        setUserCart(userData.cart || []);
      }
      setLoading(false);
    }, (error) => {
      console.error('Error fetching user data: ', error);
    });

    return () => {
      unsubscribePosts();
      unsubscribeUser();
    };
  }, [session]);

  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  const handleDelete = async (postId) => {
    if (!session) return;

    const userRef = doc(userdb, 'users', session.user.name, 'profile', 'info');
    const updatedCart = userCart.filter(id => id !== postId);

    try {
      await updateDoc(userRef, { cart: updatedCart });
      setUserCart(updatedCart);
    } catch (error) {
      console.error('Error deleting item from cart: ', error);
    }
  };

  const filteredPosts = posts.filter(post => userCart.includes(post.id));
  const totalPrice = filteredPosts.reduce((total, post) => parseInt(total) + parseInt(post.price), 0);

  return (
    <div className="cartContainer">
      
      {filteredPosts.length===0 ? <h1>Your Cart is Empty</h1>:<>
      <h1 className="heading">Your Cart</h1>
      <div className="cartItems">
        {filteredPosts.map(post => (
          <div key={post.id} className="cartItem">
            <Image src={post.image} height={1000} width={1000} className="cartimg"/>
            <h2>{post.name}</h2>
            <p>Price: <IndianRupee/>{post.price}</p>
            <span onClick={()=>handleDelete(post.id)}><Trash2/></span>
          </div>
        ))}
      </div>
      <span className='totalPrice'>Total Price: <IndianRupee/>{totalPrice}</span>
      </>}

      
    </div>
  );
};

export default Cartpage;
