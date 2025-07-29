import { Platform } from "react-native";
import { PermissionStatus } from '../../infrastructure/interfaces/permissions';
import { check, openSettings, PERMISSIONS, request, PermissionStatus as RNPermissionStatus } from "react-native-permissions";

export const requestLocationPermission = async (): Promise<PermissionStatus> => {
    let status: RNPermissionStatus = 'unavailable';

    if (Platform.OS === 'ios') {
        // iOS specific permission request logic
        status = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
    } else if (Platform.OS === 'android') {
        // Android specific permission request logic
        status = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
    } else {
        throw new Error('Unsupported platform for location permissions');
    }

    if (status === 'blocked') {
        await openSettings();
        return await checkLocationPermission();
    }

    const permissionMapper: Record<RNPermissionStatus, PermissionStatus> = {
        'granted': 'granted',
        'denied': 'denied',
        'blocked': 'blocked',
        'limited': 'limited',
        'unavailable': 'unavailable',
    };

    return permissionMapper[status] ?? 'unavailable';
}


export const checkLocationPermission = async (): Promise<PermissionStatus> => {
    let status: RNPermissionStatus = 'unavailable';

    if (Platform.OS === 'ios') {
        // iOS specific permission check logic
        status = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
    } else if (Platform.OS === 'android') {
        // Android specific permission check logic
        status = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
    } else {
        throw new Error('Unsupported platform for location permissions');
    }

    const permissionMapper: Record<RNPermissionStatus, PermissionStatus> = {
        'granted': 'granted',
        'denied': 'denied',
        'blocked': 'blocked',
        'limited': 'limited',
        'unavailable': 'unavailable',
    };

    return permissionMapper[status] ?? 'unavailable';
}