import { FontAwesome5 } from "@expo/vector-icons";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import colors from "../../util/colors";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";

const AcommodationLocation = () => {
  const navigation = useNavigation();
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  // Tọa độ cố định để lấy địa điểm gần đó
  const latitude = 21.0466;
  const longitude = 105.7841;

  // Gọi Overpass API để lấy địa điểm gần đó
  useEffect(() => {
    const fetchNearbyPlaces = async () => {
      try {
        const query = `
          [out:json];
          (
            node["highway"="bus_stop"](around:2000,${latitude},${longitude});
            node["amenity"="restaurant"](around:2000,${latitude},${longitude});
            node["tourism"="attraction"](around:2000,${latitude},${longitude});
          );
          out body;
        `;
        const response = await fetch(
          "https://overpass-api.de/api/interpreter",
          {
            method: "POST",
            body: query,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        const data = await response.json();
        const results = data.elements
          .map((element) => ({
            name: element.tags.name || "Không tên",
            type:
              element.tags.highway === "bus_stop"
                ? "Trạm xe buýt"
                : element.tags.amenity === "restaurant"
                ? "Quán ăn"
                : "Khu du lịch",
            distance: calculateDistance(
              latitude,
              longitude,
              element.lat,
              element.lon
            ),
          }))
          .filter((item) => item.name !== "Không tên") // Lọc bỏ các item có tên "Không tên"
          .sort((a, b) => a.distance - b.distance) // Sắp xếp theo khoảng cách
          .slice(0, 10); // Lấy tối đa 10 địa điểm

        setNearbyPlaces(results);
      } catch (error) {
        console.error("Lỗi lấy địa điểm OSM:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNearbyPlaces();
  }, []);

  // Hàm tính khoảng cách (Haversine formula)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // Bán kính Trái Đất (mét)
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Khoảng cách tính bằng mét
    return Math.round(distance);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tính năng</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("AcommodationMap", {
              latitude: 21.0466,
              longitude: 105.7841,
              name: "Trường Đại học Điện lực - Cơ sở 1",
            })
          }
          style={styles.mapButton}
        >
          <FontAwesome5 name="map" size={11} color={colors.mainColor} />
          <Text style={styles.mapButtonText}>Xem bản đồ</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {loading ? (
          <Text style={styles.loadingText}>Đang tải...</Text>
        ) : nearbyPlaces.length > 0 ? (
          <View style={styles.placesContainer}>
            {nearbyPlaces.map((item, index) => (
              <View key={index} style={styles.placeItem}>
                <FontAwesome5
                  name={
                    item.type === "Trạm xe buýt"
                      ? "bus"
                      : item.type === "Quán ăn"
                      ? "utensils"
                      : "landmark"
                  }
                  size={14}
                  //   color={colors.mainColor}
                  color={
                    item.type === "Trạm xe buýt"
                      ? "green"
                      : item.type === "Quán ăn"
                      ? colors.blue
                      : "red"
                  }
                  style={styles.icon}
                />
                <View>
                  <View style={styles.itemRow}>
                    <Text
                      style={styles.placeName}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {item.name}
                    </Text>
                  </View>
                  <Text style={styles.placeDistance}>{item.type}</Text>
                  <Text style={styles.placeDistance}>{item.distance}m</Text>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.noDataText}>
            Không tìm thấy địa điểm gần đây.
          </Text>
        )}
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.whiteColor,
    padding: 15,
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 12,
  },
  mapButton: {
    backgroundColor: colors.greyBackground,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  mapButtonText: {
    color: colors.mainColor,
    fontWeight: "600",
  },
  content: {
    flex: 1,
  },
  placesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  placeItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    width: "48%", // Chiếm khoảng 48% chiều rộng để tạo 2 cột
    marginVertical: 5,
    padding: 10,
    gap: 2,
    // backgroundColor: "#f9f9f9",
    borderRadius: 5,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8, // Khoảng cách giữa icon và tên
  },
  icon: {
    marginTop: 4,
    width: 16, // Giới hạn chiều rộng của icon
  },
  placeName: {
    fontWeight: "bold",
    color: "#333",
    flexShrink: 1, // Đảm bảo tên không tràn ra ngoài khi có icon
  },
  placeDistance: {
    color: "#555",
    fontSize: 12,
  },
  loadingText: {
    textAlign: "center",
    color: "#555",
  },
  noDataText: {
    textAlign: "center",
    color: "#555",
  },
});

export default AcommodationLocation;
