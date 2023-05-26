import React, { useContext, useEffect } from 'react'
import { Card, CardHeader, Flex, InputGroup, InputRightElement, Avatar, Box, IconButton, Modal, ModalFooter, ModalOverlay, ModalContent, ModalCloseButton, ModalHeader, ModalBody, Heading, Text, Button, Image, CardBody,CardFooter, Spacer, Menu, MenuButton, MenuList, MenuItem, Link, useDisclosure, Stack, Input } from '@chakra-ui/react'
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useState } from 'react';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import ForumIcon from '@mui/icons-material/Forum';
import CommentLoading from './CommentLoading';
import { Auth } from '../context/AuthContext';


const SinglePost = ({post}) => {

  const {curr_user} = useContext(Auth)

  const [loading, setLoading] = useState(false)
  const [skeletonLoading, setSkeletonLoading] = useState(false)
  const [comment, setComment] = useState("")

  const [NumberOfLikes, setNumberOfLikes] = useState(0)

  const [commentArray, setCommentArray] = useState()

  TimeAgo.addDefaultLocale(en)
  const timeAgo = new TimeAgo('en-US')

  const deletePost = () => {
    if(post.userId === JSON.parse(window.localStorage.getItem('Socially_Current_User'))._id) {
      const obj = {
        postId: post._id
      }
      axios.post("http://localhost:9002/api/deletePost", obj)
      .then(res => {
        window.location.reload()
        toast.success(res.data.message)
      }).catch(err => {
        toast.error("Error Occurred")
      })
    } else {
      toast.error("You can delete only your posts")
    }
  }

  useEffect(() => {
    const update = () => {
      setNumberOfLikes(post.likes.length)

    }
    update()
    // eslint-disable-next-line
  }, [])


  const updateLike = () => {
    const userId = JSON.parse(window.localStorage.getItem('Socially_Current_User'))._id
    const obj = {
      postId: post._id,
      userId
    }

    axios.post("http://localhost:9002/api/updateLike", obj)
    .then(res => {
      console.log(res)
      setNumberOfLikes(res.data.length)
    }).catch(err => {
        toast.error("Error Occurred")
    })

  }

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [scrollBehavior, setScrollBehavior] = useState('inside')

  const btnRef = React.useRef(null)

  const handleComment = async () => {
    onOpen()
    setSkeletonLoading(true)
    const obj = {
      commentId: post.commentId
    }

    await axios.post("http://localhost:9002/api/getAllComments", obj)
    .then(res => {
        setCommentArray(res.data.allComments)
        setSkeletonLoading(false)
    }).catch(err => {
      console.log(err)
    })

  }

  const handleCommentPublish = async () => {
    setLoading(true)
    if(comment === "") {
      toast.error("Write something!!!")
      setLoading(false)
    } else {
      const obj = {
        commentId: post.commentId,
        comment,
        time: Date(),
        senderUsername: curr_user.username,
        senderImage: curr_user.profilePic
      }
      await axios.post("http://localhost:9002/api/addComment", obj)
      .then(res => {
        toast.success(res.data.message)

        let updatedCommentArray = []

        if(commentArray && commentArray.length > 0) {
          updatedCommentArray = commentArray
          updatedCommentArray.unshift({comment, time: Date(), senderUsername: curr_user.username, senderImage: curr_user.profilePic})
          console.log(updatedCommentArray)
          setCommentArray(updatedCommentArray)
          setLoading(false)
        } else {
          updatedCommentArray.push({comment, time: Date(), senderUsername: curr_user.username, senderImage: curr_user.profilePic})
          setCommentArray(updatedCommentArray)
          setLoading(false)
        }
      })
      .catch(err => {
        console.log(err)
      })
    }
  }

  return (
    <>
    <Card w='650px'>
  <CardHeader>
    <Flex spacing='4'>
      <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
        <Avatar name='Segun Adebayo' src={post.profilePic} />

        <Box>
          <Heading size='sm'>{post.username}</Heading>
          <Text fontSize='12px'>{timeAgo.format(new Date(post.current_time))}</Text>
        </Box>
      </Flex>
      
      <Menu>
      <MenuButton
        as={IconButton}
        aria-label='Options'
        icon={<MoreVertOutlinedIcon />}
        variant='outline'
      />
      <MenuList>
        <MenuItem onClick={deletePost}>
          Delete this post
        </MenuItem>
      </MenuList>
    </Menu>
    </Flex>
  </CardHeader>
  <CardBody>
    <Text>
      {post.caption}
      {post.newsLink && post.newsLink !== ""
        ?
        <Button ml='5px' bg='white' color='blue' size='sm'>
            <Link href={post.newsLink} target='/blank'>
                Read More 
            </Link>
        </Button> 
        :
        <></>
      }
    </Text>
  </CardBody>
  <Image
    objectFit='cover'
    src={post.postPic}
    alt='Chakra UI'
  />

  <CardFooter
    justify='space-between'
    flexWrap='wrap'
    sx={{
      '& > button': {
        minW: '136px',
      },
    }}
  >
        <Button flex='1' variant='ghost' leftIcon={<ThumbUpAltOutlinedIcon />} onClick={updateLike}>
            Like ({NumberOfLikes} likes)
            
        </Button>
        <Spacer />
        <Button flex='1' variant='ghost' leftIcon={<QuestionAnswerOutlinedIcon />}  onClick={handleComment}>
            Comment
        </Button>
  </CardFooter>
</Card>
<Modal
        onClose={onClose}
        finalFocusRef={btnRef}
        isOpen={isOpen}
        scrollBehavior={'inside'}
      >
        <ModalOverlay />
        <ModalContent bgColor='gray.100'>
          <ModalHeader>
            <Flex justifyContent='flex-start' alignItems='center'>
              <ForumIcon fontSize='large'/>
              <Text pl='10px' fontSize='20px' color='black'>Comments</Text>
            </Flex>
          </ModalHeader>
          <ModalBody>
              <Stack>
                <Flex>
                  <Avatar src={curr_user.profilePic}></Avatar>
                  {/* <Input ml='15px' variant='flushed' placeholder='Add a comment...' /> */}
                  <InputGroup size='md'>
                    <Input
                      ml='15px'
                      pr='4.5rem'
                      type='text'
                      placeholder='Add a comment...'
                      variant='flushed'
                      onChange={e => setComment(e.target.value)}
                    />
                    <InputRightElement width='4.5rem'>
                      <Button isLoading={loading} h='1.75rem' size='sm' bgColor='blue.300' borderRadius='15px' p='6px' onClick={handleCommentPublish}>
                        Comment
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </Flex>
                {
                  skeletonLoading
                  ?
                  <CommentLoading />
                  :
                  (commentArray && commentArray.length > 0
                      ?
                      <Box pt='15px'>  
                        <Stack spacing='10px'>
                          {
                            commentArray.map(item => {
                              return (
                                <>
                                  <Flex>
                                    <Avatar src={item.senderImage}/>
                                    <Box ml='15px'>
                                      <Flex alignItems='center' justifyContent='flex-start'>
                                        <Text>{item.senderUsername}</Text>
                                        <Text position='relative' top='2px' ml='8px' fontSize='12px'>{timeAgo.format(new Date(item.time))}</Text>
                                      </Flex>
                                      <Text>{item.comment}</Text>
                                    </Box>
                                  </Flex>
                                </>
                              )
                            })
                          }
                        </Stack>
                      </Box>
                      :
                      <Flex alignItems='center' justifyContent='center'>
                        <Heading>No Comments</Heading>
                      </Flex>
                  )
                }
              </Stack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
</>
  )
}

export default SinglePost