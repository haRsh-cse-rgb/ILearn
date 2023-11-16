import { Box, Button, Grid, Heading, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import intro from "../../assets/videos/intro.mp4"
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { getLectures } from '../../redux/actions/course';
import { loadUser } from '../../redux/actions/user';
import Loader from '../Layout/Loader';

const CoursePage = ({user}) => {

    const[lectureNumber , setLectureNumber]=useState(0);

    const {lectures , loading}= useSelector(state =>state.course)

    


    const dispatch=useDispatch();
    const params=useParams();


    useEffect(() =>{

        dispatch(getLectures(params.id))
        // dispatch(loadUser)

    } , [dispatch , params.id]);


    if(user.role !== 'admin' && ( user.subscription ===undefined || user.subscription.status!=='active')){
        return <Navigate to={'/subscribe'}/>
    }



   
  return (
    loading ?( <Loader/>) : (
    
    <Grid minH={'90vh'} templateColumns={["1fr" , "3fr 1fr"]} mt={'7'}>
    {
        lectures && lectures.length > 0 ? (
            <>
            <Box>
    <video width={'100%'} autoPlay controls controlsList='nodownload  noremoteplayback' src={lectures[lectureNumber].video.url}/>

    <Heading m={'4'}>{`${lectureNumber+1} ${lectures[lectureNumber].title}`}</Heading>
    
    <Text m={'4'}>{lectures[lectureNumber].description}</Text>
    </Box>
    <VStack spacing={'6'} borderBottom={'1px'} >
       {
        lectures.map((element , index)=>(
            <Button  variant={'link'} key={element._id} onClick={()=>setLectureNumber(index)} >
                <Text fontSize={'18px'}>{index+1} {element.title}</Text>
            </Button>
        ))
       }
    </VStack>
            </>
        ) : <Heading> No Lectures Found.</Heading>
    }
</Grid>)
  )
}

export default CoursePage