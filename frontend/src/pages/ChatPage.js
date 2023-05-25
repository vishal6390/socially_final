import React, {useState, useEffect, useRef} from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import {Grid, Center, GridItem, Stack, Box, Avatar, Text, Flex, Spacer, Button, Divider, Input} from '@chakra-ui/react';
import { Navbar } from '../components/Navbar';
import axios from 'axios'
import { io } from 'socket.io-client';
import SingleChatItem from '../components/SingleChatItem';

const ChatPage = () => {

  const [friendsArray, setFriendsArray] = useState([])    
    const [message, setMessage] = useState("")
    const [friend, setFriend] = useState()
    const [chat, setChat] = useState([])
    const socket = useRef();
    const [arrivalMessage, setArrivalMessage] = useState({
        sender: "",
        message: "",
    })

    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        // socket.current.emit("addUser",id);
        
        socket.current.on("getMessage", (data) => {
        console.log("grbthbyhtbyhb",data);
            setArrivalMessage({
            sender: data.senderId,
            message: data.message,
        });
        });
    }, []);
    
    useEffect(() => {
        if(friend && arrivalMessage && friend._id === arrivalMessage.sender){
            console.log("4545454", arrivalMessage)
            const obj = {
                message: arrivalMessage.message,
                time: Date.now()
            }
            console.log("yeh mera hai", obj)
            setChat((prev) => [...prev, obj]);
        }
    }, [arrivalMessage,friend]);


    useEffect(() => {
        const getFriends = async () => {
          
          const id = JSON.parse(window.localStorage.getItem('Socially_Current_User'))._id
          
            // socket connection 
          socket.current.emit("addUser",id);

          const obj = {id: id}
          const getFriendsArray = await axios.post("http://localhost:9002/api/getFriends", obj)
          setFriendsArray(getFriendsArray.data.friends)
        }
        getFriends()
    }, [])

    useEffect(() => {
        const getAllChat = async () => {
            const id = JSON.parse(window.localStorage.getItem('Socially_Current_User'))._id
            if(friend){
         //       console.log(friend.username)
                const obj = {
                    senderId: id,
                    receiverId: friend._id
                }
                const res = await axios.post("http://localhost:9002/api/getAllChats", obj)
                setChat(res.data.messageArray)
            }
        }
        getAllChat()
    }, [friend])

    const handleMessageSend = async (item) =>{
      const sender = JSON.parse(window.localStorage.getItem('Socially_Current_User'))
        
      const obj = {
          senderId: sender._id,
          receiverId: friend._id,
          message: message,
          senderImage: sender.profilePic
      }
      setChat((prev) => [...prev, { message: message,
          time: Date.now()
    }]);

      
      await axios.post("http://localhost:9002/api/saveChatMessage", obj);
      socket.current.emit("sendMessage", obj);
  
  }


  return (
      <>
      <Grid
        templateAreas={`"nav nav"
                        "left right"`}
        gridTemplateRows={'100px 1fr'}
        gridTemplateColumns={'30% 70%'}
        h='100vh'
        color='black'
      >
        <GridItem pl='2' bg='gray.100' area={'nav'}>
          <Navbar isChat={true}/>
        </GridItem>
        <GridItem pl='2' bg='gray.100' area={'left'}>
           <Box pl='6' bg='gray.100' flex={3}>
           <Text as='h3' fontSize='25px' mb='20px' ml='10px' mt='20px'>My Chats</Text>
           <ScrollableFeed >
                 {
                  friendsArray && friendsArray.map((item, i) => {
                    return (
                      <>
                        <Box ml='10px' bg='gray.200' height='60px' key={i} w='90%' borderRadius='5px' cursor='pointer' mb='10px' onClick={() => setFriend(item)}>
                            <Flex justifyContent='center' alignItems='center'>
                                <Avatar position='relative' top='6px' left='10px' size='md' name={item.username} src={item.profilePic} />
                                <Text color='black' position='relative' left='20px' top='4px'>{item.username}</Text>
                                <Spacer />
                            </Flex>
                        </Box>
                        <Divider mb='10px'/>
                      </>
                    )
                  })
                }
      
            </ScrollableFeed>
          </Box>
        </GridItem>
        <GridItem pl='2' bg='gray.100' area={'right'}>
                 <Box pl='2'>
                 <Center>
                   <Text as='h3' fontSize='25px' mb='20px' mt='20px'>{(friend && friend.username)}</Text>
                 </Center>
                 </Box>
                 <Stack spacing='10px' h='calc(100vh - 250px)' overflowY='scroll' pl='2' mr='25px' bg='gray.200' borderRadius='10px'>
                      {
                          
                          (chat && chat.map((item, i) => {
                              return (
                                  <Box key={i}>
                                      <SingleChatItem chat={item} />
                                  </Box>
                              )
                          }))
                          // <SingleChatItem />
                      }
              </Stack>
              <Box pl='2'>
                <Flex mt='10px'>
                  <Input isInvalid errorBorderColor='black' placeholder='Type Something...' variant='outline' w='90%' onChange={e => setMessage(e.target.value)}/>
                  <Button colorScheme='whatsapp' position='relative' left='10px' onClick={handleMessageSend}>Send</Button>
                </Flex>
              </Box>
        </GridItem>
      </Grid>
    </>
  )
}

export default ChatPage