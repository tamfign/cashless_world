import React from 'react';
import { Platform, TouchableHighlight, TextInput, View, Text,KeyboardAvoidingView } from 'react-native';
import NavigationBar from 'react-native-navbar';
import styles from '../styles';
import Transfer from '../interfaces/transfer_control';

const uuidv1 = require('uuid/v1');

export default class QuickPayForm extends React.Component {

	constructor() {
		super();

		this.state = {
			input: ""
		}
	}

	 MoneyCheck(money){
		var isNum = /^\d+(\.\d)/;
		if(!isNum.test(money)){
			return 0;
		}else{
			return 1;
		}
	}

	writeTagData(transactionId) {
		if (Platform.OS == "android") {
			const { writeTag } = require('nfc-ndef-react-native');
			writeTag(
			[{
				"records": [{
					"type": "VQ==",
					"payload": "UmVhY3QgTmF0aXZlIE5GQyBpT1M=",
					"identifier": null,
					"typeNameFormat": "WELL_KNOWN_RECORD",
				}]
			}]
			)
		}
	}

	transfer() {
		var transactionId = uuidv1();
		Transfer.pay(this.props.usrId, transactionId, this.state.input);
		this.writeTagData(transactionId);
	}

	render() {
		return (
			<KeyboardAvoidingView behavior="padding" style={{flex: 1, alignItems: 'stretch', justifyContent: 'flex-start'}}>
				<NavigationBar
					title={{ title: 'Quick Pay'}}
				/>
				<Text style={styles.bold}>Amount:</Text>
				<TextInput
					placeholder="$"
					returnKeyType="go"
					style={{height: 50, marginTop: 15, borderColor: '#eee', borderWidth: 1, padding: 15}}
					onChangeText={(text) => this.setState({input: text})}
				/>

				<TouchableHighlight
					underlayColor="#00BBFC"
					style={{backgroundColor: '#009DE0', padding: 15, marginTop: 50, alignItems: 'center'}}
					onPress={this.transfer.bind(this)}
				>
					<Text style={[styles.semibold, {color: '#fff'}]}>Pay</Text>
				</TouchableHighlight>
			</KeyboardAvoidingView>
		)
	}
}
