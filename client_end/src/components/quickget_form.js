import React from 'react';
import  { TouchableHighlight, NavigatorIOS,  TextInput, View, Text } from 'react-native';

import styles from '../styles';

export default class QuickGetForm extends React.Component {
	render() {
	return (
		<NavigatorIOS
			ref="quickget"
			style={styles.navigator}
			initialRoute={{
				component: QuickGet,
				title: 'Quick Get'
			}}
		/>
	);}
}

class QuickGet extends React.Component {

	constructor() {
		super();

		this.state = {
			image: undefined
		}
	}

	render() {
		return (
			<View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
				<TouchableHighlight underlayColor="#00BBFC" style={{backgroundColor: '#009DE0', padding: 15, marginTop: 50, alignItems: 'center'}}>
					<Text style={[styles.semibold, {color: '#fff'}]}>GET</Text>
				</TouchableHighlight>
			</View>
		)
	}
}
