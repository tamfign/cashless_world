import React from 'react';
import { StyleSheet, TabBarIOS, StatusBarIOS, Image, Text, View } from 'react-native';
import Swiper from 'react-native-swiper';
import NativeModules from 'NativeModules';

import styles from '.src/styles';
import Account from '.src/components/account';
import QuickPay from '.src/components/quickpay';
import Transaction from '.src/components/transaction';

export default class App extends React.Component {
	render() {
		return (
			<TabBarIOS tintColor="black" barTintColor="#3abeff">
				<TabBarIOS.Item
					icon=undefined
					title="Account"
					badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
					selected={this.state.selectedTab === 'account'}
					onPress={() => {
						this.setState({selectedTab : 'account'});
					}}>
					<Account/>
				</TabBarIOS.Item>

				<TabBarIOS.Item
					icon=undefined
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

	getInitialState() {
		return {
			selectedTab : 'account',
			notifCount : 1
		};
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
