import Gallery from "../../Components/Gallery/Gallery";
import HomeSlider from "../../Components/HomeSlider/HomeSlider";
import PopularClasses from "../../Components/PopularClasses/PopularClasses";
import PopularInstructors from "../../Components/PopularInstructors/PopularInstructors";
import RouteTitle from "../../Components/RouteTitle/RouteTitle";

const Home = () => {
  return (
    <div>
      <RouteTitle title={"Home"} />
      <HomeSlider />
      <PopularClasses />
      <PopularInstructors />
      <Gallery />
    </div>
  );
};

export default Home;
