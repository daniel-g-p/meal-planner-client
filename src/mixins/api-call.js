export default async (endpoint, method = "GET", credentials = false, body) => {
  const url = `${process.env.VUE_APP_API}/${endpoint}`;
  const options = {
    method,
    credentials: credentials ? "include" : "omit",
  };
  if (body) {
    options.headers = { "Content-Type": "application/json" };
    options.body = JSON.stringify(body);
  }
  return fetch(url, options)
    .then((res) => res.json())
    .catch((error) => {
      console.log(error);
    });
};
