import React from 'react';
import { TouchableHighlight, ListView, View, Text } from 'react-native';

import styles from '../styles';
import Transactions from './transaction';
import NavigationBar from 'react-native-navbar';
import Card from '../interfaces/card_control';

export default class AccountList extends React.Component {

	constructor() {
		super();

		this.fetchData.bind(this);
		this.state = {
			dataSource: null,
		}
	}

	fetchData() {
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});
		var result = Card.getCardsInfo(this.props.usrId);
		console.log(result);
		this.state = {
			dataSource: ds.cloneWithRows(result),
		}
	}

	renderRow(rowData) {
		let cardNumber = rowData ? "**** **** ***** " + rowData.CardNumber.substr(rowData.CardNumber.length - 4) : "";
		let name = rowData ? rowData.HolderName : "";
		return (
		<TouchableHighlight>
			<View>
				<View style={{flexDirection: 'row', padding: 10, backgroundColor: '#fff'}}>
					<View style={{flex: 1}}>
						<Text style={styles.semibold}>{ name }</Text>
						<Text style={[styles.light, {color: '#666', fontSize: 12}]}>
							{ cardNumber }
						</Text>
					</View>
				</View>

				<View style={{height: 1, backgroundColor: '#ddd'}} />
			</View>
		</TouchableHighlight>
		)
	}

	render() {
		this.fetchData();
		return (
			<View style={styles.container}>
			<NavigationBar
				title={{ title: 'Account List' }}
			/>
			<ListView
				style={[{backgroundColor: '#E5E8E8'}]}
				dataSource={this.state.dataSource}
				renderRow={this.renderRow} />
			</View>
		)
	}
}
