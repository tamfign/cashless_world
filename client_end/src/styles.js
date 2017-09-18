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
    },
    title: {
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center',
        margin: 50,
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
        backgroundColor: "#F5F5F5",
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
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
});

module.exports = styles;
