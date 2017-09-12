import { TouchableHighlight, ListView, ActivityIndicatorIOS, View, Text, NativeModules } from 'react-native';
import { AddressBook } from 'NativeModules';
import styles from '../styles';

export default class Contacts extends React.Component {

	selectContact(contact) {
		this.props.selectContactCallback(contact);
		this.props.navigator.pop();
	}

	componentWillMount() {
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

		AddressBook.checkPermission((err, permission) => {
		if (permission === AddressBook.PERMISSION_UNDEFINED) {
			AddressBook.requestPermission((err, permission) => {
				AddressBook.getContacts((err, contacts) => {
					this.setState({
						dataSource: ds.cloneWithRows(contacts)
					});
				});
			});
		}

		if(permission === AddressBook.PERMISSION_AUTHORIZED){
			AddressBook.getContacts((err, contacts) => {
				this.setState({
					dataSource: ds.cloneWithRows(contacts)
				});
			})
		}

		if(permission === AddressBook.PERMISSION_DENIED){
			//handle permission denied
		}
		});
	}

	renderRow(contact) {
		return (
			<TouchableHighlight underlayColor="#ccc" onPress={() => {this.selectContact(contact)}}>
				<View>
					<View style={{padding: 15}}>
						<Text>{contact.firstName} {contact.lastName}</Text>
					</View>
					<View style={{height: 1, backgroundColor: '#ddd'}} />
				</View>
			</TouchableHighlight>
		);
	}

	render() {
		var view;

		if(this.state) {
			view = <ListView
				dataSource={this.state.dataSource}
				renderRow={this.renderRow}
				pageSize={30}
				initialListSize={1000}
				renderSeparator={() => true}
			/>
		} else {
			view = <ActivityIndicatorIOS
				animating={true}
				style={styles.natigator}
				size="large"
			/>
		}

		return view;
	}
}
