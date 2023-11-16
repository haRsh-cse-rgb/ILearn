import { Box, Button, Container, FormLabel, HStack, Heading, Input, Textarea, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Contact = () => {
    const [name , setName]=useState();
    const [email , setEmail]=useState();
    const [message , setMessage]=useState();
  return (
    <Container h='100vh'>
        <VStack h={'full'} justifyContent={'center'} spacing={'16'}>
            <Heading>Contact Us</Heading>

            <form style={{ width: '100%' }}>
                    
                    <Box marginY={'4'}>
                        <FormLabel htmlFor='name' >Name</FormLabel>
                        <Input required id='name' value={name} onChange={e => setName(e.target.value)}
                            placeholder='Harsh...' type={'text'} focusBorderColor='purple.600'></Input>
                    </Box>
                    <Box marginY={'4'}>
                        <FormLabel htmlFor='email' >Email</FormLabel>
                        <Input required id='email' value={email} onChange={e => setEmail(e.target.value)}
                            placeholder='kumarharshrivastava@gmail.com' type={'email'} focusBorderColor='purple.600'></Input>
                    </Box>
                    <Box marginY={'4'}>
                        <FormLabel htmlFor='message' >Message</FormLabel>
                        <Textarea required id='message' value={message} onChange={e => setMessage(e.target.value)}
                            placeholder='Type your message here' type={'text'} focusBorderColor='purple.600'></Textarea>
                    </Box>
                    

                    
                   
                   
                    <HStack  justifyContent={'space-between'} >
                    <Button my='4' colorScheme='purple' type='submit'>Send</Button>

                    <Box my={'4'}  >
                        Request For a course ?<Link to="/request"> <Button colorScheme='purple' variant={'link'}>Click here</Button></Link>
                    </Box>
                    </HStack>

                   
                    
                </form>

        </VStack>
    </Container>
  )
}

export default Contact