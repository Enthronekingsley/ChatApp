import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const CustomButton = ({ buttonText, onPress } : any) => {
  return (
    <View>
      <TouchableOpacity
        style={{ height: hp(5.5) }}
        className='bg-[#007cff] rounded-xl justify-center items-center'
        onPress={onPress}
      >
        <Text style={{ fontSize: hp(2.7) }} className='text-white font-bold tracking-wider'>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default CustomButton