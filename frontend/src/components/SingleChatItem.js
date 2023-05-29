import { Box, Flex, Avatar, Text, Spacer } from '@chakra-ui/react'
import React, { useContext } from 'react'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { Auth } from '../context/AuthContext'

const SingleChatItem = ({chat}) => {

  const {curr_user} = useContext(Auth)

  TimeAgo.addLocale(en)
  const timeAgo = new TimeAgo('en-US')
  // console.log("yeh meri chat hai", chat)

  return (
    <Flex m='2px' pt='3px'>
        <Box>
            <Avatar size='sm' name='Ryan Florence' src={chat.senderImage ? chat.senderImage : curr_user.profilePic} />
            {/* {console.log("ncsdncnsjcnsijcnbshbckjncjsbch", chat.senderImage)} */}
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