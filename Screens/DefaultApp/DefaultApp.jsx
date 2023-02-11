import { NavigationContainer } from '@react-navigation/native'
import { useRoute } from '../Router/useRoute'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectIsLogged } from '../../redux/selectors/authSelector/authSelector'
import { userRefresh } from '../../redux/auth/authOperations'
import { dataPosts } from '../../redux/posts/postsOperations'

export const DefaultApp = () => {
    const dispatch = useDispatch()
    const { isLogged } = useSelector(selectIsLogged)
    const router = useRoute(isLogged)

    useEffect(() => {
        if (isLogged) {
            dispatch(userRefresh())
            dispatch(dataPosts())
        }
    }, [dispatch])

    return <NavigationContainer>{router}</NavigationContainer>
}
