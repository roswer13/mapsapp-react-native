import MapView, { Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { Location } from '../../../infrastructure/interfaces/location';
import { useEffect, useRef, useState } from 'react';
import { useLocationStore } from '../../store/location/useLocationStore';
import { FAB } from '../ui/FAB';

interface Props {
    initalLocation: Location
}

export const Maps = ({ initalLocation }: Props) => {
    const [showUserLocation, setShowUserLocation] = useState(false);

    const mapRef = useRef<MapView>(null);
    const cameraLocation = useRef<Location>(initalLocation);
    const { getLocation, lastKnownLocation, watchLocation, clearWatchLocation, userLocationList } = useLocationStore();
    const [isFollowingUser, setIsFollowingUser] = useState(true);
    const [isShowingPolyline, setIsShowingPolyline] = useState(true);

    const onMapReady = () => {
        setShowUserLocation(true);
    }

    const moveCamaraToLocation = (location: Location) => {
        if (!mapRef.current) return;

        mapRef.current.animateCamera({
            center: {
                latitude: location.latitude,
                longitude: location.longitude,
            },
        });
    }

    const moveToCurrentLocation = async () => {
        if (!lastKnownLocation) {
            moveCamaraToLocation(initalLocation);
        }

        const location = await getLocation();
        if (!location) return;
        moveCamaraToLocation(location);
    }

    useEffect(() => {
        watchLocation();

        return () => {
            clearWatchLocation();
        };
    }, []);

    useEffect(() => {
        if (lastKnownLocation && isFollowingUser) {
            moveCamaraToLocation(lastKnownLocation);
        }
    }, [lastKnownLocation, isFollowingUser]);

    return (
        <>
            <MapView
                ref={map => { mapRef.current = map; }}
                onMapReady={onMapReady}
                showsMyLocationButton
                onTouchStart={() => setIsFollowingUser(false)}
                showsUserLocation={showUserLocation}
                provider={PROVIDER_GOOGLE}
                style={{ flex: 1 }}
                region={{
                    latitude: cameraLocation.current.latitude,
                    longitude: cameraLocation.current.longitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
            >


                {/*
            <Marker
                coordinate={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                }}
                title='Marker Title'
                description='Marker Description' />
            */}

                {
                    isShowingPolyline && (
                        <Polyline
                            coordinates={userLocationList}
                            strokeColor='blue'
                            strokeWidth={3} />
                    )
                }
            </MapView>

            <FAB
                iconName='Line'
                onPress={() => setIsShowingPolyline(!isShowingPolyline)}
                style={{ bottom: 140, right: 20 }} />

            <FAB
                iconName='Walk'
                onPress={() => setIsFollowingUser(!isFollowingUser)}
                style={{ bottom: 80, right: 20 }} />

            <FAB
                iconName='Follow'
                onPress={moveToCurrentLocation}
                style={{ bottom: 20, right: 20 }} />

        </>
    )
}
