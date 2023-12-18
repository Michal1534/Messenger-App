import React, { useEffect, useState } from 'react';
import {
    Box,
    VStack,
    Heading,
    Button,
    Avatar,
    Divider,
    Pressable,
    Text,
    Icon,
    Modal,
    ScrollView,
    Image,
} from 'native-base';
import { useAuth } from '../../AuthStore';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseApp';
import { StackProps } from '../../App';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import HomeInstruction from '../../assets/Home.png';

const statusColors = {
    online: 'green.500',
    afk: 'orange.500',
    offline: 'red.500',
};

export const Home = () => {
    const logOut = useAuth((state) => state.logOut);
    const status = useAuth((state) => state.status);
    const changeStatus = useAuth((state) => state.changeStatus);
    const user = useAuth((state) => state.user);
    const navigation = useNavigation<StackNavigationProp<StackProps>>();

    const handleChangeStatus = () => {
        if (status === 'online') {
            changeStatus('afk');
            return;
        }

        if (status === 'afk') {
            changeStatus('offline');
            return;
        }

        if (status === 'offline') {
            changeStatus('online');
            return;
        }
    };
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => setShowModal(!showModal)}>
                    <Icon color={'cyan.400'} as={FontAwesome5} name="info-circle" size={'8'} />
                </TouchableOpacity>
            ),
        });
    }, []);

    return (
        <Box flex={1} alignItems="center" justifyContent="center" paddingX={10}>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header>Quick instruction</Modal.Header>
                    <Modal.Body>
                        <ScrollView>
                            <Box alignItems="center" justifyContent="flex-start">
                                <Image height={350} width={200} alt="test" source={HomeInstruction}></Image>
                                <Box alignItems="flex-start" justifyContent="flex-start">
                                    <Text>
                                        1. Awatar naszego konta po kliknięciu w niego zmienia nam się status na 1 z 3
                                        możliwych takich jak: „online”, „afk”, „offline”
                                    </Text>
                                    <Text>2. Przycisk przenoszący nas do ekranu zmiany hasła</Text>
                                    <Text>3. Przycisk wylogowywujący nas z aplikacji</Text>
                                    <Text>4. Ekran menu czyli ten w którym aktualnie się znajdujemy</Text>
                                    <Text>5. Ekran poprzednich konwersacji z naszymi znajomymi</Text>
                                    <Text>6. Ekran z zarządzania znajomymi w naszej aplikacji</Text>
                                </Box>
                            </Box>
                        </ScrollView>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group space={2}>
                            <Button
                                variant="ghost"
                                colorScheme="blueGray"
                                onPress={() => {
                                    setShowModal(false);
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                onPress={() => {
                                    setShowModal(false);
                                    navigation.push('Instruction'), {};
                                }}
                            >
                                Go to instruction
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
            <Pressable onPress={handleChangeStatus}>
                <Avatar size="lg" bg="orange.500" mb={2}>
                    {user?.email?.slice(0, 2).toUpperCase()}
                    <Avatar.Badge bgColor={statusColors[status]} />
                </Avatar>
            </Pressable>
            <Heading size="sm">{user?.email}</Heading>
            <Text italic color={statusColors[status]}>
                {status}
            </Text>
            <Divider my={10} bgColor="gray.300" />
            <VStack space="3" justifyContent="space-between">
                <Heading>Logged in succesfully</Heading>
                <Button size="lg" onPress={() => navigation.push('ChangePassword')}>
                    Change password
                </Button>
                <Button
                    size="lg"
                    onPress={async () => {
                        await signOut(auth);
                        logOut();
                    }}
                >
                    Log out
                </Button>
            </VStack>
        </Box>
    );
};
