import React from "react";
import { SafeAreaView } from "react-native";
import { View, Text, Button } from "react-native";
import HeaderNavigation from "../../component/HeaderNavigation";
import { EvilIcons, FontAwesome } from "@expo/vector-icons";
import { FlatList } from "react-native";
import { Image } from "react-native";
import colors from "../../util/colors";

const reviews = [
  {
    name: "Khúc Triển",
    avatarUrl: "https://haycafe.vn/wp-content/uploads/2022/03/Avatar-anime.jpg",
    comment: "Chủ xe thân thiện và đẹp trai",
    star: 5,
    date: "28/3/2025",
  },
  {
    name: "Khúc Triển",
    avatarUrl: "https://haycafe.vn/wp-content/uploads/2022/03/Avatar-anime.jpg",
    comment: "Chủ xe thân thiện và đẹp trai",
    star: 5,
    date: "28/3/2025",
  },
  {
    name: "Khúc Triển",
    avatarUrl: "https://haycafe.vn/wp-content/uploads/2022/03/Avatar-anime.jpg",
    comment: "Chủ xe thân thiện và đẹp trai",
    star: 5,
    date: "28/3/2025",
  },
  {
    name: "Khúc Triển",
    avatarUrl: "https://haycafe.vn/wp-content/uploads/2022/03/Avatar-anime.jpg",
    comment: "Chủ xe thân thiện và đẹp trai",
    star: 5,
    date: "28/3/2025",
  },
  {
    name: "Khúc Triển",
    avatarUrl: "https://haycafe.vn/wp-content/uploads/2022/03/Avatar-anime.jpg",
    comment: "Chủ xe thân thiện và đẹp trai",
    star: 5,
    date: "28/3/2025",
  },
];

const ReviewScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.whiteColor }}>
      <HeaderNavigation
        title="Đánh giá"
        leftIcon={<EvilIcons name="close" size={24} color="black" />}
        navigation={navigation}
      />
      <FlatList
        data={reviews}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <CommentCard comment={item} />}
      />
      {/* <Text>Review</Text> */}
      {/* <Button title="Đăng xuất" onPress={() => navigation.replace("Auth")} /> */}
    </SafeAreaView>
  );
};
const CommentCard = ({ comment }) => (
  <View
    style={{
      marginHorizontal: 15,
      marginBottom: 14,
      borderColor: "#e6e6e6",
      borderWidth: 1,
      borderRadius: 12,
      paddingHorizontal: 15,
      paddingVertical: 12,
    }}
  >
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
        <Image
          source={{ uri: comment.avatarUrl }}
          style={{
            width: 50,
            height: 50,
            objectFit: "cover",
            borderRadius: 100,
          }}
        />
        <View>
          <Text style={{ fontSize: 17, fontWeight: 500, marginBottom: 6 }}>
            {comment.name}
          </Text>
          <Text style={{ color: colors.textGray }}>{comment.date}</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
        <FontAwesome name="star" size={12} color="orange" />
        <Text>{comment.star}</Text>
      </View>
    </View>
    <Text style={{ marginTop: 8, color: "#333" }}>Comment</Text>
  </View>
);

export default ReviewScreen;
