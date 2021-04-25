import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions,TouchableOpacity, SectionList, FlatList } from 'react-native'
import SmoothPicker from "react-native-smooth-picker";
import {AntDesign} from '@expo/vector-icons';




export default  class RangePicker extends React.Component {

  constructor(props) {
    super(props);
     this.state = {
			 selectedMax: this.props.max,
 		 	 selectedMin: this.props.min,
     }

  }



	handleChangeMin  =  index  =>  {
    this.setState ( {
      selectedMin : index
    });
  	};

		handleChangeMax  =  index  =>  {
			this.setState ( {
				selectedMax : index
			});
			};


    generateInterval = (val, len) =>{
      let interval = [];
      let dx = Array.from(Array(len + 1).keys());
      let sx = Array.from(Array(len + 1).keys()).reverse();
      sx.pop();

      sx.forEach(element =>  interval.push(val - element));
      dx.forEach(element =>  interval.push(val + element));

      return interval;
    };

    /*SensorName = props dal parent, isHum = val/hum dal parent, min = state.selectedMin, max = state.selectedMax*/
    ConfirmSelectedRange = (min, max) => {
        console.log("ecco il nome del mio sensore: "+ this.props.sensorName + "  anche "+ this.props.isHum);
        console.log("e min: "+ this.state.selectedMin+ " max: "+this.state.selectedMax)

        if(this.props.isHum){
          fetch('http://www.microbotany.online/api/set/'+this.props.sensorName+'_MIN_hum/'+this.state.selectedMin);
          fetch('http://www.microbotany.online/api/set/'+this.props.sensorName+'_MAX_hum/'+this.state.selectedMax);
         }
         else{
           fetch('http://www.microbotany.online/api/set/'+this.props.sensorName+'_MIN/'+this.state.selectedMin);
           fetch('http://www.microbotany.online/api/set/'+this.props.sensorName+'_MAX/'+this.state.selectedMax);           
         }

        this.props.callback('Nothing');
    }


	render() {
    return (
      <View style={styles.container}>

			<View style = {{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
				<Text style = {{fontWeight: "bold", fontSize: 12}}>Min: {this.state.selectedMin}°C</Text>
				<Text style = {{fontWeight: "bold", fontSize: 12}}>Max: {this.state.selectedMax}°C</Text>
			</View>

			<View style = {{flexDirection: 'row', marginVertical: 10, flex : 2}}>
				<SmoothPicker
				  style = {{}}
					selectOnPress = {true}
          initialScrollToIndex = {5}
					keyExtractor={(item, index) => index.toString()}
	        data={this.generateInterval(this.props.min, 6)}
	        onSelected={({ item, index }) => this.handleChangeMin(item)}
	        renderItem={({ item, index }) => (
						<View style = {[styles.itemView, {backgroundColor: item === this.state.selectedMin ? 'rgba(0, 0, 0, 0.1)': 'rgba(0, 0, 0, 0.0)'}]}>
	          	<Text style= {{fontWeight: 'bold', color: '#F6F6DB', }}> {item}°C</Text>
						</View>
	        )}
	      />

          <SmoothPicker
            style = {{}}
            selectOnPress = {true}
            initialScrollToIndex = {5}
            keyExtractor={(item, index) => index.toString()}
            data={this.generateInterval(this.props.max, 6)}
            onSelected={({ item, index }) => this.handleChangeMax(item)}
            renderItem={({ item, index }) => (
              <View style = {[styles.itemView, {backgroundColor: item === this.state.selectedMax ? 'rgba(0, 0, 0, 0.1)': 'rgba(0, 0, 0, 0.0)'}]}>
                <Text style= {{fontWeight: 'bold', color: '#F6F6DB', }}> {item}°C</Text>
              </View>
            )}
          />

			</View>

      <TouchableOpacity  onPress={() => this.ConfirmSelectedRange()} style={styles.confirmButton}>
       <AntDesign name="checkcircle" size={24} color="#A7D489" />
      </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create ({

	container: {
		paddingVertical: '5%',
		flex: 7,
		width: '100%',
		flexDirection: 'row',
		height: '50%',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'space-around',
		flexDirection: 'column'

	},

	listRange : {
		flexGrow: 1,
		borderWidth: 1,
		borderRadius: 10,
	},

	itemView: {
		alignItems: 'center',
		borderWidth: 0.2,
		borderRadius: 3,
		borderColor: '#F6F6DB',
		margin: 1
	},


    confirmButton : {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ECEBC9',
      paddingHorizontal: 15,
      borderRadius: 20,
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
