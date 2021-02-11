import React, {useEffect, useState} from 'react'
import { View, Text } from 'react-native'
import firebaseF from '../utils/firebase'
import 'firebase/database'
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import { map } from 'lodash';

firebase.firestore().settings({ experimentalForceLongPolling: true });
const db = firebase.firestore(firebase)

export default function ListChats(props) {
    const {item, index, setArray, array, user1} = props
    const [list, setList] = useState([])

    if (index == 0) {
        if (item.UserId  == firebase.auth().currentUser.uid || item.FUserId  == firebase.auth().currentUser.uid ) {
            if (item.UserId  == firebase.auth().currentUser.uid ) {
                setArray(item.FUserId)
            } else {
                if (item.FUserId  == firebase.auth().currentUser.uid ) {
                    setArray(item.UserId)
                }
            }
        }
        
    } 
    return (
        <View>
        </View>
    )
}
