import React, { useEffect, useRef, useState } from "react";
import { Box, Input, Button, Text, AlertDialog, Icon, Modal, ScrollView, Image, Heading} from "native-base";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { reauthenticateWithCredential, EmailAuthProvider, getAuth, updatePassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackProps } from "../../App";
import { Alert, TouchableOpacity } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import ChangePasswordInstrction from "../../assets/ChangePassword.png";


type Inputs = {
    oldPassword: string,
    newPassword: string,
    newPasswordConfirm: string
};

export const ChangePassword = () => {
    const [isOpen, setIsOpen] = useState(false)
    const onClose = () => { setIsOpen(false) }
    const cancelRef = useRef(null)

    const { currentUser: user } = getAuth();
    const [showModal, setShowModal] = useState(false)
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (<TouchableOpacity onPress={() => setShowModal(!showModal)}>
                <Icon color={'cyan.400'} as={FontAwesome5} name="info-circle" size={"8"} />
            </TouchableOpacity>)
        })
    }, [])

    const { handleSubmit, control, formState: { errors }, setValue } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async ({ oldPassword, newPassword, newPasswordConfirm }) => {
        if (user?.email && newPassword == newPasswordConfirm) {
            const credential = EmailAuthProvider.credential(user?.email, oldPassword)
            try {
                await reauthenticateWithCredential(user, credential)
                await updatePassword(user, newPassword)
                setIsOpen(isOpen => !isOpen)
            } catch (error: any) {
                // const errorCode = error.code;
                const errorMessage = error.message;
                // console.error(errorCode, errorMessage)

                Alert.alert(errorMessage)
            }
        }
    };

    const navigation = useNavigation<StackNavigationProp<StackProps>>()

    const generatePassword = () => {
        const lowerCase = "abcdefghijklmnopqrstuvwxyz"
        const upperCase = lowerCase.toUpperCase()
        const numbers = "0123456789"
        const symbols = "!@#$%^&*()_-+="

        const passwordCharacters = [...lowerCase, ...upperCase, ...numbers, ...symbols]

        let newPassword = ""

        for (let i = 0; i < 12; i++) {
            newPassword += passwordCharacters[(Math.floor(Math.random() * passwordCharacters.length))]
        }

        setValue('newPassword', newPassword)
        setValue('newPasswordConfirm', newPassword)
    }

    return (<Box paddingLeft={'4'} paddingRight={'4'} backgroundColor={'white'} flex={1}>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <Modal.Content maxWidth="400px">
                <Modal.CloseButton />
                <Modal.Header>Quick instruction</Modal.Header>
                <Modal.Body>
                    <ScrollView>
                    <Image height={350} width={300} alt="test" source={ChangePasswordInstrction}></Image>
                    <Box alignItems="flex-start" justifyContent="flex-start">
                        <Text >1.	Przycisk do wygenerowania nam nowego hasła</Text>
                        <Text >2.	Miejsce, w które wpisujemy aktualne hasło do aplikacji</Text>
                        <Text >3.	Miejsce, w które wpisujemy nowe hasło (automatycznie uzupełniane po kliknięciu przycisku z pkt 1)</Text>
                        <Text >4.	Miejsce, w które wpisujemy ponownie nowe hasło (automatycznie uzupełniane po kliknięciu przycisku z pkt 1)</Text>
                        <Text >5.	Przycisk, który zmienia nam hasło</Text>
                        <Text >6.	Powrót do poprzedniego ekranu w aplikacji</Text>
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
                            navigation.push('Instruction')
                        }}>
                            Go to instruction
                        </Button>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
        <Text mt={10}>Hey {user?.displayName || user?.email}. If you want to change your password please type your current password and new password. Remember to have a strong password, we can also generate it for you.</Text>
        <Button my={5} variant="subtle" onPress={generatePassword}>Generate one for me, please!</Button>
        <Box paddingBottom={'8'}>
            <Text fontSize={'md'} color={'gray.500'}>Current Password</Text>
            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        variant="underlined"
                        autoCapitalize="none"
                        isInvalid={"oldPassword" in errors}
                    />
                )}
                name="oldPassword"
            />
        </Box>
        <Box paddingBottom={'8'}>
            <Text fontSize={'md'} color={'gray.500'}>New Password</Text>
            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        variant="underlined"
                        autoCapitalize="none"
                        isInvalid={"newPassword" in errors}
                    />
                )}
                name="newPassword"
            />
        </Box>
        <Box paddingBottom={'8'}>
            <Text fontSize={'md'} color={'gray.500'}>Confirm New Password</Text>
            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        variant="underlined"
                        autoCapitalize="none"
                        isInvalid={"newPasswordConfirm" in errors}
                    />
                )}
                name="newPasswordConfirm"
            />
        </Box>
        <Box paddingTop={'8'}>
            <Button size='lg' onPress={handleSubmit(onSubmit)} >Update Password</Button>
        </Box>
        <AlertDialog leastDestructiveRef={cancelRef}
            isOpen={isOpen}
            onClose={onClose}>
            <AlertDialog.Content>
                <AlertDialog.Header backgroundColor={'primary.500'}>
                    <Text color="white">Success</Text>
                </AlertDialog.Header>
                <AlertDialog.Body>
                    Password changed successfully!
                    <Button mt={3} onPress={() => {
                        onClose()
                        navigation.navigate('App')
                    }}>Go back!</Button>
                </AlertDialog.Body>
            </AlertDialog.Content>
        </AlertDialog>
    </Box >)
}
