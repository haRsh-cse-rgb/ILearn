import { Box, Button, Container, FormLabel, HStack, Heading, Input, Textarea, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Request = () => {
    const [name , setName]=useState();
    const [email , setEmail]=useState();
    const [course , setCourse]=useState();
  return (
    <Container h='100vh'>
        <VStack h={'full'} justifyContent={'center'} spacing={'16'}>
            <Heading>Request Course</Heading>

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
                        <FormLabel htmlFor='course' >Course</FormLabel>
                        <Textarea required id='course' value={course} onChange={e => setCourse(e.target.value)}
                            placeholder='Enter your desired courses' type={'text'} focusBorderColor='purple.600'></Textarea>
                    </Box>
                    

                    
                   
                   
                    <HStack  justifyContent={'space-between'} >
                    <Button my='4' colorScheme='purple' type='submit'>Send</Button>

                    <Box my={'4'}  >
                        See available courses ?<Link to="/courses"> <Button colorScheme='purple' variant={'link'}>Clik here</Button></Link>
                    </Box>
                    </HStack>

                   
                    
                </form>

        </VStack>
    </Container>
  )
}

export default Request