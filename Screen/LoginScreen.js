import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import logo from '../assets/logo.png';
import Loader from './Components/Loader';

const LoginScreen = ({navigation}) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  const passwordInputRef = createRef();


  const handleSubmitPress = () => {
    setErrortext('');
    if (!userEmail) {
      alert('Inserisci una email');
      return;
    }
    if (!userPassword) {
      alert('Inserisci una password');
      return;
    }
    setLoading(true);

    fetch('https://microbotany-api.herokuapp.com/user/signIn', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: userEmail,
        password: userPassword,
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //Hide Loader
        setLoading(false);
        console.log(responseJson);
        if (responseJson.auth) {
          AsyncStorage.setItem('MyToken', responseJson.token);
          navigation.replace('DrawerNavigationRoutes');
        }
       else {
            setErrortext(responseJson.msg);
            console.log(responseJson.msg);
        }
      })
      .catch((error) => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  };

  return (
    <View style = {styles.container}>
        <Image  source={logo} style={{height: 150, width: 150}} />
        <Text style= {{fontSize: 20}}>Microbotany Services</Text>
        <View style = {styles.textInputContainer}>
        <TextInput
           style = {styles.TextInput}
           placeholder="Email"
           autoCapitalize="none"
           keyboardType="email-address"
           returnKeyType="next"
           blurOnSubmit={false}
           onSubmitEditing={() =>
               passwordInputRef.current &&
               passwordInputRef.current.focus()
             }
           onChangeText={(UserEmail) =>
             setUserEmail(UserEmail)}
           />
        <TextInput
          secureTextEntry={true}
          style = {styles.TextInput}
          placeholder="Password"
          keyboardType="default"
          ref={passwordInputRef}
          onSubmitEditing={Keyboard.dismiss}
          blurOnSubmit={false}
          secureTextEntry={true}
          returnKeyType="next"
          onChangeText={(UserPassword) =>
            setUserPassword(UserPassword)
          }
         />

         {errortext != '' ? (
          <Text style= {{fontSize: 15, color: "red"}}>
            {errortext}
          </Text>
        ) : null}

        <TouchableOpacity style={styles.LoginButton} onPress={handleSubmitPress}>
            <Text style= {{fontSize: 20, color: "white"}}>Accedi</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.GoogleButton}>
          <Text>
            <Text style= {{fontSize: 16}}>Accedi con </Text>
            <Text style= {{fontSize: 18, fontWeight: "bold", color: "white"}}> Google</Text>
          </Text>
        </TouchableOpacity>

        <Text>
          <Text>Non hai un account?</Text>
          <Text  style={{fontWeight: "bold", color: '#008000'}}
                onPress={() => navigation.navigate('RegisterScreen')}> Registrati.</Text>
        </Text>

        </View>
    </View >
  );
};
export default LoginScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6DB',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },

  textInputContainer: {
    width: '100%',
    // backgroundColor: 'red',
    marginVertical: '5%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },

  TextInput: {
    width: '60%',
    marginVertical: '2%',
    height: 35,
    backgroundColor: 'rgba(167, 212, 137, 0.8)',
    borderRadius: 8,
    paddingHorizontal: 10,

  },
  LoginButton: {
    width: '60%',
    marginVertical: '2%',
    height: 40,
    backgroundColor: '#CAAD7E',
    borderRadius: 8,
    paddingHorizontal: 10,
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

  GoogleButton: {
    width: '60%',
    marginVertical: '2%',
    height: 40,
    backgroundColor: '#DB4437',
    borderRadius: 8,
    paddingHorizontal: 10,
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
  }


});
