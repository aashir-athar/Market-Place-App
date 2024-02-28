import React, { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
  Text,
} from "react-native";
import CustomTextInput from "../components/CustomTextInput";
import LogoComponent from "../components/LogoComponent";
import Screen from "./Screen";
import CustomButton from "../components/CustomButton";
import CustomText from "../components/CustomText";
import AuthContext from "../auth/context";
import Auth from "../api/Auth";
import md5 from "react-native-md5";
import DB from "../api/DB";
import AuthStore from "../store/AuthStore";
import { colors } from "../utils/colors";
import TemporaryAlert from "../components/TemporaryAlert";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const authContext = useContext(AuthContext);

  const login = async () => {
    const response = await Auth.post(
      "/accounts:signInWithPassword?key=AIzaSyAN521utAkNqifyY2T9v4r7uNYVJhNoBwY",
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
    if (!response.ok) {
      if (response.data.error.message === "EMAIL_NOT_FOUND") {
        setError("Email address is not found.");
      }
      if (
        response.data.error.message === "INVALID_PASSWORD" ||
        response.data.error.message === "INVALID_LOGIN_CREDENTIALS" ||
        response.data.error.message === "INVALID_EMAIL"
      ) {
        setError("Email address or password is invalid.");
      } else {
        setError("");
      }
      console.log(response.data);
      return;
    } else {
      // Alert.alert("Signed In Successfully", "You can login now!");
      setError("");
      setEmail("");
      setPassword("");
    }
    let uuid = md5.hex_md5(email);
    AuthStore.storeAuthToken(response.data.idToken);
    console.log("Login: ", response.data.idToken);
    const data = await DB.get(
      `/users/${uuid}.json?auth=${response.data.idToken}`
    );
    if (!data.ok) {
      console.log(data.data.error);
      return;
    }
    const todosData = [];
    for (let property in data.data) {
      let newObj = {
        id: property,
        name: data.data[property].name,
        email: data.data[property].email,
      };

      todosData.push(newObj);
    }
    console.log(todosData);
    authContext.setUser(todosData);
  };

  return (
    <Screen style={styles.container}>
      <LogoComponent style={styles.logo} />
      <KeyboardAvoidingView behavior="padding" style={styles.formContainer}>
        <CustomTextInput
          icon={"account"}
          placeholder="Email"
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <CustomTextInput
          icon={"lock"}
          placeholder="Password"
          autoCorrect={false}
          secureTextEntry={true}
          autoCapitalize="none"
          keyboardType="default"
          value={password}
          onChangeText={setPassword}
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
      </KeyboardAvoidingView>
      <View style={styles.buttonContainer}>
        <CustomButton func={login} style={styles.loginButton}>
          Login
        </CustomButton>
        <CustomText style={styles.registerText}>
          Don't have an account?{" "}
          <CustomText
            func={() => {
              navigation.navigate("Register");
            }}
            style={styles.registerLink}
          >
            Register now!
          </CustomText>
        </CustomText>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    marginTop: 60,
    borderColor: colors.white,
    marginBottom: 30,
  },
  formContainer: {
    gap: 15,
    width: "100%",
    paddingHorizontal: 15,
  },
  buttonContainer: {
    gap: 15,
    width: "100%",
    padding: 20,
  },
  loginButton: {
    backgroundColor: colors.indigo,
  },
  registerText: {
    textAlign: "center",
    fontWeight: 300,
  },
  registerLink: {
    fontWeight: "bold",
    color: colors.coral,
  },
  errorText: {
    color: colors.error,
    fontSize: 14,
    fontWeight: "600",
  },
});

export default LoginScreen;
