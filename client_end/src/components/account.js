import React from 'react';
import { View, NavigatorIOS } from 'react-native';

import styles from '../styles';
import Swiper from 'react-native-page-swiper';
import AccountsList from './account_list';
import AddCardForm from './add_card_form.js';

export default class Account extends React.Component {
	render() {
		return (
			<Swiper style={styles.wrapper} >
			<AccountsList />
			<AddCardForm />
			</Swiper>
		);
	}
}
