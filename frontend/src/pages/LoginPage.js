import React, {useState, useContext} from 'react'
import { Input, Button, Image, Stack, InputGroup, InputRightElement, Text, Center, Heading, Box, Flex } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import {Auth} from '../context/AuthContext'
import axios from 'axios'
import { toast } from 'react-toastify';

const LoginPage = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [show, setShow] = useState(false)

    const history = useHistory()

    const {setCurr_user} = useContext(Auth)

    const handleLogin = () => {
        const user = {email, password}
        axios.post("http://localhost:9002/api/login", user)
        .then(res => {
            if(!res.data.user.isVerified) {
                toast.error("Your email is not Verified")
            } else {
                toast.success(res.data.message)
                window.localStorage.setItem('Socially_Current_User', JSON.stringify(res.data.user))
                setCurr_user(res.data.user)
                history.push("/")

            }
        })
    }

  return (
    <Box h='100vh' w='100vw'>
    <Flex>
        <Box bgColor='gray.300' w='40vw' h='100vh'>
            <Flex justifyContent='center' alignItems='center' w='40vw' h='100vh'>
                <Box>
                <Image color='white' cursor='pointer' pl='20px' boxSize='150px' src='https://www.iconbolt.com/iconsets/social-media-logos/logo-shazam-social-social-media.svg'/>
                    <Heading fontSize='50px'>Socially</Heading>
                    <Text mt='10px' fontSize='25px'>Connect with people around the world</Text>
                    <Text fontSize='25px'>with Socially!!!</Text>
                </Box>
            </Flex>
        </Box>
        <Box bgColor='gray.100' w='60vw'>
            <Flex justifyContent='flex-start' alignItems='center' w='60vw' h='100vh' pl='100px'>
                <Stack>
                    <Center>
                        <Heading>Welcome Back!</Heading>
                    </Center>
                    <Input border='1px solid black'value={email} placeholder='Enter your mail' w='350px' size='lg' onChange={e => setEmail(e.target.value)}/>
                    <InputGroup size='lg' mt='20px'>
                        <Input
                            pr='4.5rem'
                            type={show ? 'text' : 'password'}
                            placeholder='Enter password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            border='1px solid black'
                        />
                        <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size='sm' onClick={() => setShow(!show)}>
                            {show ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <Button bgColor='blue.400' size='lg' mt='20px' onClick={handleLogin}>Login </Button>
                    <Center><Text as='b'>Dont't have an account? <Text as='u' cursor='pointer' onClick={() => history.push('/')}>Register</Text></Text></Center>
                </Stack>
                
            </Flex>
        </Box>
    </Flex>
    </Box>
  )
}

export default LoginPage