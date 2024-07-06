"use client";
import React, { useEffect, useState } from "react";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { firestore } from ".././api/firebase/route";
import { useSession } from "next-auth/react";
import { IndianRupee, ListFilter } from "lucide-react";
import Image from "next/image";

const Order = () => {
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

  const filteredPosts = posts.filter(post=> post.category.includes(filter))

  return (
    <section id="order">
      <span className="font-semibold" style={{ fontSize: 26 }}>
        Order
      </span>
      <div className="flex gap-2 items-center justify-start relative left-4">
        <span
          className="flex justify-center items-center gap-2 shadow-inner p-2 rounded-md"
          style={{ backgroundColor: "whitesmoke" }}
        >
          <ListFilter size={18} />
          Filter
        </span>
        <select
        style={{zIndex:0}}
          name="category"
          className="dropdown shadow-inner rounded-md p-2"
          value={filter}
          onChange={(e)=>setFilter(e.target.value)}
        >
          <option value="" selected>
            Select Product Category
          </option>
          <option value="recyclable-waste">Recyclable Waste</option>
          <option value="recycled-product">Recycled Product</option>
        </select>
      </div>
      <div className="posts">
        {filteredPosts.map((post) => (
          <div key={post.id} className="post shadow-inner">
            <Image
              src="/recyclebadge.png"
              height={100}
              width={100}
              className="recyclebadge"
            />
            <Image src={post.image} height={1000} width={1000} className="post-image"/>
            <div>
              <p style={{ fontSize: 20 }}>
                <strong>{post.name}</strong>
              </p>
              <p style={{ fontSize: 14 }}>
                <i>Sold By {post.username}</i>
              </p>
            </div>
            <p>{post.desc}</p>
            <span className="loginbtn"><span className="flex gap-0 items-center justify-center"><IndianRupee size={18}/>{post.price}</span><span></span></span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Order;
