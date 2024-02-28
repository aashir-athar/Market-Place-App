import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import CustomText from "./CustomText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../utils/colors";

const CustomButton = ({ children, style, icon, func }) => {
  return (
    <TouchableOpacity
      style={{ width: "100%", alignItems: "center", justifyContent: "center" }}
      onPress={func}
    >
      <View style={[styles.btnContainer, style]}>
        {icon ? (
          <View style={{ alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 10 }}>
            <MaterialCommunityIcons
              name={icon}
              size={20}
              color={colors.white}
            />
            <CustomText
              style={{
                color: "#fff",
                textAlign: "center",
                textTransform: "uppercase",
                fontWeight: "bold",
              }}
            >
              {children}
            </CustomText>
          </View>
        ) : (
          <CustomText
            style={{
              color: "#fff",
              textAlign: "center",
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            {children}
          </CustomText>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: "tomato",
    width: "100%",
    borderRadius: 50,
    padding: 13,
  },
});
