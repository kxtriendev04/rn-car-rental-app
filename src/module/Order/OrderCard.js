import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const OrderCard = ({ data }) => {
  return (
    <View style={styles.card}>
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
        <Text style={styles.statusText}>{data.status}</Text>
      </View>
    </View>
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
    width: 80,
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
