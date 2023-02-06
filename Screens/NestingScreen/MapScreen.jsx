import { View, StyleSheet } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

export const MapScreen = ({
    route: {
        params: { latitude, longitude },
    },
}) => {
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: '0.001',
                    longitudeDelta: '0.006',
                }}
            >
                <Marker
                    coordinate={{ latitude: latitude, longitude: longitude }}
                />
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    map: {
        width: '100%',
        height: '100%',
    },
})
