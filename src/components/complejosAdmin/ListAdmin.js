import React, { useEffect, useState } from 'react';

import {  List as Lista, ListItem, Thumbnail, Text, Left, Body, Right, Button, View, Icon } from 'native-base';


export default function ListAdmin(props) {
    const {complejos, setForm, navigation} = props
    const {Nombre, Descripcion ,Image, height, id} = complejos
    
    return (
       <>
                <Lista>
                    <ListItem thumbnail>
                        <Left>
                            <Thumbnail square source={{ uri: Image[0] }} />
                        </Left>
                        <Body>
                            <Text>{Nombre}</Text>
                            <Text note numberOfLines={2}>{Descripcion}</Text>
                        </Body>
                        <Right>
                            <Button transparent onPress={() => navigation.navigate("Canchas", {complejos})} >
                                <Text>Ver</Text>
                            </Button>
                        </Right>
                    </ListItem>
                </Lista>
                
            </>
    );
}
