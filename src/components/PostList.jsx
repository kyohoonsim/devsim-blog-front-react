import "./PostList.css";
import { Link } from "react-router-dom";
import Button from "./Button";
import Toast from "./Toast";
import { useEffect, useState } from "react";
import { callApi } from "../util/tran";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const PostList = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isEnableBtn, setIsEnableBtn] = useState(true);
  const [keyword, setKeyword] = useState(null);

  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (message) => {
    setToastMessage(message);
    setToastVisible(true);

    // 일정 시간이 지나면 toast를 자동으로 숨김
    setTimeout(() => {
      setToastVisible(false);
    }, 3000);
  };

  useEffect(() => {
    // API 호출하여 글 목록 가져오기
    callApi(
      `${import.meta.env.VITE_API_URL}/posts?page=${page}&postPerPage=8`,
      "GET",
      null,
      (respJson) => {
        console.log(respJson);
        // 기존 data 배열과 응답 받은 배열 합치기 (2024-10-08 개발중)
        if (respJson.length) {
          const tempData = data.concat(respJson);
          setData(tempData);
        } else {
          // toast("가져올 포스트 목록이 없습니다.");
          showToast("가져올 포스트 목록이 없습니다.");
          setIsEnableBtn(false);
        }
      },
      (errMsg) => {
        window.alert(errMsg);
      }
    );
  }, [page]);

  const onClickMoreBtn = () => {
    setPage((page) => page + 1); // setState 함수형 업데이트 필요
  };

  return (
    <div className="PostList">
      {keyword ? <h2 className="post_cnt">검색어: {keyword}</h2> : ""}

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

      {/* <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      /> */}
    </div>
  );
};

export default PostList;
