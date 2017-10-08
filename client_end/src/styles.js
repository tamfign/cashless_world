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
        marginLeft: 10,
        fontSize: 15,
        marginTop: 25
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
	marginTop: 50,
	alignItems: 'center'
    },
    instructions: {
	textAlign: 'center',
	color: '#333333',
	marginBottom: 5,
    },
    welcome: {
	height: 40,
    fontSize: 30,
	fontFamily: 'Gill Sans',
	textAlign: 'center',
	color: '#ffffff',
    backgroundColor: 'rgba(255,255,250,0.3)',
    marginBottom:125
    },
    center_container: {
	flex: 1,
	alignItems: 'stretch',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,191,255,0.3)',
    },
    log:{
    width:230,
    height:230,
    justifyContent: 'center',
    marginTop:80,
    marginLeft:65
    },
    log1:{
        width:30,
        height:30,
        justifyContent: 'center',
        marginTop:135,
        marginLeft:170
        },
    btn:{
        marginLeft:75,
        marginTop:140,
        width:220,
        height:220,
        backgroundColor:'#18B4FF',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:110,
      }
    

});

module.exports = styles;
