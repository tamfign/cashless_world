import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableHighlight
} from 'react-native';
import { FacebookLoginManager } from 'NativeModules';
import styles from './styles';
import Menu from './menu';
import { LoginButton, LoginManager, AccessToken } from 'react-native-fbsdk';

export default class Login extends React.Component {
	constructor() {
		super();
		this.state = {
			result: '...'
		};
		this._onForward = this._onForward.bind(this);

		if (Platform.OS == "android") {
			LoginManager.logOut();
		}
	}

	_onForward(id) {
		const { navigate } = this.props.navigation;
		navigate('Menu', { userId : id });
	}

	login() {
		FacebookLoginManager.newSession((error, info) => {
			if (error) {
				this.setState({result: error});
			} else {
				this._onForward(info['userId']);
			}
		});
	}

	render() {
	if (Platform.OS == "ios") {
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
	);} else {
	return (
		<View>
			<LoginButton
				onLoginFinished={(error, result) => {
				if (error) {
					alert("login has error: " + result.error);
				} else if (result.isCancelled) {
					alert("login is cancelled.");
				} else {
					AccessToken.getCurrentAccessToken().then(
						(data) => {
							this._onForward.bind(this);
							this._onForward(data.getUserId());
						}
				)}
				}}
				onLogoutFinished={() => alert("logout.")}/>
		</View>
	);}
	}
}
