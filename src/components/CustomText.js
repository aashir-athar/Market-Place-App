import { StyleSheet, Text, View } from "react-native";
import React from "react";

const CustomText = ({ children, style, func }) => {
  return <Text onPress={func} style={[styles.txt, style]}>{children}</Text>;
};

export default CustomText;

const styles = StyleSheet.create({
    txt: {
        fontSize: 18,
    }
});
