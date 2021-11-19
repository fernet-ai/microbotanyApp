import React, { useState, useEffect } from 'react';
import {Text, TouchableOpacity, View, Alert, StyleSheet , Image, TextInput} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign, MaterialIcons, FontAwesome } from '@expo/vector-icons';


export default function GboxScreen(props) {

// PER SCAN QRCODE
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [IDGreenbox, setIDGreenbox] = useState('');

  useEffect(() => {
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);
  const handleBarCodeScanned = ({ type, data }) => {
      setScanned(true);
       Alert.alert(`Il codice della tua GreenBox è: ${data}`);
       setIDGreenbox(data);
    };
  if (hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
      return <Text>Nessun accesso alla fotocamera</Text>;
  }


  var rescan = async () => {
      setScanned(false);
      setIDGreenbox("");
     }

  let infoToKnow = "Guarda il retro della tua GreenBox. Vedrai un QRcode:"+
  " inquadralo con la fotocamera per associarla al tuo account. Infine, dai un nome alla tua serra!"

    return(
      <View style={{flex: 1, justifyContent: 'space-evenly', alignItems: 'stretch',
      paddingVertical: "20%", paddingHorizontal: "5%",  }}>
        <View style = {{alignItems: 'center', flex: 3,  justifyContent: "space-evenly", paddingVertical: 20}}>
          <AntDesign name="qrcode" size={64} color="green" />
          <Text style = {{textAlign: 'center',  fontWeight: "bold", fontSize: 30, color: "black"}} >Associa la tua Gbox</Text>
          <Text style = {{textAlign: 'center',  fontSize: 15}}>{infoToKnow}</Text>
        </View>


        <View style = {{alignItems: 'stretch', flex: 4, backgroundColor: "red"}}>
          <Camera
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{width: "100%", height: "100%"}}
            />

        </View>


        <View style = {styles.GboxContainer}>
          <View style = {styles.textInputContainer}>
          <TouchableOpacity  onPress={rescan}>
            {scanned ?(
              <FontAwesome name="repeat" size={24} color="#79674b"/>
            ):(
              <AntDesign name="qrcode" size={24} color="#79674b" />
            )}

          </TouchableOpacity>
              <TextInput
                editable = {false}
                value = {IDGreenbox}
                style = {styles.TextInput}
                underlineColorAndroid="#f000"
                placeholder="IDGreenbox"
                placeholderTextColor="#8b9cb5"
                autoCapitalize="sentences"
                returnKeyType="next"
                blurOnSubmit={false}
              />

            </View>
          <View style = {styles.textInputContainer}>
              <AntDesign name="home" size={24} color="#79674b" />
              <TextInput
                style = {styles.TextInput}
                underlineColorAndroid="#f000"
                placeholder="Nome serra"
                placeholderTextColor="#8b9cb5"
                autoCapitalize="sentences"
                returnKeyType="next"
                blurOnSubmit={false}
              />
            </View>
            <TouchableOpacity style={styles.AssociaButton}>
                <Text style= {{fontSize: 20, color: "white"}}>Associa Gbox</Text>
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

  QRcontainer : {
    flex: 1,
  },

    GboxContainer: {
      flex: 3,
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

      AssociaButton: {
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
