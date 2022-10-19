import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  ImageBackground,
  Image,
  FlatList,
  Platform,
} from "react-native";
import { useSelector } from "react-redux";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5, EvilIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "../../../config";
import userImg from "../../img/myPhoto.jpg";
import { authSingOutUser } from "../../redux/auth/authOperations";

function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const { userId, nickName } = useSelector((state) => state.auth);

  const getAllPosts = async () => {
    const q = query(collection(db, "posts"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    let newPosts = [];
    querySnapshot.forEach((doc) => {
      newPosts.push({ ...doc.data(), id: doc.id });
    });
    setPosts(newPosts);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getAllPosts();
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground
        source={{ uri: "https://i.postimg.cc/d1MrrJNz/Photo-BG.png" }}
        style={styles.backImage}
      >
        <View
          style={{
            ...styles.container,
            height: Platform.OS === "ios" ? 450 : 580,
          }}
        >
          <Feather
            name="log-out"
            size={24}
            color="#BDBDBD"
            style={{
              marginRight: 20,
              position: "absolute",
              right: 16,
              top: 22,
            }}
            onPress={() => dispatch(authSingOutUser())}
          />
          <View style={styles.avatar}>
            <Image source={userImg} style={styles.img} />
            <View style={styles.border}>
              <Text style={styles.plus}>X</Text>
            </View>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{nickName}</Text>
          </View>
          <FlatList
            data={posts.reverse()}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    ...styles.containerImg,
                    width: 343,
                    marginBottom: 32,
                  }}
                >
                  <Image source={{ uri: item.photo }} style={styles.image} />
                  <Text style={styles.nameImg}>{item.nameLocation}</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <TouchableOpacity
                      style={styles.comment}
                      onPress={() => {
                        navigation.navigate("CommentsScreen", {
                          img: item.photo,
                          photoId: item.id,
                        });
                      }}
                    >
                      <FontAwesome5 name="comments" size={24} color="#BDBDBD" />
                      <Text style={styles.commentNumber}>
                        {item.comments > 0 ? item.comments : 0}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.location}
                      onPress={() => {
                        navigation.navigate("MapScreen", {
                          location: item.photoLocation,
                        });
                      }}
                    >
                      <EvilIcons
                        name="location"
                        size={24}
                        color="#BDBDBD"
                        style={styles.iconLocation}
                      />
                      <Text style={styles.nameLocation}>{item.location}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
            keyExtractor={(item) => item.id}
          />
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  backImage: {
    justifyContent: "center",
    flex: 1,
    resizeMode: "contain",
  },
  img: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  nameContainer: {
    marginBottom: 32,
  },
  name: {
    fontSize: 30,
    fontFamily: "Roboto-Medium",
    color: "#212121",
  },
  container: {
    backgroundColor: "#fff",
    paddingTop: 85,
    width: "100%",
    marginTop: "auto",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  avatar: {
    position: "absolute",
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    top: -60,
    borderRadius: 16,
  },
  border: {
    position: "absolute",
    width: 25,
    height: 25,
    bottom: 14,
    right: -12.5,
    borderRadius: 50,
    borderColor: "#BDBDBD",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  plus: {
    color: "#BDBDBD",
  },
  containerImg: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 267,
    borderRadius: 8,
  },
  nameImg: {
    fontSize: 16,
    fontFamily: "Roboto-Medium",
    marginTop: 8,
  },
  comment: {
    marginTop: 8,
    width: 50,
    marginLeft: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  commentNumber: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    color: "#BDBDBD",
    marginLeft: 10,
  },
  location: {
    minWidth: 100,
    marginTop: 8,
    right: 0,
    flexDirection: "row",
  },
  nameLocation: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    color: "#212121",
    textDecorationLine: "underline",
  },
});
export default ProfileScreen;
