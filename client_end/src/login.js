import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image
} from 'react-native';
import { FacebookLoginManager } from 'NativeModules';
import styles from './styles';
import Menu from './menu';
import LinearGradient from 'react-native-linear-gradient';

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
	);
	}
}
