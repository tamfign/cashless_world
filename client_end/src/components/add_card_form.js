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

	async send_card_info(val) {
			var result = await Card.addNewCard(this.props.usrId, val.number, val.name, val.expiry, val.cvc);
			if (result) {
				alert("New Card is added.");
			} else {
				alert("Fail to add this card.");
			}
	}

	save_card() {
//		if (this.state.form['valid']) {
			var val = this.state.form['values'];
			this.send_card_info(val);
//		}
	}

	render() {
	return (
		<View style={{flex: 1, alignItems: 'stretch', justifyContent: 'flex-start',marginBottom:20,backgroundColor:'white'}}>
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
