import React, { useState, useEffect } from 'react';
import {Text, TouchableOpacity, View, StyleSheet , Image} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import logo from '/home/fernet/Documenti/MicrobotanyApp/assets/logo.png';
import mascotte from '/home/fernet/Documenti/MicrobotanyApp/assets/zucchina.png';
export default function IntroScreen(props) {

  let description = 'Microbotany è un\' app che ti consente di visualizzare in tempo reale i valori ' +
        'registrati dai sensori connessi alla GreenBox offrendoti report grafici, semplici ' +
        'ed intuitivi, e qualche antico consiglio legato alla tradizione contadina.'


    return(
      <View style={{flex: 1, justifyContent: 'space-evenly', alignItems: 'center', paddingVertical: "15%", paddingHorizontal: "5%" }}>
        <View style = {{alignItems: 'center', flex: 2, justifyContent: 'center'}}>
          <Image  source={logo} style={{height: 150, width: 150}} />
          <Text style = {{textAlign: 'center',  fontWeight: "bold", fontSize: 30, color: "black"}} >Benvenuto in Microbotany</Text>
        </View>
        <View style = {{alignItems: 'center', flex: 3,  flexDirection: "row", justifyContent: 'center'}}>
          <Text style = {{textAlign: 'left',  fontSize: 20, flex: 5}} >{description}</Text>
          <Image  source={mascotte} style={{width: "20%", resizeMode:'contain', flex: 4}} />
        </View>
      </View>
    );

}


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },

});
