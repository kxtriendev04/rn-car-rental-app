import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

export const shouldHideTabBar = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "home";

  // Liệt kê các màn hình mà bạn muốn ẩn tab bar
  const hiddenScreens = [
    "ProductDetail",
    "ProductCheckout",
    "TripDateTimePicker",
    "SearchScreen",
    "SearchResultScreen",
    "ReviewScreen",
    "AcommodationMap",
    "AddressScreen",
    "AddressAddition",
  ];

  return hiddenScreens.includes(routeName);
};
