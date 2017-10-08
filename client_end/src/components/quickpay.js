/**
 * Pannel of Payment activity.
 */

import React from 'react';
import { View } from 'react-native';

import QuickPayForm from './quickpay_form';
import QuickGetForm from './quickget_form';

import styles from '../styles';
import Swiper from 'react-native-page-swiper';

export default class QuickPay extends React.Component {
	render() {
		return (
			<Swiper
				style={styles.wrapper} >
				<QuickPayForm usrId = { this.props.usrId } />
				<QuickGetForm usrId = { this.props.usrId } />
			</Swiper>
		);
	}
}
