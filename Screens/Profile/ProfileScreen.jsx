import { View, Text, StyleSheet } from 'react-native'

export const ProfileScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>That is awesome App</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 30,
    },
})
