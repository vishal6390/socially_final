import { Box, Flex, Avatar, Text } from '@chakra-ui/react'
import React from 'react'

const SingleChatItem = ({chat}) => {
  return (
    <Flex m='2px' pt='3px'>
        <Box>
            <Avatar size='sm' name='Ryan Florence' src={chat.senderImage} />
        </Box>
        <Box bgColor='white' borderRadius='5px' ml='6px' p='10px'>
            <Text>{chat.message}</Text>
        </Box>
    </Flex>
  )
}

export default SingleChatItem