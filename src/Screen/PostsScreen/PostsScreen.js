import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { FontAwesome5, EvilIcons } from "@expo/vector-icons";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../../../config";
import userImg from "../../img/myPhoto.jpg";
import { useSelector } from "react-redux";

function PostScreen({ navigation }) {
  const [post, setPost] = useState([]);
  const { email, nickName } = useSelector((state) => state.auth);
  const getAllDocs = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    const newPosts = [];
    querySnapshot.forEach((doc) => {
      newPosts.push({ ...doc.data(), id: doc.id });
    });
    setPost(newPosts);
  };
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts"),
      () => {
        getAllDocs();
      },
      (error) => {
        console.log(error);
      }
    );
    return () => unsubscribe();
  }, []);
  
  return (
    <View style={styles.container}>
      <View style={styles.containerUser}>
        <Image style={styles.imageUser} source={userImg} />
        <View style={styles.containerUserData}>
          <Text style={styles.name}>{nickName}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
      </View>
      <FlatList
        data={post.reverse()}
        renderItem={({ item }) => {
          return (
            <View
              style={{ ...styles.containerImg, width: 343, marginBottom: 32 }}
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
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 32,
    marginBottom: 60,
  },
  containerUser: {
    width: 343,
    flexDirection: "row",
    marginBottom: 32,
  },
  imageUser: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  containerUserData: {
    marginLeft: 8,
    justifyContent: "center",
  },
  name: {
    fontSize: 13,
    fontFamily: "Roboto-Medium",
    color: "#212121",
  },
  email: {
    fontSize: 11,
    fontFamily: "Roboto-Regular",
    color: "rgba(33, 33, 33, 0.8)",
  },
  containerImg: {
    flex: 1,
  },
  containerPost: {
    width: 343,
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

export default PostScreen;
