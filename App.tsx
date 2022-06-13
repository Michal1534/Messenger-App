import React, { useState } from "react";
import {
  Text,
  NativeBaseProvider,
  Icon,
} from "native-base";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, Header } from "@react-navigation/stack";
import { Login } from "./components/Auth/Login/Login";

import { useAuth } from "./AuthStore";
import { Register } from "./components/Auth/Register/Register";
import { BottomNavigator } from "./components/BottomNavigator/BottomNavigator";
import { ForgotPassword } from "./components/ForgotPassword/ForgotPassword";
import { TopNavigator } from "./components/TopNavigator/TopNavigator";
import { ChangePassword } from "./components/ChangePassword/ChangePassword";
import { FriendsScanner } from "./components/FriendsScanner/FriendsScanner";
import { Instruction } from "./components/Instruction/Instruction";
import { TouchableOpacity } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

export type StackProps = {
  Login: undefined
  Register: undefined
  ForgotPassword: undefined
  Instruction: undefined
  Conversation: {
    user: string
    category: string
  }
  App: undefined
  ChangePassword: undefined
  FriendsScanner: undefined
}

const Stack = createStackNavigator<StackProps>()

export default function App() {
  const isLoggedIn = useAuth(state => state.isLoggedIn)
  const [showModal2, setShowModal2] = useState(false)


  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {!isLoggedIn ? (
            <>
              <Stack.Screen name="Login" component={Login} options={{
                headerShown: false
              }} />
              <Stack.Screen name="Register" component={Register} options={{
              }} />
              <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{
                headerTitle: 'Forgot Password'
              }} />
              <Stack.Screen name="Instruction" component={Instruction} options={{
                headerShown: true
              }} />
            </>
          ) : (<>
            <Stack.Screen name="App" component={BottomNavigator} options={{
              headerShown: false
            }} />
            <Stack.Screen name="Instruction" component={Instruction} options={{
              headerShown: true
              }} />
            <Stack.Screen name="Conversation" component={TopNavigator} options={{
              }}/>
            <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerTitle: 'Change Password'
              }}/>
            <Stack.Screen name="FriendsScanner" component={FriendsScanner} options={{ headerTitle: 'Scan your friends code'
              }}/>
          </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
