import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    regular: {
    },
    semibold: {
        fontWeight: 'bold',
    },

    light: {
    },

    bold: {
        fontWeight: 'bold',
        marginLeft: 10,
        fontSize: 20,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 60,
    },
    tabContent: {
        flex: 1,
        alignItems: 'center',
    },
    tabText: {
        color: 'white',
        margin: 50,
    },
    navigator: {
        flex: 1
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapper: {
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
	backgroundColor: '#F5FCFF',
        marginTop: 100,
    },
    label: {
        color: "black",
        fontSize: 12,
    },
    input: {
        fontSize: 16,
        color: "black",
    },
    touchable: {
	backgroundColor: '#009DE0',
	padding: 15,
	marginTop: 50,
	alignItems: 'center'
    },
    instructions: {
	textAlign: 'center',
	color: '#333333',
	marginBottom: 5,
    },
    welcome: {
	height: 50,
	fontSize: 40,
	fontFamily: 'Gill Sans',
	textAlign: 'center',
	color: '#ffffff',
	opacity: 0.8,
	justifyContent: 'center',
	backgroundColor: '#3b5998'
    },
    center_container: {
	flex: 1,
	alignItems: 'stretch',
	justifyContent: 'center'
    }
});

module.exports = styles;
