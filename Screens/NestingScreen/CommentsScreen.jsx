import {
    View,
    StyleSheet,
    TextInput,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    TouchableOpacity,
    FlatList,
    Image,
} from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser } from '../../redux/selectors/userSelector/userSelector'
import { selectPosts } from '../../redux/selectors/postsSelector/postsSelector'
import exportFirebase from '../../firebase/config'
import { doc, collection, addDoc } from 'firebase/firestore'
import { dataComments } from '../../redux/posts/postsOperations'
import { Item } from './Item'

const { db } = exportFirebase

export const CommentsScreen = ({ route: { params } }) => {
    const [isFocused, setIsFocused] = useState(false)
    const [comment, setComment] = useState('')
    const { user } = useSelector(selectUser)
    const { commentsDb } = useSelector(selectPosts)
    const { postsId, photo } = params
    const { displayName } = user

    const dispatch = useDispatch()

    const createComment = async () => {
        const postsRef = doc(db, `posts/${postsId}`)

        const docRef = await addDoc(collection(postsRef, 'comments'), {
            displayName,
            comment,
        })

        setComment('')

        dispatch(dataComments(postsId))
    }

    useEffect(() => {
        if (postsId) {
            dispatch(dataComments(postsId))
        }
    }, [postsId])

    const keyboardToggler = () => {
        setIsFocused(false)
        Keyboard.dismiss()
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'null'}
            style={styles.container}
        >
            <View
                style={{
                    ...styles.inner,
                    marginBottom: isFocused ? 100 : 16,
                }}
            >
                <Image source={{ uri: photo }} style={styles.photo} />
                {commentsDb && (
                    <View style={{ height: 323 }}>
                        <FlatList
                            data={commentsDb}
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={({ item }) => (
                                <Item
                                    displayName={item.displayName}
                                    comment={item.comment}
                                />
                            )}
                        ></FlatList>
                    </View>
                )}
                <View style={styles.form}>
                    <View>
                        <TextInput
                            style={{
                                ...styles.input,
                            }}
                            onFocus={() => {
                                setIsFocused(true)
                            }}
                            onBlur={() => {
                                setIsFocused(false)
                            }}
                            placeholder={'Комментировать...'}
                            placeholderTextColor={'#BDBDBD'}
                            onChangeText={(value) => setComment(value)}
                            value={comment}
                            onSubmitEditing={createComment}
                        />
                        {isFocused && (
                            <TouchableOpacity
                                style={styles.button}
                                disabled={comment ? false : true}
                                onPress={() => {
                                    keyboardToggler(), createComment()
                                }}
                            >
                                <AntDesign
                                    name="arrowup"
                                    size={20}
                                    color="#fff"
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    form: {
        marginHorizontal: 16,
        marginTop: 31,
        // flex: 1,
        justifyContent: 'flex-end',
    },

    inner: {
        flex: 1,
        justifyContent: 'flex-end',
        marginTop: 32,
    },

    photo: {
        height: 240,
        marginBottom: 32,
        borderRadius: 8,
        marginHorizontal: 16,
    },
    input: {
        height: 50,
        backgroundColor: '#F6F6F6',
        borderRadius: 100,
        paddingLeft: 16,
        borderWidth: 1,
        borderColor: '#E8E8E8',
    },

    button: {
        backgroundColor: '#FF6C00',
        width: 34,
        height: 34,
        borderRadius: 100,
        position: 'absolute',
        right: 8,
        top: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
