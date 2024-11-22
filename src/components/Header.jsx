import "./Header.css";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import Button from "./Button";
import { StateContext, DispatchContext } from "../App";

const Header = ({ searchBarYn }) => {
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

  const [userMenuOpenYn, setUserMenuOpenYn] = useState(false);

  const onClickUserMenuIcon = () => {
    console.log("user_menu_icon 클릭");
    setUserMenuOpenYn(!userMenuOpenYn);
    console.log(userMenuOpenYn);
  };

  return (
    <header className="Header">
      <div className="Header_top">
        <h1 className="Header_title">
          <Link to="/">
            <img src="/thumbnail.png" width="150" />
          </Link>
        </h1>

        <div className="Header_top_right">
          <div className="user_menu_icon" onClick={onClickUserMenuIcon}>
            {sc.username[0].toUpperCase()}
          </div>
          {userMenuOpenYn ? (
            <ul className="user_menu">
              <li>안녕하세요, {sc.username}님!</li>
              {sc.isLogin ? (
                <>
                  {sc.role === "ADMIN" ? (
                    <li>
                      <Button
                        text="새글 작성"
                        type="LINK"
                        onClick={onClickNewBtn}
                      />
                    </li>
                  ) : (
                    ""
                  )}
                  <li>
                    <Button
                      text="로그아웃"
                      type="LINK"
                      onClick={onClickLogoutBtn}
                    />
                  </li>
                </>
              ) : (
                <li>
                  <Button text="로그인" type="LINK" onClick={onClickLoginBtn} />
                </li>
              )}
            </ul>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="Header_bottom">
        {/* <div className="Header_menu_wrapper">
          <div>
            <Link to="/">Blog</Link>
          </div>
          <div>
            <Link to="/portal">Portal</Link>
          </div>
        </div> */}

        {searchBarYn === true ? (
          <div className="Header_search">
            <input
              placeholder="검색어를 입력하세요"
              onChange={onChangeKeyword}
              onKeyDown={onKeyDownKeyword}
            />
            <div className="search_icon">&#x1F50D;</div>
          </div>
        ) : (
          ""
        )}
      </div>
    </header>
  );
};

export default Header;
