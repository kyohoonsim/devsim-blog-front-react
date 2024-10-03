import "./PostList.css";
import { Link } from "react-router-dom";
import Button from "./Button";
import { useEffect, useState } from "react";
import { callApi } from "../util/tran";

const PostList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // API 호출하여 글 목록 가져오기
    callApi(
      `${import.meta.env.VITE_API_URL}/posts?page=1&postPerPage=20`,
      "GET",
      null,
      (respJson) => {
        setData(respJson);
      },
      (errMsg) => {
        window.alert(errMsg);
      }
    );
  }, []);

  return (
    <div className="PostList">
      <h2 className="post_cnt">총 N개의 글이 있습니다.</h2>
      <section className="post_list_section">
        {data.map((item) => (
          <div key={item.idx} className="post_card">
            <h4>
              <Link to={`/post/${item.idx}`}>{item.title}</Link>
            </h4>
            <div className="post_time">
              {item.created_at === item.updated_at
                ? new Date(item.created_at).toLocaleString()
                : new Date(item.created_at).toLocaleString() +
                  " (수정: " +
                  new Date(item.updated_at).toLocaleString() +
                  ")"}
            </div>
            <div className="post_tag_list_wrapper">
              {item.tags.split(";")[0] ? (
                <span>{item.tags.split(";")[0]}</span>
              ) : (
                ""
              )}
              {item.tags.split(";")[1] ? (
                <span>{item.tags.split(";")[1]}</span>
              ) : (
                ""
              )}
              {item.tags.split(";")[2] ? (
                <span>{item.tags.split(";")[2]}</span>
              ) : (
                ""
              )}
            </div>
          </div>
        ))}
      </section>
      <Button text={"더보기"} type={"PRIMARY"} />
    </div>
  );
};

export default PostList;
