import "./PostList.css";
import { Link } from "react-router-dom";
import Button from "./Button";
import Toast from "./Toast";
import { useEffect, useState, useContext } from "react";
import { callApi } from "../util/tran";
import { StateContext, DispatchContext } from "../App";

const PostList = () => {
  const {
    isLogin,
    keyword,
    data,
    page,
    toastVisible,
    toastMessage,
    isEnableBtn,
  } = useContext(StateContext);
  const {
    onClickLoginBtn,
    onClickLogoutBtn,
    onClickNewBtn,
    onChangeKeyword,
    onClickMoreBtn,
  } = useContext(DispatchContext);

  return (
    <div className="PostList">
      {keyword ? <h2 className="post_cnt">검색어: {keyword}</h2> : ""}

      <section className="post_list_section">
        {data.map((item) => (
          <div key={item.idx} className="post_card">
            <h4>
              <Link to={`/post/${item.idx}`}>{item.title} </Link>
              <span className="post_views">
                {item.page_views ? item.page_views : 0} views{" "}
              </span>
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
      {isEnableBtn ? (
        <Button text={"더보기"} type={"PRIMARY"} onClick={onClickMoreBtn} />
      ) : (
        ""
      )}
      <Toast
        message={toastMessage}
        visible={toastVisible}
        onclose={() => setToastVisible(false)}
      />
    </div>
  );
};

export default PostList;
