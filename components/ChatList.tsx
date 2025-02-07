import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import ChatItem from './ChatItem';

const ChatList = ({ currentUser, users } : any) => {
  const router = useRouter();
  return (
    <View className='flex-1'>
      <FlatList 
        data={users}
        renderItem={({ item, index }) => <ChatItem noBorder={index+1 == users.length} router={router} currentUser={currentUser} item={item} index={index} />}
        keyExtractor={({ item }) => Math.random().toString()}
        contentContainerStyle={{ flex: 1, paddingVertical: 25 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

export default ChatList