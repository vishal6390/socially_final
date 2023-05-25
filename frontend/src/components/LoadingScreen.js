import { Skeleton, Flex, Box, Wrap, WrapItem, Spacer } from '@chakra-ui/react'
import React from 'react'

export const LoadingScreen = () => {
  return (
    <>
        <Flex mt='10px'>
            <Spacer />
            <Box w='1200px'>
                <Wrap>
                    <WrapItem>
                        <Box w='385px' mr='6px' h='500px' borderRadius='8px'>
                            <Skeleton w='385px' mr='10px' h='500px' borderRadius='8px'></Skeleton>
                        </Box>
                    </WrapItem>
                    <WrapItem>
                        <Box w='385px' mr='6px' h='500px' borderRadius='8px'>
                            <Skeleton w='385px' mr='10px' h='500px' borderRadius='8px'></Skeleton>
                        </Box>
                    </WrapItem>
                    <WrapItem>
                        <Box w='385px' mr='6px' h='500px' borderRadius='8px'>
                            <Skeleton w='385px' mr='10px' h='500px' borderRadius='8px'></Skeleton>
                        </Box>
                    </WrapItem>
                    <WrapItem>
                        <Box w='385px' mr='6px' h='500px' borderRadius='8px'>
                            <Skeleton w='385px' mr='10px' h='500px' borderRadius='8px'></Skeleton>
                        </Box>
                    </WrapItem>
                    <WrapItem>
                        <Box w='385px' mr='6px' h='500px' borderRadius='8px'>
                            <Skeleton w='385px' mr='10px' h='500px' borderRadius='8px'></Skeleton>
                        </Box>
                    </WrapItem>
                    <WrapItem>
                        <Box w='385px' mr='6px' h='500px' borderRadius='8px'>
                            <Skeleton w='385px' mr='10px' h='500px' borderRadius='8px'></Skeleton>
                        </Box>
                    </WrapItem>
                    
                </Wrap> 
            </Box>
            <Spacer />
        </Flex>
    </>
  )
}
