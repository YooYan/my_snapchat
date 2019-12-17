import * as React from 'react';
import { Button, Image, View , Text} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { FlatList } from 'react-native-gesture-handler';
import { Item } from 'native-base';
import { List, ListItem } from "react-native-elements";

export default class ImagePickerExample extends React.Component {

  constructor() {
    super()
    this.state = {
      outerScrollEnabled: true,
      alluser: [],
      image: null,
      
    }
    this.UseUtti = this.UseUtti.bind(this);
  }

  UseUtti = () => {
    
    console.log("TEST")
    fetch('http://snapchat.wac.under-wolf.eu/all', {
    method: 'GET',
    headers: {
      'Token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVkZGY5NGUzNTM5MDdiMjZlMmM3ZThhZCIsImVtYWlsIjoibHVjYXNAbHVjYXMuZnIifSwiaWF0IjoxNTc1MzY1MDgyfQ.1LMRRU-XYAUdjzTZMqHpDfjSNU-7X70Eggkyri0ABIY'
      }
    })
    .then(res => res.json())
    .then(data => {
      this.setState({
        alluser: data.data        
      })
      for (var x = 0; x < this.state.alluser.length; x++) {
        write("email: " + this.state.alluser[x].email)
        
      }
    });  
  }
  onChangeHandler = (e) => {
    let file = e.target.files[0];
    console.log(file)
    this.setState({
      picture: file
    })
}
  


  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Galerie photo !"
          onPress={this._pickImage}
        />
        
            {/* <FlatList 
                data={this.state.alluser}
                renderItem={({item}) => (
                  <Text
                   subtitle={item.email}
                  />
                  )}
                  /> */}
                   {/* <FlatList
          data={[
            {key: 'Devin'},
            {key: 'Dan'},
            {key: 'Dominic'},
            {key: 'Jackson'},
            {key: 'James'},
            {key: 'Joel'},
            {key: 'John'},
            {key: 'Jillian'},
            {key: 'Jimmy'},
            {key: 'Julie'},
          ]}
          renderItem={({item}) => <Text>{item.key}</Text>}
        /> */}

         
        
    
                  
      

        {/* <Button 
        title="Envoyer"
        onPress={this.UseUtti}
        /> */}
        
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      </View>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
    console.log('hi');
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
      console.log(this.state.image);
    }
  };
}