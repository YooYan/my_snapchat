import React from 'react';
import {TextInput, styles, StyleSheet, Text, View, Image, Button, TouchableOpacity, push} from 'react-native';



export default class Connexion extends React.Component{
 
  constructor() {
    super()
    this.state = {
      email: "",
      password: ""
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = (e) => {
    console.log("passed in handleCGange")
//    console.log("BANANA" +e)
    this.setState({
      email: e
    })
  }
  handleChangePass = (e) => {
    console.log("passed in handleCGange")
//    console.log("BANANA" +e)
    this.setState({
      password: e
    })
  }


  

    render() {
      console.log("this.state.password = " + this.state.password)
      console.log("this.state.email = " + this.state.email)
  return (
    
   <View style={{ flex: 1, backgroundColor: 'white' }}>
    <View style={styler.container}>
          <TextInput
          style={styler.input}
          placeholder='Password'
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={this.handleChangePass}
        />
        <TextInput
          style={styler.input}
          placeholder='Email'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={this.handleChange}
         
        />
        
        <Button
          title='Inscris-toi !'
          onPress={() => {
            // alert('Bienvenue les nazes !');
            const {navigate} = this.props.navigation;

           console.log("TEST")
            fetch('http://snapchat.wac.under-wolf.eu/inscription', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email : this.state.email, 
              password : this.state.password
              
            }),
          }).then((response) => response.json())
          .then((responseJson) => {
            
            if (responseJson.status == 400 )
            {
              // navigate("connexion")
              alert('Email ou mot de passe déja prit !')
              
              // alert(responseJson.status)
          } else {
               navigate("Connect")
                alert("Vous êtes bien inscrit !")
            }
          })
         }
        }
        
          />
  </View>
  </View>
    )
  }
}
const styler = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    backgroundColor: '#42A5F5',
    margin: 10,
    padding: 8,
    color: 'white',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})