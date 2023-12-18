import React, { useRef, useState } from 'react';
import { Box, Text, Input, Button, Icon } from 'native-base';
import { formatDistanceToNow } from 'date-fns';
import { FontAwesome5 } from '@expo/vector-icons';
import { useConversations, Message } from '../../ConversationsStore';
import { RouteProp, useRoute } from '@react-navigation/native';
import { ConversationProps } from '../TopNavigator/TopNavigator';
import { FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native';

const MessageCloud: React.FC<{ item: Message; changeStatus: VoidFunction }> = ({ item, changeStatus }) => {
    const color = item.saved ? '300' : '200';
    return (
        <TouchableOpacity onPress={changeStatus}>
            <Box marginY={'5px'} paddingX={'10px'} alignItems={item.isOwnMessage ? 'flex-end' : 'flex-start'}>
                <Box
                    alignItems={'flex-end'}
                    maxWidth={'75%'}
                    rounded={'10px'}
                    backgroundColor={item.isOwnMessage ? `green.${color}` : `blue.${color}`}
                    padding="10px"
                >
                    <Text>{item.message}</Text>
                    <Text fontSize={'8px'} textAlign={'right'} italic color={'gray.400'}>
                        {formatDistanceToNow(item.time)}
                    </Text>
                </Box>
            </Box>
        </TouchableOpacity>
    );
};

const Footer: React.FC<{ user: string; listRef: React.RefObject<FlatList<any>> }> = ({ user, listRef }) => {
    const sendMessage = useConversations((store) => store.sendMessage);
    const [value, setValue] = useState('');

    return (
        <Box flexDirection={'row'} py={1}>
            <Input flex={1} placeholder="Type your message" borderWidth={0} value={value} onChangeText={setValue} />
            <Button
                onPress={() => {
                    sendMessage(user, value);
                    setValue('');
                    listRef.current?.scrollToEnd();
                }}
                backgroundColor={'transparent'}
                disabled={value.length === 0}
                startIcon={
                    <Icon
                        as={FontAwesome5}
                        name="paper-plane"
                        size={5}
                        color={value.length > 0 ? 'primary.500' : 'gray.500'}
                    />
                }
            ></Button>
        </Box>
    );
};

export const Conversation = () => {
    const {
        params: { user },
    } = useRoute<RouteProp<ConversationProps, 'ConversationChat'>>();
    const conversations = useConversations((store) => store.conversations);

    const conversation = conversations.find((conversation) => conversation.user === user);
    const flatListRef = useRef<FlatList>(null);
    const changeStatus = useConversations((store) => store.changeStatus);

    return (
        <Box flex={1} safeAreaBottom backgroundColor="white">
            <FlatList
                ref={flatListRef}
                keyExtractor={(item, index) => item.time.toString() + index}
                data={conversation?.messages}
                renderItem={({ item }) => (
                    <MessageCloud
                        item={item}
                        key={item.key}
                        changeStatus={() => {
                            changeStatus(user, item.id);
                        }}
                    />
                )}
                onContentSizeChange={() => {
                    flatListRef.current?.scrollToEnd();
                }}
            />
            <Footer user={user} listRef={flatListRef} />
        </Box>
    );
};
