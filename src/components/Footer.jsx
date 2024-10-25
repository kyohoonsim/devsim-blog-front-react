import Button from "./Button";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="Footer">
      <div>© simVault</div>
      <div className="Footer_bottom">
        네이버, 티스토리 등의 블로그를 오랜 기간 해오면서 항상 저만의 블로그가
        만들고 싶었습니다. 이 블로그는 react + spring boot + mysql + aws 등의
        기술로 구현되었습니다.
      </div>
    </div>
  );
};

export default Footer;
