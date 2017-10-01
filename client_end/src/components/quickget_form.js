import React from 'react';
import  { Button, Platform, TouchableHighlight, NavigatorIOS,  TextInput, View, Text } from 'react-native';
import base64 from 'base-64';
import styles from '../styles';
import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog';

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

if (Platform.OS == 'ios') {
	const  NFCNDEFReaderSession = require('react-native-nfc-ios');
}

class QuickGet extends React.Component {

	constructor() {
		super();

		this.state = {
			result : "",
		}
	}

	showDialog() {
		this.popupDialog.show();
	}

	async readTag() {
		const messages = await NFCNDEFReaderSession.readTag();
		const payloadB64 = messages[0].records[0].payload;

		this.state = {
			result : base64.decode(payloadB64),
		}
		this.popupDialog.show();
	}

	render() {
		return (
			<View style={styles.center_container}>
				<TouchableHighlight
					underlayColor="#00BBFC"
					style={styles.touchable}
					onPress={this.readTag.bind(this)}>
					<Text style={[styles.semibold, {color: '#fff'}]}>GET</Text>
				</TouchableHighlight>
				<PopupDialog
					ref={(popupDialog) => {
						this.popupDialog = popupDialog;
					}}
					dialogAnimation = { new SlideAnimation({ slideFrom: 'bottom' })}
				>
					<View><Text>{this.state.result}</Text></View>
				</PopupDialog>
			</View>
		)
	}
}
