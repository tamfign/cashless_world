import React from 'react';
import  { Button, Platform, TouchableHighlight, TextInput, View, Text,TouchableOpacity } from 'react-native';
import base64 from 'base-64';
import styles from '../styles';
import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog';
import NavigationBar from 'react-native-navbar';
import Transfer from '../interfaces/transfer_control';

export default class QuickGetForm extends React.Component {

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
		if (Platform.OS == 'ios') {
			const { NFCNDEFReaderSession } = require('react-native-nfc-ios');
			const message = await NFCNDEFReaderSession.readTag();
			const payloadB64 = messages[0].records[0].payload;

			this.state = {
				result : base64.decode(payloadB64),
			}
			this.popupDialog.show();
			Transfer.accept(this.props.usrId, "123456");
		}
	}

	render() {
		return (
			<View style={{flex: 1, alignItems: 'stretch', justifyContent: 'flex-start'}}>
				<NavigationBar
					title={{ title: 'Quick Get' }}
				/>
				<TouchableOpacity onPress={this.readTag.bind(this)}>
					<View style={styles.btn}>
						<Text style={{fontSize:30, color:'#fff'}}>Tap</Text>
					</View>
				</TouchableOpacity>
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
