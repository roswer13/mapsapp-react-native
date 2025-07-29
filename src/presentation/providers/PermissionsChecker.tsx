import { PropsWithChildren, use, useEffect } from 'react'
import { AppState } from 'react-native';
import { usePermissionStore } from '../store/permissions/usePermissionStore';
import { RootStackParams } from '../navigations/StackNavigator';
import { NavigationProp, useNavigation } from '@react-navigation/native';

export const PermissionsChecker = ({ children }: PropsWithChildren) => {

    const { locationStatus, checkLocationPermission } = usePermissionStore();
    const navigation = useNavigation<NavigationProp<RootStackParams>>();

    useEffect(() => {
        if (locationStatus === 'granted') {
            navigation.reset({
                routes: [{ name: 'MapsScreen' }]
            });
        } else if (locationStatus !== 'undetermined') {
            navigation.reset({
                routes: [{ name: 'PermissionsScreen' }]
            });
        }
    }, [locationStatus]);

    useEffect(() => {
        console.log('PermissionsChecker mounted');
        checkLocationPermission();
    }, []);

    useEffect(() => {
        const subscription = AppState.addEventListener('change', (nextAppState) => {
            if (nextAppState === 'active') {
                console.log('App has come to the foreground!');
                checkLocationPermission();
            }
        });

        return () => {
            subscription.remove();
            console.log('PermissionsChecker unmounted');
        }
    }, [])

    return (
        <>{children}</>
    )
}
