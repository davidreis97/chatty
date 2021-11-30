import { Box, Center, Text, Spinner } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { Input } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { useMutation } from '@apollo/client'
import { createChat } from '../logic/client'
import { Chat, MutationCreateChatArgs } from '../logic/generated/graphql'
import { useState } from 'react'

const Home: NextPage = () => {
  var [state, changeState] = useState<HomeState>({title: ""});

  return (
    <Box w='100%' h='100%'>
      <Center h='100%' flexDir='column'>
        <Text as='i' fontSize='9xl' fontWeight='bold' marginBottom="0.6em">chatty</Text>
        <Box w="75%" maxW="50em" display="flex">
          <Input value={state.title} onChange={(evt)=>{changeState((_) => ({title: evt.target.value}))}} size='lg' placeholder='Chat title'/>
          <CreateChatButton title={state.title}/>
        </Box>
      </Center>
    </Box>
  )
}

const CreateChatButton: React.FC<CreateChatButtonProps> = (props) => {
  const [ addChat, {
    data,
    loading,
    error
  }] = useMutation<Chat, MutationCreateChatArgs>(createChat, {variables: {title: props.title}});

  if (error){
    console.log("Error:", error);
  }

  return (
    <Button width="5em" onClick={() => addChat()} size='lg' colorScheme='teal' marginLeft="1em" marginBottom="10em">{loading ? <Spinner/> : "Create"}</Button>
  );
}

type HomeState = CreateChatButtonProps;

type CreateChatButtonProps = {
  title: string
}

export default Home
