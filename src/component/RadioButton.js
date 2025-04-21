import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import colors from "../util/colors";
import { EvilIcons } from "@expo/vector-icons";

const RadioButton = ({ options, selected, onSelect }) => {
  return (
    <View>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            marginVertical: 5,
            backgroundColor: colors.whiteColor,
            borderRadius: 12,
            borderColor: "#e9e9e9",
            borderWidth: 1,
            padding: 12,
            paddingBottom: 6,
          }}
          onPress={() => onSelect(option.name)}
        >
          <View
            style={{
              marginTop: 2,
              width: 18,
              height: 18,
              borderRadius: 12,
              borderWidth: 1,
              borderColor:
                selected === option.name ? colors.mainColor : "#e7e7e7",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 12,
            }}
          >
            {selected === option.name && (
              <View
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 6,
                  backgroundColor: colors.mainColor,
                }}
              />
            )}
          </View>
          <View>
            <Text style={{ marginBottom: 6, fontSize: 14 }}>{option.name}</Text>

            <Text
              style={{
                marginBottom: 6,
                fontSize: 15,
                fontWeight: 500,
                marginRight: 20,
              }}
            >
              <EvilIcons name="location" size={20} color={colors.mainColor} />
              {option.location}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default RadioButton;
