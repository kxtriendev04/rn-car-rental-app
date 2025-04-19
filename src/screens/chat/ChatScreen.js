import React, { useLayoutEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
} from "react-native";
import {
  getFocusedRouteNameFromRoute,
  useNavigation,
} from "@react-navigation/native";
import colors from "../../util/colors";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";

const ChatScreen = ({ navigation, route }) => {
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Xin chào! Tôi là chatbot của bạn.",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      sender: "other",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const flatListRef = useRef(null);

  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === "ProductDetail" || !routeName) {
      navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });
    }
    return () => {
      navigation.getParent()?.setOptions({ tabBarStyle: { display: "flex" } });
    };
  }, [navigation, route]);

  const sendMessage = () => {
    if (inputText.trim()) {
      // Thêm tin nhắn người dùng
      const userMessage = {
        id: String(messages.length + 1),
        text: inputText,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        sender: "me",
      };

      // Thêm tin nhắn chatbot
      const botMessage = {
        id: String(messages.length + 2),
        text: "Đã phản hồi",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        sender: "other",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      };

      setMessages((prevMessages) => [...prevMessages, userMessage, botMessage]);
      setInputText("");

      // Cuộn đến tin nhắn mới nhất
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const renderMessage = ({ item }) => (
    <View style={item.sender === "me" ? styles.myMessage : styles.otherMessage}>
      {item.sender === "other" && (
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
      )}
      <View
        style={[
          styles.messageBox,
          item.sender === "me"
            ? { backgroundColor: colors.mainColor }
            : { backgroundColor: "#f0f0f0" },
        ]}
      >
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.headerButtonContainer}
            >
              <AntDesign name="left" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Chatbot</Text>
          </View>
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={renderMessage}
            style={styles.chatContainer}
            contentContainerStyle={{ paddingBottom: 20 }}
            onContentSizeChange={() =>
              flatListRef.current?.scrollToEnd({ animated: true })
            }
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Nhập tin nhắn..."
              placeholderTextColor="#888"
            />
            <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
              <MaterialCommunityIcons name="send" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 10
  },
  innerContainer: {
    flex: 1,
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  myMessage: {
    alignSelf: "flex-end",
    marginVertical: 8,
    maxWidth: "70%",
  },
  otherMessage: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 8,
    maxWidth: "70%",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  messageBox: {
    padding: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  messageText: {
    fontSize: 16,
    color: "#000",
  },
  time: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
    alignSelf: "flex-end",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#eee",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 25,
    marginRight: 10,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  sendButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.mainColor,
    padding: 12,
    borderRadius: 25,
  },
  header: {
    marginTop: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 60,
    backgroundColor: "white",
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    zIndex: 1,
  },
  headerButtonContainer: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "#999",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
});

export default ChatScreen;