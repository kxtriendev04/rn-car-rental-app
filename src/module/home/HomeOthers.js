import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../../util/colors";
import AccomodationItem from "../../component/home/AccomodationItem";
import api from "../../util/api";

const HomeOthers = () => {
  const [data, setData] = useState([]);
  const fetchingData = async () => {
    try {
      const response = await api.get("/vehicles");
      setData(response.data.results);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchingData();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Tất cả xe có sẵn, bạn có thể thuê</Text>
      <View style={styles.masonryContainer}>
        {data.map((item, index) => (
          <View
            key={item.id}
            style={{ width: "50%", paddingHorizontal: 8, marginBottom: 10 }}
          >
            <AccomodationItem data={item} type="masonry" />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    // backgroundColor: "#f2f2f2",
    paddingBottom: 8,
    flex: 1,

    borderRadius: 16,
  },
  headerText: {
    fontSize: 19,
    fontWeight: "500",
    marginBottom: 8,
    paddingHorizontal: 15,
    paddingTop: 8,
    lineHeight: 24,
    paddingRight: 130,
    color: colors.textColor,
  },
  masonryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 7,
  },
});

export default HomeOthers;
