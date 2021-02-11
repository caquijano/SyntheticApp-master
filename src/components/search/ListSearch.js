import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base'
import * as RootNavigation from '../RootNavigation'
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

firebase.firestore().settings({ experimentalForceLongPolling: true });
const db = firebase.firestore(firebase)

export default function ListSearch(props) {
    const {user1} = props
    const [user, setUser] = useState({})
    
    
    useEffect(() => {
      setUser({});
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
              setUser(itemsArray[0]);
          });
  }, [])
    return (
        <>
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
                <Button transparent onPress={() => RootNavigation.navigate('UserInfo', {user,user1})}>
                  <Text>View</Text>
                </Button>
              </Right>
            </ListItem>
          </List>
          </>
    )
}
