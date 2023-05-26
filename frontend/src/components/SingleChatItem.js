import { Box, Flex, Avatar, Text, Spacer } from '@chakra-ui/react'
import React from 'react'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

const SingleChatItem = ({chat}) => {


  TimeAgo.addDefaultLocale(en)
  const timeAgo = new TimeAgo('en-US')

  return (
    <Flex m='2px' pt='3px'>
        <Box>
            <Avatar size='sm' name='Ryan Florence' src={chat.senderImage} />
        </Box>
        <Box bgColor='white' borderRadius='5px' ml='6px' p='10px'>
            <Text>{chat.message}</Text>
            <Flex>
              <Spacer />
              <Text fontSize='10px'>{timeAgo.format(new Date(chat.time))}</Text>
            </Flex>
        </Box>
    </Flex>
  )
}

export default SingleChatItem