import { EvilIcons, Feather } from '@expo/vector-icons'
import { View, Text, StyleSheet, Image } from 'react-native'

export const Item = ({
    photo,
    title,
    location,
    navigation,
    geolocation,
    postsId,
}) => {
    return (
        <View style={styles.itemContainer}>
            <Image source={{ uri: photo }} style={styles.photo} />
            <Text>{title}</Text>
            <View style={styles.bottomFrame}>
                <View style={styles.commentBox}>
                    <Feather
                        name="message-circle"
                        size={24}
                        color="#BDBDBD"
                        onPress={() =>
                            navigation.navigate('Comments', { postsId, photo })
                        }
                    />
                    <Text style={styles.commentText}>0</Text>
                </View>
                <View style={styles.locBox}>
                    <EvilIcons
                        name="location"
                        size={24}
                        color="#BDBDBD"
                        onPress={() => {
                            navigation.navigate('Map', geolocation)
                        }}
                    />
                    <Text style={styles.locationText}>{location}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        marginTop: 32,
        marginHorizontal: 16,
    },
    photo: {
        height: 240,
        marginBottom: 10,
        borderRadius: 8,
    },

    bottomFrame: {
        marginTop: 8,
        flexDirection: 'row',
    },
    commentBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    commentText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: '#BDBDBD',
        marginLeft: 6,
    },
    locBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 49,
    },
    locationText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        marginLeft: 4,
    },
})
