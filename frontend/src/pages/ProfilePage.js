import React, { useContext } from 'react'
import {Center, Flex, Grid, GridItem, Heading, Stack, Image, Spacer, Box, Text} from '@chakra-ui/react'
import { Navbar } from '../components/Navbar'
import Posts from '../components/Posts'
import { Auth } from '../context/AuthContext'

const ProfilePage = () => {

  const {curr_user} = useContext(Auth)

  return (
    <>
      <Grid
        templateAreas={`"nav nav"
                        "left right"`}
        gridTemplateRows={'100px 1fr'}
        gridTemplateColumns={'40% 60%'}
        h='100vh'
        color='black'
      >
        <GridItem pl='2' bg='gray.100' area={'nav'}>
          <Navbar />
        </GridItem>
        <GridItem pl='2' bg='gray.100' area={'left'}>
          <Flex>
            <Spacer />
            <Stack>
              <Box mt='50px'>
                <Image src={curr_user.profilePic} borderRadius='full' boxSize='sm' alt={curr_user.username} objectFit='cover' />
              </Box>
              <Center>
                <Text>Username: {curr_user.username}</Text>
              </Center>
              <Center>
                <Text>Age: {curr_user.age}</Text>
              </Center>
              <Center>
                <Text>DOB: {curr_user.dateOfBirth}</Text>
              </Center>
            </Stack>
            <Spacer />
          </Flex>
        </GridItem>
        <GridItem pl='2' bg='gray.100' area={'right'}>
          <Flex>
          <Stack spacing='20px'>
            <Center><Heading mt='50px'>Your Posts</Heading></Center>
            <Center bgColor='gray.100'><Posts isProfile={true}/></Center>
            
          </Stack>
          </Flex>
        </GridItem>
      </Grid>
    </>
  )
}

export default ProfilePage