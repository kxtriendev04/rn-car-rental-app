import React from "react";
import { View, Text, Image, StyleSheet, FlatList, Alert } from "react-native";
import colors from "../../util/colors";

import SearchVehicalCard from "../../component/SearchVehicalCard";

const RoomList = ({ rooms = [] }) => {
  return (
    <View
      style={{
        paddingVertical: 15,
        borderRadius: 15,
        backgroundColor: colors.whiteColor,
      }}
    >
      <Text
        style={{
          paddingLeft: 15,
          fontSize: 17,
          fontWeight: 600,
          marginBottom: 12,
          color: colors.mainColor,
        }}
      >
        Những xe nổi bật khác của Triển
      </Text>
      {/* Schedule */}
      {/* <View style={{ height: 50, backgroundColor: "white" }}>
        <Text>Lịch</Text>
      </View> */}
      {/* Room Item */}

      <View>
        {rooms && (
          <FlatList
            horizontal={true}
            data={rooms}
            showsHorizontalScrollIndicator={false}
            // pagingEnabled
            // nestedScrollEnabled={true}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <SearchVehicalCard room={item} />}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default RoomList;
