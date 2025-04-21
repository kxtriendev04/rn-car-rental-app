import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import SearchInput from "../component/home/SearchInput";
import colors from "../util/colors";
import HomeHighlight from "../module/home/HomeHighlight";
import HomeList from "../module/home/HomeList";
import HomeCategory from "../module/home/HomeCategory";
import HomeOthers from "../module/home/HomeOthers";
import HomeCoupon from "../module/HomeCoupon";
import api from "../util/api";
import { AuthContext } from "../context/AuthContext";
import { useFocusEffect } from "@react-navigation/native";

const { height, width } = Dimensions.get("window");
const HomeScreen = () => {
  const [data, setData] = useState([]);
  // const fetchingData = async () => {
  //   try {
  //     const response = await api.get("/users");
  //     console.log(response.data.results);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  // useEffect(() => {
  //   console.log(123);
  //   fetchingData();
  // }, []);

  return (
    <View style={styles.container}>
      {/* {isFocused && <View style={styles.overlay} />} */}
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={{ paddingBottom: 0 }}
      >
        <View style={[styles.header]}>
          <SearchInput
          // isFocused={isFocused}
          // setIsFocused={setIsFocused}
          ></SearchInput>
          {/* <HomeHighlight></HomeHighlight> */}
        </View>
        <HomeCategory></HomeCategory>
        <View style={{ height: 15, backgroundColor: "#F7F7F7" }}></View>
        <HomeCoupon />
        <View style={{ height: 15, backgroundColor: "#F7F7F7" }}></View>
        <HomeList></HomeList>
        <View style={{ height: 15 }}></View>
        <HomeOthers></HomeOthers>
        <View style={{ height: 100 }}></View>
      </ScrollView>
    </View>
    //   </TouchableWithoutFeedback>
    // </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 25,
  },
  header: {
    // marginTop: 25,
    paddingHorizontal: 15,
    paddingTop: 35,
    backgroundColor: "white",
    // backgroundColor: "#f2f2f2",
    marginBottom: 15,
    gap: 15,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width,
    height: height,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Màu xám mờ
    zIndex: 1, // Đặt trên các phần khác
  },
});

export default HomeScreen;
