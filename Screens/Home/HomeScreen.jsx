import { PostsScreen } from '../Posts/PostsScreen'
import { CreatePostsScreen } from '../Posts/CreatePostsScreen'
import { ProfileScreen } from '../Profile/ProfileScreen'
import {
    getHeaderTitle,
    getTabBarStyle,
    getHeaderRight,
    getHeaderLeft,
} from './screenOptions'

import { StyleSheet, View } from 'react-native'

import { Ionicons, Feather, AntDesign } from '@expo/vector-icons'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { useDispatch, useSelector } from 'react-redux'
import { selectIsLogged } from '../../redux/selectors/authSelector/authSelector.js'
import { userSignOut } from '../../redux/auth/authOperations'

const Tab = createBottomTabNavigator()

export const HomeScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const { isLogged } = useSelector(selectIsLogged)

    const logOutToggler = async () => {
        dispatch(userSignOut())
        if (!isLogged) {
            ;() => {
                navigation.navigate('Login')
            }
        }
    }

    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Posts"
                component={PostsScreen}
                options={({ route }) => ({
                    title: getHeaderTitle(route),
                    headerStyle: {
                        borderBottomWidth: '1px',
                        borderBottomColor: '#E8E8E8',
                    },
                    headerTitleStyle: {
                        fontFamily: 'Roboto-Medium',
                        fontSize: 17,
                    },
                    tabBarStyle: {
                        display: getTabBarStyle(route),
                    },
                    tabBarLabel: '',
                    tabBarIcon: ({ color }) => (
                        <Feather name="grid" size={24} color={color} />
                    ),
                    tabBarActiveTintColor: '#FF6C00',
                    tabBarInActiveTintColor: '#212121',
                    headerRight: () => getHeaderRight(route, logOutToggler),
                    headerLeft: () => getHeaderLeft(route, navigation),
                })}
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
                    tabBarStyle: {
                        display: 'none',
                    },
                    headerLeft: () => (
                        <AntDesign
                            onPress={() => navigation.navigate('DefaultScreen')}
                            name="arrowleft"
                            size={24}
                            color="#212121"
                            style={{ marginLeft: 16 }}
                        />
                    ),
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
