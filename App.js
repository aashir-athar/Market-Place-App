import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AuthContext from "./src/auth/context";
import { useEffect, useState } from "react";
import TabNavigator from "./src/navigation/TabNavigator";
import AuthNavigator from "./src/navigation/AuthNavigator";
import { colors } from "./src/utils/colors";
import AuthStore from "./src/store/AuthStore";
import { StatusBar } from "expo-status-bar";

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <>
    <StatusBar style="dark" />
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        {user ? <TabNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
