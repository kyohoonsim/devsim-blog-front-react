import Header from "../components/Header";
import Editor from "../components/Editor";
import Footer from "../components/Footer";

const New = () => {
  return (
    <div>
      <Header searchBarYn={false} />
      <Editor />
      <Footer />
    </div>
  );
};

export default New;
