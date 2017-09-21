import React from 'react';
import  { Button, TouchableHighlight, NavigatorIOS,  TextInput, View, Text } from 'react-native';

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

class QuickGet extends React.Component {

	constructor() {
		super();

		this.state = {
			image: undefined
		}
	}

	showDialog() {
		this.popupDialog.show();
	}

	render() {
		return (
			<View style={styles.center_container}>
				<TouchableHighlight
					underlayColor="#00BBFC"
					style={styles.touchable}
					onPress={this.showDialog.bind(this)}>
					<Text style={[styles.semibold, {color: '#fff'}]}>GET</Text>
				</TouchableHighlight>
				<PopupDialog
					ref={(popupDialog) => {
						this.popupDialog = popupDialog;
					}}
					dialogAnimation = { new SlideAnimation({ slideFrom: 'bottom' })}
				>
					<View><Text>Success!</Text></View>
				</PopupDialog>
			</View>
		)
	}
}
