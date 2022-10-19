import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Keyboard,
} from "react-native";
import { useState, useEffect } from "react";
import { authSinInUser } from "../../redux/auth/authOperations";
import { useDispatch } from "react-redux";

const initialState = {
  email: "",
  password: "",
};
function LoginScreen({ navigation }) {
  const [state, setState] = useState(initialState);
  const [show, setShow] = useState(true);
  const [focusEmail, setFocusEmail] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);

  const dispatch = useDispatch();

  const currentEmailStyle = focusEmail ? styles.focus : styles.input;
  const currentPasswordStyle = focusPassword
    ? styles.focusPassword
    : styles.inputPassword;

  useEffect(() => {
    const onChange = () => {
      Dimensions.get("window").width;
    };
    const dimensionsHandler = Dimensions.addEventListener("change", onChange);
    return () => dimensionsHandler.remove();
  }, []);

  const handleClick = () => {
    Keyboard.dismiss();
    if (!state.email && !state.password) {
      return;
    }
    dispatch(authSinInUser(state));
    setState(initialState);
  };

  const clickShowPassword = () => {
    if (show) {
      return setShow(false);
    }
    return setShow(true);
  };

  const keyboardVerticalOffset = Platform.OS === "ios" ? "padding" : "height";

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground
        source={{ uri: "https://i.postimg.cc/d1MrrJNz/Photo-BG.png" }}
        style={styles.image}
      >
        <View style={styles.container}>
          <KeyboardAvoidingView behavior={keyboardVerticalOffset}>
            <View style={styles.formContainer}>
              <Text style={styles.title}>Log in</Text>
              <TextInput
                style={currentEmailStyle}
                onFocus={() => setFocusEmail(true)}
                onBlur={() => setFocusEmail(false)}
                placeholder="You address email"
                value={state.email}
                name="email"
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, email: value }))
                }
              />
              <View>
                <TextInput
                  style={{
                    ...currentPasswordStyle,
                  }}
                  onFocus={() => setFocusPassword(true)}
                  onBlur={() => setFocusPassword(false)}
                  placeholder="Password"
                  value={state.password}
                  name="password"
                  secureTextEntry={show}
                  onChangeText={(value) =>
                    setState((prevState) => ({
                      ...prevState,
                      password: value,
                    }))
                  }
                />
                <Text
                  onPress={clickShowPassword}
                  style={{
                    ...styles.showPassword,
                  }}
                >
                  Show
                </Text>
              </View>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={handleClick}
              >
                <Text style={styles.textButton}>Log in</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
          <View
            style={{
              alignItems: "center",
              marginBottom:
                focusEmail || focusPassword
                  ? Platform.OS === "ios"
                    ? 50
                    : -130
                  : null,
            }}
          >
            <Text
              style={styles.textLink}
              onPress={() => navigation.navigate("RegistrationScreen")}
            >
              Don't have an account? Register
            </Text>
            <View style={styles.line}></View>
          </View>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  image: {
    justifyContent: "center",
    flex: 1,
    resizeMode: "contain",
  },
  container: {
    backgroundColor: "#fff",
    paddingTop: 32,
    paddingBottom: 8,
    width: "100%",
    marginTop: "auto",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: "center",
  },
  formContainer: {
    width: 343,
  },
  title: {
    color: "#212121",
    width: "100%",
    marginBottom: 32,
    textAlign: "center",
    fontSize: 30,
    fontFamily: "Roboto-Medium",
  },
  input: {
    marginBottom: 16,
    width: "100%",
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    paddingLeft: 16,
    fontSize: 16,
  },
  focus: {
    marginBottom: 16,
    width: "100%",
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FF6C00",
    backgroundColor: "#FFFFFF",
    paddingLeft: 16,
    fontSize: 16,
  },
  inputPassword: {
    marginBottom: 43,
    width: "100%",
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    paddingLeft: 16,
    fontSize: 16,
  },
  focusPassword: {
    marginBottom: 43,
    width: "100%",
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FF6C00",
    backgroundColor: "#FFFFFF",
    paddingLeft: 16,
    fontSize: 16,
  },
  buttonContainer: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    width: "100%",
    height: 51,
    marginBottom: 16,
    justifyContent: "center",
  },
  textButton: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
  textLink: {
    textAlign: "center",
    fontSize: 16,
    color: "#1B4371",
    marginBottom: 132,
    fontFamily: "Roboto-Regular",
  },
  line: {
    borderColor: "#212121",
    borderWidth: 5,
    width: 134,
    borderRadius: 100,
  },
  border: {
    position: "absolute",
    width: 25,
    height: 25,
    bottom: 14,
    right: -12.5,
    borderRadius: 50,
    borderColor: "#FF6C00",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  showPassword: {
    position: "absolute",
    bottom: 58,
    right: 16,
    color: "#1B4371",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
});

export default LoginScreen;
