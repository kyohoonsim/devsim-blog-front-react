export const callApi = (url, method, data, callback, errorCallback) => {
  let prom = "";

  if (method.toUpperCase() === "POST") {
    prom = fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    });
  } else if (method.toUpperCase() === "GET") {
    prom = fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  }
  prom
    .then((response) => {
      if (!response.ok) {
        return response.json().then((errorData) => {
          throw new Error(errorData.message);
        });
      }
      return response.json(); // JSON 데이터로 변환
    })
    .then((respJson) => {
      console.log("===== API 응답 JSON =====");
      console.log(JSON.stringify(respJson));
      callback(respJson);
    })
    .catch((err) => {
      console.log("===== API 에러 메시지 =====");
      errorCallback(err.message);
    });
};
