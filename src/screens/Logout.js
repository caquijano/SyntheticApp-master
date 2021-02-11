import React, {useEffect, useState} from 'react'
import { View, Text } from 'react-native'
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

firebase.firestore().settings({ experimentalForceLongPolling: true });
const db = firebase.firestore(firebase)

export default function Logout() {
const [nada, setNada] = useState(false)
    useEffect(() => {
        firebase.auth().signOut()
    }, [nada])
    return (
        <View>
            <Text>Gracias por prefrerirnos</Text>
            <Text>Vuelve pronto</Text>
        </View>
    )
}
