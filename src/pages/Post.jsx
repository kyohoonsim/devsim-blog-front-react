import Header from "../components/Header";
import Viewer from "../components/Viewer";
import Footer from "../components/Footer";

const Post = () => {
  return (
    <div>
      <Header searchBarYn={true} headerBottomYn={true} />
      <Viewer />
      <Footer />
    </div>
  );
};

export default Post;
