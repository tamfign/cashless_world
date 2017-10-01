import React from 'react';
import { TouchableHighlight, TextInput, View, Text } from 'react-native';
import NavigationBar from 'react-native-navbar';
import styles from '../styles';
import { getTagId, readTag, writeTag } from 'nfc-react-native';

export default class QuickPayForm extends React.Component {

	constructor() {
		super();

		this.state = {
			image: undefined
		}
	}

	readTagId() {
		getTagId()
	}

	readTagData() {
		readTag([
		{ sector: 1, blocks: [1,2], clave: 'FFFFFFFFFFFF', keyType: 'A' },
		{ sector: 2, blocks: [0,1,2], clave: 'FFFFFFFFFFFF', keyType: 'A' },
		{ sector: 3, blocks: [0], clave: 'FFFFFFFFFFFF', keyType: 'A' }
		])
	}

	writeTagData() {
		writeTag([{ sector: 1, blocks: [
			{ index: 1, data: [15,15,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,15,15] },
			{ index: 2, data: [15,15,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,15,15] } ],
				clave: 'FFFFFFFFFFFF', keyType: 'A' },
			{ sector: 2, blocks: [
			{ index: 0, data: [15,15,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,15,15] },
			{ index: 1, data: [15,15,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,15,15] },
			{ index: 2, data: [15,15,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,15,15] } ],
				clave: 'FFFFFFFFFFFF', keyType: 'A' },
			{ sector: 3, blocks: [
			{ index: 0, data: [15,15,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,15,15] } ],
				clave: 'FFFFFFFFFFFF', keyType: 'A' },
			], 1148002313)
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
					onPress={this.writeTagData.bind(this)}
				>
					<Text style={[styles.semibold, {color: '#fff'}]}>Transfer</Text>
				</TouchableHighlight>
			</View>
		)
	}
}
