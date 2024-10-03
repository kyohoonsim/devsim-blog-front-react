import "./Header.css";
import { Link } from "react-router-dom";

const Header = ({ searchBarYn }) => {
  return (
    <header className="Header">
      <h1 className="Header_title">
        <Link to="/">DEVSIM</Link>
      </h1>
      <div className="Header_search">
        {searchBarYn === true ? (
          <input placeholder="검색어를 입력하세요" />
        ) : (
          ""
        )}
      </div>
    </header>
  );
};

export default Header;
