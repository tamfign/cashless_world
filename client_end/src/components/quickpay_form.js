import React from 'react';
import  { TouchableHighlight, NavigatorIOS, ScrollView, TouchableWithoutFeedback, Image, TextInput, View, Text } from 'react-native';

import styles from '../styles';
import AccountSelector from './account_selector';
import Contacts from './contacts';

export default class QuickPayForm extends React.Component {
	selectContactCallback(contact) {
		var image = {uri: contact.thumbnailPath}
		this.setState({
			name: contact.firstName + ' ' + contact.lastName,
			image: (contact.thumbnailPath.length) && image || this.defaultImage
		})
	}

	componentDidMount() {}

	getInitialState() {
		return {
			name: 'Select Payee',
			image: undefined
		};
	}

	openContacts() {
		this.props.navigator.push({
			title: "Contacts",
			component: Contacts,
			passProps: {
				selectContactCallback: this.selectContactCallback
			},
		});
	}

	render() {
		return (
			<View style={{flex: 1, alignItems: 'stretch', justifyContent: 'flex-start'}}>
				<AccountSelector />

				<ScrollView
					automaticallyAdjustContentInsets={false}
					style={{flex: 1, padding: 15, borderTopWidth: 0, top: 0, marginTop: 0}}>

					<TouchableWithoutFeedback onPress={this.openContacts}>
						<Image
							style={{width: 140, height: 140, alignSelf: 'center', borderRadius: 70}}
							source={this.state.image} />
					</TouchableWithoutFeedback>

					<Text style={[styles.semibold, {color: '#666', alignSelf: 'center'}]}>
							{this.state.name}
					</Text>

					<TextInput
						keyboardType="decimal-pad"
						placeholder="€"
						style={{height: 50, marginTop: 15, borderColor: '#eee', borderWidth: 1, padding: 15}}
						onChangeText={(text) => this.setState({input: text})}
					/>

					<TextInput
						clearButtonMode="while-editing"
						placeholder="Description"
						style={{height: 50, marginTop: 15, borderColor: '#eee', borderWidth: 1, padding: 15}}
						onChangeText={(text) => this.setState({input: text})}
					/>

					<TouchableHighlight underlayColor="#00BBFC" style={{backgroundColor: '#009DE0', padding: 15, marginTop: 15, alignItems: 'center'}}>
						<Text style={[styles.semibold, {color: '#fff'}]}>Submit</Text>
					</TouchableHighlight>
				</ScrollView>
			</View>
		)
	}
}
