'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
} from 'react-native';

class trans extends Component {

async FetchCardInfo() {
        try {
          let response = await fetch('https://facebook.github.io/react-native/movies.json');
          let responseJson = await response.json();
          console.log(responseJson);
          return responseJson;
        } catch(error) {
          console.error(error);
        }
      }
 render(){
   return(
    <View style={styles.container}>
    <TextInput 
         style={styles.input}
         placeholder='Transfer Money'
    />
    <TextInput 
         style={styles.input}
         placeholder='Transfer Money'
    />
    <TouchableHighlight style={styles.input} onPress={this.Trans.bind(this)}>
      <Text>Trans</Text>
    </TouchableHighlight>
   </View>
   );
 }
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#2980b9',
  },
  input:{
    flex:2,
    backgroundColor: '#2980b9',
  },
});



AppRegistry.registerComponent('trans', () => trans);