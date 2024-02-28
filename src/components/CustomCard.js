import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { Children, useEffect, useState } from "react";
import CustomText from "./CustomText";
import { colors } from "../utils/colors";

const CustomCard = ({ image, title, subtitle, func, children }) => {

  return (
    <Pressable onPress={func}>
      <View style={styles.cardContainer}>
        {image && (
          <Image
            style={{ width: "100%", height: 200 }}
            source={{uri: image}}
          />
        )}
        <View style={{ padding: 15, gap: 2 }}>
          <CustomText
            style={{ fontWeight: "bold", textTransform: "capitalize" }}
          >
            {title}
          </CustomText>
          <CustomText style={{ fontWeight: "bold", color: colors.coral }}>
            {subtitle}
          </CustomText>
          {children}
        </View>
      </View>
    </Pressable>
  );
};

export default CustomCard;

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#fff",
    width: "100%",
    marginVertical: 8,
  },
});
