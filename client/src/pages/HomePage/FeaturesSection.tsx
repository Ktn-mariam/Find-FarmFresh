const FeaturesSection = () => {
  return (
    <div className="my-20 flex flex-col gap-10">
      <h1 className="text-3xl text-center font-bold">Features</h1>
      <div className="flex gap-10">
        <div className="p-10 flex flex-col items-center bg-beige">
          <div className="w-64 h-64">
            <img
              className="object-cover w-full h-full rounded-lg"
              src="/farmer.png"
              alt=""
            />
          </div>
          <div className="text-3xl pt-10 text-center">
            Build Local Farm Connections
          </div>
          <div className="text-lg pt-5 text-center">
            Connect directly with farmers in your area. Discover the freshest
            produce sourced from local farms, fostering a closer connection
            between you and the food you eat.
          </div>
        </div>
        <div className="p-10 flex flex-col items-center bg-beige">
          <div className="w-64 h-64">
            <img
              className="object-cover w-full h-full rounded-lg"
              src="/vegetable-1.png"
              alt=""
            />
          </div>
          <div className="text-3xl pt-10 text-center">
            Fresher Finds, Every Time
          </div>
          <div className="text-lg pt-5 text-center">
            Explore a diverse range of farm-fresh fruits and vegetables. From
            field to table, enjoy the quality and taste of produce picked at its
            peak, ensuring a delightful and fresh culinary experience.
          </div>
        </div>
        <div className="p-10 flex flex-col items-center bg-beige">
          <div className="w-64 h-64">
            <img
              className="object-cover w-full h-full rounded-lg"
              src="/vegetable-2.png"
              alt=""
            />
          </div>
          <div className="text-3xl pt-10 text-center">
            Budget-Friendly Harvest
          </div>
          <div className="text-lg pt-5 text-center">
            Access an array of affordable, high-quality fruits and vegetables.
            Enjoy cost-effective options without compromising on freshness,
            making healthy eating more accessible for everyone.
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturesSection
