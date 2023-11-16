import { Avatar, Box, Button, Container, FormLabel, HStack, Heading, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import "../Home/home.css"
import { useDispatch } from 'react-redux';
import { register } from '../../redux/actions/user';

const Register = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [imagePreview, setimagePreview] = useState('');
    const [image, setimage] = useState('');
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    const dispatch=useDispatch();


    const changeImageHandler = (e)=> {
        const file=e.target.files[0];
        const reader=new FileReader();

        reader.readAsDataURL(file);

        reader.onloadend =() =>{
            setimagePreview(reader.result);
            setimage(file);
        }
    }


    const submitHandler =(e)=>{
        e.preventDefault();

        // const myForm= new FormData();

        // myForm.append('name' , name);
        // myForm.append('email' , email);
        // myForm.append('password' , password);
        // myForm.append('file' , image);

       


        dispatch(register(name , email , password , image));

    }
    return (
        <Container h={'95vh'}  mt={'50'}>
            <VStack h={'full'} justifyContent={'center'} spacing={'16'}>
            <Heading>Register to <span className='purple'>I Learn</span></Heading>

                <form onSubmit={submitHandler} style={{ width: '100%' }}>
                    <Box marginY={'4'} display={'flex'} justifyContent={'center'}>
                       <Avatar size={'xl'} src={imagePreview}></Avatar>
                    </Box>
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
                        <FormLabel htmlFor='email' >Password</FormLabel>
                        <InputGroup size='md'>
                            <Input
                                pr='4.5rem'
                                type={show ? 'text' : 'password'}
                                placeholder='Enter password'
                                focusBorderColor='purple.600'
                                onChange={e => setPassword(e.target.value)}
                                value={password}
                                required
                            />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={handleClick}>
                                    {show ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </Box>

                    <Box my={'4'}>
                        <FormLabel htmlFor='chooseAvatar'>
                        Choose Avatar

                        </FormLabel>
                        <Input  required
                        accept='image/*'
                        id="chooseAvatar"
                        type='file'
                        focusBorderColor='purple.600'
                        onChange={changeImageHandler}
                        css={{
                            "&::file-selector-button":{
                                cursor:"pointer",
                                marginLeft:"-5%",
                                width:"110%",
                                border:"none",
                                height:"100%",
                                color:"#805AD5",
                                background:"transparent",
                            }
                        }}
                        >

                        </Input>
                    </Box>
                   
                    <HStack  justifyContent={'space-between'} >
                    <Button my='4' colorScheme='purple' type='submit'>Sign Up</Button>

                    <Box my={'4'}  >
                        Already a User ? <Link to="/login"> <Button colorScheme='purple' variant={'link'}>Login</Button></Link>
                    </Box>
                    </HStack>
                </form>
            </VStack>
        </Container>
    )
}

export default Register