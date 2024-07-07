import Image from "next/image";
import Home from './../components/Home';
import About from './../components/About';
import ProductsComponent from './../components/productComponent';

export default function page() {
  return (
    <>
    <Home />
    <About/>
    <ProductsComponent />
    </>
  );
}
