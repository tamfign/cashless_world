/**
 * Page of Quick Receive Payment.
 */

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

	// Display result
	showDialog(result) {
		this.setState({
			result: result,
		});
		this.popupDialog.show();
	}

	// Read Tag info through NFC.
	async readTag() {
		// Only read Tag in IOS platform currently
		if (Platform.OS == 'ios') {
			const { NFCNDEFReaderSession } = require('react-native-nfc-ios');
			setTimeout( async () => {
				await NFCNDEFReaderSession.readTag();
			}, 500);
			const payloadB64 = messages[0].records[0].payload;
			var transactionId = base64.decode(payloadB64);
			let ret = await Transfer.accept(this.props.usrId, transactionId);
			if (ret['Result']) {
				this.showDialog(ret);
			}
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
					<View>
					<Text style={styles.title}
					      onPress={()=>{this.popupDialog.dismiss()}}
					>
					Received {this.state.result['balance']}
					</Text>
					</View>
				</PopupDialog>
			</View>
		)
	}
}
