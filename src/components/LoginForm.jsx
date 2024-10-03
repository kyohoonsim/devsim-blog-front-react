import { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";
import { callApi } from "../util/tran";

const LoginForm = () => {
  const nav = useNavigate();

  const [username, setUsername] = useState(); // id, pwd 하나의 useState로 관리하도록 개선
  const [pwd, setPwd] = useState();

  const onClickLoginBtn = () => {
    const data = {
      username,
      pwd,
    };
    console.log(data);

    callApi(
      `${import.meta.env.VITE_API_URL}/user/login`,
      "POST",
      data,
      (respJson) => {
        window.alert("로그인 성공");
        localStorage.setItem("token", respJson.token);
        localStorage.setItem("username", respJson.username);
        localStorage.setItem("idx", respJson.idx);
        nav("/", { replace: true });
      },
      (errMsg) => {
        window.alert(errMsg);
      }
    );
  };

  const onChangeId = (e) => {
    setUsername(e.target.value);
  };

  const onChangePwd = (e) => {
    setPwd(e.target.value);
  };

  return (
    <div className="LoginForm">
      <h2>작성자 로그인</h2>
      <Input
        name="id"
        type={"text"}
        placeholder={"아이디"}
        onChange={onChangeId}
      />
      <Input
        name="pwd"
        type={"password"}
        placeholder={"패스워드"}
        onChange={onChangePwd}
      />
      <Button text={"로그인"} type={"PRIMARY"} onClick={onClickLoginBtn} />
    </div>
  );
};

export default LoginForm;
