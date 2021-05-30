import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import Store from './Redux/Store';
import Router from './Router/Router';


class App extends Component {
  
  render() {
    return (
      <Provider store = {Store}>
        <NavigationContainer>
          <Router/>
        </NavigationContainer>
      </Provider>
    );
  }

}
export default App