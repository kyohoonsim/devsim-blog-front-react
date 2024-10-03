import { useState, useEffect, createContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Post from "./pages/Post";
import Login from "./pages/Login";

export const LoginStateContext = createContext();
export const LoginDispatchContext = createContext();

function App() {
  const nav = useNavigate();
  const [isLogin, setIsLogin] = useState(false); // 이거 최상위 부모로 옮긴 후 내려받아서 사용하는 것으로 수정하자!!

  const onClickLoginBtn = () => {
    console.log("로그인 버튼 클릭");
    nav("/login");
  };
  const onClickLogoutBtn = () => {
    console.log("로그아웃 버튼 클릭");
    // 로그아웃 API 요청

    localStorage.removeItem("token");
    localStorage.removeItem("idx");
    localStorage.removeItem("username");

    nav("/", { replace: true });
  };
  const onClickNewBtn = () => {
    console.log("새글작성 버튼 클릭");
    nav("/new");
  };

  useEffect(() => {
    const idx = localStorage.getItem("idx");
    if (idx) {
      setIsLogin(true);
      console.log("isLogin: ", isLogin);
    } else {
      setIsLogin(false);
      console.log("isLogin: ", isLogin);
    }
  });

  return (
    <>
      <LoginStateContext.Provider value={isLogin}>
        <LoginDispatchContext.Provider
          value={{ onClickLoginBtn, onClickLogoutBtn, onClickNewBtn }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </LoginDispatchContext.Provider>
      </LoginStateContext.Provider>
    </>
  );
}

export default App;
