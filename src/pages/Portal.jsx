import Header from "../components/Header";
import Footer from "../components/Footer";
import MyPortal from "../components/MyPortal";

const Portal = () => {
  return (
    <div>
      <Header searchBarYn={true} />
      <MyPortal />
      <Footer />
    </div>
  );
};

export default Portal;
