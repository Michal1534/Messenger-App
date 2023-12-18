import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Avatar, Box, Button, SectionList, Icon, Input, ScrollView, Text, Modal, Image } from 'native-base';
import React, { useEffect, useMemo, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import QRCode from 'react-qr-code';
import { StackProps } from '../../App';
import { useAuth } from '../../AuthStore';
import { FontAwesome5 } from '@expo/vector-icons';
import { Conversation, useConversations } from '../../ConversationsStore';
import FriendsInstruction from '../../assets/Friends.png';

// import { Conversation } from '../Conversation/Conversation'

export const Friends: React.FC = () => {
    const user = useAuth((state) => state.user);

    const navigation = useNavigation<StackNavigationProp<StackProps>>();
    const conversations = useConversations((store) => store.conversations);
    const [filteredUsers, setFilteredUsers] = useState('');
    const [isQrShown, setQrShown] = useState(false);

    const filteredFriends = useMemo(
        () =>
            Object.values(conversations).filter((conversation) => {
                const nameCondition = conversation.user.toLowerCase().includes(filteredUsers.toLowerCase());
                const nickCondition = conversation.nick?.toLowerCase().includes(filteredUsers.toLowerCase());
                const categoryCondition = conversation.category.toLowerCase().includes(filteredUsers.toLowerCase());
                return nickCondition != null ? categoryCondition || nickCondition : nameCondition || categoryCondition;
            }),
        [conversations, filteredUsers]
    );

    const groupedConversations = useMemo(() => {
        let groups: { [key: string]: Conversation[] } = {};

        filteredFriends.forEach((conversation) => {
            if (!groups[conversation.category]) {
                groups[conversation.category] = [];
            }

            groups[conversation.category].push(conversation);
        });

        return Object.entries(groups).map(([category, conversations]) => ({
            title: category,
            data: conversations,
        }));
    }, [filteredFriends]);

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
        <Box flex={1} alignItems="center" justifyContent="flex-start" paddingY={5}>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header>Quick instruction</Modal.Header>
                    <Modal.Body>
                        <ScrollView>
                            <Box alignItems="center" justifyContent="flex-start">
                                <Image height={350} width={220} alt="test" source={FriendsInstruction}></Image>
                                <Box alignItems="flex-start" justifyContent="flex-start">
                                    <Text>
                                        1. Qrcode użytkownika, po którego zeskanowaniu zostaje dodany nowy znajomy.
                                    </Text>
                                    <Text>
                                        2. Prosta wyszukiwarka, w której możemy wpisać nazwę użytkownika lub grupę po
                                        której chcemy kogoś wyszukać.
                                    </Text>
                                    <Text>
                                        3. Informacja do której grupy należą dani użytkownicy, domyślnie nowy znajomy
                                        trafia do grupy pozostali.
                                    </Text>
                                    <Text>4. Tak wyświetlani są nasi znajomi.</Text>
                                    <Text>
                                        5. Przycisk przenoszący nas do ekranu, w którym możemy dodawać użytkowników do
                                        znajomych.
                                    </Text>
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
            <Box h={128} justifyContent="center">
                {isQrShown ? (
                    <TouchableOpacity
                        onPress={() => {
                            setQrShown(false);
                        }}
                    >
                        <QRCode value={JSON.stringify({ app: 'SM', email: user?.email! })} size={128} />
                    </TouchableOpacity>
                ) : (
                    <Button
                        size="lg"
                        onPress={() => {
                            setQrShown(true);
                        }}
                    >
                        Show your code
                    </Button>
                )}
            </Box>
            <Input
                textAlign={'center'}
                size={'xl'}
                value={filteredUsers}
                onChangeText={(value) => {
                    setFilteredUsers(value);
                }}
                mt={'10px'}
                mb={'20px'}
                w={'100%'}
                variant="underlined"
                placeholder="Find your friend"
            />
            <SectionList
                w="100%"
                sections={groupedConversations.sort()}
                keyExtractor={(item, index) => item.user + index}
                renderSectionHeader={({ section: { title } }) => (
                    <Text bg={'gray.300'} fontSize={'20px'} color={'gray.500'} pl={3}>
                        {title}
                    </Text>
                )}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Conversation', {
                                user: item.user,
                                category: item.category,
                            });
                        }}
                    >
                        <Box
                            w="100%"
                            px={5}
                            py={3}
                            flexDirection="row"
                            justifyContent="flex-start"
                            alignItems="center"
                            borderBottomWidth="1"
                            borderColor="gray.200"
                        >
                            <Avatar size="md" mr={5} bg="lightBlue.400">
                                {item.user.slice(0, 2)}
                            </Avatar>
                            <Text flex={1} color="gray.800" bold>
                                {item.nick || item.user}
                            </Text>
                        </Box>
                    </TouchableOpacity>
                )}
                ListEmptyComponent={() => (
                    <Box pt="10" alignItems="center" justifyContent="center">
                        <Icon mb="3" as={FontAwesome5} name="grin-squint" size={24} />
                        <Text>Unfortunately you have no friends.</Text>
                    </Box>
                )}
            />
            <Button
                mt={'10px'}
                size="lg"
                onPress={() => {
                    navigation.push('FriendsScanner');
                }}
            >
                Add new
            </Button>
        </Box>
    );
};
