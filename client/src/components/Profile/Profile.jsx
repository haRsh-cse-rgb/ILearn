import { Avatar, Button, Container, HStack, Heading, Image, Input,  Stack, Text, VStack, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { RiDeleteBin7Fill } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { updateProfilePicture } from '../../redux/actions/profile'
import { removeFromPlayList } from '../../redux/actions/profile'
import { cancelSubscription, loadUser } from '../../redux/actions/user'
import toast from 'react-hot-toast'

const Profile = ({user}) => {

    const [imagePreview, setimagePreview] = useState('');
    const [image, setimage] = useState('');

    const dispatch=useDispatch();

    const {loading , message , error} = useSelector(state=>state.profile);
    const {loading1 , message1 , error1} = useSelector(state=>state.subscription);

    const removeFromPlayLsit =async id=> {
     await dispatch(removeFromPlayList(id));

     dispatch(loadUser());
    }

  
    

    const changeImageHandler = async (e , image)=> {
        e.preventDefault();
        const file=e.target.files[0];
        const reader=new FileReader();
  
        reader.readAsDataURL(file);
  
        reader.onloadend =() =>{
            setimagePreview(reader.result);
            setimage(file);
        }

        e.preventDefault();

        const myForm=new FormData();
        myForm.append('file' , image);
       await dispatch(updateProfilePicture(myForm));

       dispatch(loadUser())
 

       
   


    }


    const cancelHandler = async ()=>{
        
      await  dispatch(cancelSubscription())
    //   dispatch(loadUser())
    }

    useEffect(() => {

        if(error){
            toast.error(error);
            dispatch({type:'clearError'});
        }
    
        if(message){
            toast.success(message);
            dispatch({type:'clearMessage'});
        }
        if(error1){
            toast.error(error);
            dispatch({type:'clearError'});
        }
    
        if(message1){
            toast.success(message);
            dispatch({type:'clearMessage'});
            dispatch(loadUser);
        }
    
    } , [dispatch , error , message , error1 , message1]);

    
  return (
    <Container minH={'100vh'} maxW="conatiner.lg" py="8">
        <Heading textAlign={'center'} m={'10'} >Profile</Heading>
        <Stack justifyContent={"center"} direction={['column' , 'row']} alignItems={'center'} spacing={['8' , '16']} padding="8">
            <VStack>
                <Avatar boxSize={"48"} src={user?.avatar?.url}></Avatar>
                <Input  required 
                variant="unstyled"
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
                                outline:"none",
                               
                            }
                        }}
                        >

                
                        </Input>
            </VStack>

            <VStack spacing={'4'} alignItems={['center' , 'flex-start']}>
                <HStack>
                    <Text fontWeight={'bold'}>Name -</Text>
                    <Text>{user.name}</Text>
                </HStack>
                <HStack>
                    <Text fontWeight={'bold'}>Email -</Text>
                    <Text>{user.email}</Text>
                </HStack>
                <HStack>
                    <Text fontWeight={'bold'}>Created At -</Text>
                    <Text>{user.createdAt.split("T")[0]}</Text>
                </HStack>

                <HStack>
                    {
                        user.role !== 'admin' && <HStack>
                            <Text fontWeight={'bold'}>Subscription</Text>
                            {
                                user.subscription && user.subscription.status === 'active' ? (
                                    <Button colorScheme='purple' onClick={cancelHandler} isLoading={loading}>Cancel Subscription</Button>
                                ):(
                                    <Link to="/subscribe">
                                        <Button colorScheme='purple'>Subscribe</Button>
                                    </Link>
                                )
                            }
                        </HStack>
                    }
                </HStack>

                <Stack alignItems={'center'} direction={['column' , 'row']}>
                {/* <Button type='submit' onClick={changePhoto}>Change Photo</Button> */}
                <Link to="/updateProfile">
                    <Button >Update Profile</Button>
                </Link>
                <Link to="/changePassword">
                    <Button>Change Password</Button>
                </Link>

                

                </Stack>

            </VStack>
        </Stack>

        <Heading size={'md'} textAlign={'center'} mt={'30'}>PlayList</Heading>
        {
            user.playlist.length > 0 && (
                <Stack direction={['column' , 'row']} alignItems={'center'} flexWrap={"wrap"} p={'4'}>
                    {
                        user.playlist.map((element) => (
                            <VStack w={'48'} m={"2"} key={element.course}>
                                <Image boxSize={"full"} objectFit={"contain"} src={element.poster}></Image>

                                <HStack>
                                    <Link to={`/course/${element.course}`}>
                                        <Button variant={"ghost"} colorScheme='purple'>Watch Now</Button>
                                    </Link>
                                    
                                        <Button onClick={()=>removeFromPlayLsit(element.course)} isLoading={loading}>
                                            <RiDeleteBin7Fill/>
                                        </Button>
                                    
                                </HStack>
                            </VStack>

                        ))
                    }
                </Stack>
            )
        }

       


    </Container>
  )
}

export default Profile

