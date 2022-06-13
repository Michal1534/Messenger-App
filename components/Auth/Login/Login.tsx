import React, { useState } from "react";
import { Box, VStack, Heading, Input, Button, Text, Icon, Avatar, Modal, Image, ScrollView } from "native-base";
import { useAuth } from "../../../AuthStore";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackProps } from "../../../App";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../../../firebaseApp";
import { Alert } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import Logowanie from "../../../assets/Logowanie.png";

type Inputs = {
  email: string,
  password: string
};

export const Login = () => {
  const logIn = useAuth(state => state.logIn)
  const [showModal, setShowModal] = useState(false)

  const { handleSubmit, control, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password)

      logIn(response.user)
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;

      Alert.alert('Wrong email or password.')
    }
  };

  const navigation = useNavigation<StackNavigationProp<StackProps>>()
  return (
    <Box flex={1}>
      <Box safeAreaTop alignItems="flex-end" justifyContent="flex-start">
        <TouchableOpacity onPress={() => setShowModal(true)}>
          <Icon color={'cyan.400'} as={FontAwesome5} name="info-circle" size={"8"} />
        </TouchableOpacity>
      </Box>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Quick instruction</Modal.Header>
          <Modal.Body>
            <ScrollView>
              <Box alignItems="center" justifyContent="flex-start">
                <Image height={350} width={200} alt="test" source={Logowanie}></Image>
                <Box alignItems="flex-start" justifyContent="flex-start">
                <Text >1.	Miejsce w które wpisujemy e-mail</Text>
                <Text >2.	Miejsce w które wpisujemy hasło</Text>
                <Text >3.	Po wpisaniu maila i hasła klikamy ten przycisk aby się zalogować</Text>
                <Text >4.	Przejście do ekranu rejestracji</Text>
                <Text >5.	Przejście do ekranu przypomnienia hasła w razie gdy je zapomnimy</Text>
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
                navigation.push('Instruction')
              }}>
                Go to instruction
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <Box flex={1} alignItems="center" justifyContent="center">
        <VStack space="3" justifyContent="center" width={225}>
          <Heading>Register or log in</Heading>
          <Text>Join thousands of people now</Text>
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
                isInvalid={"email" in errors}
                autoCapitalize="none"
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
                isInvalid={"password" in errors}
                mb="3"
                autoCapitalize="none"
              />
            )}
            name="password"
          />
          <Button size="lg" onPress={handleSubmit(onSubmit)}>Log in</Button>
          <Button onPress={() => {
            navigation.push('Register')
          }} size="lg" variant="subtle">
            Or register
          </Button>
          <Button onPress={() => {
            navigation.push('ForgotPassword')
          }} variant="link">Forgot password?</Button>
        </VStack>
      </Box>
    </Box>)
}