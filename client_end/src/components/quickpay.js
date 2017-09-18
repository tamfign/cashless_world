import React from 'react';
import { NavigatorIOS } from 'react-native';

import QuickPayForm from './quickpay_form';
import QuickGetForm from './quickget_form';

import Swiper from 'react-native-swiper';
import styles from '../styles';

export default class QuickPay extends React.Component {
	render() {
		return (
			<Swiper
				style={styles.wrapper}
				showsButtons
				index={1}>
				<QuickPayForm />
				<QuickGetForm />
			</Swiper>
		);
	}
}
