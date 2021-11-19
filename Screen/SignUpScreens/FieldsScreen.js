import React, { useState, useEffect } from 'react';
import {Text, TouchableOpacity, View, StyleSheet , Image, TextInput} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5, FontAwesome, MaterialIcons ,MaterialCommunityIcons } from '@expo/vector-icons';

export default function FieldsScreen(props) {

  const [userName, setUserName] = useState('');


  let infoToKnow = "Sei pronto per un' esperienza di coltivazione mai vista prima?"
    return(
      <View style={{flex: 1, justifyContent: 'space-evenly', alignItems: 'stretch',
      paddingVertical: "20%", paddingHorizontal: "5%",  }}>
        <View style = {{alignItems: 'center', flex: 5,  justifyContent: "space-evenly"}}>
          <FontAwesome5 name="seedling" size={64} color="green" />
          <Text style = {{textAlign: 'center',  fontWeight: "bold", fontSize: 30, color: "black"}} >Crea un account</Text>
          <Text style = {{textAlign: 'center',  fontSize: 18}}>{infoToKnow}</Text>
        </View>
        <View style = {styles.RegistrationContainer}>
          <View style = {styles.textInputContainer}>
            <FontAwesome name="address-card" size={24} color="#79674b" />
            <TextInput
              style = {styles.TextInput}
              onChangeText={(UserName) => setUserName(UserName)}
              underlineColorAndroid="#f000"
              placeholder="Nome"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </View>

          <View style = {styles.textInputContainer}>
            <FontAwesome name="address-card" size={24} color="#79674b" />
            <TextInput
              style = {styles.TextInput}
              onChangeText={(UserName) => setUserName(UserName)}
              underlineColorAndroid="#f000"
              placeholder="Cognome"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </View>

          <View style = {styles.textInputContainer}>
            <MaterialIcons name="alternate-email" size={28} color="#79674b" />
            <TextInput
              style = {styles.TextInput}
              onChangeText={(UserName) => setUserName(UserName)}
              underlineColorAndroid="#f000"
              placeholder="Email"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </View>

          <View style = {styles.textInputContainer}>
            <MaterialCommunityIcons name="form-textbox-password" size={24} color="#79674b" />
            <TextInput
              style={styles.TextInput}
              underlineColorAndroid="#f000"
              placeholder="Password"
              placeholderTextColor="#8b9cb5"
              returnKeyType="next"
              secureTextEntry={true}
              blurOnSubmit={false}
            />
          </View>

          <View style = {styles.textInputContainer}>
            <MaterialCommunityIcons name="form-textbox-password" size={24} color="#79674b" />
            <TextInput
              style={styles.TextInput}
              underlineColorAndroid="#f000"
              placeholder="Ripeti password"
              placeholderTextColor="#8b9cb5"
              returnKeyType="next"
              secureTextEntry={true}
              blurOnSubmit={false}
            />
          </View>

          <TouchableOpacity style={styles.RegisterButton}>
              <Text style= {{fontSize: 20, color: "white"}}>Accedi</Text>
          </TouchableOpacity>

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

  RegistrationContainer: {
    flex: 7,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textInputContainer:{
    width: "100%",
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  TextInput: {
    width: '60%',
    margin: '2%',
    height: 35,
    backgroundColor: 'rgba(167, 212, 137, 0.8)',
    borderRadius: 8,
    paddingHorizontal: 10,

  },


  RegisterButton: {
    width: '75%',
    marginVertical: '5%',
    height: 40,
    backgroundColor: '#CAAD7E',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },

});
