import { TouchableHighlight, ListView, View, Text } from 'react-native';

import styles from '../styles';
import Transactions from './transactions';

export default class AccountList extends React.Component {
	getInitialState() {
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});
		return {
			dataSource: ds.cloneWithRows(require('../data/accounts.json')),
		};
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
						<Text style={styles.semibold}>{rowData.alias}</Text>
						<Text style={[styles.light, {color: '#666', fontSize: 12}]}>
							{rowData.accountNumber}
						</Text>
					</View>

					<View>
						<Text style={[styles.semibold]}>{rowData.balance}</Text>
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
