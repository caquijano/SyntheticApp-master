import React, { useEffect, useState } from 'react';
import { TouchableOpacity} from 'react-native'
import {  List as Lista, ListItem, Thumbnail, Text, Left, Body, Right, Button, View, Icon } from 'native-base';
import * as RootNavigation from '../../components/RootNavigation'

export default function CanchasList(props) {
    const {canchas, setForm, navigation, complejos} = props
    const {Tamaño, Tipo ,Image, Techada} = canchas

    const {hola} = "hola mundo"
    return (
       <>
                <Lista>
                    <ListItem thumbnail>
                        <Left>
                            <Thumbnail square source={{ uri: Image[0] }} />
                        </Left>
                        <Body>
                        <Text>{Tamaño}</Text>
                            <Text>{Tipo}</Text>
                            <Text note numberOfLines={2}>{Techada}</Text>
                        </Body>
                        <Right>
                            <TouchableOpacity transparent onPress={() => navigation.navigate('DetalleCanchas', {canchas, complejos})}>
                                <Text>Ver</Text>
                            </TouchableOpacity>
                        </Right>
                    </ListItem>
                </Lista>
            </>
    );
}