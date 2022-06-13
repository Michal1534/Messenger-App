import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Box, Button, Icon, Modal, ScrollView,Image,Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import { StackProps } from '../../App';
import { useConversations } from '../../ConversationsStore';
import { Conversation } from '../Conversation/Conversation';
import { ConversationOptions } from '../ConversationOptions/ConversationOptions';
import { SavedMessage } from '../SavedMessage/SavedMessage';
import { FontAwesome5 } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';


export type ConversationProps = {
  ConversationChat: {
    user: string,
  },
  ConversationOptions: {
    user: string,
    category: string
  }
  SavedMessage: {
    user: string,
  },
}

const Tab = createMaterialTopTabNavigator<ConversationProps>();

export const TopNavigator = () => {
  const navigation2 = useNavigation<StackNavigationProp<StackProps>>()

  const navigation = useNavigation()
  const { params: { user, category } } = useRoute<RouteProp<StackProps, "Conversation">>()

  const conversations = useConversations(store => store.conversations)

  const { options, nick } = conversations.find(conversation => conversation.user === user)!
  const setRead = useConversations(store => store.setRead)


  useEffect(() => {
    navigation.setOptions({ title: nick || user})

    if (options?.color) {
      navigation.setOptions({ headerStyle: { backgroundColor: options.color } })
    }

    setRead(user)
  }, [options, nick, category])

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="ConversationChat"
        component={Conversation}
        options={{ tabBarLabel: 'Chat' }}
        initialParams={{ user }}
      />
      <Tab.Screen
        name="ConversationOptions"
        component={ConversationOptions}
        options={{ tabBarLabel: 'Options' }}
        initialParams={{ user,category }}
      />
      <Tab.Screen
        name="SavedMessage"
        component={SavedMessage}
        options={{ tabBarLabel: 'Saved' }}
        initialParams={{ user }}
      />
    </Tab.Navigator>
  )
}