import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles';
import { CreditCardInput } from 'react-native-credit-card-input';

export default class AddCardForm extends React.Component {
	render() {
	return (
		<View>
			<Text style={styles.title}> Add New Card </Text>
			<View>
				<CreditCardInput
					requiresName
					requiresCVC

					labelStyle={styles.label}
					inputStyle={styles.input}
					validColor={"black"}
					onFocus={this._onFocus}
					onChange={this._onChange} />
			</View>
		</View>
	);
	}
}
