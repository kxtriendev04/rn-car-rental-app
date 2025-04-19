import React, { useState, useRef } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { AntDesign, FontAwesome6, FontAwesome5, Feather } from "@expo/vector-icons";
import colors from "../util/colors";
import OverlappingAvatars from "../component/OverlappingAvatars";

const PostDetailScreen = ({ route }) => {
  const { post } = route.params || {};
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState("");
  const [love, setLove] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleLoveItem = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => setLove(!love));
  };

  const handlePostComment = () => {
    if (newComment.trim() === "") return;

    const newCommentObj = {
      id: comments.length + 1,
      user: "Người dùng hiện tại", // Thay bằng tên người dùng thực tế nếu có
      avatar: "https://randomuser.me/api/portraits/men/10.jpg", // Thay bằng avatar người dùng thực tế
      text: newComment,
    };

    setComments([...comments, newCommentObj]);
    setNewComment("");
  };

  const renderComment = ({ item }) => (
    <View style={styles.commentContainer}>
      <Image
        source={{ uri: item.avatar }}
        style={styles.commentAvatar}
      />
      <View style={styles.commentContent}>
        <Text style={styles.commentUser}>{item.user}</Text>
        <Text style={styles.commentText}>{item.text}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      >
        <FlatList
          data={[{ id: "post", ...post }]} // Hiển thị bài đăng
          keyExtractor={(item) => item.id.toString()}
          renderItem={() => (
            <View style={styles.postContainer}>
              <View style={styles.postHeader}>
                <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
                  <Image
                    source={{ uri: post.avatar }}
                    style={styles.avatar}
                  />
                  <View>
                    <Text style={styles.author}>{post.author}</Text>
                    <Text style={styles.date}>{post.date}</Text>
                  </View>
                </View>
              </View>

              <Text style={styles.content}>{post.content}</Text>
              {post.image && (
                <Image
                  source={{ uri: post.image }}
                  style={styles.postImage}
                />
              )}

              <View style={styles.interactionContainer}>
                <View style={styles.interactionButtons}>
                  <TouchableOpacity onPress={handleLoveItem}>
                    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                      {love ? (
                        <AntDesign name="heart" size={24} color="red" />
                      ) : (
                        <AntDesign name="hearto" size={24} color="#333" />
                      )}
                    </Animated.View>
                  </TouchableOpacity>
                  <FontAwesome6 name="comment-alt" size={21} color="#333" />
                </View>
                <FontAwesome5 name="share-square" size={22} color="#333" />
              </View>
              <Text style={styles.likeText}>
                Liked by {love ? "you and " + post.likes + " others" : post.likes + " people"}
              </Text>
              <OverlappingAvatars comments={comments} />
            </View>
          )}
          ListHeaderComponent={<View style={styles.headerSpacer} />}
          ListFooterComponent={
            <View style={styles.commentsSection}>
              <Text style={styles.commentsTitle}>Bình luận</Text>
              <FlatList
                data={comments}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderComment}
                ListEmptyComponent={
                  <Text style={styles.noComments}>Chưa có bình luận nào.</Text>
                }
              />
              <View style={styles.commentInputContainer}>
                <TextInput
                  style={styles.commentInput}
                  placeholder="Viết bình luận..."
                  value={newComment}
                  onChangeText={setNewComment}
                  onSubmitEditing={handlePostComment}
                />
                <TouchableOpacity onPress={handlePostComment} style={styles.sendButton}>
                  <Feather name="send" size={24} color={colors.mainColor} />
                </TouchableOpacity>
              </View>
            </View>
          }
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  headerSpacer: {
    height: 10,
  },
  postContainer: {
    paddingHorizontal: 15,
    paddingVertical: 16,
    backgroundColor: colors.whiteColor,
  },
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  author: {
    fontWeight: "600",
    fontSize: 18,
  },
  date: {
    color: colors.textGray,
    fontSize: 12,
  },
  content: {
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 16,
  },
  postImage: {
    height: 220,
    width: "100%",
    borderRadius: 12,
    marginBottom: 16,
  },
  interactionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  interactionButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingHorizontal: 4,
  },
  likeText: {
    color: colors.textGray,
    fontSize: 12,
    paddingHorizontal: 4,
    marginBottom: 8,
  },
  commentsSection: {
    paddingHorizontal: 15,
    paddingVertical: 16,
  },
  commentsTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  commentContainer: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "flex-start",
  },
  commentAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  commentContent: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 10,
  },
  commentUser: {
    fontWeight: "600",
    fontSize: 14,
    marginBottom: 4,
  },
  commentText: {
    fontSize: 14,
  },
  noComments: {
    fontSize: 14,
    color: colors.textGray,
    textAlign: "center",
    marginVertical: 10,
  },
  commentInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingVertical: 10,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 14,
    marginRight: 10,
  },
  sendButton: {
    padding: 10,
  },
});

export default PostDetailScreen;