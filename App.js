import React, { Component, useRef } from 'react';
import { StyleSheet, TouchableOpacity, Text, View , Image, Animated, TextInput, Alert} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AppIntroSlider from 'react-native-app-intro-slider';
import { AntDesign} from '@expo/vector-icons';
import home from './screens/Home';
import UserManager from './screens/UserManager';
import logo from './assets/logo.png';


const AppNavigator = createStackNavigator({
  Home: {
    screen: home,
         navigationOptions: {
       title: 'Home',
       headerShown: false
     },
  },

  UserManager: {
      screen: UserManager,
    navigationOptions: {
      title: 'Profile',
      headerShown: false
    },
  },

},{
        initialRouteName: "Home"
});

const AppContainer = createAppContainer(AppNavigator);



export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      SignedIn: false,
      fadeAnim: new Animated.Value(0.3),
    };
  }


  async componentDidMount() {
    //await this.checkLogin();
    this.fadeIn()

}


  _onSkip = () => {
    this.setState({ SignedIn: true });
  };


  fadeIn = async() => {
    console.log("fade");
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      useNativeDriver: true,
      duration: 5000,
    }).start();
  };


signUp = async() => {
  	Alert.alert("Finisci la schermata di registrazione.");
  }

  login = async() => {
    	this.setState({SignedIn: true});
    }




  render() {
    // this.state.showRealApp || this.state.iSeenTutorial
    if (this.state.SignedIn) {
      return <AppContainer />;
    } else {
      return (
        <Animated.View style = {styles.container}>
            <Animated.Image onPress= {this.fadeIn} source={logo} style={{height: 150, width: 150,}} />
            <Text style= {{fontSize: 20}}>Microbotany Services</Text>
            <View style = {styles.textInputContainer}>
            <TextInput
               style = {styles.TextInput}
               placeholder="Email"
               />
            <TextInput
              style = {styles.TextInput}
              placeholder="Password"
             />

            <TouchableOpacity  onPress={this.login}  style={styles.LoginButton}>
                <Text style= {{fontSize: 20}}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.GoogleButton}>
                <Text style= {{fontSize: 18}}>Accedi con Google</Text>
            </TouchableOpacity>

            <Text>
              <Text>Non hai un account?</Text>
              <Text  onPress={this.signUp} style={{fontWeight: "bold", color: '#008000'}}> Registrati.</Text>
            </Text>

            </View>
        </Animated.View >
      );
    }

  }
}


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
