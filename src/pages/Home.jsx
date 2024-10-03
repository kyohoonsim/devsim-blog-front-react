import Header from "../components/Header";
import PostList from "../components/PostList";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <Header searchBarYn={true}></Header>
      <PostList></PostList>
      <Footer></Footer>
    </div>
  );
};

export default Home;
