import Geolocation from '@react-native-community/geolocation';
import { Location } from '../../infrastructure/interfaces/location';

export const getCurrentLocation = async (): Promise<Location> => {
    return new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(info => {
            resolve({
                latitude: info.coords.latitude,
                longitude: info.coords.longitude
            });
        }, error => {
            console.error('Error getting current location:', error);
            reject(error);
        }, { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 });
    });
}

export const watchLocation = (locationCallback: (location: Location) => void): number => {
    return Geolocation.watchPosition(info => {
        locationCallback({
            latitude: info.coords.latitude,
            longitude: info.coords.longitude
        });
    }, error => {
        console.error('Error watching location:', error);
        throw new Error('Can not watch location');
    }, { enableHighAccuracy: true, distanceFilter: 10, interval: 5000 });
}

export const clearWatchLocation = (watchId: number): void => {
    Geolocation.clearWatch(watchId);
}