import { Spacer, Stack, Flex, Box, Divider, HStack, Avatar, Heading, Wrap, WrapItem } from '@chakra-ui/react';
import { Button, Modal, Image,  Center, ModalOverlay, ModalContent, ModalCloseButton, Text, ModalHeader, ModalBody, useDisclosure} from '@chakra-ui/react';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import React, {useContext, useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { Auth } from '../context/AuthContext';
import axios from 'axios'

const Leftbar = () => {

    const {curr_user} = useContext(Auth)

    const history = useHistory()
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [requestArray, setRequestArray] = useState([])
    const [friendsArray, setFriendsArray] = useState([])

    useEffect(() => {
      const getRequestUsers = async () => {
        const id = JSON.parse(window.localStorage.getItem('Socially_Current_User'))._id
        const obj = {id: id}
        const requestUserArray = await axios.post("http://localhost:9002/api/getRequestUser", obj)
        console.log(requestUserArray.data.requestUsers)
        setRequestArray(requestUserArray.data.requestUsers)
      }
      getRequestUsers()
    }, [])
  
    useEffect(() => {
      const getFriends = async () => {
        const id = JSON.parse(window.localStorage.getItem('Socially_Current_User'))._id
        const obj = {id: id}
        const getFriendsArray = await axios.post("http://localhost:9002/api/getFriends", obj)
        setFriendsArray(getFriendsArray.data.friends)
      }
      getFriends()
    }, [])

    const [whatToShow, setWhatToShow] = useState()

    const handleAcceptClick = async (requestUser) => {
      // now we will handle the database updation part

      const id = JSON.parse(window.localStorage.getItem('Socially_Current_User'))._id
      

      const obj = {
        currUserId: id,
        requestUserId: requestUser._id
      }

      await axios.post("/api/friendArrayUpdate/currentUserUpdate/1", obj)
      .then(res => console.log(res))
      .catch(err => console.log(err))

      await axios.post("/api/friendArrayUpdate/currentUserUpdate/2", obj)
      .then(res => console.log(res))
      .catch(err => console.log(err))

      await axios.post("/api/friendArrayUpdate/requestUserUpdate", obj)
      .then(res => console.log(res))
      .catch(err => console.log(err))

      // recommend update

      let tempArray = requestArray
      tempArray = tempArray.filter(function(obj) {
        return obj._id !== requestUser._id
      })
      setRequestArray(tempArray)

      // console.log('4')

      tempArray = friendsArray
      tempArray.push(requestUser)
      // console.log(tempArray)
      setFriendsArray(tempArray)
      // console.log('5')

      // window.location.reload()
  }

  return (
    <>
    <Stack pt='160px'>
        <Flex>
            <Spacer />
            <Box>
            <HStack cursor='pointer' onClick={() => {
                setWhatToShow("Friends")
                onOpen()
            }}>
                <PeopleAltOutlinedIcon />
                <Box w='100%' p={4} color='black'>
                    Friends
                </Box>
            </HStack>
            <Divider/>
            <HStack cursor='pointer' onClick={() => {
                setWhatToShow("Friends requests")
                onOpen()
            }}>
                <NotificationsNoneOutlinedIcon />
                <Box  w='100%' p={4} color='black'>
                    Friend Request
                </Box>
            </HStack>
            <Divider />
            <HStack cursor='pointer' onClick={() => history.push('/profile')}>
                <Avatar size='sm' cursor='pointer' name={curr_user.username} src={curr_user.profilePic} />
                <Box   w='100%' p={4} color='black' position='relative' left='-7px'>
                    Profile
                </Box>
            </HStack>
            </Box>

        </Flex>
    </Stack>
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{whatToShow}</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              {
                whatToShow === "Friends"
                ?
                  friendsArray && (friendsArray.length === 0
                    
                    ?
                    <Box h='100px'>
                        <Center>
                        <Heading position='relative' top='25px' as='h6' size='lg'>
                            You have no friends
                        </Heading>
                        </Center>
                    </Box> 
                    :
                    <Wrap ml='25px' spacingX='30px' spacingY='20px' >
                    {
                        friendsArray && friendsArray.map(item => {
                            return (
                                <WrapItem bg='white' height='180px' w='160px' key={item._id} borderRadius='10px'>
                                    <Stack>
                                      <Image h='150px' w='160px' src={item.profilePic} borderRadius='10px'/>
                                      <Center><Text>{item.username}</Text></Center>
                                    </Stack>
                                </WrapItem>
                            )
                        })
                    }
                  </Wrap>
                    )
                :
                  requestArray && (requestArray.length === 0
                    
                    ?
                    <Box h='100px'>
                        <Center>
                        <Heading position='relative' top='25px' as='h6' size='lg'>
                            No Friend Request
                        </Heading>
                        </Center>
                    </Box>  
                    :
                    <Stack mt='5px' spacing='5px'>
                    {
                        requestArray && requestArray.map(item => {
                            return (
                                <Box bg='gray.200' height='60px' key={item._id}>
                                    <Flex justifyContent='center' alignItems='center'>
                                        <Avatar position='relative' top='6px' left='10px' size='md' name={item.username} src={item.profilePic} />
                                        <Text position='relative' left='20px' top='4px'>{item.username}</Text>
                                        <Spacer />
                                        <Button colorScheme='blue' variant='ghost' position='relative' top='4px' right='10px' onClick={() => handleAcceptClick(item)}>Accept</Button>
                                    </Flex>
                                </Box>
                            )
                        })
                    }
                </Stack>
                    )
              }
            </ModalBody>
          </ModalContent>
        </Modal>
    </>
  )
}

export default Leftbar