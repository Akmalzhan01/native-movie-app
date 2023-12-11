import React from 'react'
import { StyleSheet } from 'react-native'
import AnimatedLoader from "react-native-animated-loader"

export default function Loader() {
  return (
    <AnimatedLoader
      visible={true}
      overlatColor="#FDF6AA"
      source={require("../../assets/Loader.json")}
      animationStyle={styles.lotties}
      speed={1}
    ></AnimatedLoader>
  )

}


const styles = StyleSheet.create({
  lotties: {
    width: 100,
    height: 100
  }
})
