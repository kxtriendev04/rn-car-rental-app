import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../../util/colors";
import AccomodationItem from "../../component/home/AccomodationItem";

const itemList = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Vinfast F9",
    img: "https://drive.gianhangvn.com/image/bi9pvs3-2598509j22666.jpg",
    discount: 20,
    star: 3,
    location: "Đống Đa, Hà Nội",
    historicalCost: 1620370,
    pricingDecreased: 1215000,
    ratedNumber: 14,
    feature: "Free breakfast",
    rated: "7.5 Very good",
    height: 250,
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Vinfast F9",
    img: "https://drive.gianhangvn.com/image/bi9pvs3-2598509j22666.jpg",
    discount: 20,
    star: 3,
    location: "Cầu giấy, Hà Nội",
    historicalCost: 1620370,
    pricingDecreased: 1115000,
    ratedNumber: 304,
    feature: "Good location",
    rated: "8.0 Execllent",
    height: 300,
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Vinfast F9",
    img: "https://drive.gianhangvn.com/image/bi9pvs3-2598509j22666.jpg",
    discount: 25,
    star: 4,
    location: "Thanh Xuân, Hà Nội",
    historicalCost: 1078210,
    pricingDecreased: 999000,
    ratedNumber: 106,
    feature: "Good reviews",
    rated: "10.0 Exceptional",
    height: 200,
  },
  {
    id: "58894a0f-3da1-471f-bd96-145571e29d72",
    title: "Vinfast F9",
    img: "https://drive.gianhangvn.com/image/bi9pvs3-2598509j22666.jpg",
    discount: 25,
    star: 4,
    location: "Thanh Xuân, Hà Nội",
    historicalCost: 1078210,
    pricingDecreased: 999000,
    ratedNumber: 106,
    feature: "Good reviews",
    rated: "10.0 Exceptional",
    height: 280,
  },
  {
    id: "58894a0f-3da1-471f-bd96-145571e29d7oo2",
    title: "Vinfast F9",
    img: "https://drive.gianhangvn.com/image/bi9pvs3-2598509j22666.jpg",
    discount: 25,
    star: 4,
    location: "Thanh Xuân, Hà Nội",
    historicalCost: 1078210,
    pricingDecreased: 999000,
    ratedNumber: 106,
    feature: "Good reviews",
    rated: "10.0 Exceptional",
    height: 280,
  },
];

const HomeOthers = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Explore more Cars in your City</Text>
      <View style={styles.masonryContainer}>
        {itemList.map((item, index) => (
          <View
            key={item.id}
            style={{ width: "50%", paddingHorizontal: 5, marginBottom: 10 }}
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
    paddingBottom: 8,
    flex: 1,
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
    paddingHorizontal: 10,
    // justifyContent: "space-between",
  },
});

export default HomeOthers;
