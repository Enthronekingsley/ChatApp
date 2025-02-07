import { View, Text, TextInput } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const FormInput = ({ style, placeholder, onChangeText, autoCapitalize, secureTextEntry, ...props } : any) => {
  return (
    <View>
      <TextInput
        style={style}
        className='flex-1 font-semibold text-neutral-700'
        placeholder={placeholder} 
        placeholderTextColor={'gray'}
        onChangeText={onChangeText} 
        autoCapitalize={autoCapitalize} 
        secureTextEntry={secureTextEntry} 
        keyboardType={props.keyboardType}
        {...props}
      />
    </View>
  )
}

export default FormInput