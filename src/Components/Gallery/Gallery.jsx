import SectionHeader from "../SectionHeader/SectionHeader";

const Gallery = () => {
  return (
    <div className="container">
      <SectionHeader
        title={"Design Gallery"}
        text={"Most Beautiful design Create by our students"}
      />
      <div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="grid gap-4">
            <div>
              <img
                className="h-auto max-w-full rounded-lg hover:shadow-2xl"
                src="https://images.pexels.com/photos/3246665/pexels-photo-3246665.png?auto=compress&cs=tinysrgb&w=600"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-auto max-w-full rounded-lg hover:shadow-2xl"
                src="https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-auto max-w-full rounded-lg hover:shadow-2xl"
                src="https://images.pexels.com/photos/1690351/pexels-photo-1690351.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt=""
              />
            </div>
          </div>
          <div className="grid gap-4">
            <div>
              <img
                className="h-auto max-w-full rounded-lg hover:shadow-2xl"
                src="https://images.pexels.com/photos/1646953/pexels-photo-1646953.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-auto max-w-full rounded-lg hover:shadow-2xl"
                src="https://images.pexels.com/photos/2860804/pexels-photo-2860804.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-auto max-w-full rounded-lg hover:shadow-2xl"
                src="https://images.pexels.com/photos/415585/pexels-photo-415585.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt=""
              />
            </div>
          </div>
          <div className="grid gap-4">
            <div>
              <img
                className="h-auto max-w-full rounded-lg hover:shadow-2xl"
                src="https://images.pexels.com/photos/4585185/pexels-photo-4585185.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-auto max-w-full rounded-lg hover:shadow-2xl"
                src="https://images.pexels.com/photos/2911521/pexels-photo-2911521.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-auto max-w-full rounded-lg hover:shadow-2xl"
                src="https://images.pexels.com/photos/3817676/pexels-photo-3817676.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt=""
              />
            </div>
          </div>
          <div className="grid gap-4">
            <div>
              <img
                className="h-auto max-w-full rounded-lg hover:shadow-2xl"
                src="https://images.pexels.com/photos/1575841/pexels-photo-1575841.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-auto max-w-full rounded-lg hover:shadow-2xl"
                src="https://images.pexels.com/photos/7147555/pexels-photo-7147555.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-auto max-w-full rounded-lg hover:shadow-2xl"
                src="https://images.pexels.com/photos/627901/pexels-photo-627901.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
