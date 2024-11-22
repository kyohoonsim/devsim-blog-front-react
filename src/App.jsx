import { useState, useEffect, createContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Portal from "./pages/Portal";
import { callApi } from "./util/tran";
import { HelmetProvider } from "react-helmet-async";
import { jwtDecode } from "jwt-decode";

export const StateContext = createContext();
export const DispatchContext = createContext();

function App() {
  const nav = useNavigate();
  const [username, setUsername] = useState("Guest");
  const [role, setRole] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isEnableBtn, setIsEnableBtn] = useState(true);

  const onClickLoginBtn = () => {
    console.log("로그인 버튼 클릭");
    nav("/login");
  };
  const onClickLogoutBtn = () => {
    console.log("로그아웃 버튼 클릭");
    // 로그아웃 API 요청
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUsername("Guest");
    setRole(null);
    nav("/", { replace: true });
  };
  const onClickNewBtn = () => {
    console.log("새글작성 버튼 클릭");
    nav("/new");
  };
  const onChangeKeyword = (e) => {
    setKeyword(() => e.target.value);
  };
  const onKeyDownKeyword = (e) => {
    if (e.key === "Enter") {
      setPage(1);
      setSearchKeyword(keyword.replaceAll(/\s/g, ";"));
      setData([]);
      nav("/", { replace: true });
    }
  };

  const onClickMoreBtn = () => {
    setPage(page + 1); // setState 함수형 업데이트 필요
  };

  const showToast = (message) => {
    setToastMessage(message);
    setToastVisible(true);

    // 일정 시간이 지나면 toast를 자동으로 숨김
    setTimeout(() => {
      setToastVisible(false);
    }, 3000);
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const decoded = jwtDecode(token);

      setUsername(decoded?.username); // username state 세팅
      setRole(decoded?.role); // role state 세팅
      setIsLogin(true);

      // 토큰 만료시간 체크
      // const currentTime = Date.now() / 1000;
      // if (decoded.exp < currentTime) {
      //   console.log("Token expired!");
      //   localStorage.removeItem("access_token");
      //   // 이때 refresh token 요청해서 만료되었다면 교체하는 것은? 너무 잦은 요청이 되려나?
      // } else {
      //   setUsername(decoded?.username); // username state 세팅
      //   setRole(decoded?.role); // role state 세팅
      //   setIsLogin(true);
      // }
    } else {
      setIsLogin(false);
    }
  });

  useEffect(() => {
    // API 호출하여 글 목록 가져오기
    callApi(
      `${
        import.meta.env.VITE_API_URL
      }/posts?page=${page}&postPerPage=6&keywords=${searchKeyword}`,
      "GET",
      null,
      (respJson) => {
        console.log(respJson);
        // 기존 data 배열과 응답 받은 배열 합치기
        if (respJson.length) {
          const tempData = data.concat(respJson);
          setData(tempData);
          setIsEnableBtn(true);
        } else {
          showToast("가져올 포스트 목록이 없습니다.");
          setIsEnableBtn(false);
        }
      },
      (errMsg) => {
        window.alert(errMsg);
      }
    );
  }, [page, searchKeyword]);

  return (
    <>
      <HelmetProvider>
        <StateContext.Provider
          value={{
            isLogin,
            keyword,
            data,
            page,
            toastVisible,
            toastMessage,
            isEnableBtn,
            username,
            role,
          }}
        >
          <DispatchContext.Provider
            value={{
              onClickLoginBtn,
              onClickLogoutBtn,
              onClickNewBtn,
              onChangeKeyword,
              onClickMoreBtn,
              onKeyDownKeyword,
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/post/:id" element={<Post />} />
              <Route path="/login" element={<Login />} />
              <Route path="/portal" element={<Portal />} />
            </Routes>
          </DispatchContext.Provider>
        </StateContext.Provider>
      </HelmetProvider>
    </>
  );
}

export default App;
