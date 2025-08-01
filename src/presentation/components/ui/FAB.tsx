import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'

interface Props {
    iconName: string;
    onPress: () => void;

    style?: StyleProp<ViewStyle>;
}

export const FAB = ({ iconName, onPress, style }: Props) => {
    return (
        <View style={[styles.btn, style]}>
            <Pressable onPress={onPress}>
                <Text style={{ color: 'white' }}>{iconName}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    btn: {
        zIndex: 1,
        position: 'absolute',
        height: 50,
        width: 50,
        borderRadius: 30,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        shadowOpacity: 0.4,
        shadowOffset: {
            width: 0.27,
            height: 4.5,
        },
        elevation: 5,
    }
})
