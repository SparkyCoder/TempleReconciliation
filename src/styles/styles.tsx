import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        
    },
    droidSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 25 : 0
    }
})