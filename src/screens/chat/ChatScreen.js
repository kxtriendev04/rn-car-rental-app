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
    if (!inputText.trim()) return;
  
    const userMessage = {
      id: String(messages.length + 1),
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      sender: "me",
    };
  
    const botReply = botHandle(inputText);
  
    const botMessage = {
      id: String(messages.length + 2),
      text: "",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      sender: "other",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    };
  
    // Thêm tin nhắn user và bot (trống) vào list
    setMessages((prev) => [...prev, userMessage, botMessage]);
  
    setInputText("");
  
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  
    typeMessage(botReply, (currentText) => {
      setMessages((prevMessages) => {
        return prevMessages.map((msg) =>
          msg.id === botMessage.id ? { ...msg, text: currentText } : msg
        );
      });
    });
  };

  const typeMessage = (fullText, callback) => {
    let currentText = "";
    let i = 0;
  
    const interval = setInterval(() => {
      currentText += fullText[i];
      i++;
  
      if (i === fullText.length) {
        clearInterval(interval);
        callback(currentText); 
      } else {
        callback(currentText); 
      }
    }, Math.floor(Math.random() * (100 - 10 + 1)) + 10); 
  };

  const carData = {
    vinfast: {
      vf7: {
        name: "VF7",
        seats: 4,
        owner: "Nguyễn Văn A",
        location: "Hà Nội",
        price: "1.000.000 VNĐ"
      },
      vf8: {
        name: "VF8",
        seats: 7,
        owner: "Nguyễn Thị B",
        location: "Hà Nội",
        price: "1.500.000 VNĐ"
      },
      vf9: {
        name: "VF9",
        seats: 7,
        owner: "Nguyễn Văn C",
        location: "Hà Nội",
        price: "2.000.000 VNĐ"
      }
    }
  };

  const botHandle = (inputText) => {
    const text = inputText.trim().toLowerCase();
  
    switch (true) {
      case /xin chào|chào|tạm biệt/.test(text):
        return "Chào bạn 👋! Tôi có thể giúp gì cho bạn?";
  
      case /(cách|hướng dẫn|làm thế nào).*(đặt|thuê).*xe/.test(text):
        return 'Sau đây là hướng dẫn các bước chi tiết:\n' + 
          '1. Đi tới giao diện trang chủ 🏠\n' +
          '2. Lướt tìm xe mình yêu thích ❤️\n' +
          '3. Chọn xe mình thích 👉👈\n' +
          '4. Điền đầy đủ thông tin về đơn thuê 📋\n' +
          '5. Thanh toán và chờ người chủ xe duyệt đơn 💵\n' +
          'Vậy là bạn đã hoàn thành việc đặt hàng rùi nè 🥰';
  
      case /vf|vinfast/.test(text):
        return botHandle2nd(text);
  
      default:
        return "Mình chưa hiểu ý của bạn. Bạn nhắn rõ ràng hơn để mình hiểu nhé!";
    }
  };
  
  const botHandle2nd = (text) => {
    switch (true) {
      case /(vf|vinfast).*7/.test(text):  
        return "Đây là thông tin về xe: \n" +
          '1. Tên xe: VF7\n' +
          '2. Số chỗ ngồi: 4 chỗ\n' +
          '3. Chủ xe: Nguyễn Văn A\n' +
          '4. Địa điểm chủ xe: Hà Nội\n' +
          '5. Giá thuê 1 ngày: 1.000.000 VNĐ\n' +
          'Trên đây là 1 vài thông tin cơ bản về 1 xe của app, nếu bạn cảm thấy chưa hài lòng thì có thể tham khảo ' +
          'mẫu xe khác tại trang chủ nhé 😁, Nếu đã hài lòng và ' +
          'bạn muốn thông tin chi tiết về xe, bạn có thể liên hệ với chủ xe nhé!' +
          'Đây là số điện thoại của chủ xe: 0123456789 🥰';
      case /(vf|vinfast).*8/.test(text):  
        return "Đây là thông tin về xe: \n" +
          '1. Tên xe: VF8\n' +
          '2. Số chỗ ngồi: 7 chỗ\n' +
          '3. Chủ xe: Nguyễn Thị B\n' +
          '4. Địa điểm chủ xe: Hà Nội\n' +
          '5. Giá thuê 1 ngày: 1.500.000 VNĐ\n' +
          'Trên đây là 1 vài thông tin cơ bản về 1 xe của app, nếu bạn cảm thấy chưa hài lòng thì có thể tham khảo ' +
          'mẫu xe khác tại trang chủ nhé 😁, Nếu đã hài lòng và ' +
          'bạn muốn thông tin chi tiết về xe, bạn có thể liên hệ với chủ xe nhé!' +
          'Đây là số điện thoại của chủ xe: 0123456789 🥰';
      case /(vf|vinfast).*9/.test(text):  
        return "Đây là thông tin về xe: \n" +
          '1. Tên xe: VF9\n' +
          '2. Số chỗ ngồi: 7 chỗ\n' +
          '3. Chủ xe: Nguyễn Văn C\n' +
          '4. Địa điểm chủ xe: Hà Nội\n' +
          '5. Giá thuê 1 ngày: 2.000.000 VNĐ\n' +
          'Trên đây là 1 vài thông tin cơ bản về 1 xe của app, nếu bạn cảm thấy chưa hài lòng thì có thể tham khảo ' +
          'mẫu xe khác tại trang chủ nhé 😁, Nếu đã hài lòng và ' +
          'bạn muốn thông tin chi tiết về xe, bạn có thể liên hệ với chủ xe nhé!' +
          'Đây là số điện thoại của chủ xe: 0123456789 🥰';
      default: 
        return "Hiện tại trang web thuê xe đang có những dòng xe như VF7, VF8, VF9. Bạn muốn tìm hiểu về xe nào nhỉ? 😉";
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
    paddingTop: 10
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