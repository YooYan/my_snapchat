import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableHighlight, Button  } from "react-native";
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
// import { RNCamera } from 'react-native-camera';

class CameraComponent extends Component {

    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back
    }
    
    

    async componentWillMount(){
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        const { roll } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        this.setState({ hasCameraPermission: status === 'granted' })
        this.setState({ hasCameraRollPermission: roll === 'granted' })
    }
    state = {
        type: Camera.Constants.Type.back
    }
    
    takePicture =  async() => {
        let {uri} = await this.camera.takePictureAsync();
        const asset = await MediaLibrary.createAssetAsync(uri);
        console.log(uri)    
    };

    render(){
        const { hasCameraPermission} = this.state

        if(hasCameraPermission === null){
            return <View />
        }
        else if(hasCameraPermission === false){
            return <Text>No access to camera</Text>
        }
        else{
            return(
                
            <View style={{flex:1}}>
                <Camera style={{ flex: 1 }} type={this.state.type}  ref={ref => {
    this.camera = ref;
  }}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
                  
                {/* <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text> */}
            </View>
            <View style={style.myButton}>
         <Button
         title="Photo"
         onPress={this.takePicture}
         color= 'yellow'
         style={{fontSize: 20}}
         />
         </View>
          </Camera>
            </View>
            )
        }
    }
}
export default CameraComponent;

const style = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})
// const styles = StyleSheet.create({
//     captureButton: {
//         marginBottom:30,
//         width:160,
//         borderRadius:10,
//         backgroundColor: "white",
//     }
// });
const styler = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    myButton:{
      padding: 5,
      height: 200,
      width: 200,  //The Width must be the same as the height
      borderRadius:400, //Then Make the Border Radius twice the size of width or Height   
      backgroundColor:'rgb(195, 125, 198)',
  
    }
  });