import React, { useState } from 'react';
import { Box, Text, Image, ScrollView, Heading } from 'native-base';
import LoginInstruction from '../../assets/Logowanie.png';
import RegisterInstruction from '../../assets/Rejestracja.png';
import ForgotPasswordInstruction from '../../assets/ForgotPassword.png';
import ChangePasswordInstruction from '../../assets/ChangePassword.png';
import ChatsInstruction from '../../assets/Chats.png';
import ConversationInstruction from '../../assets/Conversation.png';
import ConversationOptionsInstruction from '../../assets/ConversationOptions.png';
import ConversationSavedInstruction from '../../assets/ConversationSaved.png';
import FriendsInstruction from '../../assets/Friends.png';
import HomeInstruction from '../../assets/Home.png';

export const Instruction = () => {
    return (
        <ScrollView backgroundColor={'white'}>
            <Box flex={1} alignItems="center" justifyContent="flex-start">
                <Box mb={'50px'} alignItems="center" justifyContent="flex-start">
                    <Heading>Ekran Logowania</Heading>
                    <Image height={350} width={200} alt="test" source={LoginInstruction}></Image>
                    <Box alignItems="flex-start" justifyContent="flex-start">
                        <Text>1. Miejsce w które wpisujemy e-mail</Text>
                        <Text>2. Miejsce w które wpisujemy hasło</Text>
                        <Text>3. Po wpisaniu maila i hasła klikamy ten przycisk aby się zalogować</Text>
                        <Text>4. Przejście do ekranu rejestracji</Text>
                        <Text>5. Przejście do ekranu przypomnienia hasła w razie gdy je zapomnimy</Text>
                    </Box>
                </Box>
                <Box mb={'50px'} alignItems="center" justifyContent="flex-start">
                    <Heading>Ekran Rejestacji</Heading>
                    <Image height={350} width={200} alt="test" source={RegisterInstruction}></Image>
                    <Box alignItems="flex-start" justifyContent="flex-start">
                        <Text>1. Miejsce, w którym wpisujemy adres e-mail</Text>
                        <Text>2. Miejsce, w którym wpisujemy hasło (min. 6 znaków)</Text>
                        <Text>3. Przycisk do rejestracji użytkownika w aplikacji</Text>
                    </Box>
                </Box>
                <Box mb={'50px'} alignItems="center" justifyContent="flex-start">
                    <Heading>Ekran Przypomnienia Hasła</Heading>
                    <Image height={350} width={200} alt="test" source={ForgotPasswordInstruction}></Image>
                    <Box alignItems="flex-start" justifyContent="flex-start">
                        <Text>1. Miejsce, w którym wpisujemy adres e-mail, do którego chcemy odzyskać hasło</Text>
                        <Text>
                            2. Przycisk dzięki któremu na wskazany adres e-mail dostaniemy wiadomość mailową z linkiem,
                            który prowadzi nas do strony na której wpisujemy nowe hasło do aplikacji.
                        </Text>
                    </Box>
                </Box>
                <Box mb={'50px'} alignItems="center" justifyContent="flex-start">
                    <Heading>Ekran Menu</Heading>
                    <Image height={350} width={200} alt="test" source={HomeInstruction}></Image>
                    <Box alignItems="flex-start" justifyContent="flex-start">
                        <Text>
                            1. Awatar naszego konta po kliknięciu w niego zmienia nam się status na 1 z 3 możliwych
                            takich jak: „online”, „afk”, „offline”
                        </Text>
                        <Text>2. Przycisk przenoszący nas do ekranu zmiany hasła</Text>
                        <Text>3. Przycisk wylogowywujący nas z aplikacji</Text>
                        <Text>4. Ekran menu czyli ten w którym aktualnie się znajdujemy</Text>
                        <Text>5. Ekran poprzednich konwersacji z naszymi znajomymi</Text>
                        <Text>6. Ekran z zarządzania znajomymi w naszej aplikacji</Text>
                    </Box>
                </Box>
                <Box mb={'50px'} alignItems="center" justifyContent="flex-start">
                    <Heading>Ekran Zmiany Hasła</Heading>
                    <Image height={350} width={300} alt="test" source={ChangePasswordInstruction}></Image>
                    <Box alignItems="flex-start" justifyContent="flex-start">
                        <Text>1. Przycisk do wygenerowania nam nowego hasła</Text>
                        <Text>2. Miejsce, w które wpisujemy aktualne hasło do aplikacji</Text>
                        <Text>
                            3. Miejsce, w które wpisujemy nowe hasło (automatycznie uzupełniane po kliknięciu przycisku
                            z pkt 1)
                        </Text>
                        <Text>
                            4. Miejsce, w które wpisujemy ponownie nowe hasło (automatycznie uzupełniane po kliknięciu
                            przycisku z pkt 1)
                        </Text>
                        <Text>5. Przycisk, który zmienia nam hasło</Text>
                        <Text>6. Powrót do poprzedniego ekranu w aplikacji</Text>
                    </Box>
                </Box>
                <Box mb={'50px'} alignItems="center" justifyContent="flex-start">
                    <Heading>Ekran Poprzednich Konwersacji</Heading>
                    <Image height={350} width={200} alt="test" source={ChatsInstruction}></Image>
                    <Box alignItems="flex-start" justifyContent="flex-start">
                        <Text>
                            1. Nazwa użytkownika z którym pisaliśmy oraz ostatnia wiadomość w konwersacji z tym
                            użytkownikiem.
                        </Text>
                        <Text>2. Czas który minął od ostatniej wiadomości z konwersacji do aktualnego czasu.</Text>
                        <Text>
                            3. Informacja wyświetlana tylko przy nieodczytanych wiadomościach, w środku znajduję się
                            informacja o ilości tych wiadomości.
                        </Text>
                    </Box>
                </Box>
                <Box mb={'50px'} alignItems="center" justifyContent="flex-start">
                    <Heading>Ekran Znajomych</Heading>
                    <Image height={350} width={220} alt="test" source={FriendsInstruction}></Image>
                    <Box alignItems="flex-start" justifyContent="flex-start">
                        <Text>1. Qrcode użytkownika, po którego zeskanowaniu zostaje dodany nowy znajomy.</Text>
                        <Text>
                            2. Prosta wyszukiwarka, w której możemy wpisać nazwę użytkownika lub grupę po której chcemy
                            kogoś wyszukać.
                        </Text>
                        <Text>
                            3. Informacja do której grupy należą dani użytkownicy, domyślnie nowy znajomy trafia do
                            grupy pozostali.
                        </Text>
                        <Text>4. Tak wyświetlani są nasi znajomi.</Text>
                        <Text>
                            5. Przycisk przenoszący nas do ekranu, w którym możemy dodawać użytkowników do znajomych.
                        </Text>
                    </Box>
                </Box>
                <Box mb={'50px'} alignItems="center" justifyContent="flex-start">
                    <Heading>Ekran Konwersacji</Heading>
                    <Image height={370} width={250} alt="test" source={ConversationInstruction}></Image>
                    <Box alignItems="flex-start" justifyContent="flex-start">
                        <Text>1. Przycisk powrotu do poprzedniego okna aplikacji</Text>
                        <Text>2. Ekran, w którym się aktualnie znajdujemy</Text>
                        <Text>3. Ekran, w którym ustawiamy opcje danej konwersacji</Text>
                        <Text>4. Ekran, w którym wyświetlane są zapisane wiadomości</Text>
                        <Text>
                            5. Wiadomość wysłana przez nas (posiada ona nieco ciemniejszy odcień porównując z
                            wiadomością oznaczoną pkt 6 gdyż została ona zapisane. Aby zapisać wiadomość należy kliknąć
                            na wiadomość która chcemy zapisać)
                        </Text>
                        <Text>
                            6. Wiadomość wysłana przez nas pod wiadomością znajduje się czas jaki minął od wysłania
                            wiadomości
                        </Text>
                        <Text>7. Miejsce w którym wpisujemy treść wiadomości</Text>
                        <Text>8. Przycisk do wysyłania wiadomości</Text>
                    </Box>
                </Box>
                <Box mb={'50px'} alignItems="center" justifyContent="flex-start">
                    <Heading>Ekran Opcji</Heading>
                    <Image height={350} width={200} alt="test" source={ConversationOptionsInstruction}></Image>
                    <Box alignItems="flex-start" justifyContent="flex-start">
                        <Text>
                            1. 4 różne kolory, które po kliknięciu zmieniają nam tło w konwersacji z konkretnym
                            znajomym.
                        </Text>
                        <Text>2. Miejsce w którym możemy wpisać nową nazwę użytkownika</Text>
                        <Text>
                            3. Przycisk do zatwierdzenia nowej nazwy użytkownika (Wciśnięcie tego przycisku gdy pkt 2
                            jest pusty usunie przypisaną użytkownikowi nazwę)
                        </Text>
                        <Text>4. Wybranie grupy do której dany znajomy należy</Text>{' '}
                    </Box>
                </Box>
                <Box alignItems="center" justifyContent="flex-start">
                    <Heading>Ekran zapisanych wiadmości</Heading>
                    <Image height={350} width={200} alt="test" source={ConversationSavedInstruction}></Image>
                    <Box alignItems="flex-start" justifyContent="flex-start">
                        <Text>
                            1. Wyświetlane zostają tutaj tylko zapisane przez nas wiadomości jak widzimy czas wyświetla
                            się w innej formie gdyż pokazywana jest data z której pochodzi dana wiadomość, a nie czas
                            który minął od wysłania wiadomości
                        </Text>
                    </Box>
                </Box>
            </Box>
        </ScrollView>
    );
};
