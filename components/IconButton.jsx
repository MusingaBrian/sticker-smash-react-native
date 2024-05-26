import { Pressable, StyleSheet, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import React from 'react'

const IconButton = ({icon, label, onPress}) => {
  return (
    <Pressable style={styles.IconButton} onPress={onPress}>
        <MaterialIcons name={icon} size={24} color="#fff"/>
        <Text style={styles.IconButtonLabel}>{label}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    IconButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    IconButtonLabel: {
        color: '#fff',
        marginTop: 12,
    }
})

export default IconButton