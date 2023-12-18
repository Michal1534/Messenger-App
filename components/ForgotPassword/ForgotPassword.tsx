import React, { useEffect, useRef, useState } from 'react';
import { Box, VStack, Heading, Input, Button, AlertDialog, Text, Icon, Modal, ScrollView, Image } from 'native-base';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackProps } from '../../App';
import { Alert, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import ForgotPasswordInstruction from '../../assets/ForgotPassword.png';

type Inputs = {
    email: string;
};

export const ForgotPassword = () => {
    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => {
        setIsOpen(false);
    };
    const cancelRef = useRef(null);
    const navigation = useNavigation<StackNavigationProp<StackProps>>();
    const auth = getAuth();
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async ({ email }) => {
        try {
            await sendPasswordResetEmail(auth, email);
            setIsOpen((isOpen) => !isOpen);
        } catch (error: any) {
            const errorCode = error.code;
            const errorMessage = error.message;
            Alert.alert(errorMessage);
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
        <Box flex={1} alignItems="center" justifyContent="center">
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header>Quick instruction</Modal.Header>
                    <Modal.Body>
                        <ScrollView>
                            <Box alignItems="center" justifyContent="flex-start">
                                <Image height={350} width={200} alt="test" source={ForgotPasswordInstruction}></Image>
                                <Box alignItems="flex-start" justifyContent="flex-start">
                                    <Text>
                                        1. Miejsce, w którym wpisujemy adres e-mail, do którego chcemy odzyskać hasło
                                    </Text>
                                    <Text>
                                        2. Przycisk dzięki któremu na wskazany adres e-mail dostaniemy wiadomość mailową
                                        z linkiem, który prowadzi nas do strony na której wpisujemy nowe hasło do
                                        aplikacji.
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
            <VStack space="3" justifyContent="space-between" width={200}>
                <Heading>Enter your email to reset your password</Heading>
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
                            placeholder="E-Mail"
                            autoCapitalize="none"
                            isInvalid={'email' in errors}
                        />
                    )}
                    name="email"
                />
                <Button onPress={handleSubmit(onSubmit)} size="lg">
                    Submit
                </Button>
            </VStack>
            <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
                <AlertDialog.Content>
                    <AlertDialog.Header backgroundColor={'primary.500'}>
                        <Text color="white">Success</Text>
                    </AlertDialog.Header>
                    <AlertDialog.Body>
                        A link to reset your password has been sent to your email address
                        <Button
                            mt={3}
                            onPress={() => {
                                onClose();
                                navigation.navigate('Login');
                            }}
                        >
                            Go back!
                        </Button>
                    </AlertDialog.Body>
                </AlertDialog.Content>
            </AlertDialog>
        </Box>
    );
};
