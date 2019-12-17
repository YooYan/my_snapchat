import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import {Image} from 'react-native';
import ChooseFile from './ChooseFIle.js';
import CameraComponent from './Components/Camera.js'
// import ImagePicker from 'react-native-image-picker';


import { Container, Content, Button } from 'native-base'
import Swiper from 'react-native-swiper'

// import Camera from './Components/Camera'

import { TouchableOpacity, TouchableHighlight } from 'react-native-gesture-handler';

const styler= StyleSheet.create({
  slide: {
    backgroundColor: "white"
  }
})

const styles = StyleSheet.create({
  slideDefault: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
    text:{
      color:'black',
      fontSize:40,
      fontWeight:'bold',
      textAlign:'center',
      padding:40
    },
})
export default class App extends React.Component {

  constructor() {
    super()
    this.state = {
      outerScrollEnabled: true,
      alluser: [],
    }
    this.UseUtti = this.UseUtti.bind(this)
  }

  // alluser(e) {
 
  UseUtti() {
    
      console.log("TEST")
      fetch('http://snapchat.wac.under-wolf.eu/all', {
      method: 'GET',
      headers: {
        'Token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVkZGY5NGUzNTM5MDdiMjZlMmM3ZThhZCIsImVtYWlsIjoibHVjYXNAbHVjYXMuZnIifSwiaWF0IjoxNTc1MzY1MDgyfQ.1LMRRU-XYAUdjzTZMqHpDfjSNU-7X70Eggkyri0ABIY'
  }
      })
      .then(response => response.json())
      
      .then(data => {
        console.log(data.data)

        this.setState({

          alluser: data.data
        })
      }).catch((err) => {
        console.log(err)
        
      });
    }
 signOut() {
  const { onStateChange } = this.props;
  Auth.signOut().then(() => {
           onStateChange('signedOut');
  });
}
  verticalScroll = (index) => {
    if (index !== 1) {
      this.setState({
        outerScrollEnabled: false
      })
    }
    else {
      this.setState({
        outerScrollEnabled: true
      })
    }
  }

 
  render() {
    return (

      <Container>
        <Content>
          <Swiper
            loop={false}
            showsPagination={false}
            index={1}
            scrollEnabled={this.state.outerScrollEnabled}
          >

            <View style={styles.slideDefault}>
              {/* <Camera2></Camera2> */}
            </View>
            <Swiper
              loop={false}
              showsPagination={false}
              horizontal={false} 
              index={1}
              onIndexChanged={(index) => this.verticalScroll(index)}
            >
               <View style={styler.slide}>
               <Image  style={{width: 300, height: 300, justifyContent:'center', alignItems: 'center', marginLeft: 32, marginTop: 50}} source={require('./po.png')} /> 
                <Text style={styles.text}> Votre Profil !</Text>
               
                {/* <Button onPress={this.signOut} text='sign out'/> */}
               
               <Text style={{color: 'black',
                  fontWeight: 'bold',
                  fontSize: 20,}}> Nom :{"\n"}{"\n"} Prénom : {"\n"}{"\n"} Age: {"\n"}{"\n"} Sexe: 
               </Text>
               </View>

              <View style={{flex:1}}>
                <CameraComponent></CameraComponent>
                
              </View>
              <View style={styles.slideDefault}>
              
              <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}} >
               <Image  style={{width: 300, height: 300, justifyContent:'center', alignItems: 'center', marginLeft: 25, marginTop: 50}} source={require('./po.png')} /> 
                
              <Text style={{ fontSize: 30, marginTop: 50}}> Ouvrir vos photos !</Text>
              
                 <ChooseFile></ChooseFile>

                 

            </View>
              </View>
              
            </Swiper>
            <View style={styles.slideDefault}>
              <Text style={styles.text}>Stories</Text>
            </View>
          </Swiper>
        </Content>
      </Container>
    );
  }
}