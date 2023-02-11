import {
    View,
    StyleSheet,
    TextInput,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    TouchableOpacity,
} from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser } from '../../redux/selectors/userSelector/userSelector'
import exportFirebase from '../../firebase/config'
import { doc, collection, addDoc } from 'firebase/firestore'
import { dataComments } from '../../redux/posts/postsOperations'

const { db } = exportFirebase

export const CommentsScreen = ({ route: { params } }) => {
    const [isFocused, setIsFocused] = useState(false)
    const [comment, setComment] = useState('')
    const { user } = useSelector(selectUser)
    const { postsId } = params
    const { displayName } = user
    const [commentDb, setCommentDb] = useState([])
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
            <TouchableWithoutFeedback
                onPress={isFocused ? keyboardToggler : null}
            >
                <View style={styles.form}>
                    <View>
                        <TextInput
                            style={{
                                ...styles.input,
                                marginBottom: isFocused ? 80 : 0,
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
                                onPress={() => {
                                    keyboardToggler, createComment()
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
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    form: {
        marginTop: 32,
        marginBottom: 16,
        marginHorizontal: 16,
        flex: 1,
        justifyContent: 'flex-end',
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
