import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Text, Center, Box, Spinner, Divider, Input, Button } from '@chakra-ui/react'
import { Chat, QueryChatArgs } from '../../logic/generated/graphql'
import { useLazyQuery } from '@apollo/client'
import { getChat } from '../../logic/client'
import { useEffect, useState } from 'react'
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr'

const Chat: NextPage = () => {
  const router = useRouter();
  const chatidString = router.query['chatid'];
  var chatid = Number.parseInt(chatidString as string);
  
  var [getChatExecute, { loading, error, data }] = useLazyQuery<{ chat: Chat }, QueryChatArgs>(getChat);

  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [chatLog, setChatLog] = useState<ChatEntry[]>([]);

  var chat = data?.chat;

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl('http://localhost:5135/chathub')
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if(!chatid) return;

    getChatExecute({ variables: { id: chatid } });
  }, [chatid]);

  useEffect(() => {
    if(!chatid || !connection) return;

    connection.start()
      .then(_ => {
        connection.on('ReceiveMessage', addNewMessage);
        connection.send("ConnectToChat", chatid.toString());
      })
      .catch(e => console.log('Connection failed: ', e));
  }, [connection, chatid]);

  var addNewMessage = (message: ChatEntry) => {
    setChatLog((chatLog) => {
      const updatedChat = [...chatLog];
      updatedChat.push(message);
      return updatedChat;
    });
  }

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
      <Box flexGrow="1" overflowY="scroll" overflowX="hidden" padding="0.4em 1em 1em 1em">
        {chatLog.map((entry, i) => <ChatEntry key={i} entry={entry} />)}
      </Box>
      <Divider />
      <ChatInput connection={connection} />
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

//const isGoodConnection = (connection: HubConnection | null) => connection != null && connection.state == HubConnectionState.Connected;
const ChatInput: NextPage<{connection: HubConnection | null}> = (props) => {
  var [newMessage,setNewMessage] = useState<string>("");

  var sendMessage = () => {
    props.connection?.send("SendMessage", newMessage);
    setNewMessage("");
  }

  return (
    <Box display="flex" margin="1em">
      <Input onKeyDown={(evt) => {if (evt.key == "Enter") sendMessage()}} marginRight="1em" placeholder="Type your message" value={newMessage} onChange={(evt) => setNewMessage((_) => evt.target.value)}/>
      <Button colorScheme='teal' onClick={sendMessage}>Chat</Button>
    </Box>
  )
}

const ChatEntry: React.FC<{ entry: ChatEntry }> = (props) => {
  return (
    <Box display="flex" marginTop="0.6em">
      <Text fontSize="15px" fontWeight='bold'>{props.entry.username}:</Text>
      <Text fontSize="15px" marginLeft='0.4em' wordBreak="break-all">{props.entry.message}</Text>
    </Box>
  )
}

type ChatEntry = {
  username: string,
  message: string,
}

export default Chat