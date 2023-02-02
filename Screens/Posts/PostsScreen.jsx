import { View, Text, StyleSheet } from 'react-native'

export const PostsScreen = () => {
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
    },
    text: {
        fontSize: 30,
    },
})
