import "./Header.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import Button from "./Button";
import { StateContext, DispatchContext } from "../App";

const Header = ({ searchBarYn, headerBottomYn }) => {
  const sc = useContext(StateContext);
  // console.log("Header 컴포넌트 isLogin: " + sc.isLogin);
  const {
    onClickLoginBtn,
    onClickLogoutBtn,
    onClickNewBtn,
    onChangeKeyword,
    onClickMoreBtn,
    onKeyDownKeyword,
  } = useContext(DispatchContext);

  return (
    <header className="Header">
      <div className="Header_top">
        <h1 className="Header_title">
          <Link to="/">
            <img src="/thumbnail.png" width="150" />
          </Link>
        </h1>
        <div className="Header_search">
          {searchBarYn === true ? (
            <input
              placeholder="검색어를 입력하세요"
              onChange={onChangeKeyword}
              onKeyDown={onKeyDownKeyword}
            />
          ) : (
            ""
          )}
        </div>
      </div>
      {headerBottomYn ? (
        <div className="Header_bottom">
          <div>{sc.username}님 안녕하세요.</div>

          {sc.isLogin ? (
            <div className="header_btn_wrapper">
              {sc.role === "ADMIN" ? (
                <Button text="새글 작성" type="LINK" onClick={onClickNewBtn} />
              ) : (
                ""
              )}
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
