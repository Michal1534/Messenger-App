import { Box, Button, CheckIcon, Heading, Icon, Input, Modal, ScrollView, Select, Text, Image } from 'native-base';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useConversations } from '../../ConversationsStore';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { ConversationProps } from '../TopNavigator/TopNavigator';
import { FontAwesome5 } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackProps } from '../../App';
import ConversationInstruction from '../../assets/Conversation.png';
import ConversationOptionsInstruction from '../../assets/ConversationOptions.png';
import ConversationSavedInstruction from '../../assets/ConversationSaved.png';

const colors = ['lightgreen', 'lightblue', 'limegreen', 'palevioletred'];

export const ConversationOptions: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<StackProps>>();

    const {
        params: { user, category },
    } = useRoute<RouteProp<ConversationProps, 'ConversationOptions'>>();
    const changeColor = useConversations((store) => store.changeColor);
    const changeNickname = useConversations((store) => store.changeNickname);
    const changeCategory = useConversations((store) => store.changeCategory);
    const [value, setValue] = useState('');
    const [friendCategory, setFriendCategory] = useState('');

    useEffect(() => {
        setFriendCategory(category);
    }, [Select]);

    const [showModal, setShowModal] = useState(false);

    return (
        <Box flex={1} p={5} justifyContent="flex-start" alignItems="center">
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header>Quick instruction</Modal.Header>
                    <Modal.Body>
                        <ScrollView>
                            <Box alignItems="center" justifyContent="flex-start">
                                <Box mb={'50px'} alignItems="center" justifyContent="flex-start">
                                    <Heading>Ekran Konwersacji</Heading>
                                    <Image height={370} width={250} alt="test" source={ConversationInstruction}></Image>
                                    <Box alignItems="flex-start" justifyContent="flex-start">
                                        <Text>1. Przycisk powrotu do poprzedniego okna aplikacji</Text>
                                        <Text>2. Ekran, w którym się aktualnie znajdujemy</Text>
                                        <Text>3. Ekran, w którym ustawiamy opcje danej konwersacji</Text>
                                        <Text>4. Ekran, w którym wyświetlane są zapisane wiadomości</Text>
                                        <Text>
                                            5. Wiadomość wysłana przez nas (posiada ona nieco ciemniejszy odcień
                                            porównując z wiadomością oznaczoną pkt 6 gdyż została ona zapisane. Aby
                                            zapisać wiadomość należy kliknąć na wiadomość która chcemy zapisać)
                                        </Text>
                                        <Text>
                                            6. Wiadomość wysłana przez nas pod wiadomością znajduje się czas jaki minął
                                            od wysłania wiadomości
                                        </Text>
                                        <Text>7. Miejsce w którym wpisujemy treść wiadomości</Text>
                                        <Text>8. Przycisk do wysyłania wiadomości</Text>
                                    </Box>
                                </Box>
                                <Box mb={'50px'} alignItems="center" justifyContent="flex-start">
                                    <Heading>Ekran Opcji</Heading>
                                    <Image
                                        height={350}
                                        width={200}
                                        alt="test"
                                        source={ConversationOptionsInstruction}
                                    ></Image>
                                    <Box alignItems="flex-start" justifyContent="flex-start">
                                        <Text>
                                            1. 4 różne kolory, które po kliknięciu zmieniają nam tło w konwersacji z
                                            konkretnym znajomym.
                                        </Text>
                                        <Text>2. Miejsce w którym możemy wpisać nową nazwę użytkownika</Text>
                                        <Text>
                                            3. Przycisk do zatwierdzenia nowej nazwy użytkownika (Wciśnięcie tego
                                            przycisku gdy pkt 2 jest pusty usunie przypisaną użytkownikowi nazwę)
                                        </Text>
                                        <Text>4. Wybranie grupy do której dany znajomy należy</Text>{' '}
                                    </Box>
                                </Box>
                                <Box alignItems="center" justifyContent="flex-start">
                                    <Heading>Ekran zapisanych wiadmości</Heading>
                                    <Image
                                        height={350}
                                        width={200}
                                        alt="test"
                                        source={ConversationSavedInstruction}
                                    ></Image>
                                    <Box alignItems="flex-start" justifyContent="flex-start">
                                        <Text>
                                            1. Wyświetlane zostają tutaj tylko zapisane przez nas wiadomości jak widzimy
                                            czas wyświetla się w innej formie gdyż pokazywana jest data z której
                                            pochodzi dana wiadomość, a nie czas który minął od wysłania wiadomości
                                        </Text>
                                    </Box>
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
            <Heading mb={3}>Choose a color you want</Heading>
            <Box mb={'20px'} flexDirection="row">
                {colors.map((color) => (
                    <TouchableOpacity
                        key={color}
                        onPress={() => {
                            changeColor(user, color);
                        }}
                    >
                        <Box width={50} height={50} backgroundColor={color} />
                    </TouchableOpacity>
                ))}
            </Box>
            <Heading mb={3}>Set your friend Nickname</Heading>
            <Box mb={'20px'}>
                <Input
                    value={value}
                    onChangeText={setValue}
                    mb={'10px'}
                    w={'100%'}
                    variant="underlined"
                    placeholder="Set nickname"
                />
                <Button
                    onPress={() => {
                        changeNickname(user, value);
                    }}
                >
                    Zmień
                </Button>
            </Box>
            <Heading mb={3} mt={'20px'}>
                Select a category
            </Heading>
            <Select
                selectedValue={friendCategory}
                minWidth={'100%'}
                placeholder="Select a category"
                dropdownIcon={<Icon as={FontAwesome5} name="chevron-down" size={5} />}
                _selectedItem={{
                    bg: 'gray.500',
                    endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                onValueChange={(itemValue) => {
                    setFriendCategory(itemValue);
                    changeCategory(user, itemValue);
                }}
            >
                <Select.Item label="Rodzina" value="Rodzina" />
                <Select.Item label="Bliscy znajomy" value="Bliscy znajomy" />
                <Select.Item label="Praca" value="Praca" />
                <Select.Item label="Pozostali" value="Pozostali" />
            </Select>
            <Heading mt={30}>Instruction</Heading>
            <Button
                mt={3}
                onPress={() => {
                    setShowModal(!showModal);
                }}
            >
                Check Instruction
            </Button>
        </Box>
    );
};
