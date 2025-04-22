import React, { useContext } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { AuthContext } from "../../context/AuthContext";

const OrderCard = ({ data }) => {
  const user = useContext(AuthContext);
  const checkRole = user.id === data.vehicle.owner.id;
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("HostStackNavigator", {
      screen: "OrderDetail",
      params: data,
    });
  };

  const getStatusText = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "Chờ duyệt";
      case "approved":
        return "Đã duyệt";
      case "rejected":
        return "Từ chối";
      case "completed":
        return "Hoàn thành";
      case "delivering":
        return "Đang dùng";
      default:
        return "Không xác định";
    }
  };

  const getStatusBackgroundColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "#FFF3CD";
      case "approved":
        return "#D4EDDA";
      case "rejected":
        return "#F8D7DA";
      case "completed":
        return "#D1ECF1";
      case "delivering":
        return "lightblue";
      default:
        return "#FFF";
    }
  };

  const getStatusTextColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "#856404";
      case "approved":
        return "#155724";
      case "rejected":
        return "#721c24";
      case "completed":
        return "#0c5460";
      case "delivering":
        return "#black";
      default:
        return "#333";
    }
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      {data.vehicle.images?.length > 0 && (
        <Image
          source={{ uri: data.vehicle.images[0].imageUrl }}
          style={styles.image}
        />
      )}

      <View style={styles.infoContainer}>
        <Text style={styles.title}>{data.vehicle.name}</Text>
        <Text style={styles.dueDate}>
          Ngày tạo {moment(data.createdAt).format("HH:mm:ss DD/MM/YYYY")}
        </Text>

        <View style={styles.row}>
          <Ionicons name="person-outline" size={16} color="gray" />
          <Text style={styles.text}>
            {checkRole ? data.vehicle.owner.fullName : data.renter.fullName}
          </Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="call-outline" size={16} color="green" />
          <Text style={styles.text}>
            {checkRole
              ? data.vehicle.owner.phoneNumber
              : data.renter.phoneNumber}
          </Text>
        </View>
      </View>

      <View
        style={[
          styles.statusContainer,
          { backgroundColor: getStatusBackgroundColor(data.status) },
        ]}
      >
        <Text
          style={[
            styles.statusText,
            { color: getStatusTextColor(data.status) },
          ]}
        >
          {getStatusText(data.status)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 12,
    alignItems: "center",
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 95,
    height: 80,
    borderRadius: 12,
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 2,
  },
  dueDate: {
    color: "gray",
    fontSize: 13,
    marginBottom: 6,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
  },
  statusContainer: {
    backgroundColor: "#E8FCEB",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusText: {
    color: "green",
    fontWeight: "500",
    fontSize: 12,
  },
});
