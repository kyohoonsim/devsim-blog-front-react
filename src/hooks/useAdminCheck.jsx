import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const useAdminCheck = () => {
  const nav = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded?.role != "ADMIN") {
        window.alert("해당 페이지로 이동할 권한이 없습니다.");
        nav("/", { replace: true });
        return;
      }
    } else {
      window.alert("해당 페이지로 이동할 권한이 없습니다.");
      nav("/", { replace: true });
      return;
    }
  }, []);
};

export default useAdminCheck;
