import { StyleSheet, View } from 'react-native'
import { Maps } from '../../components/maps/Maps';
import { useLocationStore } from '../../store/location/useLocationStore';
import { LoadingScreen } from '../loading/LoadingScreen';
import { useEffect } from 'react';

export const MapsScreen = () => {

    const { lastKnownLocation, getLocation } = useLocationStore();

    useEffect(() => {
        if (lastKnownLocation === null) getLocation();
    }, []);

    if (!lastKnownLocation) {
        return (<LoadingScreen />);
    }

    return (
        <View style={styles.container}>
            <Maps initalLocation={lastKnownLocation} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
    },
});
