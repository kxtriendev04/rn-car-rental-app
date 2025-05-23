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
import colors from "../../util/colors";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import HeaderNavigation from "../../component/HeaderNavigation";
import api from "../../util/api";

const ChatScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Xin chào! Tôi là chatbot của bạn.",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      sender: "other",
      avatar:
        "https://img.freepik.com/free-vector/cute-bot-say-users-hello-chatbot-greets-online-consultation_80328-195.jpg?semt=ais_hybrid&w=740",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const flatListRef = useRef(null);

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: String(messages.length + 1),
      text: inputText,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      sender: "me",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");

    const reply = await botHandle(inputText);

    const botMessage = {
      id: String(messages.length + 2),
      text: "",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      sender: "other",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    };

    setMessages((prev) => [...prev, botMessage]);

    typeMessage(reply, (currentText) => {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === botMessage.id ? { ...msg, text: currentText } : msg
        )
      );
    });

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const typeMessage = (fullText, callback) => {
    let currentText = "";
    let i = 0;
    const interval = setInterval(() => {
      currentText += fullText[i];
      i++;
      callback(currentText);
      if (i >= fullText.length) clearInterval(interval);
    }, Math.floor(Math.random() * (50 - 10 + 1)) + 10);
  };

  const botHandle = async (inputText) => {
    const text = inputText.trim().toLowerCase();

    if (/xin chào|chào/.test(text)) {
      return "Chào bạn 👋! Tôi có thể giúp gì cho bạn?";
    }

    if (/Tạm biệt/.test(text)) {
      return "Chào bạn 👋! Chúc bạn một ngày vui vẻ";
    }

    if (/(cách|hướng dẫn|làm thế nào).*(đặt|thuê).*xe/.test(text)) {
      return (
        "Sau đây là hướng dẫn các bước chi tiết:\n" +
        "1. Đi tới giao diện trang chủ 🏠\n" +
        "2. Lướt tìm xe mình yêu thích ❤️\n" +
        "3. Chọn xe mình thích 👉👈\n" +
        "4. Điền đầy đủ thông tin về đơn thuê 📋\n" +
        "5. Thanh toán và chờ người chủ xe duyệt đơn 💵\n" +
        "Vậy là bạn đã hoàn thành việc đặt hàng rùi nè 🥰"
      );
    }

    const fetchVehiclesByBrand = async (brand) => {
      try {
        const res = await api.get(`/vehicles/brand?brand=${brand}`);
        if (res.status === 200 && Array.isArray(res.data.results)) {
          const names = res.data.results.map((car) => car.name).join(", ");
          return names || "Chưa có xe nào trong hãng này.";
        } else {
          return "Không lấy được dữ liệu xe từ server.";
        }
      } catch (error) {
        console.error(`Lỗi khi lấy xe hãng ${brand}:`, error);
        return "Có lỗi xảy ra khi gọi API.";
      }
    };

    const brandMatch = text.match(/(kia|vinfast|tesla|toyota)/);
    if (brandMatch) {
      const brand = brandMatch[1].toUpperCase();
      const names = await fetchVehiclesByBrand(brand);
      return `Danh sách xe ${brand}: ${names}`;
    }

    return "Mình chưa hiểu ý của bạn. Bạn nhắn rõ ràng hơn để mình hiểu nhé!";
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
            : { backgroundColor: "white" },
        ]}
      >
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          <HeaderNavigation
            title="Chatbox"
            navigation={navigation}
            headerStyle={{ height: 70 }}
          />
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={renderMessage}
            style={styles.chatContainer}
            contentContainerStyle={{ paddingBottom: 20, marginTop: 8 }}
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
    paddingTop: 10,
  },
  innerContainer: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "#f2f2f2",
    // marginBottom: 20,
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
    backgroundColor: "red",
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
    paddingBottom: 26,
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
