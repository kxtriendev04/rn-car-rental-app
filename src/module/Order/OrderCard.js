import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const OrderCard = ({ data }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("ManageRented", { id: data.id });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress} activeOpacity={0.8}>
      <Image source={{ uri: data.carImage }} style={styles.image} />

      <View style={styles.infoContainer}>
        <Text style={styles.title}>{data.carName}</Text>
        <Text style={styles.dueDate}>Due on {data.dueDate}</Text>

        <View style={styles.row}>
          <Ionicons name="person-outline" size={16} color="gray" />
          <Text style={styles.text}>{data.userName}</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="call-outline" size={16} color="green" />
          <Text style={styles.text}>{data.phoneNumber}</Text>
        </View>
      </View>

      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>{data.status === "pending" 
          ? "Chờ duyệt" : (data.status === "approved" 
            ? "Đã duyệt" : (data.status === "rejected" 
              ? "Từ chối" : "Hoàn thánh")
           )}</Text>
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
