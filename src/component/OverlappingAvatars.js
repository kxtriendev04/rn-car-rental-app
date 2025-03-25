import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";

const images = [
  "https://randomuser.me/api/portraits/women/1.jpg",
  "https://randomuser.me/api/portraits/men/2.jpg",
  "https://randomuser.me/api/portraits/women/3.jpg",
  "https://randomuser.me/api/portraits/men/4.jpg",
  "https://randomuser.me/api/portraits/women/5.jpg",
];

const OverlappingAvatars = ({ comments = [] }) => {
  return (
    <View style={styles.container}>
      {comments.length > 0 && (
        <View style={styles.avatarContainer}>
          {comments.map((comment, index) => (
            <Image
              key={index}
              source={{ uri: comment.avatar }}
              style={[styles.avatar, { left: index * 20 }]}
            />
          ))}
        </View>
      )}
      <View style={styles.textContainer}>
        <Text style={styles.text}>{comments.length} responses</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 32,
  },
  avatarContainer: {
    flexDirection: "row",
    position: "relative",
    height: 32,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "white",
    position: "absolute",
  },
  textContainer: {
    backgroundColor: "#f2f2f2",
    position: "absolute",
    right: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
    marginLeft: 20,
  },
  text: {
    fontSize: 13,
  },
});

export default OverlappingAvatars;
