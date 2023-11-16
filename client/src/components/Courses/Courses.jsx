import { Button, Container, HStack, Heading, Image, Input, Stack, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllCourses } from '../../redux/actions/course'
import { addToPlayList } from '../../redux/actions/profile'
import { loadUser } from '../../redux/actions/user'
import Loader from '../Layout/Loader'
import toast ,{Toaster} from "react-hot-toast"


const Course =({views , title , imageSrc , id , addToPlaylistHandler , creator , description , lectureCount , loading})=> {


    return (

     <VStack className='course' alignItems={['center' , 'flex-start']}>
      <Image src={imageSrc} boxSize={'60'} objectFit={'contain'}/>
      <Heading textAlign={['center' , 'left']} maxW={'200px'} noOfLines={3} size={'sm'}>{title}</Heading>
      <Text noOfLines={2}>{description}</Text>
      <HStack>
        <Text textTransform="uppercase" fontWeight={'bold'} >Creator</Text>
        <Text textTransform="uppercase" color={"grey"} >{creator}</Text>
      </HStack>

      <Heading
      textAlign={'center'} size={'xs'}>Lectures - {lectureCount}</Heading>
      <Heading
      textAlign={'center'} size={'xs'}>Views - {views}</Heading>

      <Stack direction={['column' ,'row']} alignItems={'center'}>
        <Link to={`/course/${id}`}>
            <Button colorScheme='purple' >Watch Now</Button>
        </Link>
        <Button colorScheme='purple' variant={"ghost"} onClick={() =>addToPlaylistHandler(id)} isLoading={loading}>Add To PlayList</Button>
      </Stack>
     </VStack>


    )

    
      
    
}

const Courses = () => {

const [keyword , setKeyword]=useState('');
const [category , setCategory]=useState('');

const dispatch=useDispatch();

const addToPlaylistHandler= async courseId=>{
    console.log(courseId);


   await dispatch(addToPlayList(courseId));
    // dispatch(loadUser())
}

const {loading, courses , error , message}=useSelector(state => state.course);

useEffect(() =>{
  dispatch(getAllCourses(category , keyword));

  if(error){
    toast.error(error);
   dispatch({type: 'clearError'});
  }

  if(message){
    toast.success(message);
    dispatch({type: 'clearMessage'})
  }
} , [category , keyword , dispatch , error ,message])

const categories=[
    "Web Development",
    "Artificial Intelligence",
    "Operating System",
    "Game Development",
    "Data Structure",
    "App Development",

];



  return (
    <Container minH={"95vh"} maxW={"container.xl"} padding={'8'}>
        <Heading  m={'8'} textAlign={'center'}>All Courses</Heading>

        <Input value={keyword} placeholder='Search For Courses...' onChange={e=> setKeyword(e.target.value)}
          type='text' focusBorderColor="purple.600" ></Input>

          <HStack overflowX={"auto"} paddingY={'8'} css={{'&::-webkit-scrollbar': {
            display:'none',
          },
          }}>
          {
            categories.map((item , index)=>(
                <Button minW={'60'} onClick={()=> setCategory(item)}>
                    <Text>{item}</Text>
                </Button>
            ))
          }
          </HStack>

          <Stack direction={['column' , 'row']} flexWrap="wrap" justifyContent={['flex-start' , 'space-evenly']}
           alignItems={['center' , 'flex-start']}>
{

  

  courses.length >0 ?
           courses && courses.map((i) =>(
            <Course 
            key={i._id}
                title={i.title}
                description={i.description}
                views={i.views}
                imageSrc={i.poster.url}
                id={i._id}
                creator={i.createdBy}
                lectureCount={i.noOfVideos}
                addToPlaylistHandler={addToPlaylistHandler}
                loading={loading}
            />
           )) : <Heading mt="6">Course Not Found</Heading>

}
           </Stack>


    </Container>
  )
}

export default Courses