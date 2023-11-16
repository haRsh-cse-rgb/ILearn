import { Button, Container, Heading, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../../redux/actions/profile';
import toast from 'react-hot-toast';

const ChangePassword = () => {

    const [password , setPassword] = useState('');
    const [oldpassword , setOldPassword] = useState('');
    const [show1, setShow1] = React.useState(false)
    const [show2, setShow2] = React.useState(false)
    const handleClick1 = () => setShow1(!show1)
    const handleClick2 = () => setShow2(!show2)

    const dispatch=useDispatch();



const submitHandler= (e) =>{


    e.preventDefault();
    dispatch(changePassword(oldpassword , password))
}


const {loading , message , error} = useSelector(state => state.profile);


useEffect(() => {

    if(error){
        toast.error(error);
        dispatch({type:'clearError'});
    }

    if(message){
        toast.success(message);
        dispatch({type:'clearMessage'});
    }

} , [dispatch , error , message]);

  return (
    <Container py={'16'} minH={'90vh'}>
        <form onSubmit={submitHandler}>
        <Heading my={'16'} textAlign={'center'}>Change Your password</Heading>
        <VStack spacing={'8'}>
        
                        
        <InputGroup size='md'>
                            <Input
                                pr='4.5rem'
                                type={show1 ? 'text' : 'password'}
                                placeholder='Old password'
                                focusBorderColor='purple.600'
                                onChange={e => setOldPassword(e.target.value)}
                                value={oldpassword}
                                required
                            />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={handleClick1}>
                                    {show1 ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
        <InputGroup size='md'>
                            <Input
                                pr='4.5rem'
                                type={show2 ? 'text' : 'password'}
                                placeholder='New password'
                                focusBorderColor='purple.600'
                                onChange={e => setPassword(e.target.value)}
                                value={password}
                                required
                            />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={handleClick2}>
                                    {show2 ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>

                    <Button type='submit' colorScheme='purple' w={'full'}  isLoading={loading}>Change Password</Button>
        </VStack>
        </form>
    </Container>
  )
}

export default ChangePassword