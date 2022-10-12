import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";

import { View, Text, StyleSheet, TouchableHighlight } from "react-native";

const Tabs = createBottomTabNavigator();

function CreatePostsScreen() {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>CreatePostsScreen!</Text>
      </View>
      <View style={styles.footer}>
        <TouchableHighlight style={styles.delete}>
          <AntDesign name="delete" size={24} color="#BDBDBD" />
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent:"flex-end",
  },
  delete: {
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F6F6F6",
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    height: 83,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CreatePostsScreen;
