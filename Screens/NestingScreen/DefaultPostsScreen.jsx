import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectPosts } from '../../redux/selectors/postsSelector/postsSelector'
import { View, StyleSheet, FlatList } from 'react-native'
import { Item } from '../Posts/Item'

export const DefaultPostsScreen = ({ navigation }) => {
    const [posts, setPosts] = useState([])
    const { postsDb } = useSelector(selectPosts)

    useEffect(() => {
        setPosts([...postsDb])
    }, [postsDb])

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
                            postsId={item.id}
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
