import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ListingNavigator from "./ListingNavigator";
import AccountScreen from "../screens/AccountScreen";
import AddNewItem from "../screens/AddNewItem";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../utils/colors";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: colors.cyan,
        tabBarStyle: {},
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={ListingNavigator}
        options={{
          tabBarIcon: ({ size, color }) => {
            return (
              <MaterialCommunityIcons name="home" size={size} color={color} />
            );
          },
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddNewItem}
        options={({ navigation }) => ({
          tabBarButton: ({ size, color }) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate("Add")}
                style={{
                  borderColor: "white",
                  backgroundColor: colors.cyan,
                  borderWidth: 5,
                  padding: 10,
                  borderRadius: 50,
                  width: 80,
                  height: 80,
                  justifyContent: "center",
                  alignItems: "center",
                  bottom: 40,
                }}
              >
                <View
                  style={{
                    backgroundColor: colors.white,
                    padding: 5,
                    borderRadius: 50,
                    width:40,
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="plus"
                    size={25}
                    color={colors.indigo}
                  />
                </View>
              </TouchableOpacity>
            );
          },
        })}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({ size, color }) => {
            return (
              <MaterialCommunityIcons
                name="account-edit"
                size={size}
                color={color}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({});
