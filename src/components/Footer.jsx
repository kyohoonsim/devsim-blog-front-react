import Button from "./Button";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Footer.css";
import { LoginStateContext, LoginDispatchContext } from "../App";

const Footer = () => {
  const isLogin = useContext(LoginStateContext);
  console.log("Footer 컴포넌트에서 isLogin: ", isLogin);

  const { onClickLoginBtn, onClickLogoutBtn, onClickNewBtn } =
    useContext(LoginDispatchContext);

  if (isLogin) {
    // 로그인 상태
    return (
      <div className="Footer">
        <div>{localStorage.getItem("username")}님 안녕하세요.</div>
        <div className="footer_btn_wrapper">
          <Button text="새글 작성" type="LINK" onClick={onClickNewBtn} />
          <Button text="로그아웃" type="LINK" onClick={onClickLogoutBtn} />
        </div>
      </div>
    );
  } else {
    // 로그아웃 상태
    return (
      <div className="Footer">
        <div>방문자님 안녕하세요.</div>
        <div className="footer_btn_wrapper">
          <Button text="로그인" type="LINK" onClick={onClickLoginBtn} />
        </div>
      </div>
    );
  }
};

export default Footer;
