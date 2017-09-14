import React from 'react';
import { View, NavigatorIOS } from 'react-native';

import styles from '../styles';
import { CreditCardInput } from 'react-native-credit-card-input';

export default class AddCard extends React.Component {
	render() {
		return (
		<NavigatorIOS
			ref="add_card"
			style={styles.navigator}
			initialRoute={{component: AddCardForm, title: 'Add New Card'}}
		/>
		);
	}
}

class AddCardForm extends React.Component {
	render() {
		return (
			<View style={styles.container} >
				<CreditCardInput
					autoFocus
					requiresName
					requiresCVC

					labelStyle={styles.label}
					inputStyle={styles.input}
					validColor={"black"}
					invalidColor={"red"}
					placeholderColor={"darkgray"}
					onFocus={this._onFocus}
					onChange={this._onChange} />
			</View>
		);
	}
}
