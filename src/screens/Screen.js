import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Constants from "expo-constants";

const Screen = ({ children, style }) => {
  return (
    <SafeAreaView style={[styles.container, style]}>
        {children}
    </SafeAreaView>
  )
}

export default Screen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: "#FBFBFF"
    }
})