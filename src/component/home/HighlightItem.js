import React from "react";
import { View, Text, Button } from "react-native";

const HighlightItem = ({ title = "Hotel" }) => {
  return (
    <View
      style={{
        flex: 1,
        height: 100,
        backgroundColor: "violet",
        padding: 10,
        borderRadius: 25,
      }}
    >
      <Text
        style={{
          fontWeight: 500,
          fontSize: 14,
        }}
      >
        {title}
      </Text>
    </View>
  );
};

export default HighlightItem;
