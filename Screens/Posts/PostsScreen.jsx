import { DefaultPostsScreen } from '../NestingScreen/DefaultPostsScreen'
import { CommentsScreen } from '../NestingScreen/CommentsScreen'
import { MapScreen } from '../NestingScreen/MapScreen'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

const PostStack = createNativeStackNavigator()

export const PostsScreen = () => {
    return (
        <PostStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <PostStack.Screen
                name="DefaultScreen"
                component={DefaultPostsScreen}
            />
            <PostStack.Screen name="Comments" component={CommentsScreen} />
            <PostStack.Screen name="Map" component={MapScreen} />
        </PostStack.Navigator>
    )
}
