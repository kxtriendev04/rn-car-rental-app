import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // hoặc react-native-vector-icons/Ionicons
import moment from "moment";

const mockData = [
  {
    id: 1,
    tieuDe: "Thông báo mới",
    moTa: "Bạn có đơn hàng cần xác nhận.",
    thoiGian: "2025-04-18T08:00:00Z",
    status: "Chưa đọc",
  },
  {
    id: 2,
    tieuDe: "Cập nhật",
    moTa: "Đơn hàng đã giao thành công.",
    thoiGian: "2025-04-17T15:30:00Z",
    status: "Đã đọc",
  },
];

const Notification = () => {
  const [data, setData] = useState(mockData);
  const [expandedId, setExpandedId] = useState(null);
  const [filter, setFilter] = useState("Gần đây");

  const toggleExpand = (id) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };

  const filteredData = data.filter((item) => {
    if (filter === "Chưa đọc") return item.status === "Chưa đọc";
    if (filter === "Đã đọc") return item.status === "Đã đọc";
    return true;
  });

  const renderItem = ({ item }) => {
    const isUnread = item.status === "Chưa đọc";
    const bgColor = isUnread ? "#FFF3F2" : "#F0F0F0";
    const iconColor = isUnread ? "#FF6347" : "#999";

    return (
      <TouchableOpacity
        style={[styles.item, { backgroundColor: bgColor }]}
        onPress={() => toggleExpand(item.id)}
      >
        <View style={styles.iconWrapper}>
          <Ionicons name="notifications-outline" size={20} color={iconColor} />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.tieuDe}</Text>
          <Text style={styles.desc}>{item.moTa}</Text>
          {expandedId === item.id && (
            <Text style={styles.time}>
              Thời gian: {moment(item.thoiGian).format("HH:mm:ss - DD/MM/YYYY")}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Bộ lọc */}
      <View style={styles.filterContainer}>
        {["Gần đây", "Chưa đọc", "Đã đọc"].map((option) => (
          <TouchableOpacity
            key={option}
            onPress={() => setFilter(option)}
            style={[
              styles.filterButton,
              filter === option && styles.activeFilterButton,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                filter === option && styles.activeFilterText,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Danh sách */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFF",
  },
  item: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "flex-start",
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    marginTop: 2,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
    color: "#333",
  },
  desc: {
    fontSize: 14,
    color: "#555",
  },
  time: {
    fontSize: 12,
    color: "#888",
    marginTop: 8,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 16,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginLeft: 8,
    borderRadius: 20,
    backgroundColor: "#eee",
  },
  activeFilterButton: {
    backgroundColor: "#FF6347",
  },
  filterText: {
    fontSize: 13,
    color: "#333",
  },
  activeFilterText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Notification;
