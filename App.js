import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons} from '@expo/vector-icons';
import LogSensorPanel from './components/LogSensorPanel.js'
import ViewPager from '@react-native-community/viewpager';
import mascotte from './assets/piantina_insomma.png';

TouchableOpacity.defaultProps = { activeOpacity: 0.70}

export default class initialScreen extends React.Component {


    constructor(props) {
      super(props)
      this.state = {
        jsonSensorValues: '',
        jsonSensorRanges: '',
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


  	render(){

	  return (
      <View style={styles.container}>

      <View style={styles.fantasy}>

      <ViewPager style={styles.viewPager} initialPage={0}>
          <View style={styles.page} key="1">
            <View style={{flexDirection: 'row'}}>
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

            <View style={{flexDirection: 'row'}}>
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
            <Text> SCHERMATA REPORT </Text>
          </View>


          <View style={styles.page} key="3">
            <Text> SCHERMATA SVILUPPO </Text>
          </View>

        </ViewPager>
      </View>

      <View  style={styles.submain}>
        <View style={{
          width: '25%',
          height: '100%',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}>
          <TouchableOpacity style={styles.mascotteView}>
            <Image source={mascotte} style={{ width: '100%', height: '100%'}} />
          </TouchableOpacity>
          <Ionicons name="settings" size={40} color="#D5E7B8" />
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
          width: '100%'
        },


        page:{
          justifyContent: 'center',
          alignItems: 'center',
        },


      submain: {
          flex: 1,
          width: '100%',
          alignItems: 'flex-start',
          flexDirection: 'row',
          justifyContent: 'space-between',
        },



    mascotteView :{
      width: '100%',
      height: '40%',
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


});
