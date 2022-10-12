// import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import CreatePostsScreen from "../CreatePostsScreen/CreatePostsScreen";
import PostScreen from "../PostsScreen/PostsScreen";
import ProfileScreen from "../ProfileScreen/ProfileScreen";

const Tabs = createBottomTabNavigator();

const Home = ({ navigation }) => {
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 83,
        },
      }}
    >
      <Tabs.Screen
        name="PostScreen"
        component={PostScreen}
        options={{
          title: "Публикации",
          headerStyl: {
            alignItems: "center",
          },
          headerTitleStyle: {
            marginLeft: Platform.OS !== "ios" && "55%",
          },
          headerRight: () => (
            <Feather
              name="log-out"
              size={24}
              color="#BDBDBD"
              style={{ marginRight: 20 }}
              onPress={() => alert("This is a button!")}
            />
          ),

          tabBarIcon: ({ focused, size, color }) => {
            return focused ? (
              <AntDesign name="appstore-o" size={size} color="#FF6C00" />
            ) : (
              <AntDesign name="appstore-o" size={size} color={color} />
            );
          },
        }}
      />
      <Tabs.Screen
        name="CreatePostsScreen"
        component={CreatePostsScreen}
        options={{
          title: "Создать публикацию",
          headerTitleStyle: {
            marginLeft: Platform.OS !== "ios" && "30%",
          },
          // headerStyle: {  textAlign: "center" },
          tabBarStyle: { display: "none" },
          headerLeft: () => {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.arrow}
                onPress={() => navigation.navigate("PostScreen")}
              >
                <AntDesign
                  name="arrowleft"
                  size={24}
                  color="rgba(33, 33, 33, 0.8)"
                />
              </TouchableOpacity>
            );
          },
          tabBarIcon: ({ size }) => {
            return (
              <View style={styles.plus}>
                <AntDesign name="plus" size={size} color="#fff" />
              </View>
            );
          },
        }}
      />

      <Tabs.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => {
            return focused ? (
              <Feather name="user" size={size} color="#FF6C00" />
            ) : (
              <Feather name="user" size={size} color={color} />
            );
          },
        }}
      />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  plus: {
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FF6C00",
    alignItems: "center",
    justifyContent: "center",
  },
  arrow: {
    marginLeft: 16,
    width: 24,
    height: 24,
  },
});

export default Home;