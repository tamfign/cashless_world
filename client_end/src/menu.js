import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import NativeModules from 'NativeModules';
import TabNavigator from 'react-native-tab-navigator';

import Account from './components/account';
import QuickPay from './components/quickpay';
import styles from './styles';

export default class Menu extends React.Component {
	static navigationOptions = {
		headerLeft:null
	}

	constructor() {
		super();

		this.state = {
			selectedTab : 'quickpay',
		};
	}

	render() {
		return (
			<TabNavigator tintColor="black" barTintColor="#3abeff">
				<TabNavigator.Item
					renderIcon={() => <Image source={require('../img/accounts.png')} />}
					title="Account"
					badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
					selected={this.state.selectedTab === 'account'}
					onPress={() => {
						this.setState({selectedTab : 'account'});
					}}>
					<Account/>
				</TabNavigator.Item>

				<TabNavigator.Item
					renderIcon={() => <Image source={require('../img/quickpay.png')} />}
					title="Quick Pay"
					selected={this.state.selectedTab === 'quickpay'}
					onPress={() => {
						this.setState({selectedTab : 'quickpay'})
					}}>

					<View style={styles.navigator}>
						<QuickPay />
					</View>
				</TabNavigator.Item>
			</TabNavigator>
		);
	}
}
