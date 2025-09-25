import Image from "next/image";
import LoginForm from "@/components/loginForm/LoginForm";
import Banner from "@/components/banner/Banner";
import Faq from "@/components/faq/Faq";
import Carousel from "@/components/carousel/Carousel";
import ReviewForm from "@/components/reviewsForm/ReviewForm";
import Reviews from "@/components/reviews/Reviews";
import ContactUs from "@/components/contactUs/ContactUs";
import VideoPlayer from "@/components/videoPlayer/VideoPlayer";

export default function Home() {
  return (
    <div> 
      {/* <Banner /> */}
      <VideoPlayer />
      <div className="inner-section">
        <Carousel />
        <Faq />
        {/*<LoginForm />*/}
      </div>
       
      <ContactUs />
      <Reviews />
    </div>
  );
}
