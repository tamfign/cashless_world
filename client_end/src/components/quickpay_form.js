import React from 'react';
import { TouchableHighlight, TextInput, View, Text } from 'react-native';
import NavigationBar from 'react-native-navbar';
import styles from '../styles';

export default class QuickPayForm extends React.Component {

	constructor() {
		super();

		this.state = {
			image: undefined
		}
	}

	render() {
		return (
			<View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
				<NavigationBar
					title={{ title: 'Quick Pay'}}
				/>
				<Text style={styles.bold}>Amount:</Text>
				<TextInput
					keyboardType="decimal-pad"
					placeholder="$"
					style={{height: 50, marginTop: 15, borderColor: '#eee', borderWidth: 1, padding: 15}}
					onChangeText={(text) => this.setState({input: text})}
				/>

				<TouchableHighlight underlayColor="#00BBFC" style={{backgroundColor: '#009DE0', padding: 15, marginTop: 50, alignItems: 'center'}}>
					<Text style={[styles.semibold, {color: '#fff'}]}>Transfer</Text>
				</TouchableHighlight>
			</View>
		)
	}
}
