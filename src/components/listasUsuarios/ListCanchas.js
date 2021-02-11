import React from 'react'
import { Image as Imagen, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import * as RootNavigation from '../RootNavigation'

export default function ListCanchas(props) {
  const { canchas, complejos } = props
  const { Tamaño, Tipo, Image, Techada } = canchas
  return (
    <Container>
      <Content>
        <Card>
          <CardItem>

          </CardItem>
          <CardItem cardBody>
            <Imagen source={{ uri: Image[0] }} style={{ height: 200, width: null, flex: 1 }} />
          </CardItem>
          <CardItem>
            <Left>
              <>
                <Icon active name="thumbs-up" />
                <Text>{Tamaño}</Text>
              </>
            </Left>
            <Body>
              <>

                <Text>Cesped {Tipo}</Text>
                <Text>Techada: {Techada}</Text>
              </>
            </Body>
            <Right style={{
                justifyContent: "center",
                alignContent: "center" ,
                alignItems: "center"
              }}>
              <TouchableOpacity style={{
                height: 40,
                width: 120,
                justifyContent: "center",
                alignContent: "center" ,
                alignItems: "center",
                flexDirection: "row"
              }} onPress={() => RootNavigation.navigate('Reservas',{canchas, complejos})}>
              <Icon style={{
                  fontSize: 17,
                  color: '#0a414e'
                }} type="FontAwesome5" name="address-book" />
                <Text style={{
                  fontSize: 17,
                  color: '#0a414e'
                }}>  Reservar</Text>
                
              </TouchableOpacity>
            </Right>
          </CardItem>
        </Card>
      </Content>
    </Container>
  )
}
