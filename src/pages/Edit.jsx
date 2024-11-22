import Header from "../components/Header";
import Editor from "../components/Editor";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import useAdminCheck from "../hooks/useAdminCheck";

const Edit = () => {
  const params = useParams();

  useAdminCheck();

  return (
    <div>
      <Header searchBarYn={false} />
      <Editor id={params.id} />
      <Footer />
    </div>
  );
};

export default Edit;
