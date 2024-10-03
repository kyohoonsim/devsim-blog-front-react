import "./Editor.css";
import Input from "./Input";
import Button from "./Button";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { callApi } from "../util/tran";

const Editor = ({ id }) => {
  const nav = useNavigate();

  const user_idx = 1; // 임시, 로컬스토리지 또는 세션스토리지에서 가져와야 할듯. 토큰과 함께 관리.

  const [idx, setIdx] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag1, setTag1] = useState("");
  const [tag2, setTag2] = useState("");
  const [tag3, setTag3] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      console.log("포스트 수정");
      // API 호출해서 기존 포스트 내용으로 채워줘야 함
      callApi(
        `${import.meta.env.VITE_API_URL}/${id}`,
        "GET",
        null,
        (respJson) => {
          if (respJson.idx) {
            setIdx(respJson.idx);
          }
          if (respJson.title) {
            setTitle(respJson.title);
          }
          if (respJson.content) {
            setContent(respJson.content);
          }
          if (respJson.tags) {
            setTag1(respJson.tags.split(";")[0]);
            setTag2(respJson.tags.split(";")[1]);
            setTag3(respJson.tags.split(";")[2]);
          }
          setLoading(false);
        },
        (errMsg) => {
          window.alert(errMsg);
          setLoading(false);
        }
      );
    } else {
      console.log("새글 작성");
      setLoading(false);
    }
  }, []);

  const onClickCancel = () => {
    if (
      window.confirm("작성을 취소할까요? 작성하던 내용은 복구할 수 없습니다.")
    ) {
      nav("/", { replace: true });
    }
  };
  const onClickSave = () => {
    if (id) {
      // 수정
      const data = {
        idx,
        title,
        content,
        tags: `${tag1};${tag2};${tag3}`,
      };

      callApi(
        `${import.meta.env.VITE_API_URL}/posts/modify`,
        "POST",
        data,
        (respJson) => {
          window.alert(respJson.msg);
          nav(`/post/${id}`, { replace: true });
        },
        (errMsg) => {
          window.alert(errMsg);
        }
      );
    } else {
      // 신규
      const data = {
        title,
        content,
        tags: `${tag1};${tag2};${tag3}`,
      };

      callApi(
        `${import.meta.env.VITE_API_URL}/posts/new`,
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

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeContent = (value) => {
    setContent(value);
  };

  const onChangeTag1 = (e) => {
    setTag1(e.target.value);
  };
  const onChangeTag2 = (e) => {
    setTag2(e.target.value);
  };
  const onChangeTag3 = (e) => {
    setTag3(e.target.value);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="Editor">
      <section className="title_section">
        <h2>제목</h2>
        <Input
          value={title}
          name="title"
          type={"text"}
          onChange={onChangeTitle}
        />
      </section>
      <section className="content_section">
        <h2>내용</h2>
        {/* 참고: https://www.npmjs.com/package/react-simplemde-editor */}
        <SimpleMDE onChange={onChangeContent} value={content} />
      </section>
      <section className="tag_section">
        <h2>태그</h2>
        <div className="tag_list_wrapper">
          <Input
            value={tag1}
            type={"text"}
            placeholder={"태그1"}
            onChange={onChangeTag1}
          />
          <Input
            value={tag2}
            type={"text"}
            placeholder={"태그2"}
            onChange={onChangeTag2}
          />
          <Input
            value={tag3}
            type={"text"}
            placeholder={"태그3"}
            onChange={onChangeTag3}
          />
        </div>
      </section>
      <section className="control_section">
        <select name="" id="">
          <option value="y">공개</option>
          <option value="n">비공개</option>
        </select>
        <Button text={"작성취소"} type={"SECONDARY"} onClick={onClickCancel} />
        <Button text={"저장"} type={"PRIMARY"} onClick={onClickSave} />
      </section>
    </div>
  );
};

export default Editor;
