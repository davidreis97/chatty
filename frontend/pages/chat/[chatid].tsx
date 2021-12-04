import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Text, Center, Box, Spinner, Divider, Input, Button } from '@chakra-ui/react'
import { Chat, QueryChatArgs } from '../../logic/generated/graphql'
import { ApolloError, useQuery } from '@apollo/client'
import { getChat } from '../../logic/client'
import { useEffect, useState } from 'react'
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr'

const Chat: NextPage = () => {
  const router = useRouter();
  const chatid = router.query["chatid"];
  var chatid_number = Number.parseInt(chatid as string);
  var { loading, error, data } = useQuery<{ chat: Chat }, QueryChatArgs>(getChat, { variables: { id: chatid_number } });
  const [connection, setConnection] = useState<HubConnection | null>(null);

  var chat = data?.chat;

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:5001/hubs/chat')
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection.start()
        .then(result => {
          console.log('Connected!');

          connection.on('ReceiveMessage', message => {
            const updatedChat = [...latestChat.current];
            updatedChat.push(message);

            setChat(updatedChat);
          });
        })
        .catch(e => console.log('Connection failed: ', e));
    }
  }, [connection]);

  if (loading) {
    return (
      <Center>
        <Spinner />
      </Center>
    )
  }

  if (chat == null || error != null) {
    return (
      <Center>
        <Text>Error</Text>
      </Center>
    )
  }

  return (
    <Box borderStyle="solid" borderWidth="0.1em" display="flex" flexDirection="column">
      <ChatHeader chat={chat} />
      <Divider />
      <Box flexGrow="1" overflowY="scroll" padding="0.4em 1em 1em 1em">
        {MockChatEntries.map((entry, i) => <ChatEntry key={i} entry={entry} />)}
      </Box>
      <Divider />
      <ChatInput />
    </Box>
  )
}

const ChatHeader: NextPage<{ chat: Chat }> = (props) => {
  const router = useRouter()
  return (
    <Box display="flex" justifyContent="space-between" margin="1em">
      <Text as='i' fontSize='2xl' marginBottom="auto" marginTop="auto">{props.chat.title}</Text>
      <Box marginLeft="0.7em" display="flex" flexDirection="column">
        <Text as='i' fontSize='sm' marginBottom="-0.7em">Powered by</Text>
        <Text as='i' fontSize='3xl' fontWeight='bold' onClick={() => router.push("/")} cursor="pointer">chatty</Text>
      </Box>
    </Box>
  )
}

const ChatInput: NextPage = () => {
  return (
    <Box display="flex" margin="1em">
      <Input marginRight="1em" placeholder="Type your message" />
      <Button colorScheme='teal'>Chat</Button>
    </Box>
  )
}

const ChatEntry: React.FC<{ entry: ChatEntry }> = (props) => {
  return (
    <Box display="flex" marginTop="0.6em">
      <Text fontSize="15px" fontWeight='bold'>{props.entry.username}:</Text>
      <Text fontSize="15px" marginLeft='0.4em'>{props.entry.message}</Text>
    </Box>
  )
}

type ChatEntry = {
  username: string,
  message: string,
}

const MockChatEntries: ChatEntry[] = [
  { username: "GuyA", message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
  { username: "GuyB", message: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." },
  { username: "GuyC", message: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make." },
  { username: "GuyD", message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
  { username: "GuyD", message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
  { username: "GuyD", message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
  { username: "GuyD", message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
  { username: "GuyD", message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
  { username: "GuyD", message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
  { username: "GuyD", message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
  { username: "GuyD", message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
  { username: "GuyD", message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
  { username: "GuyD", message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
  { username: "GuyD", message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
]

export default Chat