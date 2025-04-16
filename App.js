import { StyleSheet, Text, View, TextInput } from "react-native";
import Navigation from "./src/navigation/Navigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFonts } from "expo-font";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import {
  Quicksand_400Regular,
  Quicksand_700Bold,
  Quicksand_600SemiBold,
  Quicksand_500Medium,
} from "@expo-google-fonts/quicksand";
import {
  // useFonts,
  BeVietnamPro_700Bold,
  BeVietnamPro_600SemiBold,
  BeVietnamPro_500Medium,
  BeVietnamPro_400Regular,
  // BeVietnamPro_600Bold,
  // BeVietnamPro_500Bold,
} from "@expo-google-fonts/be-vietnam-pro";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    BeVietnamPro_700Bold,
    BeVietnamPro_600SemiBold,
    BeVietnamPro_500Medium,
    BeVietnamPro_400Regular,
    Quicksand_400Regular,
    Quicksand_700Bold,
    Quicksand_600SemiBold,
    Quicksand_500Medium,
  });

  if (!fontsLoaded) return null;

  // Cài font mặc định cho toàn bộ Text & TextInput
  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.style = { fontFamily: "BeVietnamPro_400Regular" };

  TextInput.defaultProps = TextInput.defaultProps || {};
  TextInput.defaultProps.style = { fontFamily: "BeVietnamPro_400Regular" };

  return (
    <GestureHandlerRootView>
      <Navigation></Navigation>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({});
