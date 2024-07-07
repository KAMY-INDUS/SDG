"use client";
import { cn } from "@/lib/utils";
import Marquee from "@/components/magicui/marquee";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from '../firebaseConfig';
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const ProductComponent = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(firestore, "products");
        const snapshot = await getDocs(productsCollection);
        const productsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products: ", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  const firstRow = products.slice(0, products.length / 2);
  const secondRow = products.slice(products.length / 2);

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg  bg-background py-20 text-black">
      <span className="font-bold" style={{fontSize:24}}>
        <span>Order</span>
        <Link href="/order" style={{fontSize:16}}>View All <ArrowRight/></Link>
      </span>
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((product) => (
          <div key={product.id} className="review-card">
            <figure
              className={cn(
                "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
                // light styles
                " bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                // dark styles
                " dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
              )}
            >
              <div className="flex flex-row items-center gap-2">
                <img
                  className="rounded-full"
                  width="48"
                  height="48"
                  alt=""
                  src={product.image}
                />
                <div className="flex flex-col">
                  <figcaption className="text-xl font-medium dark:text-black">
                    {product.name}
                  </figcaption>
                  <p className="text-base font-medium dark:text-black/40">
                    {product.username}
                  </p>
                </div>
              </div>
              <blockquote className="mt-2 text-sm justify-center center">{product.desc}</blockquote>
            </figure>
          </div>
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((product) => (
          <div key={product.id} className="review-card ">
            <figure
              className={cn(
                "relative w-64 cursor-pointer overflow-hidden rounded-xl  p-4",
                // light styles
                " bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                // dark styles
                " dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
              )}
            >
              <div className="flex flex-row items-center gap-2">
                <img
                  className="rounded-full"
                  width="48"
                  height="48"
                  alt=""
                  src={product.image}
                />
                <div className="flex flex-col">
                  <figcaption className="text-xl font-medium dark:text-black">
                    {product.name}
                  </figcaption>
                  <p className="text-base font-medium dark:text-black/40">
                    {product.username}
                  </p>
                </div>
              </div>
              <blockquote className=" desc mt-2 text-sm">{product.desc}</blockquote>
            </figure>
          </div>
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-green-50 dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-green-50 dark:from-background"></div>
    </div>
  );
};

export default ProductComponent;
