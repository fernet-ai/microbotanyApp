import React, { useState, useEffect } from 'react';
import {Text, TouchableOpacity, View, StyleSheet , Image, TextInput, ProgressBarAndroid} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5, FontAwesome, MaterialIcons ,MaterialCommunityIcons } from '@expo/vector-icons';

export default function BluetoothScreen(props) {



  let infoToKnow = "Ci siamo quasi. Assicurati di avere il Bluetooth attivo e connettiti"+
     " alla tua GBbox"


 let aboutWifi = "Invia alla GBox il nome e la relativa password  della wifi alla quale"+
    " deve connettersi"

    return(
      <View style={{flex: 1, justifyContent: 'space-evenly', alignItems: 'stretch',
      paddingVertical: "20%", paddingHorizontal: "5%",  }}>

      <View style = {{alignItems: 'center', flex: 4,  justifyContent: "space-evenly"}}>
        <FontAwesome5 name="bluetooth" size={64} color="green" />
        <Text style = {{textAlign: 'center',  fontWeight: "bold", fontSize: 30, color: "black"}} >Connettiti tramite Bluetooth</Text>
        <Text style = {{textAlign: 'center',  fontSize: 18}}>{infoToKnow}</Text>
      </View>


      <View style = {styles.BluetoothContainer}>
        <ProgressBarAndroid/>
      </View>

      </View>
    );

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6DB',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },

  BluetoothContainer: {
    flex: 5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },



});
