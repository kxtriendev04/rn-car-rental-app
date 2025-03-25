import React from "react";
import { View, Text, Button } from "react-native";
import HighlightItem from "../../component/home/HighlightItem";

const HomeHighlight = () => {
  return (
    <View style={{ marginBottom: 20, marginTop: 8, gap: 16 }}>
      <View style={{ flexDirection: "row", width: "100%", gap: 10 }}>
        {/* <View style={{ backgroundColor: "violet", padding: 30 }}></View>
   
               <View style={{ backgroundColor: "blue", padding: 30 }}></View> */}
        <HighlightItem></HighlightItem>
        <HighlightItem></HighlightItem>
      </View>
      <View style={{ flexDirection: "row", width: "100%", gap: 10 }}>
        <HighlightItem></HighlightItem>
        <HighlightItem></HighlightItem>
        <HighlightItem></HighlightItem>
      </View>
    </View>
  );
};

export default HomeHighlight;
