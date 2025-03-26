import React, { useLayoutEffect, useState } from "react";
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
} from "react-native";

import {
  getFocusedRouteNameFromRoute,
  useNavigation,
} from "@react-navigation/native";
import colors from "../../util/colors";
import { AntDesign, Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const ChatScreen = ({ navigation, route }) => {
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Hello! Jhon abraham",
      time: "09:25 AM",
      sender: "me",
    },
    {
      id: "2",
      text: "Hello! Nazrul How are you?",
      time: "09:25 AM",
      sender: "other",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: "3",
      text: "You did your job well!",
      time: "09:25 AM",
      sender: "me",
    },
    {
      id: "4",
      text: "Have a great working week!!",
      time: "09:25 AM",
      sender: "other",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    },
  ]);

  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === "ProductDetail" || !routeName) {
      navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });
    }
    return () => {
      navigation.getParent()?.setOptions({ tabBarStyle: { display: "flex" } });
    };
  }, [navigation, route]);

  const [inputText, setInputText] = useState("");

  const sendMessage = () => {
    if (inputText.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: String(prevMessages.length + 1),
          text: inputText,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          sender: "me",
        },
      ]);
      setInputText("");
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
            ? { backgroundColor: "#66DD7A" }
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
            <Text style={styles.headerTitle}>Name</Text>
            <View style={{ padding: 8 }}></View>
          </View>
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={renderMessage}
            style={styles.chatContainer}
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Write your message"
            />
            <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
              <MaterialCommunityIcons name="send" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  innerContainer: { flex: 1 },
  chatContainer: { flex: 1, padding: 10 },
  myMessage: {
    alignSelf: "flex-end",
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
    maxWidth: "70%",
  },
  otherMessage: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  messageBox: {
    padding: 10,
    borderRadius: 10,
    maxWidth: "70%",
  },
  messageText: { fontSize: 16 },
  time: { fontSize: 12, color: "gray", marginTop: 5, alignSelf: "flex-end" },
  inputContainer: {
    flexDirection: "row",
    padding: 15,
    borderTopWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    marginRight: 10,
  },
  sendButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.mainColor,
    padding: 10,
    paddingLeft: 12,
    borderRadius: 20,
  },
  header: {
    marginTop: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 80,
    backgroundColor: "white",
    paddingHorizontal: 15,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 500,
  },
  headerButtonContainer: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "#999", // Màu bóng
    shadowOffset: { width: 1, height: 1 }, // Độ lệch bóng (X, Y)
    shadowOpacity: 0.5, // Độ mờ
    shadowRadius: 2, // Bán kính mờ
    elevation: 2, // Bóng trên Android
  },
});

export default ChatScreen;
