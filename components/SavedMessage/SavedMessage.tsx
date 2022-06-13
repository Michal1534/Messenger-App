import React, { useEffect, useRef, useState } from "react";
import { Box, Text, Input, Button, Icon } from "native-base";
import { formatDistanceToNow,format } from 'date-fns'
import { FontAwesome5 } from '@expo/vector-icons';
import { useConversations, Message } from "../../ConversationsStore";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { ConversationProps } from "../TopNavigator/TopNavigator";
import { FlatList, TouchableOpacity } from "react-native";

const MessageCloud: React.FC<{ item: Message }> = ({ item }) => {
  return (
    <Box marginY={'5px'}
      paddingX={'10px'}
      alignItems={item.isOwnMessage ? "flex-end" : "flex-start"}>
      <Box alignItems={'flex-end'} maxWidth={'75%'} rounded={'10px'} backgroundColor={item.isOwnMessage ? "green.200" : "blue.200"} padding='10px'>
        <Text >{item.message}</Text>
        <Text fontSize={'8px'} textAlign={'right'} italic color={'gray.400'}>{format(item.time,'dd/MM/yyyy')}</Text>
       </Box>
    </Box>)
}


export const SavedMessage = () => {
  const { params: { user } } = useRoute<RouteProp<ConversationProps, "ConversationChat">>()
  const conversations = useConversations(store => store.conversations)

  const conversation = conversations.find(conversation => conversation.user === user)
  const SavedMessege = conversation?.messages.filter((SavedMessege)=> SavedMessege.saved ===true)
  const flatListRef = useRef<FlatList>(null)


  return (
    <Box flex={1} safeAreaBottom backgroundColor="white">
      <FlatList
      ref={flatListRef}
        keyExtractor={(item, index) => index.toString()}
        data={SavedMessege}
        renderItem={MessageCloud}
        onContentSizeChange={() => {
          flatListRef.current?.scrollToEnd()
        }}
      />
    </Box>
  )
}