import { View, Text, StyleSheet } from 'react-native'

export const Item = ({ displayName, comment }) => (
    <View style={styles.container}>
        <View style={styles.name}>
            <Text>{displayName}:</Text>
        </View>
        <View style={styles.comment}>
            <Text>{comment}</Text>
        </View>
    </View>
)

const styles = StyleSheet.create({
    container: {
        marginTop: 32,
        flexDirection: 'row',
        marginHorizontal: 16,
    },
    name: {
        marginRight: 16,
    },
})
