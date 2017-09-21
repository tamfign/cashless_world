import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import { FacebookLoginManager } from 'NativeModules';
import styles from './styles';
import Menu from './menu';

export default class Login extends React.Component {
	constructor() {
		super();
		this.state = {
			result: '...'
		};
		this._onForward = this._onForward.bind(this);
	}

	_onForward() {
		const { navigate } = this.props.navigation;
		navigate('Menu', {});
	}

	login() {
		FacebookLoginManager.newSession((error, info) => {
			if (error) {
				this.setState({result: error});
			} else {
				this.setState({result: info['token']});
				this._onForward();
			}
		});
	}

	render() {
	return (
		<View style={styles.center_container}>
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
