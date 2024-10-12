import "./Header.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import Button from "./Button";
import { LoginStateContext, LoginDispatchContext } from "../App";

const Header = ({ searchBarYn, headerBottomYn }) => {
  const isLogin = useContext(LoginStateContext);
  const { onClickLoginBtn, onClickLogoutBtn, onClickNewBtn } =
    useContext(LoginDispatchContext);

  return (
    <header className="Header">
      <div className="Header_top">
        <h1 className="Header_title">
          <Link to="/">devsim</Link>
        </h1>
        <div className="Header_search">
          {searchBarYn === true ? (
            <input placeholder="검색어를 입력하세요" />
          ) : (
            ""
          )}
        </div>
      </div>
      {headerBottomYn ? (
        <div className="Header_bottom">
          <div>
            {isLogin ? localStorage.getItem("username") : "방문자"}님
            안녕하세요.
          </div>

          {isLogin ? (
            <div className="header_btn_wrapper">
              <Button text="새글 작성" type="LINK" onClick={onClickNewBtn} />
              <Button text="로그아웃" type="LINK" onClick={onClickLogoutBtn} />
            </div>
          ) : (
            <div className="header_btn_wrapper">
              <Button text="로그인" type="LINK" onClick={onClickLoginBtn} />
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </header>
  );
};

export default Header;
