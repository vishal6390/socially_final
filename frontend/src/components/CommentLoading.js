import { Box, Skeleton, SkeletonCircle, Flex, Stack } from '@chakra-ui/react'
import React from 'react'

const CommentLoading = () => {
  return (
    <Box bgColor='gray.100'>
        <Stack>
            <Skeleton height='40px' isLoaded={false} bg='green.500' color='white' fadeDuration={1} />
            <Skeleton height='40px' isLoaded={false} bg='green.500' color='white' fadeDuration={1} />
            <Skeleton height='40px' isLoaded={false} bg='green.500' color='white' fadeDuration={1} />
            <Skeleton height='40px' isLoaded={false} bg='green.500' color='white' fadeDuration={1} />
        </Stack>
    </Box>
  )
}

export default CommentLoading