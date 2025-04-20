import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api, { getTokens, removeTokens, saveTokens } from "../util/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 📌 Lấy user từ AsyncStorage
  const loadUserFromStorage = async () => {
    const userData = await AsyncStorage.getItem("user");
    // console.log("userData: ", userData);
    if (userData) {
      setUser(JSON.parse(userData));
    }
  };

  // 📌 Lưu user vào AsyncStorage
  const saveUserToStorage = async (userData) => {
    // console.log("userData: ", userData);
    await AsyncStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  // 📌 Lấy user từ server nếu cần
  const getCurrentUser = async (forceUpdate = false, email) => {
    console.log("Get account");
    if (!forceUpdate) {
      await loadUserFromStorage();
      setLoading(false);
      return;
    }

    const tokens = await getTokens();
    if (!tokens?.access_token) return;

    try {
      const response = await api.get("/auth/account?email=" + email);
      if (response.data.results) {
        console.log("save");
        await saveUserToStorage(response.data.results);
      }
    } catch (error) {
      console.error("❌ Lỗi lấy thông tin người dùng:", error);
      setUser(null);
      await AsyncStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  };

  // 📌 Hàm đăng nhập
  const login = async (username, password) => {
    console.log(username, password);
    try {
      // console.log(123);
      const response = await api.post("/auth/login", { username, password });
      console.log("response: ", response.data.results);
      if (response.data.results.access_token) {
        await saveTokens(response.data.results); // Lưu token
        await getCurrentUser(true, response.data.results.user.email); // Lấy user từ server
        return true;
      }
    } catch (error) {
      console.log(error);
      // Alert.alert("Vui lòng kiểm tra lại thông tin đăng nhập!");
    }
    return false;
  };

  // 📌 Hàm đăng xuất
  const logout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      await removeTokens();
      setUser(null);
    } catch (error) {
      // Alert.alert("Đăng xuất thất bại!");
    }
  };

  useEffect(() => {
    getCurrentUser(); // Load user từ AsyncStorage khi mở app
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, getCurrentUser, login, loading, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
