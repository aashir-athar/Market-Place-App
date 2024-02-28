import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../utils/colors";

const CustomTextInput = ({ icon, type, multiline, ...otherProps }) => {
  return (
    <View style={styles.txtInputContainer}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={25}
          color={colors.black}
          {...otherProps}
        />
      )}
      {multiline ? (
        <TextInput
          multiline
          style={{
            overflow: "hidden",
            height: 100,
            alignItems: "flex-start",
            justifyContent: "flex-start",
            padding: 8,
            fontSize: 18,
            flexGrow: 1,
          }}
          {...otherProps}
        />
      ) : (
        <TextInput style={[styles.txtInput]} {...otherProps} />
      )}
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  txtInputContainer: {
    backgroundColor: colors.tWhite,
    width: "100%",
    borderRadius: 20,
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    overflow: "hidden"
  },
  txtInput: {
    padding: 8,
    fontSize: 18,
    flexGrow: 1,
    overflow: "hidden",
    textAlign: "left"
  },
});
