import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import uuid from "react-native-uuid";
import { storage, db } from "../../../config";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Image,
} from "react-native";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function CreatePostsScreen({ navigation }) {
  const [nameLocation, setNameLocation] = useState("");
  const [location, setLocation] = useState("");
  const [focus, setFocus] = useState(true);
  const [camera, setCamera] = useState("");
  const [photoLocation, setPhotoLocation] = useState(null);
  const [newPhoto, setNewPhoto] = useState(null);

  const [_, setHasCameraPermission] = useState(null);

  const { userId, nickName } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      await Camera.requestCameraPermissionsAsync();
      const cameraStatus = await Camera.getCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  const inputName = (text) => {
    setNameLocation(text);
  };

  const inputLocation = (text) => {
    setLocation(text);
  };

  const reset = () => {
    setNameLocation("");
    setLocation("");
    setNewPhoto(null);
  };

  const uploadPhotoToServer = async () => {
    try {
      const postId = uuid.v4().split("-").join("");
      const response = await fetch(newPhoto);
      const file = await response.blob();
      const storageRef = await ref(storage, `posts/${postId}`);
      await uploadBytesResumable(storageRef, file);
      const photo = await getDownloadURL(storageRef);
      return photo;
    } catch (err) {
      console.log(err);
    }
  };

  const uploadPostToServer = async () => {
    try {
      const photo = await uploadPhotoToServer();
      await addDoc(collection(db, "posts"), {
        photo,
        nameLocation,
        location,
        photoLocation,
        userId,
        nickName,
      });
    } catch (error) {
      console.error("Error adding document: ", error.message);
    }
  };

  const handleClick = async () => {
    Keyboard.dismiss();
    if (!nameLocation && !location) {
      return;
    }
    MediaLibrary.createAssetAsync(newPhoto);
    await uploadPostToServer();

    navigation.navigate("PostScreen");
    reset();
  };

  const photoRepeater = () => {
    setNewPhoto(null);
  };

  const keyboardVerticalOffset = Platform.OS === "ios" ? "padding" : "height";

  const takePhoto = async () => {
    try {
      const photo = await camera.takePictureAsync();
      setNewPhoto(photo.uri);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setPhotoLocation(coords);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View
          style={{
            ...styles.main,
            marginBottom: !focus ? (Platform.OS === "ios" ? 100 : 0) : 25,
          }}
        >
          {newPhoto ? (
            <>
              <View
                style={{
                  ...styles.camera,
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                  position: "absolute",
                  top: 90,
                  left: "41%",
                  zIndex: 2,
                }}
              >
                <FontAwesome name="camera" size={24} color="#FFFFFF" />
              </View>
              <View style={{ ...styles.photo }}>
                <Image
                  source={{ uri: newPhoto }}
                  style={{ width: "100%", height: 240, borderRadius: 8 }}
                />
              </View>
            </>
          ) : (
            <Camera style={styles.photo} ref={setCamera}>
              <TouchableOpacity
                style={{ ...styles.camera, backgroundColor: "#fff" }}
                onPress={takePhoto}
              >
                <FontAwesome name="camera" size={24} color="#BDBDBD" />
              </TouchableOpacity>
            </Camera>
          )}
          {newPhoto ? (
            <Text
              style={{ ...styles.text, width: 180 }}
              onPress={photoRepeater}
            >
              ?????????????????????????? ????????
            </Text>
          ) : (
            <Text style={styles.text}>?????????????????? ????????</Text>
          )}

          <KeyboardAvoidingView behavior={keyboardVerticalOffset}>
            <View>
              <TextInput
                style={styles.inputName}
                placeholder="????????????????..."
                value={nameLocation}
                name="name"
                onChangeText={inputName}
                onFocus={() => setFocus(false)}
                onBlur={() => setFocus(true)}
              />
              <View style={styles.containerInput}>
                <EvilIcons
                  name="location"
                  size={24}
                  color="#BDBDBD"
                  style={styles.iconLocation}
                />
                <TextInput
                  style={styles.inputLocation}
                  placeholder="??????????????????..."
                  value={location}
                  name="location"
                  onChangeText={inputLocation}
                  onFocus={() => setFocus(false)}
                  onBlur={() => setFocus(true)}
                />
              </View>

              {newPhoto && location && nameLocation ? (
                <TouchableOpacity
                  style={{
                    ...styles.buttonContainer,
                    backgroundColor: "#FF6C00",
                  }}
                  onPress={handleClick}
                >
                  <Text style={{ ...styles.textButton, color: "#fff" }}>
                    ????????????????????????
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.buttonContainer}>
                  <Text style={styles.textButton}>????????????????????????</Text>
                </TouchableOpacity>
              )}
            </View>
          </KeyboardAvoidingView>
        </View>
        {focus && (
          <View style={styles.footer}>
            <TouchableHighlight style={styles.delete} onPress={reset}>
              <AntDesign name="delete" size={24} color="#BDBDBD" />
            </TouchableHighlight>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    backgroundColor: "#fff",
  },
  main: {
    width: 343,
    marginLeft: "auto",
    marginRight: "auto",
  },
  photo: {
    width: "100%",
    height: 240,
    backgroundColor: "#E8E8E8",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  camera: {
    width: 60,
    height: 60,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    marginTop: 8,
    color: "#BDBDBD",
  },
  inputName: {
    width: "100%",
    height: 50,
    marginTop: 29,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  iconLocation: {
    position: "absolute",
    bottom: 16,
  },
  inputLocation: {
    width: "100%",
    height: 50,
    marginTop: 13,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    paddingLeft: 28,
  },
  buttonContainer: {
    width: "100%",
    height: 51,
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 29,
  },
  textButton: {
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
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
    backgroundColor: "#fff",
  },
});

export default CreatePostsScreen;
