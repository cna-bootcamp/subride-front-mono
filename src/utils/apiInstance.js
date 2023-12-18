import axios from "axios";

export const API_BASE_URL = "http://gudokjoa5.165.192.105.60.nip.io";

const apiInstance = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    "Content-type": "application/json",
  },
});

export default apiInstance;
