import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Feather, Octicons} from "@expo/vector-icons";
import FormInput from '@/components/FormInput';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/authContext';
import CustomButton from '@/components/CustomButton';
import Loading from '@/components/Loading';
import CustomKeyboardView from '@/components/CustomKeyboardView';


const textInputStyle = {
  fontSize: hp(2)
}

const SignUp = () => {
  const router = useRouter();
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const usernameRef = useRef("");
    const profileRef = useRef("");
    const {register} = useAuth()
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
      if (!emailRef.current || !passwordRef.current || !usernameRef.current) {
        Alert.alert("Sign Up", "Please fill out all required fields.")
        return;
      }

      const username = usernameRef.current.trim();
      const email = emailRef.current.trim();
      const password = passwordRef.current.trim();
      const profileUrl = profileRef.current.trim();

      setLoading(true)

      const response = await register(email, password, username, profileUrl);

      setLoading(false)

      console.log("Got response: ", response);

      if (!response.success) {
        Alert.alert("Sign Up", response.msg)
        return;
      }
      
    }
  return (
      <CustomKeyboardView>
        <View className='flex-1 gap-12' style={{ paddingTop: hp(8), paddingHorizontal: wp(5) }}>
        <View className='items-center'>
            <Image 
              source={require("../../assets/images/signup.jpg")}
              style={{ height: hp(30) }}
              resizeMode='contain'
            />
        </View>

        <View className='gap-10'>
          <Text style={{ fontSize: hp(3) }} className="font-bold tracking-wider text-center text-neutral-800">Sign Up</Text>
          {/* inputs */}
          <View className='gap-4'>
            <View style={{ height: hp(5) }} className='flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl'>
              <Feather name="user" size={hp(2.5)} color="black" />  
              <FormInput 
                style={textInputStyle}
                placeholder="Username"
                onChangeText={(value: string) => usernameRef.current = value}
                autoCapitalize="none"
              /> 
            </View>

            <View style={{ height: hp(5) }} className='flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl'>
              <Octicons name="mail" size={hp(2.5)} color="black" />  
              <FormInput 
                style={textInputStyle}
                placeholder="Email address"
                onChangeText={(value: string) => emailRef.current = value}
                autoCapitalize="none"
              /> 
            </View>

            <View style={{ height: hp(5) }} className='flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl'>
              <Octicons name="lock" size={hp(2.5)} color="black" />  
              <FormInput 
                style={textInputStyle}
                placeholder="Password"
                onChangeText={(value: string) => passwordRef.current = value}
                autoCapitalize="none"
                secureTextEntry={true}
              /> 
            </View>

            <View className='gap-3'>
            <View style={{ height: hp(5) }} className='flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl'>
              <Feather name="image" size={hp(2.5)} color="black" />  
              <FormInput 
                style={textInputStyle}
                placeholder="Profile url"
                onChangeText={(value: string) => profileRef.current = value}
                autoCapitalize="none"
              /> 
            </View>
            <Text style={{ fontSize: hp(1.8) }} className='font-semibold text-right text-neutral-500'>Forgot password?</Text>
          </View>

          {/* submit button */}

          <View>
            {
              loading ? (
                <View className='flex-row justify-center'>
                  <Loading size={hp(10)} />
                </View>
              ) : (
                <CustomButton
                buttonText="Sign Up"
                onPress={handleRegister} 
                />
              )
            }
          </View>

          {/*sign in text*/}
          <View className="flex-row justify-center">
            <Text style={{fontSize: hp(1.8)}} className="font-semibold text-neutral-500">Already have an account? </Text>
                <TouchableOpacity onPress={() => router.push("/signIn")}>
                  <Text style={{fontSize: hp(1.8)}} className="text-blue-500 font-bold text-neutral-500">Sign In</Text>
                </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      </CustomKeyboardView>
  )
}

export default SignUp