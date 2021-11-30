import { Box, Center, Text } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { Input } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'

const Home: NextPage = () => {
  return (
    <Box w='100%' h='100%'>
      <Center h='100%' flexDir='column'>
        <Text as='i' fontSize='9xl' fontWeight='bold' marginBottom="0.6em">chatty</Text>
        <Box w="75%" maxW="50em" display="flex">
          <Input size='lg' placeholder='Chat title'/>
          <Button size='lg' colorScheme='teal' marginLeft="1em" marginBottom="10em">Create</Button> 
        </Box>
      </Center>
    </Box>
  )
}

export default Home
