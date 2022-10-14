import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Feather } from "@expo/vector-icons";

function CommentsScreen({ route, navigation }) {
  const [post, setPost] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (!route.params) {
      return;
    }
    setPost(route.params);
  }, [route.params]);

  const inputComment = (text) => {
    setComment(text);
  };
  const handleClick = () => {
    if (!comment) {
      return;
    }
    Keyboard.dismiss();
    console.log(comment);
    setComment("");
  };

  const keyboardVerticalOffset = Platform.OS === "ios" && "padding";

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView behavior={keyboardVerticalOffset}>
        <View style={styles.container}>
          <View style={styles.afterContainer}>
            <Image source={{ uri: post.img }} style={styles.img} />
          </View>
          <View style={styles.footer}>
            <TextInput
              style={styles.inputComment}
              placeholder="Комментировать..."
              value={comment}
              name="comment"
              onChangeText={inputComment}
            />
            <TouchableOpacity
              style={{
                ...styles.buttonContainer,
                backgroundColor: "#FF6C00",
              }}
              onPress={handleClick}
            >
              <Feather name="arrow-up" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    paddingTop: 32,
    backgroundColor: "#fff",
  },
  afterContainer: {
    width: 343,
    height: "100%",
  },
  img: {
    width: "100%",
    height: 267,
    borderRadius: 8,
    marginBottom: 32,
  },
  footer: {
    width: 343,
    position: "absolute",
    bottom: 16,
  },
  inputComment: {
    height: 50,
    backgroundColor: "#E8E8E8",
    borderRadius: 100,
    paddingLeft: 16,
    paddingRight: 45,
  },
  buttonContainer: {
    position: "absolute",
    right: 8,
    top: 8,
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
});

export default CommentsScreen;
