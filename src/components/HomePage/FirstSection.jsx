const FirstSection = () => {
  return (
    <section
      className="w-full py-24 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${`https://travel-journal-api-bootcamp.do.dibimbing.id/images/1751884905985-bgimage.jpg`})`,
      }}
    >
      <div className="container px-4 mx-auto flex flex-row justify-between items-center gap-x-12 text-white">
        {/* Header Text */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto gap-y-4 xl:text-start xl:w-[55%]">
          <div className="flex items-center justify-center gap-2 w-full xl:justify-start">
            <p className="text-sm font-semibold bg-orange-400 px-2 py-1 rounded-full xl:text-base xl:py-2 xl:px-3">
              Know Before You Go
            </p>
            <img
              src={
                "https://travel-journal-api-bootcamp.do.dibimbing.id/images/1751892445325-iconworld.png"
              }
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
            src={
              "https://travel-journal-api-bootcamp.do.dibimbing.id/images/1751892276248-firstimage.png"
            }
            alt="firstImage"
            className="w-48 2xl:w-64 h-auto pb-8"
          />
          <img
            src={
              "https://travel-journal-api-bootcamp.do.dibimbing.id/images/1751892348226-secondimage.png"
            }
            alt="secondImage"
            className="w-48 2xl:w-64 h-auto pt-16"
          />
          <img
            src={
              "https://travel-journal-api-bootcamp.do.dibimbing.id/images/1751892369436-thirdimage.png"
            }
            alt="thirdImage"
            className="w-48 2xl:w-64 h-auto pt-32"
          />
        </div>
      </div>
    </section>
  );
};

export default FirstSection;
