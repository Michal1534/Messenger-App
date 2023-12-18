import React, { useEffect, useState } from 'react';
import { Box, VStack, Heading, Input, Button, Modal, ScrollView, Image, Text, Icon } from 'native-base';
import { useAuth } from '../../../AuthStore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { auth } from '../../../firebaseApp';
import { Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackProps } from '../../../App';
import Registration from '../../../assets/Rejestracja.png';
import { FontAwesome5 } from '@expo/vector-icons';

type Inputs = {
    email: string;
    password: string;
};

export const Register = () => {
    const navigation = useNavigation<StackNavigationProp<StackProps>>();
    const [showModal, setShowModal] = useState(false);
    const logIn = useAuth((state) => state.logIn);

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);

            logIn(response.user);
        } catch (error: any) {
            const errorCode = error.code;
            const errorMessage = error.message;
            Alert.alert(errorMessage);
        }
    };

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
        <Box flex={1}>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header>Quick instruction</Modal.Header>
                    <Modal.Body>
                        <ScrollView>
                            <Box alignItems="center" justifyContent="flex-start">
                                <Image height={350} width={200} alt="test" source={Registration}></Image>
                                <Box alignItems="flex-start" justifyContent="flex-start">
                                    <Text>1. Miejsce, w którym wpisujemy adres e-mail</Text>
                                    <Text>2. Miejsce, w którym wpisujemy hasło (min. 6 znaków)</Text>
                                    <Text>3. Przycisk do rejestracji użytkownika w aplikacji</Text>
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
                                    navigation.push('Instruction');
                                }}
                            >
                                Go to instruction
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
            <Box flex={1} alignItems="center" justifyContent="center">
                <VStack space="3" justifyContent="space-between" width={200}>
                    <Heading>Register</Heading>
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
                                placeholder="Password"
                                type="password"
                                autoCapitalize="none"
                                isInvalid={'password' in errors}
                            />
                        )}
                        name="password"
                    />
                    <Button onPress={handleSubmit(onSubmit)} size="lg">
                        Register
                    </Button>
                </VStack>
            </Box>
        </Box>
    );
};
