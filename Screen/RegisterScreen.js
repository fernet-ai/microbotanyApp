import React, { useState, useEffect } from 'react';
import {Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AppIntroSlider from 'react-native-app-intro-slider';
import IntroScreen from './SignUpScreens/IntroScreen.js';
import FieldsScreen from './SignUpScreens/FieldsScreen.js';
import GboxScreen from './SignUpScreens/GboxScreen.js';
import BluetoothScreen from './SignUpScreens/BluetoothScreen.js';
import WifiScreen from './SignUpScreens/WifiScreen.js';

import Logo from '../assets/icon.png';

export default function RegisterScreen(props){
  const slides = [
    {
      key: 'Intro',
      title: 'Enjoy Microbotany!',
      text: 'Microbotany è un\' app che ti consente di visualizzare in tempo reale i valori' +
            'registrati dai sensori connessi alla GrennBox offrendoti report grafici, semplici' +
            'ed intuitivi, e qualche antico consiglio legato alla tradizione contadina.',
      backgroundColor: '#59b2ab',
    },
    {
      key: 'Field',
      title: 'Account',
      text: 'Other cool stuff',
      backgroundColor: '#febe29',
    },
    {
      key: 'Gbox',
      title: 'Associazione GreenBox',
      text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
      backgroundColor: '#22bcb5',
    },
    {
      key: 'Bluetooth',
      title: 'Associazione Bluetooth',
      text: 'Other cool stuff',
      backgroundColor: '#febe29',
    },
    {
      key: 'Wifi',
      title: 'Connettiti alla wifi',
      text: 'Other cool stuff',
      backgroundColor: '#febe29',
    },
  ];

  var renderItem = ({ item }) => { //item.title per accedere ai campi dati
    switch (item.key) {
      case 'Intro':
        return (
            <IntroScreen/>
        );
      case 'Field':
        return (
            <FieldsScreen/>
        );
      case 'Gbox':
        return (
            <GboxScreen/>
        );

      case 'Bluetooth':
        return (
            <BluetoothScreen/>
        );

      case 'Wifi':
        return (
            <WifiScreen/>
        );

      default:
    }
}

var onDone = () => {
  console.log("tutto bene");
}

var _renderDoneButton = () => {
  return(
    <Text style = {{fontSize: 20, color: "green", fontWeight: "bold"}}>Fine</Text>
  )
};



  return (
		<View style={{ flex: 1, backgroundColor: '#ECEBC9', justifyContent: 'center', alignItems: 'center', flexDirection: "row"}}>
      <AppIntroSlider
        dotStyle = {{ backgroundColor: 'rgba(52, 52, 52, 0.3)'}}
        activeDotStyle = {{backgroundColor: 'white'}}
        dotClickEnabled = {false}
        renderItem={renderItem}
        renderDoneButton = {_renderDoneButton}
        data={slides}
        onDone={onDone}
        showNextButton = {false}
      />
    </View>
	);

}




const styles = StyleSheet.create({


});
