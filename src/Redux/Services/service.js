import axios from "axios";

export const apiCall = async ({ method, url, data = null, responseType = "json", token = null, headers = {},
                                config = { timeout: 5000 } }) => {
  const apiPromise = () => {
    let axiosParam = {
      method,
      url: url,
      data,
      responseType,
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        ...headers
      },
      config,
    };

    if (token) {
      axiosParam = {
        ...axiosParam,
        headers: {
          ...axiosParam.headers,
          Authorization: token,
        },
      };
    }

    return axios(axiosParam);
  }

  return apiPromise()
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};
