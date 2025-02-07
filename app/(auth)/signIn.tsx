import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Octicons} from "@expo/vector-icons";
import FormInput from '@/components/FormInput';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/authContext';
import CustomButton from '@/components/CustomButton';
import Loading from '@/components/Loading';
import CustomKeyboardView from '@/components/CustomKeyboardView';


const textInputStyle = {
  fontSize: hp(2)
}

const SignIn = () => {
  const router = useRouter();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert("Sign In", "Please fill out all required fields.")
      return;
    }

    const email = emailRef.current.trim();
    const password = passwordRef.current.trim();

    setLoading(true)

    const response = await login(email, password);

    setLoading(false)

    if (!response.success) {
      Alert.alert("Sign In", response.msg)
      return;
    }
  }
  return (
      <CustomKeyboardView>
        <View className='flex-1 gap-12' style={{ paddingTop: hp(8), paddingHorizontal: wp(5) }}>
        <View className='items-center'>
            <Image 
              source={require("../../assets/images/login.jpg")}
              style={{ height: hp(30) }}
              resizeMode='contain'
            />
        </View>

        <View className='gap-10'>
          <Text style={{ fontSize: hp(3) }} className="font-bold tracking-wider text-center text-neutral-800">Sign In</Text>
          {/* inputs */}
          <View className='gap-4'>
            <View style={{ height: hp(5) }} className='flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl'>
              <Octicons name="mail" size={hp(2.5)} color="black" />  
              <FormInput 
                style={textInputStyle}
                placeholder="Email address"
                onChangeText={(value: string) => emailRef.current = value}
                autoCapitalize="none"
                keyboardType="email-address"
              /> 
            </View>

            <View className='gap-3'>
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
                buttonText="Sign In"
                onPress={handleLogin} 
                />
              )
            }
          </View>

          {/*sign up text*/}
          <View className="flex-row justify-center">
            <Text style={{fontSize: hp(1.8)}} className="font-semibold text-neutral-500">Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/signUp")}>
                <Text style={{fontSize: hp(1.8)}} className="text-blue-500 font-bold text-neutral-500">Sign Up</Text>
            </TouchableOpacity>
          </View>
          </View>
        </View>
      </View>
      </CustomKeyboardView>
  )
}

export default SignIn