import { PostsScreen } from '../Posts/PostsScreen'
import { CreatePostsScreen } from '../Posts/CreatePostsScreen'
import { ProfileScreen } from '../Profile/ProfileScreen'

import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'

import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
const Tab = createBottomTabNavigator()

export const Home = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Posts"
                component={PostsScreen}
                options={{
                    title: 'Публикации',
                    headerStyle: {
                        borderBottomWidth: '1px',
                        borderBottomColor: '#E8E8E8',
                    },
                    headerTitleStyle: {
                        fontFamily: 'Roboto-Medium',
                        fontSize: 17,
                    },
                    tabBarLabel: '',
                    tabBarIcon: ({ color }) => (
                        <Feather name="grid" size={24} color={color} />
                    ),
                    tabBarActiveTintColor: '#FF6C00',
                    tabBarInActiveTintColor: '#212121',

                    headerRight: () => (
                        <MaterialIcons
                            name="logout"
                            size={24}
                            color="#BDBDBD"
                            style={{ marginRight: 16 }}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="CreatePosts"
                component={CreatePostsScreen}
                options={{
                    title: 'Создать публикацию',
                    headerStyle: {
                        borderBottomWidth: '1px',
                        borderBottomColor: '#E8E8E8',
                    },
                    headerTitleStyle: {
                        fontFamily: 'Roboto-Medium',
                        fontSize: 17,
                    },
                    tabBarLabel: '',
                    tabBarIcon: () => (
                        <View style={styles.addBtn}>
                            <Ionicons
                                name="add-outline"
                                size={24}
                                color="#fff"
                            />
                        </View>
                    ),
                    tabBarActiveTintColor: '#FF6C00',
                    tabBarInActiveTintColor: '#212121',
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    title: 'Профиль',
                    headerStyle: {
                        borderBottomWidth: '1px',
                        borderBottomColor: '#E8E8E8',
                    },
                    headerTitleStyle: {
                        fontFamily: 'Roboto-Medium',
                        fontSize: 17,
                    },
                    tabBarLabel: '',
                    tabBarIcon: ({ color }) => (
                        <Feather name="user" size={24} color={color} />
                    ),
                    tabBarActiveTintColor: '#FF6C00',
                    tabBarInActiveTintColor: '#212121',
                }}
            />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    addBtn: {
        justifyContent: 'center',
        alignItems: 'center',

        width: 70,
        height: 40,
        marginTop: 9,
        borderRadius: 20,

        backgroundColor: '#FF6C00',
    },
})
