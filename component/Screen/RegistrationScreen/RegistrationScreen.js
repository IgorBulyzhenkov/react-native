import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  Dimensions,
  ImageBackground,
} from "react-native";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authSinUpUser } from "../../redux/auth/authOperations";

const initialState = {
  login: "",
  email: "",
  password: "",
};

function RegistrationScreen({ navigation }) {
  const [state, setState] = useState(initialState);
  const [show, setShow] = useState(true);
  const [focusLogin, setFocusLogin] = useState(false);
  const [focusEmail, setFocusEmail] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const onChange = () => {
      Dimensions.get("window").width;
    };
    const dimensionsHandler = Dimensions.addEventListener("change", onChange);
    return () => dimensionsHandler.remove();
  }, []);

  const currentLoginStyle = focusLogin ? styles.focus : styles.input;
  const currentEmailStyle = focusEmail ? styles.focus : styles.input;
  const currentPasswordStyle = focusPassword
    ? styles.focusPassword
    : styles.inputPassword;
  const currentFormStyle =
    focusLogin || focusEmail || focusPassword ? styles.focusForm : null;

  const handleClick = () => {
    Keyboard.dismiss();
    if (!state.login && !state.email && !state.password) {
      return;
    }
    dispatch(authSinUpUser(state))
    // navigation.navigate("Home");
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
          <View style={styles.avatar}>
            <View style={styles.border}>
              <Text style={styles.plus}>+</Text>
            </View>
          </View>
          <KeyboardAvoidingView behavior={keyboardVerticalOffset}>
            <View style={styles.formContainer}>
              <Text style={styles.title}>Registration</Text>
              <View style={currentFormStyle}>
                <TextInput
                  style={currentLoginStyle}
                  onFocus={() => setFocusLogin(true)}
                  onBlur={() => setFocusLogin(false)}
                  placeholder="Login"
                  value={state.login}
                  name="login"
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, login: value }))
                  }
                />
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
                      marginBottom:
                        focusEmail || focusLogin || focusPassword ? 60 : 43,
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
                      bottom:
                        focusEmail || focusLogin || focusPassword ? 74 : 58,
                    }}
                  >
                    Show
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={handleClick}
              >
                <Text style={styles.textButton}>Registration</Text>
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
              onPress={() => navigation.navigate("LoginScreen")}
            >
              Already have an account? Sign in
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
    paddingTop: 92,
    paddingBottom: 8,
    width: "100%",
    marginTop: "auto",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: "center",
  },
  avatar: {
    position: "absolute",
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    top: -60,
    borderRadius: 16,
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
  // focusForm: { marginBottom: 20 },
  inputPassword: {
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
    marginBottom: 66,
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
  plus: {
    color: "#FF6C00",
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

export default RegistrationScreen;
