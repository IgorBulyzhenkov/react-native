import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import RegistrationScreen from "./component/Screen/RegistrationScreen/RegistrationScreen";
import { useCallback } from "react";
import LoginScreen from "./component/Screen/LoginScreen/LoginScreen";
import Home from "./component/Screen/Home/Home";

SplashScreen.preventAutoHideAsync();
const MainStack = createStackNavigator();

const useRouting = (isAuth) => {
  if (!isAuth) {
    return (
      <>
        <MainStack.Screen
          name="RegistrationScreen"
          component={RegistrationScreen}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
      </>
    );
  }
  return (
    <MainStack.Screen
      name="Home"
      component={Home}
      options={{
        headerShown: false,
        
      }}
    />
  );
};

export default function App() {
  const routing = useRouting({});
  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container} onLayout={onLayoutRootView}>
          <MainStack.Navigator initialRouteName="LoginScreen">
            {routing}
          </MainStack.Navigator>
        </View>
      </TouchableWithoutFeedback>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
});
