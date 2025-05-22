import axios from "axios";
import { Alert } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

// import { useNavigation } from "@react-navigation/native";

// export const API_URL = "http://10.0.2.2:8080/api";

//Trien
// export const API_URL = "http://172.20.10.5:8080/api";

//Viet
export const API_URL = "http://192.168.50.164:8080/api";
// export const API_URL = "http://172.20.10.3:8080/api";
export const API_URL_IMG = "http://192.168.50.164:8080";

// Lưu token
export const saveTokens = async ({
  access_token,
  refresh_token,
  access_expires_in = 100000,
  refresh_expires_in = 10000,
}) => {
  try {
    const access_expires_at = Date.now() + access_expires_in * 1000; // Tính thời gian hết hạn (millisecond)
    const refresh_expires_at = Date.now() + refresh_expires_in * 1000; // Tính thời gian hết hạn (millisecond)

    const tokens = JSON.stringify({
      access_token,
      refresh_token,
      access_expires_at,
      refresh_expires_at,
    });
    await AsyncStorage.setItem("authTokens", tokens);
  } catch (error) {
    console.error("Lỗi khi lưu token:", error);
  }
};

// Lấy token
export const getTokens = async () => {
  try {
    const tokens = await AsyncStorage.getItem("authTokens");
    if (!tokens) return null;

    const {
      access_token,
      refresh_token,
      access_expires_at,
      refresh_expires_at,
    } = JSON.parse(tokens);

    if (Date.now() >= refresh_expires_at) {
      Alert.alert("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại");
      // navigate("DangNhap");
      await removeTokens();
      return null;
    }

    if (Date.now() > access_expires_at) {
      console.warn("Access token hết hạn! Đang làm mới...");
      const newTokens = await refreshTokens(refresh_token);
      return newTokens || null;
    }

    return { access_token, refresh_token };
  } catch (error) {
    console.error("Lỗi khi lấy token:", error);
    return null;
  }
};

export const refreshTokens = async (refresh_token) => {
  console.log("refresh token: ", refresh_token);
  try {
    const response = await axios.post(`${API_URL}/auth/refresh`, {
      refreshToken: refresh_token,
    });
    // console.log("response.data:", response.data);

    if (response.data.results && response.data.results.access_token) {
      const {
        access_token,
        refresh_token,
        access_expires_in = 5,
        refresh_expires_in = 1000,
      } = response.data.results;
      await saveTokens(response.data.results);
      return { access_token, refresh_token };
    }
  } catch (error) {
    console.error("Lỗi khi refresh token:", error);
    await removeTokens(); // Xóa token nếu refresh thất bại
    return null;
  }
};

// Xóa token
export const removeTokens = async () => {
  try {
    await AsyncStorage.removeItem("authTokens");
  } catch (error) {
    console.error("Lỗi khi xóa token:", error);
  }
};

// AXIOS INSTANT

// Tạo instance axios với cấu hình sẵn
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
// ✨ Thêm interceptor để tự động gắn access token vào mỗi request
api.interceptors.request.use(
  async (config) => {
    const tokens = await getTokens(); // Lấy access token từ AsyncStorage
    // console.log("tokens.access_token:", tokens?.access_token);
    if (tokens?.access_token) {
      config.headers.Authorization = `Bearer ${tokens.access_token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
export default api;
