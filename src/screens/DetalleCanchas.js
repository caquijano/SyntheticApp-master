import React, { useEffect, useState } from 'react';
import {Image} from 'react-native';
import {
  Tabs,
  Tab,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  TabHeading,
} from 'native-base';
import Tab1 from '../components/DetalleAdmin/ReservaAdmin';
import Tab2 from '../components/DetalleAdmin/Reservas';
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";


firebase.firestore().settings({ experimentalForceLongPolling: true });
const db = firebase.firestore(firebase)
export default function DetalleCanchas(props) {
  const {canchas, complejos} = props.route.params;
  const [reservas, setReservas] = useState({})
  const [reloadData, setReloadData] = useState(false)
    
  useEffect(() => {
    setReservas([]);
    db.collection("reservas")
    .where("CanchasId", "==", canchas.id)
    .orderBy("Fecha", "asc")
        .get()
        .then((response) => {
            const itemsArray = [];
            response.forEach((doc) => {
                const data = doc.data();
                data.id = doc.id;
                itemsArray.push(data);
            })
            setReservas(itemsArray);
        });

    setReloadData(false)
}, [reloadData])
  return (
    <>
      <Content>
        <Card>
          <CardItem>
            <Left>
              <Thumbnail source={{uri: canchas.Image[0]}} />
              <Body>
                <Text>{canchas.Tamaño}</Text>
                <Text note>Cesped {canchas.Tipo}</Text>
                <Text note>{canchas.Techada} es Techada</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <Image
              source={{uri: canchas.Image[0]}}
              style={{height: 100, width: null, flex: 1}}
            />
          </CardItem>
          <CardItem>
            
            <Right>
              <Text>${canchas.Precio}</Text>
            </Right>
          </CardItem>
        </Card>

        <Tabs tabBarBackgroundColor={' #fff'}>
          <Tab
            heading={
              <TabHeading style={{backgroundColor: '#0a414e'}}>
                <Text>Reservar</Text>
              </TabHeading>
            }>
            <Tab1 complejos={complejos} canchas={canchas} setReloadData={setReloadData} reloadData={reloadData} />
          </Tab>
          <Tab
            heading={
              <TabHeading style={{backgroundColor: '#0a414e'}}>
                <Text>Reservas</Text>
              </TabHeading>
            }>
            <Tab2 complejos={complejos} canchas={canchas} reservas={reservas} setReservas={setReservas}/>
          </Tab>
        </Tabs>
      </Content>
    </>
  );
}
