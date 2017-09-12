import React from 'react';
import { View } from 'react-native';

import AccountSelector from './account_selector';
import TransactionList from './transaction_list';

export default class Transaction extends React.Component {
	render() {
		return (
		<View
			style={{
				flex : 1,
				alignItems : 'stretch',
				justifyContent : 'flex-start'
			}}
		>

			<AccountSelector />
			<TransactionList />
		</View>
		);
	}
}
