import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions,TouchableOpacity, SectionList, FlatList } from 'react-native'
import SmoothPicker from "react-native-smooth-picker";



export default  class RangePicker extends React.Component {

  constructor(props) {
    super(props);
     this.state = {
			 selectedMax: this.props.max,
 		 	 selectedMin: this.props.min,
     }

  }



	handleChangeMin  =  index  =>  {
		console.log(index);
    this.setState ( {
      selectedMin : index
    });
  	};

		handleChangeMax  =  index  =>  {
			console.log(index);
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


	render() {
    return (
      <View style={styles.container}>

			<View style = {{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
				<Text style = {{fontWeight: "bold", fontSize: 12}}>Min: {this.state.selectedMin}°C</Text>
				<Text style = {{fontWeight: "bold", fontSize: 12}}>Max: {this.state.selectedMax}°C</Text>
			</View>

			<View style = {{flexDirection: 'row', marginVertical: 20}}>
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



      </View>
    );
  }
}

const styles = StyleSheet.create ({

	container: {
		paddingVertical: '5%',
		flex: 4,
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
	}

})
