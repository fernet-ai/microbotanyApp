import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions, Animated, AsyncStorage} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons, FontAwesome, Entypo, AntDesign} from '@expo/vector-icons';
import LogSensorPanel from '/home/fernet/Documenti/MicrobotanyApp/components/LogSensorPanel.js';
import ViewPager from '@react-native-community/viewpager';
import mascotte from '/home/fernet/Documenti/MicrobotanyApp/assets/piantina_insomma.png';
import serra from '/home/fernet/Documenti/MicrobotanyApp/assets/serra.jpg';
import {LineChart} from 'react-native-chart-kit';

TouchableOpacity.defaultProps = { activeOpacity: 0.70}

export default class initialScreen extends React.Component {


    constructor(props) {
      super(props)
      this.state = {
        token: undefined,
        DataFromServer: "",
        animMascotte:  new Animated.Value(0),
      }
    }


      async componentDidMount() {
        myToken = await AsyncStorage.getItem('MyToken');
        if(myToken){
          this.setState({token: myToken});
          // Update Sensor's values
          this.updateValues();
          this.pollingValues = setInterval(() => this.updateValues(), 60000);
        }


      }

      componentWillUnmount() {
        console.log("Sto smontando tutto ..")
        clearInterval(this.pollingValues);
      }

      updateValues = async () => {
        fetch("https://microbotany-api.herokuapp.com/gbox/log", {
              method: "GET",
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': this.state.token
              }
            }).then((response) => response.json())
                .then((responseJson) => {
                  console.log(responseJson.message);
                  console.log("pesco da value: "+responseJson);
                  this.setState({DataFromServer: responseJson});
                })
                .catch((error) => {
                  console.error(error);
                });
      }




      openMascotte(offset) {
        console.log("offset: "+ offset);
        Animated.timing(
          this.state.animMascotte,
          { toValue: new Animated.Value(offset),
            useNativeDriver: false,
            duration: 500,
           }
        ).start();
      }

      goSettings = async () => {

      }

      goUserScreen = () => {
        console.log("vai schermata profilo");
        this.props.navigation.navigate('Profile', {unDato:  "ciao"});
      }


      loadToken = async () => {
          AsyncStorage.getItem("Token").then((myToken) => {
            this.setState({token: myToken});
       });
      }



  	render(){

	  return (
      <View style={styles.container}>

      <View style={styles.fantasy}>

      <ViewPager style={styles.viewPager} initialPage={0}>
          <View style={styles.page} key="1">
            <View style={{flexDirection: 'row'}}>
              <LogSensorPanel
                sensorName="Suolo"
                sensorValue = {this.state.DataFromServer.refss}
                sensorHum = {this.state.DataFromServer.refss_hum}
                maxValue = {this.state.DataFromServer.refssMAX}
                minValue = {this.state.DataFromServer.refssMIN}
                maxHum = {this.state.DataFromServer.refssMAX_hum}
                minHum = {this.state.DataFromServer.refssMIN_hum}
                loaded = {this.state.DataFromServer == ""}
                />
              <LogSensorPanel
                sensorName="Interno"
                sensorValue = {this.state.DataFromServer.refai}
                sensorHum = {this.state.DataFromServer.refai_hum}
                maxValue = {this.state.DataFromServer.refaiMAX}
                minValue = {this.state.DataFromServer.refaiMIN}
                maxHum = {this.state.DataFromServer.refaiMAX_hum}
                minHum = {this.state.DataFromServer.refaiMIN_hum}
                loaded = {this.state.DataFromServer == ""}
                />
            </View>

            <View style={{flexDirection: 'row', }}>
              <LogSensorPanel
                sensorName="Esterno"
                sensorValue = {this.state.DataFromServer.refae}
                sensorHum = {this.state.DataFromServer.refae_hum}
                maxValue = {this.state.DataFromServer.refaeMAX}
                minValue = {this.state.DataFromServer.refaeMIN}
                maxHum = {this.state.DataFromServer.refaeMAX_hum}
                minHum = {this.state.DataFromServer.refaeMIN_hum}
                loaded = {this.state.DataFromServer == ""}
                />
              <LogSensorPanel
                sensorName="Luce"
                sensorValue = {this.state.DataFromServer.refl}
                maxValue = {this.state.DataFromServer.reflMAX}
                minValue = {this.state.DataFromServer.reflMIN}
                loaded = {this.state.DataFromServer == ""}
                />
            </View>

            <View style = {{width: "100%", alignItems: "center"}}>
              <Text style = {{fontSize: 14, padding: 2, textAlign: "center"}}>Ultimo aggiornamento da GBox:{"\n"}{this.state.DataFromServer.lastUpdate}</Text>
            </View>

          </View>

          <View style={styles.page} key="2">
               <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                 <Text  style={styles.sensorName}> Temperatura °C </Text>
                   <LineChart
                     data={{
                       labels: ['1', '2', '3', '4', '5', '6'],
                       datasets: [{
                         data: [
                           Math.random() * 100,
                           Math.random() * 100,
                           Math.random() * 100,
                           Math.random() * 100,
                           Math.random() * 100,
                           Math.random() * 100
                         ]
                       }]
                     }}
                     width={Dimensions.get('window').width - 30}
                     height= {Dimensions.get('window').height / 3}
                     chartConfig={{
                       backgroundColor: '#ECEBC9',
                       backgroundGradientFrom: '#ECEBC9',
                       backgroundGradientTo: '#ECEBC9',
                       decimalPlaces: 2, // optional, defaults to 2dp
                       color: (opacity = 1) => `rgba(0, 0, 0, 0.7)`,
                       style: {
                         borderRadius: 16,
                       }
                     }}
                     bezier
                     style={{
                       marginVertical: 8,
                       borderRadius: 16,
                       shadowColor: "#000",
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,

                        elevation: 5,
                     }}
                   />
               </View>
          </View>


          <View style={styles.page} key="3">
            <View style={{height: "60%", width: '90%',
            backgroundColor: 'rgba(167, 212, 137, 0.7)', alignItems: "center",
            justifyContent: "space-evenly", borderRadius: 20}}>

              <Text style={{fontSize: 22, color: "black", fontWeight: "bold"}}>Schermata Sviluppo</Text>
                <Entypo name="lock" size={100} color="white" />
                <Text style={{fontSize: 16}}>Non disponibile nella versione Starter</Text>
            </View>
          </View>

        </ViewPager>
      </View>

      <View  style={styles.submain}>

            <View style={{
               flex: 7,
               flexDirection: 'row',
               alignItems: 'stretch',
               justifyContent: 'center',
             }}>

                <View style={{
                  width: '25%',
                   justifyContent: 'center',
                 }}>
                 <TouchableOpacity style={styles.mascotteView} onPress={() => this.openMascotte(-80)}>
                 <Image source={mascotte} style={{ width: '100%', height: '100%'}} />
                </TouchableOpacity>
                </View>

                <View style={{
                   width: '20%',
                 }}>
                </View>

                <View style={{
                  width: '55%',
                  alignItems: 'center',
                 }}>

                    <TouchableOpacity style={styles.plus} >
                      <FontAwesome name="plus" size={25} color="#CAAD7E" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.swap} >
                      <MaterialCommunityIcons name="swap-horizontal-bold" size={25} color="#CAAD7E" />
                    </TouchableOpacity>

                   <View style={styles.roundButton} >
                      <Text style={{color: 'white',
                                    fontWeight: 'bold',
                                    position: 'absolute',
                                    bottom: 40,
                                    right: 30,
                                    elevation: 2,
                                  }}>{this.state.DataFromServer.GBname}</Text>
                     <Image source={serra} style={styles.roundSerra} />
                  </View>

                </View>

            </View>




            <View style={{
               flex: 3,
               flexDirection: 'row',
               alignItems: 'center',
               justifyContent: 'space-evenly',
             }}>
              <TouchableOpacity onPress={this.goSettings}>
                  <Ionicons name="settings" size={40} color="#ECEBC9" />
              </TouchableOpacity>

              <TouchableOpacity onPress={this.goSettings}>
                <MaterialCommunityIcons name="book-open-page-variant" size={40} color="#ECEBC9" />
              </TouchableOpacity>

              <TouchableOpacity>
                  <FontAwesome name="user" size={40} color="#ECEBC9" />
              </TouchableOpacity>

            </View>

      </View>
      </View>
	  );

	 }
}





const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#CAAD7E',
      alignItems: 'center',
      justifyContent: 'center',
    },

    fantasy: {
        flex: 3,
        width: '100%',
        flexDirection: 'column',
        backgroundColor: '#ECEBC9',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 180,
        borderBottomRightRadius: 0,
        shadowColor: "#000",
        shadowOffset: {
        	width: 0,
        	height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9,
      },


      viewPager: {
          flex: 1,
          width: '100%',
        },


        page:{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: "5%",
        },


      submain: {
          flex: 1,
          width: '100%',
          flexDirection: 'column',
        },



    mascotteView :{
      width: '100%',
      height: '60%',
      backgroundColor: '#ECEBC9',
      alignItems: 'center',
      justifyContent: 'center',
      borderTopRightRadius: 120,
      borderBottomRightRadius: 120,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 9,
      },
      shadowOpacity: 0.48,
      shadowRadius: 11.95,

      elevation: 18,

    },

    plus :{
      width: 50,
      height: 50,
      backgroundColor: '#ECEBC9',
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: 'white',
      borderRadius: 120,
      position: 'absolute',
      bottom: 40,
      right: 20,
      borderColor: 'black',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 9,
      },
      shadowOpacity: 0.48,
      shadowRadius: 11.95,

      elevation: 20,
    },


    swap :{
      width: 40,
      height: 40,
      backgroundColor: '#ECEBC9',
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: 'white',
      borderRadius: 120,
      position: 'absolute',
      bottom: 95,
      right: 5,
      borderColor: 'black',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 9,
      },
      shadowOpacity: 0.48,
      shadowRadius: 11.95,

      elevation: 20,

    },

    roundButton: {
      height: '60%',
      width: '80%',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '2%' ,
      alignItems: 'center',
      borderRadius: 100,
      borderTopRightRadius: 0,
      borderTopLeftRadius: 0,
      backgroundColor: '#ECEBC9',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 9,
      },
      shadowOpacity: 0.48,
      shadowRadius: 11.95,

      elevation: 18,
    },

    roundSerra: {
      height: '100%',
      width: '100%',
      borderRadius: 100,
      borderTopRightRadius: 0,
      borderTopLeftRadius: 0,
    },


    TextUs: {
        fontSize: 20,
      },

});
