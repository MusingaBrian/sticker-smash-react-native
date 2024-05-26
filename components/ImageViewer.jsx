import {  Image, StyleSheet } from 'react-native'
import React from 'react'

const PlaceHolderImage = require('../assets/images/background-image.png');

const ImageViewer = ({selectedImage}) => {
  const imageSource = selectedImage ? {uri: selectedImage} : PlaceHolderImage;
  return (
    <Image source={imageSource} style={styles.image}></Image>
  )
}

const styles = StyleSheet.create({
    image: {
        width: 320,
        height: 440,
        borderRadius: 18,
    },
});
export default ImageViewer