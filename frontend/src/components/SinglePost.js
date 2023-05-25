import React, { useEffect } from 'react'
import { Card, CardHeader, Flex, Avatar, Box, IconButton, Heading, Text, Button, Image, CardBody,CardFooter, Spacer, Menu, MenuButton, MenuList, MenuItem, Link } from '@chakra-ui/react'
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useState } from 'react';

const SinglePost = ({post}) => {

  const [NumberOfLikes, setNumberOfLikes] = useState(0)

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

  return (
    <Card w='650px'>
  <CardHeader>
    <Flex spacing='4'>
      <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
        <Avatar name='Segun Adebayo' src={post.profilePic} />

        <Box>
          <Heading size='sm'>{post.username}</Heading>
          <Text>{post.current_time.slice(0, 25)}</Text>
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
        <Button flex='1' variant='ghost' leftIcon={<QuestionAnswerOutlinedIcon />}>
            Comment
        </Button>
  </CardFooter>
</Card>
  )
}

export default SinglePost