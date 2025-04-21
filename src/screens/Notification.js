import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import api from "../util/api";
import { AuthContext } from "../context/AuthContext";

const Notification = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [filter, setFilter] = useState("Gần đây");
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const toggleExpand = async (id) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
    const notification = data.find((item) => item.notification.id === id);
    if (!notification || notification.status === "Đã đọc") return;

    try {
      const response = await api.put(`/notifications/${id}/read/${user.id}`);
      if (response.status === 200) {
        setData((prevData) =>
          prevData.map((item) =>
            item.notification.id === id ? { ...item, status: "Đã đọc" } : item
          )
        );
      }
    } catch (error) {
      Alert.alert("Lỗi", "Không thể đánh dấu thông báo là đã đọc");
      console.log("Mã lỗi: ", error);
    }
  };

  const fetchNotification = async (pageNumber = 0, append = false) => {
    try {
      const response = await api.get(
        `/notifications/user/${user.id}?page=${pageNumber}&size=5`
      );
      if (response.status === 200) {
        const content = response.data.results.content;
        setData((prev) => (append ? [...prev, ...content] : content));
        setHasMore(!response.data.results.last);
      }
    } catch (error) {
      Alert.alert("Lấy thông báo thất bại, hãy thử lại sau ít phút");
      console.log("Mã lỗi: ", error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchNotification();
  }, []);

  const filterNotifications = (newFilter) => {
    setFilter(newFilter);
    setPage(0);
    setData([]);
    setHasMore(true);
    fetchNotification(0);
  };

  const loadMore = async () => {
    if (!hasMore || isLoadingMore) return;
    setIsLoadingMore(true);
    const nextPage = page + 1;
    await fetchNotification(nextPage, true);
    setPage(nextPage);
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
        onPress={() => toggleExpand(item.notification.id)}
      >
        <View style={styles.iconWrapper}>
          <Ionicons name="notifications-outline" size={20} color={iconColor} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.notification.tieuDe}</Text>
          <Text style={styles.desc}>{item.notification.moTa}</Text>
          {expandedId === item.notification.id && (
            <Text style={styles.time}>
              Thời gian:{" "}
              {moment(item.notification.thoiGian).format(
                "HH:mm:ss - DD/MM/YYYY"
              )}
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
            onPress={() => filterNotifications(option)}
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
        keyExtractor={(item) => item.notification.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20, minHeight: "100%" }}
        onEndReached={loadMore}
        onEndReachedThreshold={0.05}
        bounces={true}
        ListFooterComponent={
          isLoadingMore ? (
            <Text style={{ textAlign: "center" }}>Đang tải thêm...</Text>
          ) : null
        }
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
    fontSize: 17,
    marginBottom: 4,
    color: "#333",
  },
  desc: {
    fontSize: 15,
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
