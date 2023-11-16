import { Box, Button, Center, Container, Flex, FormLabel, Heading, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { resetPassword } from '../../redux/actions/profile';
import toast from 'react-hot-toast';


const ResetPassword = () => {

    const [password , setPassword] = useState('');
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    const params=useParams();

const {loading , error , message} =useSelector(state=>state.profile)

    const dispatch=useDispatch();

    const submitHandler= (e) =>{
      e.preventDefault();
      console.log(params.token)
    
      dispatch(resetPassword(params.token , password))
    
    }
    
    
    useEffect(() =>{
      if(error){
        toast.error(error);
        dispatch({type : 'clearError'})
      }
      if(message){
        toast.success(message);
        dispatch({type : 'clearMessage'})
      }
    } , [dispatch , error , message])



  return (
    
    <Container  display="flex" justifyContent="center" alignItems="center" h="80vh" >
    
        <form onSubmit={submitHandler}>
        <Heading my={'16'} textAlign={'center'}>Reset Your password</Heading>
        <VStack spacing={'8'}>
        
                        
        <InputGroup size='md'>
                            <Input
                                pr='4.5rem'
                                type={show ? 'text' : 'password'}
                                placeholder='Enter New password'
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

                    <Button type='submit' colorScheme='purple' w={'full'} isLoading={loading}>Update Password</Button>
        </VStack>
        </form>
    </Container>
  )
}

export default ResetPassword