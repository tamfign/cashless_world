import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image
  Platform,
} from 'react-native';

import { FacebookLoginManager } from 'NativeModules';
import styles from './styles';
import Menu from './menu';
import LinearGradient from 'react-native-linear-gradient';
import { LoginButton, LoginManager, AccessToken } from 'react-native-fbsdk';

export default class Login extends React.Component {
	
	static navigationOptions = {
		title: 'Cashless World',
		headerStyle: { backgroundColor: '#006e7c' },
		headerTitleStyle: { color: 'white' },
	  }

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
		<LinearGradient style={styles.center_container} colors={['#006e7c', '#57c7d1', '#8fd9d2', '#eebfa1']}>
			<Image
			style={styles.log}
			source={require('../img/log1.png')}/>
			<TouchableHighlight style={styles.facebooklogin} onPress={this.login.bind(this)}>
				<Text style={styles.welcome}>
					Facebook Login
				</Text>
			</TouchableHighlight>
		</LinearGradient>
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
