import React from 'react';
import { View, Text, Button } from 'react-native';
import styles from '../styles';
import NavigationBar from 'react-native-navbar';
import { CreditCardInput } from 'react-native-credit-card-input';
import Card from '../interfaces/card_control';

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
		var val = this.state.form['values'];
		Card.addNewCard(this.props.usrId, val.number, val.type, val.number, val.name, val.expiry, val.cvc);
		console.log(this.state.form);
	}

	render() {
	return (
		<View style={styles.container}>
			<NavigationBar
				title={{ title: 'Add New Card' }}
			/>
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
	);
	}
}
