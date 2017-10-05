import React from 'react';
import { Platform, TouchableHighlight, TextInput, View, Text } from 'react-native';
import NavigationBar from 'react-native-navbar';
import styles from '../styles';
import Transfer from '../interfaces/transfer_control';

export default class QuickPayForm extends React.Component {

	constructor() {
		super();

		this.state = {
			input: ""
		}
	}

	writeTagData() {
		if (Platform.OS == "android") {
			const { writeTag } = require('nfc-react-native');
			writeTag(
			[{
				"records": [{
					"type": "VQ==",
					"payload": "UmVhY3QgTmF0aXZlIE5GQyBpT1M=",
					"identifier": null,
					"typeNameFormat": "WELL_KNOWN_RECORD",
				}]
			}],
			1148002313
			)
		}
	}

	transfer() {
		Transfer.pay('00001', '123456', this.state.input);
		this.writeTagData();
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

				<TouchableHighlight
					underlayColor="#00BBFC"
					style={{backgroundColor: '#009DE0', padding: 15, marginTop: 50, alignItems: 'center'}}
					onPress={this.transfer.bind(this)}
				>
					<Text style={[styles.semibold, {color: '#fff'}]}>Transfer</Text>
				</TouchableHighlight>
			</View>
		)
	}
}
