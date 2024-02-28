import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import CustomTextInput from "../components/CustomTextInput";
import LogoComponent from "../components/LogoComponent";
import Screen from "./Screen";
import CustomButton from "../components/CustomButton";
import AuthContext from "./../auth/context";
import CustomText from "../components/CustomText";
import Auth from "../api/Auth";
import DB from "../api/DB";
import md5 from "react-native-md5";
import { colors } from "../utils/colors";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [uid, setUid] = useState("");
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const userContext = useContext(AuthContext);

  const handleSignUp = async () => {
    const response = await Auth.post(
      "/accounts:signUp?key=AIzaSyAN521utAkNqifyY2T9v4r7uNYVJhNoBwY",
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );

    if (!response.ok) {
      if (response.data.error.message == "EMAIL_EXISTS") {
        setError("The email address is already in use by another account.");
      }
      if (response.data.error.message == "INVALID_EMAIL") {
        setError("Please enter a correct email.");
      } else {
        setError(response.data.error.message);
      }
      return;
    } else {
      Alert.alert("Signed Up Successfully", "You can login now!");
      setError("");
      setPasswordError("");
      setName("")
      setEmail("");
      setPassword("");
      navigation.navigate("Login");
    }
    const uniqueFolder = await DB.post(
      `/users/${uid}.json?auth=${response.data.idToken}`,
      {
        name: name,
        email: email,
        id: uid,
      }
    );
    if (!uniqueFolder.ok) {
      console.log(uniqueFolder.data.error);
      return;
    }
  };

  useEffect(() => {
    const validatePassword = (password) => {
      if (password !== "") {
        const passwordRules = [
          {
            rule: password.length >= 6,
            message: "• Password must be at least 6 characters long.",
          },
          {
            rule: /[A-Z]/.test(password),
            message: "• Password must contain at least one uppercase letter.",
          },
          {
            rule: /[0-9]/.test(password),
            message: "• Password must contain at least one number.",
          },
          {
            rule: /[!@#$%^&*()_+\-=\[\]{};':",./<>?]/.test(password),
            message: "• Password must contain at least one special character.",
          },
        ];

        const errors = passwordRules
          .filter((rule) => !rule.rule)
          .map((rule) => rule.message);
        setPasswordError(errors.join("\n") || "");
      }
    };

    validatePassword(password);
  }, [password]);

  return (
    <Screen style={{ alignItems: "center", justifyContent: "space-between" }}>
      <LogoComponent
        style={{ marginTop: 60, borderColor: colors.white, marginBottom: 30 }}
      />
      <KeyboardAvoidingView
        behavior="padding"
        style={{ gap: 15, width: "100%", paddingHorizontal: 15 }}
      >
        <CustomTextInput
          icon={"account"}
          placeholder="Name"
          autoCorrect={false}
          keyboardType="default"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <CustomTextInput
          icon={"email"}
          placeholder="E-mail Address"
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setUid(md5.hex_md5(text));
          }}
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
        <CustomTextInput
          icon={"lock"}
          placeholder="Password"
          autoCorrect={false}
          secureTextEntry={true}
          autoCapitalize="none"
          keyboardType="default"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        {passwordError && (
          <View style={styles.passwordErrorContainer}>
            <Text style={styles.errorText}>{passwordError}</Text>
          </View>
        )}
      </KeyboardAvoidingView>
      <View style={{ gap: 15, width: "100%", padding: 20 }}>
        <CustomButton
          func={handleSignUp}
          style={{ backgroundColor: colors.coral }}
        >
          Register
        </CustomButton>
        <CustomText style={{ textAlign: "center", fontWeight: 300 }}>
          Already have an account?
          <CustomText
            func={() => {
              navigation.navigate("Login");
            }}
            style={{ fontWeight: "bold", color: colors.indigo }}
          >
            {" "}
            Login now!
          </CustomText>
        </CustomText>
      </View>
    </Screen>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  errorText: {
    color: colors.error,
    fontSize: 16,
    fontWeight: "bold",
  },
  passwordErrorContainer: {
    backgroundColor: colors.tWhite,
    paddingVertical: 5,
    borderRadius: 10,
    paddingLeft: 10,
  },
});
