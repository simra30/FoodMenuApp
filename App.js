import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, StyleSheet } from "react-native"; // Import Image and StyleSheet
import MenuScreen from "./src/screens/MenuScreen";
import ItemDetailScreen from "./src/screens/ItemDetailScreen";
import CartScreen from "./src/screens/CartScreen";
import { MenuProvider } from "./src/context/MenuContext";
import { CartProvider } from "./src/context/CartContext";
import OrderHistoryScreen from "./src/screens/OrderHistory";
import SplashScreen from "./src/screens/SplashScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MenuStack = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Menu" component={MenuScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ItemDetail" component={ItemDetailScreen} options={{ headerShown: false }} />
      <Stack.Screen name="orderhistory" component={OrderHistoryScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};


const AppTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let imageSource;

          if (route.name === "Menuu") {
            imageSource = focused
              ? require("./src/assets/home1.png")
              : require("./src/assets/home.png");
          } else if (route.name === "Cart") {
            imageSource = focused
              ? require("./src/assets/cart.png")
              : require("./src/assets/cart1.png");
          }

          return (
            <Image
              source={imageSource}
              style={styles.tabIcon}
            />
          );
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Menuu"
        component={MenuStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Cart" component={CartScreen}

        options={{ headerShown: false }} />
      <Tab.Screen name="OrderHistory" component={OrderHistoryScreen}

        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('./src/assets/history.png')}
              style={{ width: size, height: size, tintColor: "tomato" }}
            />
          )
        }} />
     

    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <MenuProvider>
      <CartProvider>
        <NavigationContainer>
          <AppTabs />
        </NavigationContainer>
      </CartProvider>
    </MenuProvider>
  );
};

const styles = StyleSheet.create({
  tabIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    tintColor: 'tomato'
  },
});

export default App;