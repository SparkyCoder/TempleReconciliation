import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    droidSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 25 : 0
    },
    full: {
        height: '100%',
        width: '100%',
        
    },
    stack: {
        height:'100%',
        alignItems:'center',
    },
    tile: {
        backgroundColor: "#fff",
        marginTop: '10%',
        height:100,
        width:200,
        borderRadius: 20,
        elevation: 10
    },
    tileText: {
       margin: '5%',
    }
})