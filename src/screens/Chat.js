import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView } from 'react-native';
import { Header, Title, Body } from 'native-base';
import { chatStyles } from '../styles/General'
import Input from '../components/chat/Input'
import LinearGradient from 'react-native-linear-gradient'
import firebaseF from '../utils/firebase'
import 'firebase/database'
import { map } from 'lodash'
import moment from 'moment';
import Message from '../components/chat/Message'
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

firebase.firestore().settings({ experimentalForceLongPolling: true });
const db = firebase.firestore(firebase)

export default function Chat(props) {
    const { user, user1 } = props.route.params;
    const {Nombre, UserId} = user
    const FUserId = user1.UserId
    const key1 = user.createAt.seconds
    const key2 = user1.createAt.seconds
    const keyTable = key1+key2
   
    const [messages, setMessages] = useState([]);
    const chatScrollRef = useRef();
    
    useEffect(() => {
       
        const chat = firebaseF.database().ref(keyTable);
        chat.on('value', (snapshot) => {
            setMessages(snapshot.val());
        });
    }, []);
    
    useEffect(() => {
        chatScrollRef.current.scrollTo({ y: 10000000000000 });
    }, [messages]);

    const sendMessage = (message) => {
        const time = moment().format('hh:mm a')
        firebaseF.database().ref(keyTable).push({ Nombre, text: message, time, UserId, FUserId })
    }

    return (
        <>
            <Header style={chatStyles.header}>
                <Body style={[chatStyles.header2]}>
                    <Title style={chatStyles.header3}>{user1.Nombre}</Title>
                </Body>
            </Header>
            <View style={chatStyles.content}>
            <LinearGradient colors={['#fff', '#0a414e']}>
            <View style={{height:"92%"}}>
                <ScrollView style={chatStyles.chatView} ref={chatScrollRef}>

                    {map(messages, (message, index) => (
                        <Message key={index} message={message} name={user.Nombre} />
                    ))}
                </ScrollView>
                </View>
                </LinearGradient>
                <Input sendMessage={sendMessage} />
            </View>
        </>
    );
}
