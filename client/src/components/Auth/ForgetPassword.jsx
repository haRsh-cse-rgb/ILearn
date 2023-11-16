import { Box, Button, Center, Container, Flex, FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { forgetPassword } from '../../redux/actions/profile';
import toast from 'react-hot-toast';

const ForgetPassword = () => {

    const [email , setEmail] = useState('');

    const {loading , message , error} =useSelector(state=>state.profile)

    const dispatch=useDispatch();

const submitHandler= (e) =>{
  e.preventDefault();

  dispatch(forgetPassword(email))

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
        <Heading my={'16'} textAlign={'center'}>Forget password</Heading>
        <VStack spacing={'8'}>
        
                        
                        <Input required id='email'  value={email} onChange={e => setEmail(e.target.value)}
                            placeholder='kumarharshrivastava@gmail.com' type={'email'} focusBorderColor='purple.600'></Input>
                    

                    <Button type='submit' colorScheme='purple' w={'full'} isLoading={loading}> Send Reset Link</Button>
        </VStack>
        </form>
    </Container>
  )
}

export default ForgetPassword