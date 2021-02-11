import React, {useEffect, useState, useRef} from 'react';
import {Image as Imagen, Text, Dimensions, View, StyleSheet, TouchableOpacity} from 'react-native';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import {listComplejosStyles} from '../../styles/General';

const {width} = Dimensions.get('window');
const { width: screenWidth } = Dimensions.get('window')
const ITEM_WIDTH = Math.round(width * 0.7);


  

function _renderItem({item, index}, parallaxProps) {
  return (
      
    <View style={styles.item}>
      <ParallaxImage
        source={{uri: item.Image[0]}}
        containerStyle={styles.imageContainer}
        showSpinner= "true"
        style={styles.image}
        parallaxFactor={0.3}
        {...parallaxProps}
      />
      <View style={styles.title2}>
      <Text style={styles.title1} numberOfLines={2}>
      </Text>
      <Text style={styles.title} numberOfLines={2}>
        {item.Nombre}
      </Text>
        </View>
    </View>
  );
}

export default function CarouselDraw(props) {
  const {complejos} = props;
  const {Nombre, Image, height} = complejos;
 


  return (
      <View style={styles.container}>
    <Carousel
      layout={'default'}
      data={complejos}
      renderItem={(item) => <RenderItem data={item} />}
      sliderWidth={width}
      itemWidth={ITEM_WIDTH}
      renderItem={_renderItem}
      hasParallaxImages={true}
    />
    </View>
  );
}

function RenderItem(props) {
  const {data} = props;
  const {Image, Nombre} = data.item;

  return (
    <View style={[listComplejosStyles.card]}>
      <Imagen style={[listComplejosStyles.Imagen]} source={{uri: Image[0]}} />
      <Text style={listComplejosStyles.title}>{Nombre}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15
      },
    item: {
      width: screenWidth - 110,
      height: screenWidth - 115,
    },
    imageContainer: {
      flex: 1,
      marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
      backgroundColor: 'white',
      borderRadius: 8,
    },
    image: {
      ...StyleSheet.absoluteFillObject,
      resizeMode: 'cover',
    },
    title:{
        color: "#fff",
        flex: 3,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        fontSize: 22
    },
    title1:{
        color: "#fff",
        flex: 14
    },
    title2:{
        color: "#000",
        position: "absolute",
        height: screenWidth - 115,
        width: screenWidth - 110,

    }
  })