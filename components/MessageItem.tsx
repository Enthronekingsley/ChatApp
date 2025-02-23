import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const MessageItem = ({ message, currentUser }: any) => {
 if (currentUser?.userId == message?.userId) {
    
    return (
        <View className='flex-row justify-end mb-3 mr-3'>
            <View style={{ width: wp(80) }}>
                <View className='flex self-end p-3 rounded-2xl bg-white border border-neutral-200'>
                    <Text style={{ fontSize: hp(1.9) }}>
                        {message?.text}
                    </Text>
                </View>
            </View>
        </View>
    )
 }else {
    return (
        <View style={{ width: wp(80) }} className='ml-3 mb-3'>
            <View className='flex self-start p-3 px-4 rounded-2xl bg-[#aacbff] border border-[#007cff]'>
                <Text style={{ fontSize: hp(1.9) }}>
                    {
                        message?.text
                    }
                </Text>
            </View>
        </View>
    )
}
}

export default MessageItem