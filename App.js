import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions, Animated} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons, FontAwesome, AntDesign} from '@expo/vector-icons';
import LogSensorPanel from './components/LogSensorPanel.js';
import ViewPager from '@react-native-community/viewpager';
import mascotte from './assets/piantina_insomma.png';
import serra from './assets/serra.jpg';
import {LineChart} from 'react-native-chart-kit';

TouchableOpacity.defaultProps = { activeOpacity: 0.70}

export default class initialScreen extends React.Component {


    constructor(props) {
      super(props)
      this.state = {
        jsonSensorValues: '',
        jsonSensorRanges: '',
        animMascotte:  new Animated.Value(0),
      }
    }


      componentDidMount() {
        // Update Sensor's values
        this.updateValues();
        this.updateHum();
        this.pollingValues = setInterval(() => this.updateValues(), 60000);
        this.pollingHum = setInterval(() => this.updateHum(), 60000);
      }

      componentWillUnmount() {
        console.log("Sto smontando tutto ..")
        clearInterval(this.pollingValues);
        clearInterval(this.pollingHum);
      }

      updateValues = async () => {
        fetch('http://www.microbotany.online/api/log')
          .then((response) => response.json())
          .then((responseJson) => {
            console.log("pesco da value: "+responseJson.REFL);
            this.setState({jsonSensorValues: responseJson});
          })
          .catch((error) => {
            console.error(error);
          });
      }

      updateHum = async () => {
        fetch('http://www.microbotany.online/api/ranges')
          .then((response) => response.json())
          .then((responseJson) => {
            console.log("pesco da ranges: "+responseJson.REFSSMIN);
            this.setState({jsonSensorRanges: responseJson});
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



  	render(){

	  return (
      <View style={styles.container}>

      <View style={styles.fantasy}>

      <ViewPager style={styles.viewPager} initialPage={0}>
          <View style={styles.page} key="1">
            <View style={{flexDirection: 'row',  }}>
              <LogSensorPanel
                sensorName="Suolo"
                sensorValue = {this.state.jsonSensorValues.REFSS}
                sensorHum = {this.state.jsonSensorValues.REFSS_HUM}
                maxValue = {this.state.jsonSensorRanges.REFSSMAX}
                minValue = {this.state.jsonSensorRanges.REFSSMIN}
                maxHum = {this.state.jsonSensorRanges.REFSSMAX_hum}
                minHum = {this.state.jsonSensorRanges.REFSSMIN_hum}
                />
              <LogSensorPanel
                sensorName="Interno"
                sensorValue = {this.state.jsonSensorValues.REFAI}
                sensorHum = {this.state.jsonSensorValues.REFAI_HUM}
                maxValue = {this.state.jsonSensorRanges.REFAIMAX}
                minValue = {this.state.jsonSensorRanges.REFAIMIN}
                maxHum = {this.state.jsonSensorRanges.REFAIMAX_hum}
                minHum = {this.state.jsonSensorRanges.REFAIMIN_hum}
                />
            </View>

            <View style={{flexDirection: 'row', }}>
              <LogSensorPanel
                sensorName="Esterno"
                sensorValue = {this.state.jsonSensorValues.REFAE}
                sensorHum = {this.state.jsonSensorValues.REFAE_HUM}
                maxValue = {this.state.jsonSensorRanges.REFAEMAX}
                minValue = {this.state.jsonSensorRanges.REFAEMIN}
                maxHum = {this.state.jsonSensorRanges.REFAEMAX_hum}
                minHum = {this.state.jsonSensorRanges.REFAEMIN_hum}
                />
              <LogSensorPanel
                sensorName="Luce"
                sensorValue = {this.state.jsonSensorValues.REFL}
                maxValue = {this.state.jsonSensorRanges.REFLMAX}
                minValue = {this.state.jsonSensorRanges.REFLMIN}
                />
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
            <Text> SCHERMATA SVILUPPO </Text>
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
                                  }}>Sbargia's Serra</Text>
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

              <TouchableOpacity onPress={this.goSettings}>
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
