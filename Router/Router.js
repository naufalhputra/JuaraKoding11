  
import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import MainMenu from '../Pages/MainMenu';
import DataJodoh from '../Pages/DataJodoh';
import InfoJodoh from '../Pages/InfoJodoh';
import CariJodoh from '../Pages/CariJodoh';


const Stack = createStackNavigator();
class Router extends Component {

  render() {
    return (
        <Stack.Navigator>
            <Stack.Screen name = "Home" component = {Home}/>
            <Stack.Screen name = "Login" component = {Login}/>
            <Stack.Screen name = "Register" component = {Register}/>
            <Stack.Screen name = "MainMenu" component = {MainMenu}/>
            <Stack.Screen name = "CariJodoh" component = {CariJodoh}/>
            <Stack.Screen name = "DataJodoh" component = {DataJodoh}/>
            <Stack.Screen name = "InfoJodoh" component = {InfoJodoh}/>
        </Stack.Navigator>
    );
  }

}
export default Router