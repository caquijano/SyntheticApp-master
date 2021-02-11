import React, { Component } from 'react';
import { Container, Header, Content, List as Lista, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';


export default function List(props) {
    const {complejos, navigation} = props
    const {Nombre, Descripcion ,Image, height} = complejos
    
    return (
        
                <Lista>
                    <ListItem thumbnail>
                        <Left>
                            <Thumbnail square source={{ uri: Image[0] }} />
                        </Left>
                        <Body>
                            <Text>{Nombre}</Text>
                            <Text style={{color: "#fff"}} note numberOfLines={2}>{Descripcion}</Text>
                        </Body>
                        <Right>
                            <Button transparent onPress={() => navigation.navigate("CanchasList", {complejos})}>
                                <Text>Ver</Text>
                            </Button>
                        </Right>
                    </ListItem>
                </Lista>
            
    )
}
