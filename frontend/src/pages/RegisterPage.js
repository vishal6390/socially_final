import React, {useState} from 'react'
import { Input, Button, Image, Stack, InputGroup, InputRightElement, Text, Center, Box, Flex, Heading } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios'
import { toast } from 'react-toastify';

const RegisterPage = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [reEnterPassword, setReEnterPassword] = useState('')
    const [age, setAge] = useState()
    const [dob, setDob] = useState('')
    const [profilePic, setProfilePic] = useState('')

    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const handleRegister = () => {

        if(username && email && password && (password === reEnterPassword) && age && dob && profilePic){
            setLoading(true)
            const data = new FormData()
            data.append("file", profilePic)
            data.append("upload_preset", 'socially')
            data.append("cloud_name", 'dbct68twk')

            fetch('https://api.cloudinary.com/v1_1/dbct68twk/image/upload', {
                method: "post",
                body: data
            })
            .then(res => res.json())
            .then((data) => {
                const obj = {
                    username, email, password, reEnterPassword, age, dob, profilePic: data.url
                }
                axios.post("http://localhost:9002/api/register", obj)
                .then((res) => {
                    toast.success("User is successfully registered and a verification mail is send, verify your mail before login")
                    setLoading(false)
                    history.push("/login")
                }).catch(err => {
                    toast.error("Error Occurred")
                    setLoading(false)
                })
                
            })
        }else{
            
            toast.error("Invalid input")
        }
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
                <Heading>Register Here</Heading>
            </Center>
            <Input border='0.2px solid black' w='400px' value={username} placeholder='Enter your username'  size='lg' onChange={e => setUsername(e.target.value)}/>
            <Input border='1px solid black' value={email} placeholder='Enter your e-mail' w='400px' size='lg' onChange={e => setEmail(e.target.value)}/>
            <InputGroup size='lg' mt='20px' w='400px'>
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
            <InputGroup w='400px' size='lg' mt='20px'>
                <Input
                    pr='4.5rem'
                    type={show ? 'text' : 'password'}
                    placeholder='Re-Enter password'
                    value={reEnterPassword}
                    onChange={e => setReEnterPassword(e.target.value)}
                    border='1px solid black'
                />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={() => setShow(!show)}>
                    {show ? 'Hide' : 'Show'}
                    </Button>
                </InputRightElement>
            </InputGroup>
            <Input border='1px solid black' w='400px' type={Number} value={age} onChange={e => setAge(e.target.value)} placeholder='Enter your age' size='lg' mt='20px' />
            <Input border='1px solid black' w='400px' type='date' value={dob} onChange={e => setDob(e.target.value)} size='lg' mt='20px' />
            <Input border='1px solid black' w='400px' type='file' onChange={e => setProfilePic(e.target.files[0])} size='lg' mt='20px' />

            <Button w='400px' bgColor='blue.400' size='lg' mt='20px' onClick={handleRegister} isLoading={loading}>Register</Button>
            <Center w='400px'><Text as='b'>Already have an account? <Text as='u' cursor='pointer' onClick={() => history.push('/login')}>login</Text></Text></Center>
            {console.log(username)}
        </Stack>
        </Flex>
    </Box>
    </Flex>
    </Box>
  )
}

export default RegisterPage