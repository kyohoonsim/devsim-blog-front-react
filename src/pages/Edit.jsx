import Header from "../components/Header";
import Editor from "../components/Editor";
import { useParams } from "react-router-dom";

const Edit = () => {
  const params = useParams();
  return (
    <div>
      <Header searchBarYn={false} />
      <Editor id={params.id} />
      <Footer />
    </div>
  );
};

export default Edit;
