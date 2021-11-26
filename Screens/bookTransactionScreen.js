import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class TransactionScreen extends React.Component {
    constructor(){
      super();
      this.state = {
        hasCameraPermissions: null,
        scanned: false,
        scannedData: '',
        buttonState: 'normal',
        scannedBookID:"",
        scannedStudentID:""
      }
    }

    getCameraPermissions = async (ID) =>{
      const {status} = await Permissions.askAsync(Permissions.CAMERA);
      
      this.setState({
        /*status === "granted" is true when user has granted permission
          status === "granted" is false when user has not granted the permission
        */
        hasCameraPermissions: status === "granted",
        buttonState: ID,
        scanned: false
      });
    }

    handleBarCodeScanned = async({type, data})=>{
      const {buttonState}=this.state
      if(buttonState==="BookID"){
        this.setState({
          scanned: true,
          scannedBookID:data,
          buttonState: 'normal'
        });
      }

      else if(buttonState==="StudentID"){
        this.setState({
          scanned: true,
          scannedStudentID:data,
          buttonState: 'normal'
        });
      }
      
    }

    render() {
      const hasCameraPermissions = this.state.hasCameraPermissions;
      const scanned = this.state.scanned;
      const buttonState = this.state.buttonState;

      if (buttonState !== "normal" && hasCameraPermissions){
        return(
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        );
      }

      else if (buttonState === "normal"){
        return(
          <View style={styles.container}>

            <Image source={require("../assets/booklogo.jpg")}
             style={{width:200, height: 200}}/>

        <Text style={{textAlign: 'center', fontSize: 30}}>Wily</Text>

           <View style={styles.inputView}>
             <TextInput style={styles.inputBox}
               placeholder="BookID"
               value={this.state.scannedBookID}
             />
             <TouchableOpacity style={styles.scanButton} 
               onPress={()=>{
                 this.getCameraPermissions("BookID")
               }}
             >
                <Text style={styles.buttonText}>
                  scan
                </Text>
             </TouchableOpacity>
           </View>

           <View style={styles.inputView}>
             <TextInput style={styles.inputBox}
               placeholder="StudentID"
               value={this.state.scannedStudentID}
             />
             <TouchableOpacity style={styles.scanButton}
              onPress={()=>{
                this.getCameraPermissions("StudentID")
              }}
             >
                <Text style={styles.buttonText}>
                  scan
                </Text>
             </TouchableOpacity>
           </View>

         
        </View>
        );
      }
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    displayText:{
      fontSize: 15,
      textDecorationLine: 'underline'
    },
    scanButton:{
      backgroundColor: '#2196F3',
      padding: 10,
      margin: 10
    },
    buttonText:{
      fontSize: 20,
    },
    inputBox:{
      width:200,
      height:70,
      borderWidth:1.5,
      fontSize:20
    },
    inputView:{
      flexDirection:"row",
      margin:20

    }
  });