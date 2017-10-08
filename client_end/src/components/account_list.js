/**
 * Page to list out account information
 */

import React from 'react';
import { TouchableHighlight, ListView, View, Text } from 'react-native';

import styles from '../styles';
import Transactions from './transaction';
import NavigationBar from 'react-native-navbar';
import Card from '../interfaces/card_control';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});

export default class AccountList extends React.Component {

	constructor() {
		super();

		this.fetchData.bind(this);
		this.state = {
			dataSource: ds.cloneWithRows([]),
		}
	}

	async fetchData() {
		var result = await Card.getCardsInfo(this.props.usrId);
		this.setState({
			dataSource: ds.cloneWithRows(result),
		});
	}

	componentDidMount() {
		// Fetch date from server every 1 min.
		setInterval(() => {
			this.fetchData()
		}, 1000);
	}

	renderRow(rowData) {
		// Mask some of the digit of the card number.
		let cardNumber = rowData ? "**** **** ***** " + rowData.CardNumber.substr(rowData.CardNumber.length - 4) : "";
		let name = rowData ? rowData.HolderName : "";
		let balance = rowData ? rowData.balance : "";
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
					<View>
						<Text style={[styles.semibold]}>
							{ balance }
						</Text>
					</View>
				</View>

				<View style={{height: 1, backgroundColor: '#ddd'}} />
			</View>
		</TouchableHighlight>
		)
	}

	render() {
		return (
			<View style={{flex: 1, alignItems: 'stretch', justifyContent: 'flex-start'}}>
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
