import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Menu from './src/menu';

var App = StackNavigator({
	Menu: { screen: Menu },
});

AppRegistry.registerComponent('client_end', () => Menu);
