import React, { useContext, useState } from 'react'
import { Box, Flex, Image, Spacer, InputGroup, Avatar, Input, InputRightElement, Button, Text, useToast, Menu, MenuItem, MenuList, MenuButton, MenuDivider, useDisclosure, Modal, ModalOverlay, ModalContent, ModalFooter, ModalHeader, ModalBody, ModalCloseButton, Divider, Heading, Wrap, WrapItem } from '@chakra-ui/react'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { NewsData } from '../context/NewsDataContext';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { countries, categories } from '../context/filterData';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { ChevronDownIcon } from '@chakra-ui/icons'
import { Auth } from '../context/AuthContext';

export const NewsPageNavBar = () => {
    const {setNewsData} = useContext(NewsData)
    const [query, setQuery] = useState("")
    const api_key = process.env.REACT_APP_API_KEY
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [country, setCountry] = useState("")
    const [category, setCategory] = useState("")
    const [searchLoading, setSearchLoading] = useState(false)
    const toast = useToast()

    const history = useHistory()

    const [sorting, setSorting] = useState("sortBy")
    const {curr_user, setCurr_user} = useContext(Auth)

    const handleLogout = () => {
        window.localStorage.removeItem('Socially_Current_User')
        setCurr_user({})
        toast.success("Logged Out Successfully")
        history.push('/login')
    }

    const handleSortingClick = async (item) => {

        if(query !== ""){
            setSorting(item)

            if(sorting !== "sortBy") {
                let url = `https://newsapi.org/v2/everything?q=${query}&sortBy=${sorting}&apiKey=${api_key}`
                const data = await fetch(url)
                const parsedData = await data.json()
                setNewsData(parsedData.articles)
            }
        } else {
            toast({
                title: 'Search Something first',
                description: "Sorting is applied on searched results!",
                status: 'warning',
                duration: 5000,
                isClosable: true,
            })
        }
    }

    const handleSearchClick = async () => {

        if(query === "") {
            toast({
                title: 'Type Something...',
                description: "To search you have to write something.",
                status: 'warning',
                duration: 5000,
                isClosable: true,
            })
        } else {
            setSearchLoading(true)
            const data = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=${api_key}`)
            const parsedData = await data.json()
            setNewsData(parsedData.articles)
            setSearchLoading(false)


        }

    }

    const handleApplyFilter = async () => {
        if(country === "") {
            toast({
                title: 'Select the country',
                // description: "To search you have to write something.",
                status: 'warning',
                duration: 5000,
                isClosable: true,
            })
        } else if(category === ""){
            toast({
                title: 'Select the category',
                // description: "To search you have to write something.",
                status: 'warning',
                duration: 5000,
                isClosable: true,
            })
        } else {
            const data = await fetch(`https://newsapi.org/v2/top-headlines?country=${country.code}&category=${category.code}&apiKey=${api_key}`)
            const parsedData = await data.json()
            setNewsData(parsedData.articles)
        }
        setCountry("")
        setCategory("")
    }

  return (
    <>
        <Flex justifyContent='center' alignItems='center' bgColor='gray.100'>
            <Box>
                <Flex justifyContent='center' alignItems='center'>
                    <Image cursor='pointer' pl='20px' boxSize='100px' src='https://www.iconbolt.com/iconsets/social-media-logos/logo-shazam-social-social-media.svg' onClick={() => history.push("/")}/>
                    <Text pl='20px' fontSize='2xl'>Socially Feed</Text>
                </Flex>
            </Box>
            <Spacer />
            <InputGroup size='md' w='600px'>
                <Input
                    pr='4.5rem'
                    type='text'
                    placeholder='Search for the latest news...'
                    onChange={e => setQuery(e.target.value)}
                    border='1px solid black'
                />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleSearchClick} isLoading={searchLoading}>
                    Search
                    </Button>
                </InputRightElement>
            </InputGroup>
            <Spacer />
            <FilterAltIcon fontSize='large'/>
            <Text cursor='pointer' onClick={onOpen}>Filter</Text>
            <Box ml='20px' w='150px'>
                <Menu >
                    <MenuButton as={Button} rightIcon={<ExpandMoreIcon />}>
                        {sorting}
                    </MenuButton>
                    <MenuList>
                        <MenuItem onClick={() => handleSortingClick("sortBy")}>sortBy</MenuItem>
                        <MenuDivider />
                        <MenuItem onClick={() => handleSortingClick("popularity")}>Popularity</MenuItem>
                        <MenuDivider />
                        <MenuItem onClick={() => handleSortingClick("publishedAt")}>Publish Date</MenuItem>
                    </MenuList>
                </Menu>
            </Box>
            {/* <Spacer /> */}
            <Box>
                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    <Avatar size='sm' cursor='pointer' name={curr_user.username} src={curr_user.profilePic} />
                    </MenuButton>
                    <MenuList>
                        <MenuItem onClick={() => history.push('/profile')}>My Profile</MenuItem>
                        <MenuDivider />
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </MenuList>
                </Menu>
            </Box>
            <Spacer />
        </Flex>
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader><Heading>Filter your News</Heading></ModalHeader>
            <ModalCloseButton />
            <Divider/>
            <ModalBody pb={6}>
                <Box>
                    <Heading size='md' mb='5px'>Choose Country</Heading>
                    <Wrap>
                        {
                            countries.map(item => {
                                return (
                                    <WrapItem>
                                        <Button bgColor='gray.200' onClick={() => setCountry(item)}>{item.country}</Button>
                                    </WrapItem>
                                )
                            })
                        }
                    </Wrap>
                </Box>
                <Box mt='10px'>
                    <Heading size='md' mb='5px'>Choose Category</Heading>
                    <Wrap>
                        {
                            categories.map(item => {
                                return (
                                    <WrapItem>
                                        <Button bgColor='gray.200' onClick={() => setCategory(item)}>{item.category}</Button>
                                    </WrapItem>
                                )
                            })
                        }
                    </Wrap>
                </Box>
                <Flex>
                    {
                        country && <Text bgColor='gray.400' p='6px 15px' mr='15px' mt='15px' borderRadius='5px'>{country.country}</Text>
                    }
                    {
                        category && <Text bgColor='gray.400' p='6px 15px' mt='15px' borderRadius='5px'>{category.category}</Text>
                    }
                </Flex>
            </ModalBody>
            <Divider />
            <ModalFooter>
                <Button colorScheme='blue'  variant='ghost' onClick={handleApplyFilter}>
                Apply Filter
                </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    </>
  )
}
