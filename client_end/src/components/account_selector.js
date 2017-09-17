import React from 'react';
import { TouchableHighlight, NavigatorIOS, View, Text } from 'react-native';
import Swiper from 'react-native-swiper';
import Dimensions from 'Dimensions';
import styles from '../styles';

var accountsData = require('../../data/accounts.json');
var SCREEN_WIDTH = Dimensions.get('window').width;
var SCREEN_HEIGHT = Dimensions.get('window').height;
var SWIPE_RELEASE_POINT = 70;

export default class AccountSelector extends React.Component {
	constructor() {
		super();

		this.state = {
			accounts: accountsData
		}
	}

	render(){
		return (
			<View style={{marginTop: 64, backgroundColor: '#ECF1F2'}}>

				<Swiper showsButtons={false} showsPagination={false} height={70}>
					{this.state.accounts.map((acc) => {
						return (
						<View
							key={acc.accountNumber}
							style={{
								flex: 1,
								width: SCREEN_WIDTH,
								flexDirection: 'row',
								paddingLeft: 10, paddingRight: 10,
								paddingTop: 15, paddingBottom: 15
							}}>

							<View style={{flex: 1}}>
								<Text style={[styles.semibold, {flex: 1}]}>
									{acc.alias}
								</Text>
								<Text style={[styles.light, {flex: 1}]}>
									{acc.accountNumber}
								</Text>
							</View>

							<View>
								<Text style={[styles.semibold, {fontSize: 18}]}>
									{acc.balance}
								</Text>
							</View>
						</View>
						)
					})}
				</Swiper>

				<View style={{height: 2, backgroundColor: '#D9E2E6'}} />
			</View>
		)
	}
}
