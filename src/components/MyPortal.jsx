import { Link } from "react-router-dom";
import "./MyPortal.css";

const MyPortal = () => {
  return (
    <div className="MyPortal">
      <div className="MyPortal_public">
        <h4>Public Portal</h4>
        <div className="portal_item_wrapper">
          <div className="portal_item">
            <Link to="https://bskyvision.com">
              ASIS 블로그 - bskyvision.com
            </Link>
          </div>
          <div className="portal_item">
            <Link to="https://github.com/kyohoonsim">
              깃허브 - https://github.com/kyohoonsim
            </Link>
          </div>
          <div className="portal_item">
            <Link to="https://product.kyobobook.co.kr/detail/S000202678019">
              쓸모있는 파이썬 프로그램 40개
            </Link>
          </div>
        </div>
      </div>

      <div className="MyPortal_private">
        <h4>Private Portal</h4>
        <div className="portal_item_wrapper">
          <div className="portal_item">
            <Link to="https://www.figma.com/files/team/1429752093461637321/all-projects?fuid=900215547564032938">
              Figma - devsim
            </Link>
          </div>
          <div className="portal_item">
            <Link to="http://hn-church.com/index">
              하늘누림말씀새김 - http://hn-church.com/index
            </Link>
          </div>
          <div className="portal_item">
            <Link to="http://43.200.31.96/">
              KUSF 데이터중계사이트 - http://43.200.31.96
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPortal;
