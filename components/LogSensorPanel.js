import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions,TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome, Ionicons , MaterialCommunityIcons, MaterialIcons, Entypo, Feather, FontAwesome5, AntDesign} from '@expo/vector-icons';
import RangePicker from './RangePicker';


TouchableOpacity.defaultProps = { activeOpacity: 0.70}


export default  class LogSensorPanel extends React.Component {

  constructor(props) {
    super(props);
     this.state = {
       SensorName: this.props.sensorName,
       SensorMode: true,
       TypeValue: undefined,
     }

  }


  onPanelChange = (sensorSelected) => {
    console.log(sensorSelected);
    this.setState({
        TypeValue: sensorSelected
      });

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


  getResponse(result){
    this.onPanelChange(result); //dovrebbe restituire Nothing
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

            var dictionary = {
              "Suolo": "REFSS",
              "Interno":"REFAI",
              "Esterno": "REFAE",
              "Luce": "REFL"
            };


            if(this.state.TypeValue == 'Val'){

               return(
                <View style={styles.panel}>
                  <LinearGradient
                  colors={['rgba(255, 231, 184, 0.30)', 'transparent']}
                   style = {styles.gradientContainer}/>
                   <View style={{ alignItems: 'center', flex: 1, width: '100%',  flexDirection: 'column', justifyContent: 'center' }}>

                     <View style={[styles.roundButton,{  backgroundColor: colorHum}]} >
                     <MaterialCommunityIcons name={SensorType == "Luce"? "lightbulb-on" : "temperature-celsius"} size={20} color="black" />
                     <Text style={{fontWeight: "bold"}}>{this.props.sensorValue}</Text>
                     </View>

                     <RangePicker sensorName = {dictionary[SensorType]} isHum = {false}   min= {parseInt(this.props.minValue)}  max={parseInt(this.props.maxValue)} callback={this.getResponse.bind(this)}/>



                 </View>
                </View>
              )
            }
            else if(this.state.TypeValue == 'Hum'){
              return (
              <View style={styles.panel}>
                <LinearGradient
                colors={['rgba(255, 231, 184, 0.30)', 'transparent']}
                 style = {styles.gradientContainer}/>
                 <View style={{ alignItems: 'center', flex: 1, width: '100%',  flexDirection: 'column', justifyContent: 'center' }}>

                   <View style={[styles.roundButton,{  backgroundColor: colorHum}]} >
                     <Ionicons  name= {SensorType == "Luce"? "ios-close" : "water"}  size={20} color="#6495ED" />
                     <Text style={{fontWeight: "bold"}}>{SensorType == "Luce"? "--" : this.props.sensorHum}</Text>
                   </View>

                   <RangePicker sensorName = {dictionary[SensorType]} isHum = {true}   min= {parseInt(this.props.minHum)}  max={parseInt(this.props.maxHum)}  callback={this.getResponse.bind(this)}/>


               </View>
              </View>
            )
            }

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
