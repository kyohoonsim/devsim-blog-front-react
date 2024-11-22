export const callApi = async (url, method, data, callback, errorCallback) => {
  try {
    let response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
      body: method.toUpperCase() === "POST" ? JSON.stringify(data) : null,
    });
    let respJson = await response.json();
    if (!response.ok) {
      throw new Error(respJson.message);
    }
    callback(respJson);
  } catch (error) {
    errorCallback(error.message);
  }
};

export const callApiWithAuth = async (
  url,
  method,
  data,
  callback,
  errorCallback
) => {
  try {
    let response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
      body: method.toUpperCase() === "POST" ? JSON.stringify(data) : null,
    });
    let respJson = await response.json();
    if (response.status === 401) {
      const refreshed = await getAccessToken();
      if (refreshed) {
        response = await fetch(url, {
          method: method,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
          body: method.toUpperCase() === "POST" ? JSON.stringify(data) : null,
        });
        respJson = await response.json();
      } else {
        return;
      }
    }
    callback(respJson);
  } catch (error) {
    errorCallback(error.message);
  }
};

const getAccessToken = async () => {
  console.log("access token 재발급 시도");
  let data = {
    refreshToken: localStorage.getItem("refresh_token"),
  };
  let response = await fetch(
    `${import.meta.env.VITE_API_URL}/user/access-token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(data),
    }
  );
  let respJson = await response.json();
  if (response.status === 401) {
    window.alert(respJson.message);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    return false;
  } else {
    localStorage.setItem("access_token", respJson.accessToken);
    return true;
  }
};
