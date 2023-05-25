import { Wrap, WrapItem, Flex, Box, Spacer } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { NewsData } from '../context/NewsDataContext'
import SingleNewsItem from './SingleNewsItem'

const NewsContent = () => {
    const {newsData} = useContext(NewsData)

  return (
    <>
        <Flex mt='10px'>
            <Spacer />
            <Box w='1200px'>
                <Wrap>
                    {
                        newsData && newsData.map((news, key) => {
                            return (
                                <>
                                    <WrapItem>
                                        <SingleNewsItem key={news.id} news={news}/>
                                    </WrapItem>
                                </>
                            )
                        })
                    
                    }
                </Wrap> 
            </Box>
            <Spacer />
        </Flex>
    </>
  )
}

export default NewsContent