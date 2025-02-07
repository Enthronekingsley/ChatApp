import { Alert, Keyboard, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import ChatRoomHeader from '@/components/ChatRoomHeader'
import MessageList from '@/components/MessageList'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Feather } from '@expo/vector-icons'
import CustomKeyboardView from '@/components/CustomKeyboardView'
import { useAuth } from '@/context/authContext'
import { getRoomId } from '@/utils/common'
import { addDoc, collection, doc, onSnapshot, orderBy, query, setDoc, Timestamp } from 'firebase/firestore'
import { db } from '@/firebaseConfig'

const ChatRoom = () => {
    const item = useLocalSearchParams(); // second user
    const { user } = useAuth(); // logged-in user
    const router = useRouter();
    const [messages, setMessages] = useState<any>([]);
    const textRef = useRef(""); // Stores the text input value
    const inputRef = useRef<TextInput>(null);
    const scrollViewRef = useRef<any>(null);

    useEffect(() => {
        const initializeChat = async () => {
            await createRoomIfNotExist();
            await fetchMessages();
        };

        initializeChat();

        const keyboardDidShowListener = Keyboard.addListener(
            "keyboardDidShow", 
            updateScrollView
        );

        return () => {
            keyboardDidShowListener.remove();
        };
    }, []);

    const fetchMessages = async () => {
        let roomId = await getRoomId(user?.userId, item?.userId);
        const docRef = doc(db, "rooms", roomId);
        const messagesRef = collection(docRef, "messages");
        const q = query(messagesRef, orderBy("createdAt", "asc"));

        let unsubscribe = onSnapshot(q, (snapshot) => {
            let allMessages = snapshot.docs.map((doc) => doc.data());
            setMessages([...allMessages]);
        });

        return unsubscribe;
    };

    const createRoomIfNotExist = async () => {
        let roomId = await getRoomId(user?.userId, item?.userId);
        await setDoc(doc(db, "rooms", roomId), {
            roomId,
            createdAt: Timestamp.fromDate(new Date())
        }, { merge: true });
    };

    const handleSendMessage = async () => {
        let message = textRef.current.trim();
        if (!message) return;

        try {
            let roomId = await getRoomId(user?.userId, item?.userId);
            const docRef = doc(db, "rooms", roomId);
            const messagesRef = collection(docRef, "messages");

            textRef.current = "";
            if (inputRef.current) inputRef.current.clear();

            await addDoc(messagesRef, {
                userId: user?.userId,
                text: message,
                profileUrl: user?.profileUrl,
                senderName: user?.username,
                createdAt: Timestamp.fromDate(new Date())
            });
        } catch (error: any) {
            Alert.alert("Message", error.message);
        }
    };

    useEffect(() => {
        updateScrollView();
    }, [messages]);

    const updateScrollView = () => {
        setTimeout(() => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);
    };

    return (
        <CustomKeyboardView inChat={true}>
            <View className="flex-1 bg-white">
                <StatusBar style="dark" />
                <ChatRoomHeader user={item} router={router} />
                <View className="h-3 border-b border-neutral-300" />
                <View className="flex-1 justify-between bg-neutral-100 overflow-visible">
                    <View className="flex-1">
                        <MessageList scrollViewRef={scrollViewRef} messages={messages} currentUser={user} />
                    </View>
                    <View style={{ marginBottom: hp(2.7) }} className="pt-2">
                        <View className="flex-row mx-3 justify-between bg-white border p-2 border-neutral-300 rounded-full pl-5">
                            <TextInput
                                ref={inputRef}
                                onChangeText={(value) => (textRef.current = value)}
                                placeholder="Type message..."
                                style={{ fontSize: hp(2) }}
                                className="flex-1 mr-2"
                            />
                            <TouchableOpacity onPress={handleSendMessage} className="bg-neutral-200 p-2 mr-[1px] rounded-full">
                                <Feather name="send" size={hp(2.7)} color="#737373" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </CustomKeyboardView>
    );
};

export default ChatRoom;

const styles = StyleSheet.create({});
