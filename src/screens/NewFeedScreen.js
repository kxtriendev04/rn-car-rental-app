import {
  AntDesign,
  Entypo,
  EvilIcons,
  FontAwesome5,
  FontAwesome6,
  Fontisto,
} from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Animated,
  FlatList,
} from "react-native";
import colors from "../util/colors";
import OverlappingAvatars from "../component/OverlappingAvatars";
import { useNavigation } from "@react-navigation/native";
const posts = [
  {
    id: 1,
    author: "Khúc Triển",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    date: "23/3/2024",
    content:
      "Du lịch không chỉ là việc đặt chân đến những vùng đất mới, mà còn là hành trình khám phá văn hóa, con người và những trải nghiệm đáng nhớ.",
    image:
      "https://vcdn1-dulich.vnecdn.net/2022/06/03/cau-vang-jpeg-mobile-4171-1654247848.jpg?w=0&h=0&q=100&dpr=1&fit=crop&s=xrjEn1shZLiHomFix1sHNQ",
    likes: 1080,
    comments: [
      {
        id: 1,
        user: "Nguyễn Văn A",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        text: "Bài viết rất hay! Mình cũng muốn đi Đà Nẵng",
      },
      {
        id: 2,
        user: "Nguyễn Văn Z",
        avatar: "https://randomuser.me/api/portraits/women/4.jpg",
        text: "Bài viết rất hay! Mình cũng muốn đi Đà Nẵng",
      },
      {
        id: 3,
        user: "Nguyễn Văn H",
        avatar: "https://randomuser.me/api/portraits/women/3.jpg",
        text: "Cũng được",
      },
    ],
  },
  {
    id: 2,
    author: "Minh Huy",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    date: "22/3/2024",
    content:
      "Chạy bộ mỗi sáng giúp tôi có thêm năng lượng tích cực cho ngày mới! Hãy thử một lần, bạn sẽ cảm nhận được sự thay đổi.",
    image:
      "https://cdn.benhvienthucuc.vn/wp-content/uploads/2024/10/tac-dung-cua-chay-bo-doi-voi-than.jpg",
    likes: 950,
    comments: [],
  },
  {
    id: 3,
    author: "Lan Phương",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    date: "21/3/2024",
    content:
      "Món ăn đường phố Việt Nam thực sự là một kho tàng ẩm thực tuyệt vời! Bún chả, phở, bánh mì, tất cả đều rất ngon!",
    image:
      "https://static.vinwonders.com/production/mon-an-duong-pho-viet-nam-1.webp",
    likes: 1120,
    comments: [
      {
        id: 2,
        user: "Hoàng Tú",
        avatar: "https://randomuser.me/api/portraits/men/4.jpg",
        text: "Đúng rồi, ẩm thực Việt Nam quá tuyệt vời!",
      },
    ],
  },
  {
    id: 4,
    author: "Hoàng Nam",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    date: "20/3/2024",
    content:
      "Cà phê sáng là một phần không thể thiếu trong cuộc sống của tôi. Một ly cà phê đậm đà giúp tôi bắt đầu ngày mới thật tràn đầy năng lượng!",
    image:
      "https://cafedalat.net/wp-content/uploads/2020/10/ly-ca-phe-buoi-sang-2.jpg",
    likes: 870,
    comments: [],
  },
  {
    id: 5,
    author: "Bảo Trân",
    avatar: "https://randomuser.me/api/portraits/women/6.jpg",
    date: "19/3/2024",
    content:
      "Chuyến du lịch miền Tây vừa rồi thực sự là một trải nghiệm đáng nhớ. Cảnh đẹp, con người thân thiện và những món ăn ngon!",
    image:
      "https://cdn.pixabay.com/photo/2019/12/28/08/06/boat-4726226_960_720.jpg",
    likes: 1250,
    comments: [],
  },
  {
    id: 6,
    author: "Duy Khang",
    avatar: "https://randomuser.me/api/portraits/men/7.jpg",
    date: "18/3/2024",
    content:
      "Học lập trình là một hành trình thú vị! Hôm nay tôi vừa hoàn thành dự án đầu tiên của mình với React Native.",
    image:
      "https://cdn.pixabay.com/photo/2016/02/19/11/53/startup-1217363_960_720.jpg",
    likes: 980,
    comments: [],
  },
  {
    id: 7,
    author: "Quỳnh Chi",
    avatar: "https://randomuser.me/api/portraits/women/8.jpg",
    date: "17/3/2024",
    content:
      "Một buổi chiều yên bình bên bờ biển thực sự giúp tôi thư giãn và nạp lại năng lượng!",
    image:
      "https://cdn.pixabay.com/photo/2015/09/18/20/22/sunset-949082_960_720.jpg",
    likes: 890,
    comments: [],
  },
  {
    id: 8,
    author: "Hải Đăng",
    avatar: "https://randomuser.me/api/portraits/men/9.jpg",
    date: "16/3/2024",
    content:
      "Tập gym mỗi ngày giúp tôi có một cơ thể khỏe mạnh và tinh thần sảng khoái!",
    image:
      "https://cdn.pixabay.com/photo/2015/10/31/12/34/man-1016043_960_720.jpg",
    likes: 750,
    comments: [],
  },
  {
    id: 9,
    author: "Linh Đan",
    avatar: "https://randomuser.me/api/portraits/women/10.jpg",
    date: "15/3/2024",
    content:
      "Sáng nay tôi vừa hoàn thành cuốn sách 'Nhà giả kim'. Một câu chuyện đầy cảm hứng về việc theo đuổi ước mơ!",
    image:
      "https://cdn.pixabay.com/photo/2017/03/27/13/51/book-2178666_960_720.jpg",
    likes: 1020,
    comments: [],
  },
  {
    id: 10,
    author: "Văn Hậu",
    avatar: "https://randomuser.me/api/portraits/men/11.jpg",
    date: "14/3/2024",
    content:
      "Nghệ thuật là cách tôi thể hiện cảm xúc và suy nghĩ của mình. Đây là bức tranh mới nhất tôi vừa hoàn thành!",
    image:
      "https://cdn.pixabay.com/photo/2015/11/07/11/58/art-1033463_960_720.jpg",
    likes: 860,
    comments: [],
  },
];

const components = [
  {
    id: 1,
  },
];

const NewFeedScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <FeedItem post={item} />}
        ListHeaderComponent={
          <View>
            {/* Header */}
            <View
              style={{
                paddingHorizontal: 15,
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                height: 60,
                backgroundColor: colors.whiteColor,
              }}
            >
              <View
                style={{
                  padding: 8,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                  backgroundColor: "white",
                  shadowColor: "#999", // Màu bóng
                  shadowOffset: { width: 1, height: 1 }, // Độ lệch bóng (X, Y)
                  shadowOpacity: 0.5, // Độ mờ
                  shadowRadius: 2, // Bán kính mờ
                  elevation: 2, // Bóng trên Android
                }}
              >
                <AntDesign
                  name="search1"
                  style={styles.icon}
                  size={24}
                  color="#555"
                />
              </View>
              <Text style={{ fontSize: 17, fontWeight: 600 }}>Feeds</Text>
              <View
                style={{
                  padding: 8,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                  backgroundColor: "white",
                  shadowColor: "#999", // Màu bóng
                  shadowOffset: { width: 1, height: 1 }, // Độ lệch bóng (X, Y)
                  shadowOpacity: 0.5, // Độ mờ
                  shadowRadius: 2, // Bán kính mờ
                  elevation: 2, // Bóng trên Android
                }}
              >
                <Fontisto
                  styles={styles.notifiContainer}
                  name="bell"
                  size={24}
                  color="#555"
                  onPress={() => {
                    navigation.navigate("Notification");
                  }}
                />
              </View>
            </View>
            {/* Create a post */}
            <View
              style={{
                paddingHorizontal: 15,
                paddingVertical: 15,
                // marginTop: 16,
                backgroundColor: colors.whiteColor,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <Image
                  source={{
                    uri: "https://randomuser.me/api/portraits/men/10.jpg",
                  }}
                  style={{ width: 36, height: 36, borderRadius: 50 }}
                />
                <Text style={{ fontSize: 15 }}>What's new?</Text>
              </View>
              {/* <FontAwesome5 name="file-image" size={20} color="#333" /> */}
              <EvilIcons name="image" size={30} color="#333" />
            </View>
            <View style={{ padding: 8, backgroundColor: "#f2f2f2" }}></View>
          </View>
        }
        ListFooterComponent={
          <View>
            <Text style={{ fontSize: 18, color: "gray", textAlign: "center" }}>
              Bạn đã học hết New Feeds
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const FeedItem = ({ post }) => {
  const [love, setLove] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current; // Giá trị scale ban đầu
  const handleLoveItem = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2, // Phóng to nhẹ
        duration: 100, // Thời gian nhanh hơn
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1, // Thu nhỏ lại
        duration: 100, // Thời gian nhanh hơn
        useNativeDriver: true,
      }),
    ]).start(() => setLove(!love)); // Sau khi hiệu ứng xong thì đổi trạng thái
  };

  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate("PostDetail", { post });
  };
  return (
    <TouchableOpacity
      style={{
        // paddingHorizontal: 15,
        paddingVertical: 16,
        backgroundColor: colors.whiteColor,
      }}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <View
        style={{
          // marginTop: 16,
          paddingHorizontal: 15,
          paddingVertical: 16,
          backgroundColor: colors.whiteColor,
        }}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
            <Image
              source={{ uri: post?.avatar }} // Đường dẫn đến ảnh
              style={{ width: 48, height: 48, borderRadius: 50 }} // Kích thước ảnh
            />
            <View>
              <Text style={{ fontWeight: 600, fontSize: 18 }}>
                {post.author}
              </Text>
              <Text style={{ color: colors.textGray, fontSize: 12 }}>
                {post.date}
              </Text>
            </View>
          </View>
          <View>
            <Entypo name="dots-three-vertical" size={20} color="black" />
          </View>
        </View>
        <View style={{}}>
          <Text
            ellipsizeMode="tail"
            numberOfLines={3}
            style={{ fontSize: 15, lineHeight: 20, paddingVertical: 16 }}
          >
            {post.content}
          </Text>
          <Image
            source={{
              uri: post.image,
            }}
            style={{
              height: 220,
              width: "100%",
              objectFit: "cover",
              borderRadius: 12,
            }}
          />
        </View>
        {/*  */}
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 12,
              marginBottom: 6,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 16,
                paddingHorizontal: 4,
              }}
            >
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
          <Text
            style={{
              color: colors.textGray,
              fontSize: 12,
              paddingHorizontal: 4,
              marginBottom: 2,
            }}
          >
            Liked by{" "}
            {love
              ? "you and " + post.likes + " others"
              : post.likes + " people"}
          </Text>
          <OverlappingAvatars comments={post.comments}></OverlappingAvatars>
        </View>
      </View>
      <View style={{ padding: 8, backgroundColor: "#f2f2f2" }}></View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "white",
  },
});

export default NewFeedScreen;
