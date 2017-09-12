import React from 'react-native';
import { NavigatorIOS } = React;

import styles from '../styles';
import AccountsList from './account_list';

export default class Account extends React.Component {
	render() {
		return (
			<NavigatorIOS
				ref="account"
				style={styles.navigator}
				initialRoute={{component : AccountsList, title: 'Accounts'}}
			/>
		);
	}
}
