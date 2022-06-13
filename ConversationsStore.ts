import createZustand from "zustand";
import { Conversation } from "./components/Conversation/Conversation";

const mockedConversations = [
  {
    user: "Sebastian Jurczak",
    nick: null,
    unread: 1,
    options: {},
    category: "Pozostali",
    messages: [
      {
        id: 1,
        saved: false,
        isOwnMessage: true,
        message: "Cześć",
        time: new Date(2021, 11, 25, 12, 20, 0),
      },
      {
        id: 2,
        saved: true,
        isOwnMessage: false,
        message: "Cześć",
        time: new Date(2021, 11, 30, 17, 25, 0),
      },
    ],
  },
  {
    user: "Karol Syta",
    nick: null,
    unread: 1,
    options: {},
    category: "Pozostali",
    messages: [
      {
        id: 1,
        saved: false,
        isOwnMessage: false,
        message: "Cześć",
        time: new Date(2022, 0, 16, 21, 17, 0),
      },
    ],
  },
];

export type Message = {
  id: Number;
  saved: Boolean;
  isOwnMessage: Boolean;
  message: string;
  time: Date;
};

export type Conversation = {
  messages: Message[];
  user: string;
  nick: string | null;
  unread: Number;
  options: {
    color?: string;
  };
  category: string;
};

type ConversationStore = {
  conversations: Conversation[];
  changeColor: (user: string, color: string) => void;
  changeNickname: (user: string, nickname: string) => void;
  changeCategory: (user: string, newCategory: string) => void;
  sendMessage: (user: string, message: string) => void;
  setRead: (user: string) => void;
  addConversation: (user: string) => void;
  changeStatus: (user: string, messageId: number) => void;
};

export const useConversations = createZustand<ConversationStore>((set) => ({
  conversations: mockedConversations,
  changeColor: (user, color) =>
    set((state) => ({
      ...state,
      conversations: state.conversations.map((conversation) =>
        conversation.user === user
          ? {
            ...conversation,
            options: {
              color,
            },
          }
          : conversation
      ),
    })),
  changeNickname: (user, nickname) =>
    set((state) => ({
      ...state,
      conversations: state.conversations.map((conversation) =>
        conversation.user === user
          ? {
            ...conversation,
            nick: nickname
          }
          : conversation
      ),
    })),
  changeCategory: (user, newCategory) =>
    set((state) => ({
      ...state,
      conversations: state.conversations.map((conversation) =>
        conversation.user === user
          ? {
            ...conversation,
            category: newCategory
          }
          : conversation
      ),
    })),
  sendMessage: (user, message) =>
    set((state) => ({
      ...state,
      conversations: state.conversations.map((conversation) =>
        conversation.user === user
          ? {
            ...conversation,
            messages: [
              ...conversation.messages,
              {
                id: conversation.messages.length+1,
                saved: false,
                isOwnMessage: true,
                message,
                time: new Date(),
              },
            ],
          }
          : conversation
      ),
    })),
    changeStatus: (user, messageId) =>
    set((state) => ({
      ...state,
      conversations: state.conversations.map((conversation) =>
        conversation.user === user
          ? {
            ...conversation,
            messages: conversation.messages.map((message) => message.id === messageId ? {
              ...message,
              saved: !message.saved,
            } : message),
          }
          : conversation
      ),
    })),
  setRead: (user) =>
    set((state) => ({
      ...state,
      conversations: state.conversations.map((conversation) =>
        conversation.user === user
          ? {
            ...conversation,
            unread: 0
          }
          : conversation
      ),
    })),
    addConversation: (user) => set((state) => ({
      ...state,
      conversations: [...state.conversations, {
        messages: [
          {
            id: 1,
            saved: false,
            isOwnMessage: true,
            time: new Date(),
            message: `Cześć ${user}`
          }
        ],
        user,
        nick: null,
        unread: 0,
        options: {},
        category: "Pozostali"
      }]
    }))
}));
