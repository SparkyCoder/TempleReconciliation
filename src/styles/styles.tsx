import { Platform, StyleSheet } from "react-native";
import ContentArea from "../components/ContentArea";

export const styles = StyleSheet.create({
    droidSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 25 : 0
    },
    full: {
        height: '100%',
        width: '100%',
        
    },
    header: {
        width: '100%',
        height: '15%',
        backgroundColor: '#d9d9d9'
    },
    contentArea: {
        backgroundColor: '#abb4b5'
    },
    subContentArea: {
        width: '95%',
        height: '88%',
        backgroundColor: '#d9d9d9'
    },
    autoScaledImage:{
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain',
        margin: 5
    },
    stack: {
        height:'100%',
        alignItems:'center'
    },
    pressable:{
        marginTop:'2%',
        marginBottom:'8%',
        padding:10,
    },
    scrollview:{
        width:'100%'
    },
    tile: {
        backgroundColor: "#635a48",
        borderRadius: 20,
        elevation: 10
    },
    tilePreviewArea:{
        marginTop: '10%',
        marginBottom: '2%',
        backgroundColor: '#d9d9d9',
        height:'50%',
        width: '80%'
    },
    tileText: {
       color: '#d9d9d9',
       flex: 1, 
       flexWrap: 'wrap'
    },
    form:{
        marginLeft: '1%'
    },
    formSectionVertical: {
        marginTop: '3%',
        width: '75%'
    },
    formSectionHorizontal:{
         marginTop: '1%',
        width: '75%'
    }
})