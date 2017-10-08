import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Login from './src/login';
import Menu from './src/menu';


var App = StackNavigator({
	Login: { screen: Login },
	Menu: { screen: Menu },
});

console.disableYellowBox = true;
AppRegistry.registerComponent('client_end', () => App);
