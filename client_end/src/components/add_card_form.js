import React from 'react';
import { View, Text, Button } from 'react-native';
import styles from '../styles';

import { CreditCardInput } from 'react-native-credit-card-input';

export default class AddCardForm extends React.Component {

	constructor() {
		super();
		this.state = {
			form: Object
		};
	}

	_onChange(form) {
		this.state.form = form;
	}

	save_card() {
		console.log(this.state.form);
	}

	render() {
	return (
		<View>
			<Text style={styles.title}> Add New Card </Text>
			<View>
				<CreditCardInput
					requiresCVC
					requiresName

					labelStyle={styles.label}
					inputStyle={styles.input}
					validColor={"black"}
					onFocus={this._onFocus}
					onChange={this._onChange.bind(this)} />
				<Button
					title="Save"
					onPress={this.save_card.bind(this)}/>
			</View>
		</View>
	);
	}
}
