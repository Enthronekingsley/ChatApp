import { View, Text } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';

const Loading = ({ size }: any) => {
  return (
    <View style={{ height: size, aspectRatio: 1 }}>
      <LottieView
        source={require("../assets/images/loading2.json")}
        autoPlay
        loop
        style={{ flex: 1 }}
      />
    </View>
  )
}

export default Loading