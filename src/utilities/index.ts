import { BACKEND_URL } from "../config";

export function ApiCalls(endpoint: string, body = {}) {
  const url = `${BACKEND_URL}${endpoint}`;
  async function apiGet() {
    const requestOptions = {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        // Authorization: `Bearer ${cookie}`,
      }),
      // signal: controller.signal,
    };

    try {
      const response = await window.fetch(url, requestOptions);
      return await response.json();
    } catch (err) {
      return { error: true, message: err };
    }
  }

  async function apiPost() {
    const requestOptions = {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        // Authorization: `Bearer ${cookie}`,
      }),
      body: JSON.stringify(body)
      // signal: controller.signal,
    };
    try {
      const response = await window.fetch(url, requestOptions);
      return await response.json();
    } catch (err) {
      return { error: true, message: err };
    }
  }

  async function apiPut() {
    const requestOptions = {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json",
        // Authorization: `Bearer ${cookie}`,
      }),
      body: JSON.stringify(body)
      // signal: controller.signal,
    };
    try {
      const response = await window.fetch(url, requestOptions);
      return await response.json();
    } catch (err) {
      return { error: true, message: err };
    }
  }

  async function apiDelete() {
    const requestOptions = {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        // Authorization: `Bearer ${cookie}`,
      }),
      // signal: controller.signal,
    };
    try {
      const response = await window.fetch(url, requestOptions);
      return await response.json();
    } catch (err) {
      return { error: true, message: err };
    }
  }
  return {
    apiGet,
    apiPost,
    apiPut,
    apiDelete,
  };
}
