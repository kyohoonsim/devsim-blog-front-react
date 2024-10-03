import "./Viewer.css";
import { useNavigate, useParams } from "react-router-dom";
import Button from "./Button";
import { useState, useEffect, useContext } from "react";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { LoginStateContext } from "../App";
import { callApi } from "../util/tran";

const Viewer = () => {
  const params = useParams();
  const nav = useNavigate();
  const isLogin = useContext(LoginStateContext);
  console.log("Viewer 컴포넌트에서 isLogin: ", isLogin);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag1, setTag1] = useState("");
  const [tag2, setTag2] = useState("");
  const [tag3, setTag3] = useState("");
  const [createdAt, setCreatedAt] = useState("yyyy-MM-dd hh:mm:ss");
  const [updatedAt, setUpdatedAt] = useState("");

  // API 3번 호출됨 => useEffect로 해결!!
  useEffect(() => {
    // API 호출: n번 포스트 내용 조회
    callApi(
      `${import.meta.env.VITE_API_URL}/posts/${params.id}`,
      "GET",
      null,
      (respJson) => {
        if (respJson.title) {
          setTitle(respJson.title);
        }
        if (respJson.content) {
          setContent(respJson.content);
        }
        if (respJson.created_at) {
          setCreatedAt(new Date(respJson.created_at).toLocaleString());
        }
        if (respJson.updated_at) {
          if (respJson.created_at !== respJson.updated_at) {
            setUpdatedAt(
              `(수정: ${new Date(respJson.updated_at).toLocaleString()})`
            );
          }
        }
        if (respJson.tags) {
          setTag1(respJson.tags.split(";")[0]);
          setTag2(respJson.tags.split(";")[1]);
          setTag3(respJson.tags.split(";")[2]);
        }
      },
      (errMsg) => {
        window.alert(errMsg);
        setLoading(false);
      }
    );
  }, []);

  const onClickEditBtn = () => {
    console.log("수정 버튼 클릭");
    nav(`/edit/${params.id}`, { replace: true });
  };

  const onClickDeleteBtn = () => {
    if (window.confirm("정말 이 글을 삭제하시겠습니까?")) {
      const data = {
        idx: params.id,
      };

      callApi(
        `${import.meta.env.VITE_API_URL}/posts/delete`,
        "POST",
        data,
        (respJson) => {
          window.alert(respJson.msg);
          nav("/", { replace: true });
        },
        (errMsg) => {
          window.alert(errMsg);
        }
      );
    }
  };

  return (
    <div className="Viewer">
      <section className="title_section">
        <h2>{title}</h2>

        <div className="time_wrapper">
          <span>{createdAt}</span>
          <span>{updatedAt}</span>
        </div>

        {isLogin ? (
          <div className="control_wrapper">
            <Button text={"수정"} type={"LINK"} onClick={onClickEditBtn} />
            <Button text={"삭제"} type={"LINK"} onClick={onClickDeleteBtn} />
          </div>
        ) : (
          ""
        )}

        <div className="tag_list_wrapper">
          {tag1 ? <span>{tag1}</span> : ""}
          {tag2 ? <span>{tag2}</span> : ""}
          {tag3 ? <span>{tag3}</span> : ""}
        </div>
      </section>
      <section className="content_section">
        <Markdown
          children={content}
          components={{
            code(props) {
              const { children, className, node, ...rest } = props;
              const match = /language-(\w+)/.exec(className || "");
              return match ? (
                <SyntaxHighlighter
                  {...rest}
                  PreTag="div"
                  children={String(children).replace(/\n$/, "")}
                  language={match[1]}
                  style={dark}
                />
              ) : (
                <code {...rest} className={className}>
                  {children}
                </code>
              );
            },
          }}
        />
      </section>
    </div>
  );
};

export default Viewer;
