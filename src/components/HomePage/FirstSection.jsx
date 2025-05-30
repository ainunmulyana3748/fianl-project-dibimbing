import firstImage from "../../assets/HomePage/firstSection/firstImage.png";
import secondImage from "../../assets/HomePage/firstSection/secondImage.png";
import thirdImage from "../../assets/HomePage/firstSection/thirdImage.png";
import iconWorld from "../../assets/HomePage/firstSection/iconWorld.png";
import bgImage from "../../assets/HomePage/firstSection/bgImage.jpg";

const FirstSection = () => {
  return (
    <section
      className="w-full py-24 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="container px-4 mx-auto flex flex-row justify-between items-center gap-x-12 text-white">
        {/* Header Text */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto gap-y-4 xl:text-start xl:w-[55%]">
          <div className="flex items-center justify-center gap-2 w-full xl:justify-start">
            <p className="text-sm font-semibold bg-orange-400 px-2 py-1 rounded-full xl:text-base xl:py-2 xl:px-3">
              Know Before You Go
            </p>
            <img
              src={iconWorld}
              alt="iconWorld"
              className="inline-block w-8 xl:w-11 xl:mt-1"
            />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold xl:text-6xl">
            Traveling opens the door to creating{" "}
            <span className="text-orange-500">memories</span>
          </h1>
          <p className="text-sm sm:text-base">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam
            ipsum nobis asperiores soluta voluptas quas voluptates. Molestiae
            tempora dignissimos, animi praesentium molestias perferendis porro
            expedita delectus. Soluta natus porro.
          </p>
        </div>

        {/* Images */}
        <div className="hidden xl:flex xl:flex-row items-center gap-y-6 sm:gap-y-0 sm:gap-x-6 xl:w-[60%]">
          <img
            src={firstImage}
            alt="firstImage"
            className="w-48 2xl:w-64 h-auto pb-8"
          />
          <img
            src={secondImage}
            alt="secondImage"
            className="w-48 2xl:w-64 h-auto pt-16"
          />
          <img
            src={thirdImage}
            alt="thirdImage"
            className="w-48 2xl:w-64 h-auto pt-32"
          />
        </div>
      </div>
    </section>
  );
};

export default FirstSection;
