import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import LogoComponent from "../components/LogoComponent";
import CustomButton from "../components/CustomButton";
import { colors } from "../utils/colors";

const WelcomeScreen = ({ navigation }) => {
  return (
    <View
      style={styles.welcomecontainer}
    >
      <View style={styles.logoContainer}>
        <LogoComponent />
      </View>
      <View style={{ gap: 15, width: "100%", padding: 20 }}>
        <CustomButton style={{ backgroundColor: colors.indigo }} func={() => {navigation.navigate("Login")}}>
          Login
        </CustomButton>
        <CustomButton style={{ backgroundColor: colors.coral }} func={() => {navigation.navigate("Register")}}>
          Register
        </CustomButton>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  welcomecontainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  logoContainer: {
    position: "absolute",
    top: 250,
  }
});
