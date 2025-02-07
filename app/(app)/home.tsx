import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/context/authContext';
import { StatusBar } from 'expo-status-bar';
import { getDocs, query, where } from 'firebase/firestore';
import { userRef } from '@/firebaseConfig';
import Loading from '@/components/Loading';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ChatList from '@/components/ChatList';

const Home = () => {
  const { user, logout } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (user?.uid)
      
      getUsers();
  }, [])


  const getUsers = async () => {
   
    // fetch users
    const q = query(userRef, where("userId", "!=", user?.uid));

    const querySnapshot = await getDocs(q);
    let data : any = [];
    querySnapshot.forEach((doc) => {
      data.push({...doc.data()});
    });

    setUsers(data);

  }
  
  return (
    <View className='flex-1 bg-white'>
      <StatusBar style="light" />
      {
        users.length > 0 ? (
          <ChatList currentUser={user} users={users} />
        ): (
          <View className='flex-1 items-center' style={{ top: hp(30) }}>
            {/* <ActivityIndicator size="large" color="gray" /> */}
            <Loading size={hp(10)} />
          </View>
        )
      }
    </View>
  )
}

export default Home