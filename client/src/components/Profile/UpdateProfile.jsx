import { Button, Container, Heading, Input, InputGroup, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../redux/actions/profile';
import { loadUser } from '../../redux/actions/user';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = ({user}) => {

    const [name , setName]=useState(user.name);
    const [email , setEmail]=useState(user.email);
    const [imagePreview, setimagePreview] = useState('');
    const [image, setimage] = useState('');

    const dispatch=useDispatch();
    const navigate=useNavigate();

    const {loading} = useSelector(state =>state.profile)


    const submitHandler = async (e) =>{
      e.preventDefault();

      dispatch(updateProfile(name , email));

      dispatch(loadUser());

      navigate('/profile')
    }

  
  return (
    <Container py={'16'} minH={'90vh'}>
        <form onSubmit={submitHandler}>
        <Heading my={'16'} textAlign={'center'}>Update Your Profile</Heading>
        <VStack spacing={'8'}>
        
                        
        <InputGroup size='md'>
                            <Input
                                pr='4.5rem'
                                type={"text"}
                                placeholder='Name'
                                focusBorderColor='purple.600'
                                onChange={e => setName(e.target.value)}
                                value={name}
                            />
                           
                        </InputGroup>
        <InputGroup size='md'>
                            <Input
                                pr='4.5rem'
                                type={"email"}
                                placeholder='Email'
                                focusBorderColor='purple.600'
                                onChange={e => setEmail(e.target.value)}
                                value={email}
                            />
                            </InputGroup>
                           

                    <Button type='submit' colorScheme='purple' w={'full'} isLoading={loading}>Change</Button>
        </VStack>
        </form>
    </Container>
  )
}

export default UpdateProfile