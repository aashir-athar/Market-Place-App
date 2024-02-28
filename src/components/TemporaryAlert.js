import React, { useState, useEffect } from "react";
import { View, Text, Animated } from "react-native";
import { colors } from "../utils/colors";

const TemporaryAlert = ({ message, duration = 3000 }) => {
  const [opacity] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, duration);
  }, [message, duration]);

  return (
    <Animated.View style={{ opacity }}>
      <View
        style={{ backgroundColor: "rgba(4, 15, 22, 0.4)", padding: 10, borderRadius: 15 }}
      >
        <Text style={{color: colors.white}}>{message}</Text>
      </View>
    </Animated.View>
  );
};

export default TemporaryAlert;
