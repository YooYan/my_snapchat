import PageLocker from "./pagelocker";
import Inscription from "./inscription"
import Connexion from "./connexion";
import Home from "./home"
import React from 'react';
import 'react-native-gesture-handler'
import { createSwitchNavigator } from "react-navigation";
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const MainNavigator = createStackNavigator({
  Locker : {screen : PageLocker, navigationOptions:{header:null}},
  Inscription : {screen : Inscription},
  Connect : {screen : Connexion},
  Home : {screen : Home, navigationOptions:{header:null}}
  
 
});

const tamaman = createAppContainer(MainNavigator)

export default tamaman;