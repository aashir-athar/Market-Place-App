import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListingsScreen from "../screens/ListingsScreen";
import CardDetailScreen from "../screens/CardDetailScreen";
import ViewImageScreen from "./../screens/ViewImageScreen";

const Stack = createNativeStackNavigator();

const ListingNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Listings"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Listings" component={ListingsScreen} />
      <Stack.Screen name="Card-Details" component={CardDetailScreen} />
      <Stack.Screen name="ViewImageScreen" component={ViewImageScreen} />
    </Stack.Navigator>
  );
};

export default ListingNavigator;

const styles = StyleSheet.create({});
