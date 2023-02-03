import { PostsScreen } from '../Posts/PostsScreen'
import { CreatePostsScreen } from '../Posts/CreatePostsScreen'
import { ProfileScreen } from '../Profile/ProfileScreen'

import { StyleSheet, View, Image } from 'react-native'
import { LogOutIconFunc } from '../../assets/icons/logOutIcon'

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
                    tabBarIcon: () => (
                        <View>
                            <Image
                                source={require('../../assets/icons/grid.png')}
                                resizeMode={'contain'}
                            />
                        </View>
                    ),
                    headerRight: () => <LogOutIconFunc />,
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
                        <View>
                            <Image
                                source={require('../../assets/icons/new.png')}
                                resizeMode={'contain'}
                            />
                        </View>
                    ),
                    headerRight: () => <LogOutIconFunc />,
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
                    headerRight: () => <LogOutIconFunc />,
                    tabBarLabel: '',
                    tabBarIcon: () => (
                        <View>
                            <Image
                                source={require('../../assets/icons/user.png')}
                                resizeMode={'contain'}
                            />
                        </View>
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
