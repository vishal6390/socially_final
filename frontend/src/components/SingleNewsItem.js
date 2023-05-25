import React, { useContext, useState } from 'react'
import { Heading, Image, Button,Box,  Text, Stack, Flex, Divider, CardFooter, Card, CardBody, Spacer, Link, Tooltip } from '@chakra-ui/react'
import ShareIcon from '@mui/icons-material/Share';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { Auth } from '../context/AuthContext';
import axios from 'axios'

const SingleNewsItem = ({news}) => {

  const history = useHistory()

  const {curr_user} = useContext(Auth)
  const [loading, setLoading] = useState(false)

  const shareNewsWithFriends = () => {

    setLoading(true)
    const current_time = Date()
    const obj = {
        id: curr_user._id,
        username: curr_user.username,
        profilePic: curr_user.profilePic,
        caption: news.title.slice(0, 50),
        postPic: news.urlToImage || "https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg",
        current_time,
        newsLink: news.url,
    }

    axios.post("http://localhost:9002/api/createPost", obj)
    .then(res => {
    // window.location.reload()
    history.push("/")
    // toast.success(res.data.message)
    })
    .catch(err => {
    // toast.error("Error Occured")
    })

  }

  return (
    <>
        <Card maxW='sm' h='500px' bg='gray.100' m='2px'>
            <CardBody>
                <Image
                src={news.urlToImage || "https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg"}
                alt='Green double couch with wooden legs'
                borderRadius='lg'
                w='sm'
                h='200px'
                objectFit='cover'
                />
                <Stack mt='6' spacing='3'>
                <Heading size='md'>{news.title.slice(0, 50)}...</Heading>
                <Text>
                    {news.description && news.description.slice(0, 150)}...
                </Text>
                </Stack>
            </CardBody>
            <Divider />
            <CardFooter>

                <Flex justifyContent='center' alignItems='center'>
                    <Box>
                        <Text fontSize='sm'>
                            By:- {(news.author && news.author.slice(0, 20)) || "Unknown Source"}
                        </Text>
                    </Box>
                    <Spacer />
                    <Box>
                        <Button ml='5px' variant='ghost' colorScheme='blue'>
                            <Link href={news.url} target='/blank'>
                                Read More 
                            </Link>
                        </Button>
                    </Box>
                    <Box>
                        <Tooltip label="Share with friends">
                            <Button 
                            leftIcon={<ShareIcon />} 
                            colorScheme='teal' 
                            variant='ghost' 
                            onClick={shareNewsWithFriends}
                            isLoading={loading}
                            loadingText='Sharing'>
                                Share
                            </Button>
                        </Tooltip>
                    </Box>
                </Flex>
            </CardFooter>
        </Card>
    </>
  )
}

export default SingleNewsItem