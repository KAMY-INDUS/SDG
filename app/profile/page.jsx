"use client"
import { Mail, User } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

const Profile = () => {
    const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const { data: session } = useSession();
  useEffect(() => {
    const fetchPosts = async () => {
      if (!session) return;
      try {
        const userPostsRef = collection(firestore, "/products");
        const q = query(userPostsRef);
        const querySnapshot = await getDocs(q);
        const fetchedPosts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [session]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const filteredPosts = posts.filter(post=> post.username.includes(session?.user?.name))
  return (
    <section id='about'>
        <span className='font-bold' style={{fontSize:24}}>My Profile</span>
        <Image src={session?.user?.image} height={2000} width={2000} className='logimage' />
        <div className="userprofcon">
            <span className="font-bold flex gap-2 items-center justify-center" style={{fontSize:24}}><User size={28}/>{session?.user?.name}</span>
            <span className="font-medium flex gap-2 items-center justify-center" style={{fontSize:20}}><Mail/>{session?.user?.email}</span>
        </div>
    </section>
  )
}

export default Profile