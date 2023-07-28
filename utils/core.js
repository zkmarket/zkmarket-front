// export const baseUrl = "https://127.0.0.1:10801/";
export const baseUrl = "http://127.0.0.1:10801/";

/**
 * @param {'GET' | 'POST' | 'PUT' | 'DELETE'}  [method="GET"] - method of api, default 'GET'
 * @param {string} [api] - which api to use
 * @param {string} [url] - full url to request
 * @param {string} [contentType='application/json'] - header Content-Type, default 'application/json'
 * @param {object} [searchParams]
 * @param {object} [bodyParams]
 */
export const requestAPI = async (
  method = "GET",
  api,
  url,
  contentType = 'application/json',
  searchParams,
  bodyParams,
) => {
  if ((!api && !url) || (api && url))
    throw "API or Url must provided without both of them";

  let requestUrl = "";
  if (api) {
    requestUrl = baseUrl + api;
    if (searchParams) {
      const searchString = JSON.stringify(searchParams);
      const quearyString = new URLSearchParams(
        JSON.parse(searchString)
      ).toString();
      requestUrl += "?" + quearyString;
    }
  } else if (url) requestUrl = url;

  const headers = {
    "Content-Type": "application/json",
  };

  // const accessToken = localStorage.getItem("accessToken")?.toString();
  // if (requireToken && accessToken)
  //   headers["Authorization"] = `Bearer ${accessToken}`;

  const r = await fetch(requestUrl, {
    method: method.toUpperCase(),
    headers: contentType?.includes("multipart") ? undefined : headers,
    body: contentType?.includes("multipart")
      ? bodyParams
      : JSON.stringify(bodyParams),
  });

  if (r.status >= 400 && r.status < 500) {
    throw {
      status: r.status,
      msg: r.statusText,
      response: await r.json(),
    };
  }
  // NO Content
  else if (r.status == 204) return;
  return await r.json();
}