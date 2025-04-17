import { AntDesign, Feather, Fontisto, Ionicons } from "@expo/vector-icons";

export const icons = {
  HomeStack: (props) => <AntDesign name="home" size={20} {...props} />,
  NewFeedStack: (props) => (
    <Ionicons name="newspaper-outline" size={20} {...props} />
  ),
  Explore: (props) => <Feather name="compass" size={20} {...props} />,
  // HomeStack: (props) => <AntDesign name="home" size={20} {...props} />,
  Chat: (props) => <Fontisto name="hipchat" size={20} {...props} />,
  ProfileStack: (props) => <AntDesign name="user" size={20} {...props} />,
  // profile: (props) => <AntDesign name="user" size={20} {...props} />,
};
