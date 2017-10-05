import React from 'react';
import { View } from 'react-native';

import styles from '../styles';
import Swiper from 'react-native-page-swiper';
import AccountList from './account_list';
import AddCardForm from './add_card_form.js';

export default class Account extends React.Component {
	render() {
		return (
			<Swiper style={styles.wrapper} >
				<AccountList usrId = { this.props.usrId } />
				<AddCardForm usrId = { this.props.usrId } />
			</Swiper>
		);
	}
}
