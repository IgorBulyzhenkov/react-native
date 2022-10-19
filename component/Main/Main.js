import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { authStateChangeUser } from "../redux/auth/authOperations";
import RegistrationScreen from "../Screen/RegistrationScreen/RegistrationScreen";
import LoginScreen from "../Screen/LoginScreen/LoginScreen";
import Home from "../Screen/Home/Home";

const MainStack = createStackNavigator();
SplashScreen.preventAutoHideAsync();
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

const Main = () => {
  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const routing = useRouting(state.stateChange);

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("../../assets/fonts/Roboto/Roboto-Medium.ttf"),
    "Roboto-Regular": require("../../assets/fonts/Roboto/Roboto-Regular.ttf"),
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
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
});

export default Main;
