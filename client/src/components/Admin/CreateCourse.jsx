import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { Box, Button, Container, Grid, Heading, Image, Input, Select, VStack } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import { createCourse } from '../../redux/actions/admin';
import toast from "react-hot-toast";

const CreateCourse = () => {

  const categories=[
    "Web Development",
    "Artificial Intelligence",
    "Operating System",
    "Game Development",
    "Data Structure",
    "App Development",

];



  const[title , setTitle]=useState('');
  const[description , setdescription]=useState('');
  const[createdBy , setcretedBy]=useState('');
  const[category , setcategory]=useState('');
  const[image , setimage]=useState('');
  const[imagePrev , setimagePrev]=useState('');

  const dispatch=useDispatch();

  const {loading , error , message}=useSelector(state => state.admin);



  const changeImageHandler = (e)=> {
    const file=e.target.files[0];
    const reader=new FileReader();
  
    reader.readAsDataURL(file);
  
    reader.onloadend =() =>{
        setimagePrev(reader.result);
        setimage(file);
    }
  }


  const submitHandler =(e) =>{
    e.preventDefault();

    dispatch(createCourse(title , description , category , createdBy , image))
  }


  useEffect(() =>{
    if(error){
      toast.error(error);
      dispatch({type:'clearError'})
    }
    if(message){
      toast.success(message);
      dispatch({type:'clearMessage'})
    }
  } , [dispatch , loading , error]);


  return (
    <Grid minH={'100vh'} templateColumns={['1fr' , '5fr 1fr']}>

    <Container py="16">
    <form onSubmit={submitHandler}>
      <Heading textAlign={['center' , 'left']} my="16">Create Course</Heading>

      <VStack m="auto" spacing={"8"}>
        <Input value={title} onChange={e => setTitle(e.target.value)} placeholder='Title' type='text' focusBorderColor='purple.600'></Input>
        <Input value={description} onChange={e => setdescription(e.target.value)} placeholder='Description' type='text' focusBorderColor='purple.600'></Input>
        <Input value={createdBy} onChange={e => setcretedBy(e.target.value)} placeholder='Created By' type='text' focusBorderColor='purple.600'></Input>
        <Select focusBorderColor="purple.600" value={category} onChange={e => setcategory(e.target.value)}>
          <option value="">Category</option>
          {
            categories.map(item => (
              
              <option key={item} value={item}>{item}</option>
              
            ))
          }
        </Select>

        <Input  required
                        accept='image/*'
                        
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
                        />


                       { imagePrev && (
                       <Image src={imagePrev} boxSize="64" objectfit={"contain"}/>
                       )
                       }

                       <Button w="full" colorScheme='purple' type='submit' isLoading={loading}>Create</Button>



                        
      </VStack>

    </form>
    </Container>
    <Sidebar></Sidebar>
  </Grid>
  )
}

export default CreateCourse