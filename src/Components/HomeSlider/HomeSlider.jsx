import { Autoplay, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

import Button from "../Button/Button";
const HomeSlider = () => {
  return (
    <div>
      <Swiper
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide
          className="h-96 md:h-[600px] bg-cover w-full"
          style={{
            backgroundImage: `linear-gradient(to right,rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.4)),url(${"https://templatekit.jegtheme.com/articio/wp-content/uploads/sites/230/2022/01/male-art-school-artist-painting-with-oil-on-canvas.jpg"})`,
          }}
        >
          <div className="h-full flex flex-col  place-content-center w-full md:w-1/3 px-4 md:px-10 space-y-3 text-white">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">
              The Most Creative Art School That Can Develop Your Talent
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptate, minima? Dolor nam hic blanditiis quas?
            </p>
            <div className="w-1/2">
              <Button>Explore More New</Button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide
          className="h-96 md:h-[600px] bg-cover w-full"
          style={{
            backgroundImage: `linear-gradient(to right,rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.4)),url(${"https://templatekit.jegtheme.com/articio/wp-content/uploads/sites/230/2022/01/consulting-student.jpg"})`,
          }}
        >
          <div className="h-full flex flex-col  place-content-center w-full md:w-1/3 px-4 md:px-10 space-y-3 text-white">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">
              The Most Creative Art School That Can Develop Your Talent
            </h1>
            <p>
              We aim at success by creating skills necessary for kids to enrich
              & empower in studies & sports
            </p>
            <div className="w-1/2">
              <Button>Explore More New</Button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide
          className="h-96 md:h-[600px] bg-cover w-full"
          style={{
            backgroundImage: `linear-gradient(to right,rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.4)),url(${"https://templatekit.jegtheme.com/articio/wp-content/uploads/sites/230/2022/01/studying-in-school-of-arts.jpg"})`,
          }}
        >
          <div className="h-full flex flex-col  place-content-center w-full md:w-1/3 px-4 md:px-10 space-y-3 text-white">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">
              Creative Lesson Plans Can Develop Your Talent
            </h1>
            <p>
              We aim at success by creating skills necessary for kids to enrich
              & empower in studies & sports.
            </p>
            <div className="w-1/2">
              <Button>Explore More New</Button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide
          className="h-96 md:h-[600px] bg-cover w-full"
          style={{
            backgroundImage: `linear-gradient(to right,rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.4)),url(${"https://templatekit.jegtheme.com/articio/wp-content/uploads/sites/230/2022/01/young-white-woman-painter-in-an-art-studio.jpg"})`,
          }}
        >
          <div className="h-full flex flex-col  place-content-center w-full md:w-1/3 px-4 md:px-10 space-y-3 text-white">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">
              The Most Creative Art School That Can Develop Your Talent
            </h1>
            <p>
              We aim at success by creating skills necessary for kids to enrich
              & empower in studies & sports.
            </p>
            <div className="w-1/2">
              <Button>Explore More New</Button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HomeSlider;
