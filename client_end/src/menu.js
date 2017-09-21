import React from 'react';
import { StyleSheet, TabBarIOS, StatusBarIOS, Image, Text, View } from 'react-native';
import NativeModules from 'NativeModules';

import Account from './components/account';
import QuickPay from './components/quickpay';
import styles from './styles';

export default class Menu extends React.Component {

	constructor() {
		super();

		this.state = {
			selectedTab : 'quickpay',
			notifCount : 0
		};
	}

	render() {
		return (
			<TabBarIOS tintColor="black" barTintColor="#3abeff">
				<TabBarIOS.Item
					icon={require('../img/accounts.png')}
					title="Account"
					badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
					selected={this.state.selectedTab === 'account'}
					onPress={() => {
						this.setState({selectedTab : 'account'});
					}}>
					<Account/>
				</TabBarIOS.Item>

				<TabBarIOS.Item
					icon={require('../img/quickpay.png')}
					title="Quick Pay"
					selected={this.state.selectedTab === 'quickpay'}
					onPress={() => {
						this.setState({selectedTab : 'quickpay'})
					}}>

					<View style={styles.navigator}>
						<QuickPay />
					</View>
				</TabBarIOS.Item>
			</TabBarIOS>
		);
	}
}
