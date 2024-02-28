import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const LogoComponent = ({ style }) => {
  return (
    <View style={[styles.logo, style]}>
      <Image style={{   width: 100,
        height: 100,
        borderTopLeftRadius: 30,
        borderBottomRightRadius: 30}} source={require("../assets/logo.png")} />
    </View>
  )
}

export default LogoComponent

const styles = StyleSheet.create({
    logo: {
        width: 120,
        height: 120,
        borderTopLeftRadius: 50,
        borderBottomRightRadius: 50,
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 10,
        borderColor: "#fff"
    }
})