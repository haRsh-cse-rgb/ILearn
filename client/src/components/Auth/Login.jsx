import { Box, Button, Container, FormLabel, HStack, Heading, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import "../Home/home.css"
import { useDispatch } from 'react-redux';
import { login } from '../../redux/actions/user';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = React.useState(false);


    const dispatch=useDispatch();


const submitHandler =(e)=>{

    e.preventDefault();
    dispatch(login(email , password));
    // console.log(e);

}


    const handleClick = () => setShow(!show)
    return (
        <Container h={'95vh'}  >
            <VStack h={'full'} justifyContent={'center'} spacing={'16'}>
            <Heading>Welcome to <span className='purple'>I Learn</span></Heading>

                <form onSubmit={submitHandler} style={{ width: '100%' }}>
                    <Box marginY={'4'}>
                        <FormLabel htmlFor='email' >Email</FormLabel>
                        <Input required id='email' value={email} onChange={e => setEmail(e.target.value)}
                            placeholder='kumarharshrivastava@gmail.com' type={'email'} focusBorderColor='purple.600'></Input>
                    </Box>
                    <Box marginY={'4'}>
                        <FormLabel htmlFor='email' >Password</FormLabel>
                        <InputGroup size='md'>
                            <Input
                                pr='4.5rem'
                                type={show ? 'text' : 'password'}
                                placeholder='Enter password'
                                focusBorderColor='purple.600'
                                onChange={e => setPassword(e.target.value)}
                                value={password}
                            />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={handleClick}>
                                    {show ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </Box>
                    <Box>
                        <Link to="/forgetpassword">
                            <Button fontSize={'sm'} variant="link">Forget Password ?</Button>
                        </Link>
                    </Box>
                    <HStack  justifyContent={'space-between'}>
                    <Button my='4' colorScheme='purple' type='submit'>Login</Button>

                    <Box my={'4'}>
                        New User ? <Link to="/register"> <Button colorScheme='purple' variant={'link'}>Sign UP</Button></Link>
                    </Box>
                    </HStack>
                </form>
            </VStack>
        </Container>
    )
}

export default Login