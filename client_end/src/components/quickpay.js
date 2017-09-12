import { NavigatorIOS } from 'react-native';

import AccountSelector from 'account_selector';
import QuickPayForm from 'quickpay_form';
import styles from '../styles';

export default class QuickPay extends React.Component {
	render() {
		return (
		<NavigatorIOS
			ref="quickpay"
			style={styles.navigator}
			initialRoute={{component: QuickPayForm, title: 'Quick Pay'}}
		/>
		);
	}
}
