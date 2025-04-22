import React, { useContext, useEffect, useState, useMemo } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import colors from "../../util/colors";
import {
  AntDesign,
  EvilIcons,
  Foundation,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import OrderCard from "../../module/Order/OrderCard";
import api from "../../util/api";
import { AuthContext } from "../../context/AuthContext";

const Seperate = () => {
  return (
    <View
      style={{
        width: 1,
        height: 12,
        backgroundColor: "grey",
        marginBottom: 8,
      }}
    ></View>
  );
};

const ManageRented = () => {
  const { user } = useContext(AuthContext);
  const tabs = ["Chờ duyệt", "Đang dùng", "Đã duyệt", "Từ chối", "Hoàn thành"];
  const [selectedTab, setSelectedTab] = useState("Chờ duyệt");
  const [order, setOrder] = useState([]);

  const statusMap = {
    "Chờ duyệt": "PENDING",
    "Đã duyệt": "APPROVED",
    "Đang dùng": "DELIVERING",
    "Từ chối": "REJECTED",
    "Hoàn thành": "COMPLETED",
  };

  const fetchingOrders = async () => {
    try {
      const response = await api.get(`/rentals/user/split/${user.id}`);
      if (response.status === 200) {
        setOrder(response.data.results.content);
      }
    } catch (e) {
      console.log("Mã lỗi: ", e);
      Alert.alert("Không thể lấy dữ liệu đơn hàng");
    }
  };

  useEffect(() => {
    fetchingOrders();
  }, []);

  // Lọc đơn hàng dựa trên selectedTab
  const filteredOrders = useMemo(() => {
    const selectedStatus = statusMap[selectedTab];
    return order.filter((item) => item.status === selectedStatus);
  }, [order, selectedTab]);

  return (
    <SafeAreaView
      style={{ flex: 1, paddingTop: 30, backgroundColor: colors.whiteColor }}
    >
      <View
        style={{
          paddingTop: 16,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {/* TabItem */}
        {tabs.map((tab, index) => (
          <React.Fragment key={tab}>
            <TouchableOpacity
              onPress={() => setSelectedTab(tab)}
              style={{
                flex: 1,
                paddingBottom: 8,
                borderBottomWidth: 2,
                borderBottomColor:
                  selectedTab === tab ? colors.mainColor : "transparent",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  paddingVertical: 4,
                  color: selectedTab === tab ? colors.mainColor : "grey",
                }}
              >
                {tab}
              </Text>
            </TouchableOpacity>
            {index < tabs.length - 1 && <Seperate />}
          </React.Fragment>
        ))}
      </View>
      <FlatList
        data={filteredOrders}
        renderItem={({ item }) => <OrderCard data={item} />}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text>Bạn chưa có đơn hàng nào ở trạng thái này</Text>
        }
        style={{ padding: 5 }}
      />
    </SafeAreaView>
  );
};

export default ManageRented;
