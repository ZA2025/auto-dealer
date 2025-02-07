import Image from "next/image";
import LoginForm from "@/components/loginForm/LoginForm";
import Banner from "@/components/banner/Banner";
import Faq from "@/components/faq/Faq";
import Carousel from "@/components/carousel/Carousel";

export default function Home() {
  return (
    <div> 
      <Banner />
      <div className="inner-section">
        <Carousel />
        <Faq />
        {/*<LoginForm />*/}
      </div>
    </div>
  );
}
