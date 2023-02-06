import { useState, useEffect } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { Item } from '../Posts/Item'

export const DefaultPostsScreen = ({ route: { params }, navigation }) => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        if (params) {
            setPosts((prevState) => [...prevState, params])
        }
    }, [params])

    return (
        <View style={styles.container}>
            {posts.length > 0 && (
                <FlatList
                    data={posts}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item }) => (
                        <Item
                            navigation={navigation}
                            photo={item.photo}
                            title={item.state.title}
                            location={item.state.location}
                            geolocation={item.geolocation}
                        />
                    )}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
})
