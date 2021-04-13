import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions,TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome, Ionicons , MaterialCommunityIcons, MaterialIcons, Entypo, Feather, FontAwesome5} from '@expo/vector-icons';
import {LineChart} from 'react-native-chart-kit'

TouchableOpacity.defaultProps = { activeOpacity: 0.70}


export default  class LogSensorPanel extends React.Component {

  constructor(props) {
    super(props);
     this.state = {
       SensorName: this.props.sensorName,
       SensorMode: true,
     }

  }


  onPanelChange = (sensorSelected) => {
    console.log(sensorSelected)
    if(this.state.SensorMode){
      this.setState({SensorMode: false});
    }
    else this.setState({SensorMode: true});
  }


  errorDetection = (val, max, min) => {
    if(val == "NaN" || val == null) return "#FEE23E";
    if(val >= min && val <= max) return "white";
    if(val < min || val > max) return "#FD6A02";
  }


  render() {
    const SensorType = this.state.SensorName;
    let symbol;
    switch(SensorType){
      case "Suolo":
        symbol = <MaterialIcons name="terrain" size={70} color="brown" />
        break;
      case "Interno":
        symbol = <Feather name="box" size={70} color="black" />
        break;
      case "Esterno":
        symbol = <Entypo name="air" size={70} color="white" />
        break;
      case "Luce":
        symbol = <Ionicons name="sunny-sharp" size={70} color="#FDD451" />
        break;
      default:
      }

      let colorValue = this.errorDetection(this.props.sensorValue, this.props.maxValue, this.props.minValue);
      let colorHum = this.errorDetection(this.props.sensorHum, this.props.maxHum, this.props.minHum);

      let iconAdded;
      if(colorValue == "#FEE23E" || colorHum == "#FEE23E")
        iconAdded = <FontAwesome name="warning" size={24} color="#FEE23E" />

      if(this.state.SensorMode){
          return (
            <TouchableOpacity style={styles.panel}>
            <LinearGradient
            colors={['rgba(255, 231, 184, 0.30)', 'transparent']}
             style = {styles.gradientContainer}
             />
              <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                  <Text  style={styles.sensorName}>  {SensorType}  </Text>
                  {iconAdded}
                </View>
                <View style={{flexDirection: 'column', margin: '1%',alignItems: 'center', justifyContent: 'center'}}>
                  {symbol}
                  <View style={{with: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontSize: 15}}>{this.props.minValue}°C - {this.props.maxValue}°C</Text>
                    <Text style={{fontSize: 15}}> {this.props.minHum}% - {this.props.maxHum}%</Text>
                  </View>
                </View>
              </View>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity style={[styles.roundButton,{  backgroundColor: colorValue}]} onPress={() => this.onPanelChange("Val")}>
                  <MaterialCommunityIcons name={SensorType == "Luce"? "lightbulb-on" : "temperature-celsius"} size={20} color="black" />
                  <Text style={{fontWeight: "bold"}}>{this.props.sensorValue}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.roundButton,{  backgroundColor: colorHum}]} onPress={() => this.onPanelChange("Hum")}>
                  <Ionicons  name= {SensorType == "Luce"? "ios-close" : "water"}  size={20} color="#6495ED" />
                  <Text style={{fontWeight: "bold"}}>{SensorType == "Luce"? "--" : this.props.sensorHum}</Text>
                </TouchableOpacity>
              </View>
              </TouchableOpacity>


          );
        }
        else{

          return(
            <TouchableOpacity style={styles.panel} onPress={() => this.onPanelChange("Nothing")}>
              <LinearGradient
              colors={['rgba(255, 231, 184, 0.30)', 'transparent']}
               style = {styles.gradientContainer}/>

               <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                 <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                   <Text  style={styles.sensorName}>  {SensorType}  </Text>
                     <Text>Temperatura</Text>
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
                      width={140}
                      height={170}
                       chartConfig={{
                         backgroundColor: '#ECEBC9',
                         backgroundGradientFrom: '#ECEBC9',
                         backgroundGradientTo: '#ECEBC9',
                         decimalPlaces: 2, // optional, defaults to 2dp
                         color: (opacity = 1) => `rgba(167, 212, 137, 1)`,
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
            </TouchableOpacity>
          )
        }
  }
}


const styles = StyleSheet.create ({
    panel: {
      padding: '3%',
      margin: '2%',
      width: '42%',
      flexDirection: 'column',
      backgroundColor: '#A7D489',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 30,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 9,
      },
      shadowOpacity: 0.48,
      shadowRadius: 11.95,

      elevation: 18,
      },

    gradientContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '80%',
        borderRadius: 30,
      },


    sensorName: {
        fontSize: 25
      },


  roundButton: {
    flex: 1,
    padding: '8%',
    margin: '2%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,

    elevation: 18,
  },


})
