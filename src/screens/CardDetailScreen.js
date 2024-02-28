import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React from "react";
import CustomText from "../components/CustomText";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../utils/colors";

const CardDetailScreen = ({ route, navigation }) => {
  const { title, image, subtitle, description, name, date } = route.params;
  return (
    <LinearGradient
      colors={["#fff", colors.tWhite]} // Create a gradient background
      style={styles.gradientContainer}
    >
      <TouchableOpacity
        onPress={() => navigation.navigate("ViewImageScreen", { image: image })}
      >
        <Image style={styles.cardMainImg} source={{ uri: image }} />
      </TouchableOpacity>
      <View style={{ padding: 18, gap: 5 }}>
        <CustomText
          style={{ fontSize: 24, fontWeight: "600", color: colors.black }}
        >
          {title}
        </CustomText>
        <CustomText
          style={{ fontSize: 20, color: colors.coral, fontWeight: "bold" }}
        >
          {subtitle}
        </CustomText>
        {description && (
          <CustomText style={{ lineHeight: 30 }}>
            {description}
          </CustomText>
        )}
        {name && (
          <>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <CustomText style={{ fontSize: 12, fontWeight: "500", color: "#aaa" }}>Posted by</CustomText>
              <Pressable style={{flexDirection: "row", gap: 5}}>
                <Image style={{height: 20, width: 20, borderRadius: 40}} source={require("../assets/bookshelf.jpg")} /> 
                <CustomText
                  style={{ fontSize: 16, fontWeight: "bold", color: "#aaa" }}
                >
                 {name}
                </CustomText>
              </Pressable>
              <CustomText style={{ color: "#aaa", fontSize: 12 }}>•</CustomText>
              <CustomText style={{ color: "#aaa", fontSize: 12 }}>
                {date}
              </CustomText>
            </View>
          </>
        )}
      </View>
    </LinearGradient>
  );
};

export default CardDetailScreen;

const styles = StyleSheet.create({
  cardMainImg: {
    width: "100%",
    height: 250,
  },
  gradientContainer: {
    flex: 1,
    overflow: "hidden",
  },
});
