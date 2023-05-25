import React, { useContext, useState } from 'react'
import { Grid, GridItem, Heading,Input, Stack, AbsoluteCenter, Box, Button, Center, useDisclosure, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalFooter, ModalBody, ModalHeader} from '@chakra-ui/react';
import { Navbar } from '../components/Navbar';
import Leftbar from '../components/Leftbar';
import Posts from '../components/Posts';
import { Auth } from '../context/AuthContext';
import { Textarea } from '@chakra-ui/react'
import {toast} from 'react-toastify'
import axios from 'axios'

export const HomePage = () => {

    const {curr_user} = useContext(Auth)
    const [caption, setCaption] = useState('')
    const [image, setImage] = useState("")
    const [loading, setLoading] = useState(false)

    const handleUpload = () => {
        if(!caption){
            toast.error("Please provide the caption")
        }else if(!image){
            toast.error("Please provide the image")
        }else{
            setLoading(true)
            const data = new FormData()
            data.append("file", image)
            data.append("upload_preset", 'socially')
            data.append("cloud_name", 'dbct68twk')

            fetch('https://api.cloudinary.com/v1_1/dbct68twk/image/upload', {
                method: "post",
                body: data
            })
            .then(res => res.json())
            .then((data) => {
                setLoading(false)
                const current_time = Date()
                const obj = {
                    id: curr_user._id,
                    username: curr_user.username,
                    profilePic: curr_user.profilePic,
                    caption: caption,
                    postPic: data.url,
                    current_time
                  }
          
                   axios.post("http://localhost:9002/api/createPost", obj)
                  .then(res => {
                    window.location.reload()
                    // toast.success(res.data.message)
                    onClose()
                  })
                  .catch(err => {
                    toast.error("Error Occured")
                    onClose()
                  })
            })
            .catch(err => {
                toast.error("Error occured while uploading image")
                setLoading(false)
                onClose()
            })
        }
    }

    // create a post modal config
    const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
    <Grid
    templateAreas={`"nav nav nav"
                    "leftbar main rightbar"`}
    gridTemplateRows={'100px 1fr'}
    gridTemplateColumns={'25% 45% 30%'}
    h='100vh'
    color='black'
    >
    <GridItem bg='gray.100' area={'nav'}>
        <Navbar />
    </GridItem>
    <GridItem  bg='gray.100' area={'leftbar'}>
        <Leftbar />
    </GridItem>
    <GridItem bg='gray.100' area={'main'}>
        <Box position='relative'>
            <AbsoluteCenter p='4' axis='horizontal'>
                
                <Stack>
                    <Center><Heading>Welcome {curr_user.username}!</Heading></Center>
                    <Center><Button mt='20px' mb='20px' onClick={onOpen} bgColor='blue.300'> Create a Post</Button></Center>
                    <Center><Posts isProfile={false}/></Center>
                </Stack>
            </AbsoluteCenter>
        </Box>
    </GridItem>
    <GridItem  bg='gray.100' area={'rightbar'}>
        {/* rightbar */}
    </GridItem>
    </Grid>
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
        <ModalHeader>Create a Post</ModalHeader>
        <ModalCloseButton />
            <ModalBody>
                <Stack spacing='20px'>
                    <Textarea value={caption} onChange={e => setCaption(e.target.value)} placeholder="What's in your mind?" />
                    <Input onChange={e => setImage(e.target.files[0])} size="md" type="file" />
                </Stack>
            </ModalBody>
        <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleUpload} isLoading={loading}>Upload</Button>
            <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
        </ModalContent>
      </Modal>
    </>

  )
}
