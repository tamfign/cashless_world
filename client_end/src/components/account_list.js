import React from 'react';
import { NavigatorIOS, TouchableHighlight, ListView, View, Text } from 'react-native';

import styles from '../styles';
import Transactions from './transaction';

export default class AccountList extends React.Component {
	render() {
	return (
		<NavigatorIOS
			ref="accounts"
			style={styles.navigator}
			initialRoute={{
				component: Account,
				title: 'Account List'
			}}
		/>
	);}
}

class Account extends React.Component {

	constructor() {
		super();

		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});
		this.state = {
			dataSource: ds.cloneWithRows(require('../../data/accounts.json')),
		}
	}

	selectAccount(account) {
		this.props.navigator.push({
			title: "Transactions",
			component: Transactions,
			passProps: {account},
		});
	}

	renderRow(rowData) {
		return (
		<TouchableHighlight onPress={this.selectAccount}>
			<View>
				<View style={{flexDirection: 'row', padding: 10, backgroundColor: '#fff'}}>
					<View style={{flex: 1}}>
						<Text style={styles.semibold}>{rowData.name}</Text>
						<Text style={[styles.light, {color: '#666', fontSize: 12}]}>
							{ "**** **** ***** " + rowData.accountNumber.substr(rowData.accountNumber.length - 4) }
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
			<ListView
				style={[{backgroundColor: '#E5E8E8'}]}
				dataSource={this.state.dataSource}
				renderRow={this.renderRow} />
		)
	}
}
