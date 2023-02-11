import { getFocusedRouteNameFromRoute } from '@react-navigation/native'
import { MaterialIcons, AntDesign } from '@expo/vector-icons'

export const getHeaderTitle = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'DefaultScreen'

    switch (routeName) {
        case 'DefaultScreen':
            return 'Публикации'
        case 'Comments':
            return 'Комментарии'
        case 'Map':
            return 'Карта'
    }
}

export const getTabBarStyle = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'DefaultScreen'

    switch (routeName) {
        case 'DefaultScreen':
            return
        case 'Comments':
            return 'none'
        case 'Map':
            return 'none'
    }
}

export const getHeaderRight = (route, logOutToggler) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'DefaultScreen'
    switch (routeName) {
        case 'DefaultScreen':
            return (
                <MaterialIcons
                    onPress={logOutToggler}
                    name="logout"
                    size={24}
                    color="#BDBDBD"
                    style={{ marginRight: 16 }}
                />
            )
        case 'Comments':
            return
        case 'Map':
            return
    }
}

export const getHeaderLeft = (route, navigation) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'DefaultScreen'
    switch (routeName) {
        case 'DefaultScreen':
            return
        case 'Comments':
            return (
                <AntDesign
                    onPress={() => navigation.navigate('DefaultScreen')}
                    name="arrowleft"
                    size={24}
                    color="#212121"
                    style={{ marginLeft: 16 }}
                />
            )
        case 'Map':
            return (
                <AntDesign
                    onPress={() => navigation.navigate('DefaultScreen')}
                    name="arrowleft"
                    size={24}
                    color="#212121"
                    style={{ marginLeft: 16 }}
                />
            )
    }
}
