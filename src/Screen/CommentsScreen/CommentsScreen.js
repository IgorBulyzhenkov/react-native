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
  FlatList,
} from "react-native";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  increment,
  onSnapshot,
} from "firebase/firestore";
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { db } from "../../../config";
import userImg from "../../img/myPhoto.jpg";

function CommentsScreen({ route }) {
  const [post, setPost] = useState([]);
  const [comment, setComment] = useState("");
  const [textInput, setTextInput] = useState("");
  const [focusInput, setFocusInput] = useState(false);
  const { nickName, userId } = useSelector((state) => state.auth);

  const getAllComments = async () => {
    const querySnapshot = await getDocs(
      collection(db, "posts", `${post.photoId}`, "comments")
    );
    let allComments = [];
    await querySnapshot.forEach((doc) => {
      allComments.push({ ...doc.data(), id: doc.id });
    });
    await setComment(allComments);
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", `${post.photoId}`, "comments"),
      () => {
        setTimeout(() => {
          getAllComments();
        }, 2000);
      },
      (error) => {
        console.log(error);
      }
    );
    setPost(route.params);

    return () => unsubscribe();
  }, [comment]);

  const inputComment = (text) => {
    setTextInput(text);
  };
  const createPost = async () => {
    Keyboard.dismiss();
    if (!textInput.trim()) {
      return;
    }
    try {
      const date = new Date().toString();
      await addDoc(collection(db, "posts", `${post.photoId}`, "comments"), {
        comment: textInput,
        nickName,
        userId,
        date,
      });
      await updateDoc(doc(db, "posts", `${post.photoId}`), {
        comments: increment(1),
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setTextInput("");
  };

  const keyboardVerticalOffset = Platform.OS === "ios" && "padding";
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView behavior={keyboardVerticalOffset}>
        <View style={styles.container}>
          <View style={styles.afterContainer}>
            <Image source={{ uri: post.img }} style={styles.img} />
          </View>
          {comment ? (
            <FlatList
              data={comment}
              keyExtractor={(item) => item?.id}
              style={{
                height: 180,
                width: 343,
                marginBottom: 80,
              }}
              renderItem={({ item }) => {
                console.log(item.userId);
                const date = new Date(item?.date);
                const month = date.getMonth();
                const day = date.getDate();
                const years = date.getFullYear();
                const h = date.getHours();
                const m = date.getMinutes();
                const newMonth = month < 10 ? "0" + month.toString() : month;
                const fullYears = day + "." + newMonth + "." + years;
                const hoursAndMinute = h + ":" + m;
                const border =
                  item.userId === userId
                    ? { borderTopRightRadius: 0 }
                    : { borderTopLeftRadius: 0 };
                const margin =
                  item.userId === userId
                    ? { marginLeft: 16 }
                    : { marginRight: 16 };
                return (
                  <View
                    style={{
                      ...styles.containerUser,
                      flexDirection:
                        item?.userId === userId ? "row" : "row-reverse",
                    }}
                  >
                    <View style={{ ...styles.containerComment, ...border }}>
                      <Text style={styles.text}>{item?.comment}</Text>
                      <View style={styles.dateContainer}>
                        <Text style={styles.date}>{fullYears}</Text>
                        <View style={styles.line}></View>
                        <Text style={styles.hours}>{hoursAndMinute}</Text>
                      </View>
                    </View>
                    <Image
                      source={userImg}
                      style={{ ...styles.imageUser, ...margin }}
                    />
                  </View>
                );
              }}
            />
          ) : null}

          <View
            style={{
              ...styles.footer,
              bottom: focusInput ? (Platform.OS === "ios" ? 80 : 16) : 16,
            }}
          >
            <TextInput
              style={styles.inputComment}
              placeholder="Комментировать..."
              value={textInput}
              name="comment"
              onFocus={() => setFocusInput(true)}
              onBlur={() => setFocusInput(false)}
              onChangeText={inputComment}
            />
            <TouchableOpacity
              style={{
                ...styles.buttonContainer,
                backgroundColor: "#FF6C00",
              }}
              onPress={createPost}
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
    height: "100%",
    alignItems: "center",
    paddingTop: 15,
    backgroundColor: "#fff",
  },
  afterContainer: {
    width: 343,
    marginBottom: 8,
  },
  img: {
    width: "100%",
    height: 267,
    borderRadius: 8,
    marginBottom: 0,
  },
  containerUser: {
    width: "100%",
  },
  imageUser: {
    width: 28,
    height: 28,
    borderRadius: 50,
  },
  footer: {
    width: 343,
    position: "absolute",
  },
  inputComment: {
    height: 50,
    width: "100%",
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
  containerComment: {
    width: "85%",
    alignItems: "flex-start",
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    minHeight: 69,
    padding: 16,
    marginBottom: 10,
    borderRadius: 10,
  },
  dateContainer: {
    justifyContent: "flex-end",
    width: "100%",
    flexDirection: "row",
  },
  date: {
    fontFamily: "Roboto-Regular",
    fontSize: 11,
    marginTop: 8,
    color: "#BDBDBD",
  },
  line: {
    borderLeftWidth: 1,
    borderColor: "#BDBDBD",
    height: 8,
    marginTop: 11,
    marginLeft: 8,
    marginRight: 5,
  },
  hours: {
    fontFamily: "Roboto-Regular",
    fontSize: 11,
    alignItems: "flex-end",
    marginTop: 8,
    color: "#BDBDBD",
  },
  text: {
    fontSize: 13,
    fontFamily: "Roboto-Regular",
    color: "#212121",
  },
});

export default CommentsScreen;
