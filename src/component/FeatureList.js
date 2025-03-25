import React from "react";
import { View, FlatList } from "react-native";
import FeatureItem from "./FeatureItem";

const features = [
  { title: "Free breakfast", icon: "set-meal" },
  { title: "Free wifi", icon: "wifi" },
  { title: "Near airport", icon: "local-airport" },
];

const FeatureList = () => {
  return (
    <View>
      <FlatList
        horizontal
        data={features}
        renderItem={({ item }) => <FeatureItem title={item.title} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default FeatureList;
