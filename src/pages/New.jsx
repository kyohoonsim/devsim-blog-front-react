import Header from "../components/Header";
import Editor from "../components/Editor";
import Footer from "../components/Footer";
import useAdminCheck from "../hooks/useAdminCheck";

const New = () => {
  useAdminCheck();

  return (
    <div>
      <Header searchBarYn={false} />
      <Editor />
      <Footer />
    </div>
  );
};

export default New;
