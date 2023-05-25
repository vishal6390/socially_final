import React, {useState} from 'react'
import { Button, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalHeader, ModalFooter, ModalBody, useDisclosure} from '@chakra-ui/react';

const FriendsModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
      <>
        <Button onClick={onOpen}>Open Modal</Button>
  
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create your account</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              Hello Body
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
}

export default FriendsModal