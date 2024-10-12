import Header from "../components/Header";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <div>
      <Header searchBarYn={true} headerBottomYn={true} />
      <LoginForm />
    </div>
  );
};

export default Login;
