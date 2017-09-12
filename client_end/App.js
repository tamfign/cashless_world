import React from 'react';
import { StyleSheet, TabBarIOS, StatusBarIOS, Image, Text, View } from 'react-native';
import Swiper from 'react-native-swiper';
import NativeModules from 'NativeModules';

import Account from './src/components/account';
import QuickPay from './src/components/quickpay';
import Transaction from './src/components/transaction';
import styles from './src/styles';

export default class App extends React.Component {

	constructor() {
		super();

		this.state = {
			selectedTab : 'account',
			notifCount : 1
		};
	}

	render() {
		return (
			<TabBarIOS tintColor="black" barTintColor="#3abeff">
				<TabBarIOS.Item
					title="Account"
					badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
					selected={this.state.selectedTab === 'account'}
					onPress={() => {
						this.setState({selectedTab : 'account'});
					}}>
					<Account/>
				</TabBarIOS.Item>

				<TabBarIOS.Item
					title="Quick Pay"
					selected={this.state.selectedTab === 'quickpay'}
					onPress={() => {
						this.setState({slectedTab : 'quickpay'})
					}}>

					<View style={styles.navigator}>
						<QuickPay />
					</View>
				</TabBarIOS.Item>
			</TabBarIOS>
		);
	}
}
