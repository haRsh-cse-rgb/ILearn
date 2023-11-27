import { Box, Button, Grid, HStack, Heading, Image, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { RiDeleteBin3Line } from 'react-icons/ri'
import Modal from './CourseModal'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCourses, getLectures } from '../../redux/actions/course'
import { addLecture, deleteCourse, deleteLecture } from '../../redux/actions/admin'
import toast from 'react-hot-toast'

const AdminCourses = () => {

  const {courses , lectures } = useSelector(state =>state.course)
  const {loading , error , message} = useSelector(state =>state.admin)

  const [coursesId , setCourseId]= useState("")
  const [coursesTitle , setCourseTitle]= useState("")

  const dispatch=useDispatch();

  const {isOpen , onClose , onOpen}=useDisclosure();

  const courseHandler= (lectureId , title)=>{
    dispatch(getLectures(lectureId))
    onOpen();
    setCourseId(lectureId);
    setCourseTitle(title)
  }
  const deleteHandler= (userId)=>{
    dispatch(deleteCourse(userId))
    console.log(userId)
  }
  const deleteLectureHandler = async(courseId , lectureId)=>{
    await dispatch(deleteLecture(courseId , lectureId));
    dispatch(getLectures(courseId));
  }
  const addLectureHandler= async (e , courseId , title , description , video)=>{
    e.preventDefault();

   await dispatch(addLecture(courseId , title , description , video));
   dispatch(getLectures(courseId))

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

    dispatch(getAllCourses());

  } , [dispatch , error , loading])



  return (
    <Grid minH={'100vh'} templateColumns={['1fr' , '5fr 1fr']}>

    <Box padding={["0" , "8"]}>
      <Heading textAlign={["center" , "left"]} my={"16"}>
      Courses
        
      </Heading>
      <TableContainer w={["100vw" , "full"]}>
        <Table variant={"simple"} size={"lg"}>
          <TableCaption>All available courses in the database</TableCaption>
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Poster</Th>
              <Th>Title</Th>
              <Th>Category</Th>
              <Th>Creator</Th>
              <Th isNumeric>Views</Th>
              <Th isNumeric>Lectures</Th>
              <Th isNumeric>Action</Th>
            </Tr>
          </Thead>

          <Tbody>
          {
            courses.map(item =>(

          <Row key={item._id} item={item} courseHandler={courseHandler} deleteHandler={deleteHandler} loading={loading}></Row>
            ))
          }

          </Tbody>

        </Table>
      </TableContainer>
      <Modal isOpen={isOpen} onClose={onClose} deleteHandler={deleteLectureHandler} addLectureHandler={addLectureHandler} id={coursesId}
        courseTitle={coursesTitle} lectures={lectures} loading={loading}
      />
    </Box>
    <Sidebar></Sidebar>
  </Grid>
  )
}

export default AdminCourses

function Row({item , deleteHandler , courseHandler , loading}){
  return (
    <Tr>
      <Td>#{item._id}</Td>
      <Td>
        <Image src={item.poster.url}/>
      </Td>
      <Td>{item.title}</Td>
      <Td>{item.category}</Td>
      <Td>{item.createdBy}</Td>
      <Td isNumeric>{item.views}</Td>
      <Td>{item.numOfVideos}</Td>
     

      <Td isNumeric>
      <HStack justifyContent={'flex-end'}>
        <Button variant={'outline'} color="purple.600" onClick={()=> courseHandler(item._id , item.title)}>View Lectures</Button>
        <Button onClick={()=> deleteHandler(item._id)} isLoading={loading}>
          <RiDeleteBin3Line/>
        </Button>
      </HStack>

      </Td>
      
    </Tr>
  )
}

