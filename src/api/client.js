import { logm } from "../helpers/custom-logger";

export async function client(endpoint, { body, ...customConfig } = {}) {
  const headers = { "Content-Type": "application/json" };

  const config = {
    method: body ? "POST" : "GET",
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  logm("client config", config);
  logm("client endpoint", endpoint);

  let fetchedData;
  try {
    const resp = await fetch(endpoint, config);
    fetchedData = await resp.json();
    if (resp.ok) {
      return fetchedData;
    }
    throw new Error(resp.statusText);
  } catch (error) {
    return Promise.reject(error.message ? error.message : fetchedData);
  }
}

client.get = function (endpoint, customConfig = {}) {
  return client(endpoint, { ...customConfig, method: "GET" });
};
client.post = function (endpoint, body, customConfig = {}) {
  return client(endpoint, { body, ...customConfig });
};
