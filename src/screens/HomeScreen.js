import React from "react";
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import SearchInput from "../component/home/SearchInput";
import colors from "../util/colors";
import HomeHighlight from "../module/home/HomeHighlight";
import HomeList from "../module/home/HomeList";
import HomeCategory from "../module/home/HomeCategory";
import HomeOthers from "../module/home/HomeOthers";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <SearchInput></SearchInput>
          {/* <HomeHighlight></HomeHighlight> */}
        </View>
        <HomeCategory></HomeCategory>
        <View style={{ height: 15 }}></View>
        <HomeList></HomeList>
        <View style={{ height: 15 }}></View>
        <HomeOthers></HomeOthers>
        <Text>Trang chủ</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 15,
    paddingTop: 10,
    backgroundColor: "white",
    marginBottom: 15,
    gap: 15,
  },
});

export default HomeScreen;
