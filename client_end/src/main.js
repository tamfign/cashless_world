import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import { FacebookLoginManager } from 'NativeModules';

export default class App extends React.Component {
  constructor() {
	super();
	this.state = {
		result: '...'
	};
  }

  login() {
    FacebookLoginManager.newSession((error, info) => {
	if (error) {
        this.setState({result: error});
      } else {
        this.setState({result: info['token']});
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this.login.bind(this)}>
          <Text style={styles.welcome}>
            Facebook Login
          </Text>
        </TouchableHighlight>
        <Text style={styles.instructions}>
          {this.state.result}
        </Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
