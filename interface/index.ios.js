
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
  constructor(){
    super();
    this.state={
      CardNumber:'aa',
      HolderName:'11',
      ExpireDate:'1111',
      CSV:'111',
      errors: [],
    }
  }
  async Trans() {
  try {
    let response = await fetch('http://localhost:13432',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        /*user:{
              CardNumber: this.state.CardNumber,
              HolderName: this.state.HolderName,
              ExpireDate: this.state.ExpireDate,
              CSV: this.state.CSV
        }*/
            CardNumber:'1112',
             HolderName:'11121',
             ExpireDate:'啊啊啊',
             CSV:'11111'
             
         
      })
    });

    let res = await response.text();
    if(response.status>=200 && response.status<300)
      {
        console.log("res success is:"+res);
      }
    else{
      let errors=res;
      throw errors;
    }
  }

  catch(errors) {
    console.log("error is:"+errors);
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
