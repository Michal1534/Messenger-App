import React, { useEffect, useState } from 'react'
import { Avatar, Box, FlatList, HStack, VStack, Text, Spacer, Badge, Icon, Modal, Button, ScrollView, Image } from 'native-base'
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackProps } from '../../App';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Conversation, useConversations } from '../../ConversationsStore';
import { formatDistanceToNow } from 'date-fns';
import { FontAwesome5 } from '@expo/vector-icons';
import ChatsInstruction from "../../assets/Chats.png";


export const Chats = () => {
    const navigation = useNavigation<StackNavigationProp<StackProps>>()
    const conversations = useConversations(store => store.conversations)
    const [showModal, setShowModal] = useState(false)
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (<TouchableOpacity onPress={() => setShowModal(!showModal)}>
                <Icon color={'cyan.400'} as={FontAwesome5} name="info-circle" size={"8"} />
            </TouchableOpacity>)
        })
    }, [])
    return (
        <Box flex={1} alignItems="stretch" justifyContent="center">
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header>Quick instruction</Modal.Header>
                    <Modal.Body>
                        <ScrollView>
                            <Box alignItems="center" justifyContent="flex-start">
                                <Image height={350} width={200} alt="test" source={ChatsInstruction}></Image>
                                <Box alignItems="flex-start" justifyContent="flex-start">
                                    <Text >1.	Nazwa użytkownika z którym pisaliśmy oraz ostatnia wiadomość w konwersacji z tym użytkownikiem.</Text>
                                    <Text >2.	Czas który minął od ostatniej wiadomości z konwersacji do aktualnego czasu.</Text>
                                    <Text >3.	Informacja wyświetlana tylko przy nieodczytanych wiadomościach, w środku znajduję się informacja o ilości tych wiadomości.</Text>
                                </Box>
                            </Box>
                        </ScrollView>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group space={2}>
                            <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                                setShowModal(false);
                            }}>
                                Cancel
                            </Button>
                            <Button onPress={() => {
                                setShowModal(false);
                                navigation.push('Instruction'),{}
                            }}>
                                Go to instruction
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
            <FlatList
                data={conversations.sort((a, b) => b.messages[b.messages.length - 1].time.getTime() - a.messages[a.messages.length - 1].time.getTime())}
                renderItem={({ item }: { item: Conversation }) => (
                    <TouchableOpacity onPress={() => {
                        navigation.navigate("Conversation", {
                            user: item.user,
                            category: item.category
                        })
                    }}>
                        <Box
                            borderBottomWidth="1"
                            borderColor="gray.200"
                            paddingX={3}
                            paddingY={3}
                        >
                            <HStack space={3} justifyContent="space-between">
                                <Avatar
                                    size="md"
                                >
                                    {item.user.slice(0, 2)}
                                </Avatar>
                                <VStack>
                                    <HStack space={1} justifyContent="flex-start" alignItems="center">
                                        <Text
                                            color="gray.800"
                                            bold
                                        >
                                            {item.user}
                                        </Text>
                                        {item.unread > 0 && (
                                            <Badge colorScheme="danger" rounded="8px" px={2} m={0} _text={{
                                                lineHeight: 10,
                                                fontSize: 10
                                            }}>
                                                {item.unread < 100 ? item.unread : `99+`}
                                            </Badge>
                                        )}
                                    </HStack>

                                    <Text
                                        color="gray.500"
                                    >
                                        {item.messages[item.messages.length - 1].message}
                                    </Text>
                                </VStack>
                                <Spacer />
                                <Text
                                    italic
                                    color="gray.500"
                                >
                                    {formatDistanceToNow(item.messages[item.messages.length - 1].time)}
                                </Text>
                            </HStack>
                        </Box>
                    </TouchableOpacity>
                )
                }
                keyExtractor={(item) => item.user}
            />
        </Box >
    )
}