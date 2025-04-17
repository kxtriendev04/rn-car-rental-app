import React, { useState } from "react";
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

const { height, width } = Dimensions.get("window");
const HomeScreen = () => {
  // const [isFocused, setIsFocused] = useState(false);
  // const navigation = useNavigation();

  return (
    // <KeyboardAvoidingView
    //   behavior={Platform.OS === "ios" ? "padding" : "height"}
    //   style={{ flex: 1 }}
    // >
    // <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
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
        <Text>Trang chủ</Text>
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
    // backgroundColor: "white",
  },
  header: {
    // marginTop: 25,
    paddingHorizontal: 15,
    paddingTop: 35,
    backgroundColor: "white",
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
