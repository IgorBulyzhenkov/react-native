import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
 
} from "react-native";
import { useState } from "react";

function RegistrationScreen() {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(true);
  const [focusLogin, setFocusLogin] = useState(false);
  const [focusEmail, setFocusEmail] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);

  const currentLoginStyle = focusLogin ? styles.focus : styles.input;
  const currentEmailStyle = focusEmail ? styles.focus : styles.input;
  const currentPasswordStyle = focusPassword
    ? styles.focusPassword
    : styles.inputPassword;

  const inputLogin = (text) => {
    setLogin(text.trim());
  };

  const inputEmail = (text) => {
    setEmail(text.trim());
  };

  const inputPassword = (text) => {
    setPassword(text.trim());
  };

  const reset = () => {
    setLogin("");
    setEmail("");
    setPassword("");
  };

  const handleClick = () => {
    console.log("====================================");
    console.log(
      `My login ${login}, my email ${email}, my password ${password} `
    );
    console.log("====================================");
    reset();
  };

  const clickShowPassword = () => {
    if (show) {
      return setShow(false);
    }
    return setShow(true);
  };

  const keyboardVerticalOffset = Platform.OS === "ios" ? 100 : "height";
 

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <View style={styles.border}>
          <Text style={styles.plus}>+</Text>
        </View>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Registration</Text>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView behavior={keyboardVerticalOffset}>
            <TextInput
              style={currentLoginStyle}
              onFocus={() => setFocusLogin(true)}
              onBlur={() => setFocusLogin(false)}
              placeholder="Login"
              value={login}
              name="login"
              onChangeText={inputLogin}
            />
            <TextInput
              style={currentEmailStyle}
              onFocus={() => setFocusEmail(true)}
              onBlur={() => setFocusEmail(false)}
              placeholder="You address email"
              value={email}
              name="email"
              onChangeText={inputEmail}
            />
            <TextInput
              style={currentPasswordStyle}
              onFocus={() => setFocusPassword(true)}
              onBlur={() => setFocusPassword(false)}
              placeholder="Password"
              value={password}
              name="password"
              secureTextEntry={show}
              onChangeText={inputPassword}
            />
            <Text onPress={clickShowPassword} style={styles.showPassword}>
              Show
            </Text>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
        <TouchableOpacity style={styles.buttonContainer} onPress={handleClick}>
          <Text style={styles.textButton}>Registration</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.textLink}>Already have an account? Sign in</Text>
      <View style={styles.line}></View>
    </View>
  );
}

const styles = StyleSheet.create({
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
