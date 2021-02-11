import React, {useEffect, useState} from 'react'
import { View } from 'react-native'
import { List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base'
import ListChats2 from '../components/ListChat2'
import firebaseF from '../utils/firebase'
import 'firebase/database'
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import { map, toArray } from 'lodash';
import * as RootNavigation from '../components/RootNavigation'

firebase.firestore().settings({ experimentalForceLongPolling: true });
const db = firebase.firestore(firebase)

export default function ListChats(props) {
    const { idChat, message} = props
    const [lista, setLista] = useState([])
    const [array, setArray] = useState([])
    const [item1, setItem1] = useState([])
    const [item, setItem] = useState([])

    useEffect(() => {
       
        const chats = firebaseF.database().ref(idChat);
        chats.on('value', (snapshot) => {
            setLista(toArray(snapshot.val()));
        });
    }, []);

    useEffect(() => {
        setItem([]);
        db.collection("users")
        .where('UserId','==', firebase.auth().currentUser.uid)          
            .get()
            .then((response) => {
                const itemsArray = [];
                response.forEach((doc) => {
                    const data = doc.data();
                    data.id = doc.id;
                    itemsArray.push(data);
                })
                setItem(itemsArray);
            });
    }, [])

    useEffect(() => {
        setItem1([]);
        db.collection("users")
        .where('UserId','==', array)          
            .get()
            .then((response) => {
                const itemsArray = [];
                response.forEach((doc) => {
                    const data = doc.data();
                    data.id = doc.id;
                    itemsArray.push(data);
                })
                setItem1(itemsArray);
            });
    }, [array])


    return (
        <View>
        {map(lista,(items , index ) => (
                <ListChats2 item={items} index={index} setArray={setArray} array={array} user1={item1} /> 
            ))}
            <>
            {item1.map((user1, index1) => (
                <>
                {item.map((user, index) => (  
          <List>
            <ListItem thumbnail>
              <Left>
                <Thumbnail  source={{ uri: user1.Foto }} />
              </Left>
              <Body>
                <Text>{user1.Nombre}</Text>
                <Text note numberOfLines={1}>{user1.Email}</Text>
              </Body>
              <Right>
                <Button transparent onPress={() => RootNavigation.navigate('Chat', {user,user1})}>
                  <Text>Ver</Text>
                </Button>
              </Right>
            </ListItem>
          </List>
          ))} 
          </>
                    ))}   
            </>
        </View>
    )
}
