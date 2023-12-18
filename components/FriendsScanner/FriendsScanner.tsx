import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BarCodeScannedCallback, BarCodeScanner } from 'expo-barcode-scanner';
import { Box } from 'native-base';
import React, { useEffect, useState } from 'react';
import { StackProps } from '../../App';
import { useAuth } from '../../AuthStore';
import { useConversations } from '../../ConversationsStore';

export const FriendsScanner: React.FC = () => {
    const [hasPermission, setHasPermission] = useState<null | boolean>(null);
    const [scanned, setScanned] = useState(false);

    const user = useAuth((state) => state.user);

    const navigation = useNavigation<StackNavigationProp<StackProps>>();
    const addConversation = useConversations((store) => store.addConversation);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const addFriend = async (email: string) => {
        await addConversation(email);
        navigation.pop();
    };

    const handleScanned: BarCodeScannedCallback = ({ type, data }) => {
        try {
            const result = JSON.parse(data);

            if (result.app === 'SM') {
                setScanned(true);
                addFriend(result.email);
            }
        } catch (error) {}
    };

    if (hasPermission === null) {
        return (
            <Box flex={1} justifyContent="center" alignItems="center">
                Please, give us permissions to use your camera.
            </Box>
        );
    }
    if (hasPermission === false) {
        return (
            <Box flex={1} justifyContent="center" alignItems="center">
                We don't have access to your camera.
            </Box>
        );
    }

    return (
        <Box flex={1}>
            <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleScanned} style={{ flex: 1 }} />
        </Box>
    );
};
